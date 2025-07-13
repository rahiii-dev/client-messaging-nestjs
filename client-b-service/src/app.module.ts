import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/config.module';
import { KafkaModule } from './modules/kafka/kafka.module';

@Module({
  imports: [AppConfigModule, KafkaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
