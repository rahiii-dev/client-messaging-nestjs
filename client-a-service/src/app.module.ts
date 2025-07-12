import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './modules/message/message.module';
import { AppConfigModule } from './config/config.module';
import { KafkaModule } from './modules/kafka/kafka.module';

@Module({
  imports: [AppConfigModule, MessageModule, KafkaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
