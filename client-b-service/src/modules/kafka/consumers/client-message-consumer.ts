import { Injectable } from "@nestjs/common";
import { KAFKA_TOPICS } from "../kafka-constants";
import { BaseKafkaTopicConsumer } from "./base-topic-consumer";
import { MessageService } from "src/modules/message/message.service";
import { DLQProducerService } from "../producers/dlq-producer-service";

interface ClientMessagePayload {
    from: string;
    to: string;
    message: string
}

@Injectable()
export class ClientMessageConsumer extends BaseKafkaTopicConsumer<ClientMessagePayload> {

    constructor(
        private readonly messageService: MessageService,
        private readonly dlqProducer: DLQProducerService,
    ) {
        super(KAFKA_TOPICS.CLIENT_MESSAGES)
    }

    protected async handleTopic(payload: ClientMessagePayload): Promise<void> {
        const { to, from, message } = payload;

        this.logger.log(`📥 Received message from "${from}" to "${to}": "${message}"`);

        if (to === 'clientB') {
            this.logger.log(`✅ Saving message for clientB`);
            // throw new Error('Simulated processing error');
            await this.messageService.saveMessage(payload);
        } else {
            this.logger.debug(`ℹ️ Message ignored. Not intended for clientB.`);
        }
    }

    protected async handleDLQ(payload: ClientMessagePayload, error: unknown): Promise<void> {
        this.logger.warn(`🚨 Sending message to DLQ: ${KAFKA_TOPICS.CLIENT_MESSAGES}`);
        await this.dlqProducer.sendToDLQ(`${KAFKA_TOPICS.CLIENT_MESSAGES}-dlq`, payload)
    }
}