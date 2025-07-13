import { Body, Controller, Post } from '@nestjs/common';
import { SendMessageDto } from './dto/send-message.dto';
import { KafkaProducerService } from '../kafka/kafka-producer.service';

@Controller('send-message')
export class MessageController {
    
    constructor(
        private readonly kafkaService: KafkaProducerService
    ){}

    @Post()
    async handleSendMessage(@Body() data: SendMessageDto){
        await this.kafkaService.sendMessage({
            from: data.sender,
            to: data.receiver,
            message: data.message
        });
        return {
            sucess: true,
            message: "Message Send Sucessfully"
        }
    }
}
