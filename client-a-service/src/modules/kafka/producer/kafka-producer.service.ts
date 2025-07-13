import { Inject, Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_TOPICS } from '../kafka-constants';
import { BaseKafkaProducer } from '../base/base-kafka-producer';

@Injectable()
export class KafkaProducerService extends BaseKafkaProducer implements OnModuleInit {
    constructor(
        @Inject('KafkaClient') private readonly client: ClientKafka
    ) { 
        super(client)
    }

    async onModuleInit() {
        await this.client.connect();
    }

    async sendMessage(payload: { from: string; to: string; message: string }) {
        try {
            await this.emit(KAFKA_TOPICS.CLIENT_MESSAGES, payload);
        } catch (error) {
            throw new InternalServerErrorException('Kafka message sending failed');
        }
    }
}
