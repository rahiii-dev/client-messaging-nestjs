import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [MessageController]
})
export class MessageModule {}
