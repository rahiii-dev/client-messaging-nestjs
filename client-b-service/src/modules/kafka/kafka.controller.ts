import { Controller, Logger } from '@nestjs/common';
import { KAFKA_TOPICS } from './kafka-constants';
import { Ctx, EventPattern, KafkaContext, Payload } from '@nestjs/microservices';
import { MessageService } from '../message/message.service';

@Controller()
export class KafkaController {
    private readonly logger = new Logger(KafkaController.name);

    constructor(
        private readonly messageService: MessageService
    ){}
    
    @EventPattern(KAFKA_TOPICS.CLIENT_MESSAGES)
    async handleClientMessage(@Payload() payload: { from: string; to: string; message: string }, @Ctx() context: KafkaContext) {
        const {to, from, message} = payload;

        this.logger.log(`📥 Received message from "${from}" to "${to}": "${message}"`);
        
        if(to === 'clientB'){
            this.logger.log(`✅ Saving message for clientB`);
            await this.messageService.saveMessage(payload);
        } else {
            this.logger.debug(`ℹ️ Message ignored. Not intended for clientB.`);
        }
    }
}
