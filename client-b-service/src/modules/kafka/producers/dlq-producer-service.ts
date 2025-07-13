import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { BaseKafkaProducer } from "./base-kafka-producer";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class DLQProducerService extends BaseKafkaProducer implements OnModuleInit {
    constructor(
        @Inject('KafkaClient') private readonly client: ClientKafka
    ) {
        super(client)
    }

    async onModuleInit() {
        await this.client.connect();
    }

    async sendToDLQ(topic: string, message: Record<string, any>): Promise<void> {
        await this.emit(topic, message, {
            reason: 'max-retries-exceeded',
            timestamp: new Date().toISOString(),
        });
    }
}