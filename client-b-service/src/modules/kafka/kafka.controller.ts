import { Controller } from '@nestjs/common';
import { KAFKA_TOPICS } from './kafka-constants';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ClientMessageConsumer } from './consumers/client-message-consumer';

@Controller()
export class KafkaController {
    constructor(
        private readonly clientMessageConsumer: ClientMessageConsumer
    ){}
    
    @EventPattern(KAFKA_TOPICS.CLIENT_MESSAGES)
    async handleClientMessage(@Payload() payload: { from: string; to: string; message: string }) {
        this.clientMessageConsumer.processTopic(payload);
    }
}
