import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/config.module';
import { KafkaModule } from './modules/kafka/kafka.module';
import { MessageModule } from './modules/message/message.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AppConfigModule, 
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.getOrThrow('MONGODB_URI'),
        dbName: config.get('DB_NAME'),
      })
    }),
    KafkaModule, 
    MessageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
