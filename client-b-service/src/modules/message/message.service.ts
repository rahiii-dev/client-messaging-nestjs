import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schemas/message.schema';
import { MessageDto} from './dto/message-dto';

@Injectable()
export class MessageService {

    constructor(
        @InjectModel(Message.name) private messageModel: Model<Message>
    ) { }

    async saveMessage(data: MessageDto) {
        return this.messageModel.create(data);
    }
}
