import { Module } from '@nestjs/common';
import { KafkaController } from './kafka.controller';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [MessageModule],
  controllers: [KafkaController]
})
export class KafkaModule {}
