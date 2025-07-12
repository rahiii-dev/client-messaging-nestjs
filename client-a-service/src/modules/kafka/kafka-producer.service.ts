import { Inject, Injectable, InternalServerErrorException, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_TOPICS } from '../../common/kafka-topic';

@Injectable()
export class KafkaProducerService implements OnModuleInit {
    private readonly logger = new Logger(KafkaProducerService.name);

    constructor(
        @Inject('KafkaClient') private readonly client: ClientKafka
    ) { }

    async onModuleInit() {
        await this.client.connect();
    }

    async sendMessage(payload: { from: string; to: string; message: string }) {
        try {
            await this.emitWithPromise(KAFKA_TOPICS.CLIENT_MESSAGES, payload);
        } catch (error) {
            this.logger.error(`❌ Failed to send Kafka message`, error);
            throw new InternalServerErrorException('Kafka message sending failed');
        }
    }

    private emitWithPromise(topic: string, payload: any): Promise<void> {
        return new Promise((resolve, reject) => {
            const observable = this.client.emit(topic, payload);

            const subscription = observable.subscribe({
                next: () => {
                    resolve();
                    subscription.unsubscribe();
                },
                error: (err) => {
                    reject(err);
                    subscription.unsubscribe();
                },
            });
        });
    }
}
