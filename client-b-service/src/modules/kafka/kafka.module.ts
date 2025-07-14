import { Module } from '@nestjs/common';
import { KafkaController } from './kafka.controller';
import { MessageModule } from '../message/message.module';
import { ClientMessageConsumer } from './consumers/client-message-consumer';
import { DLQProducerService } from './producers/dlq-producer-service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

const KafkaClient = ClientsModule.registerAsync([
  {
    name: "KafkaClient",
    useFactory: (config: ConfigService) => ({
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: config.get('KAFKA_CLIENT_ID') || 'client-a',
          brokers: [config.getOrThrow('KAFKA_BROKER')]
        },
        producerOnlyMode: true,
      },
    }),
    inject: [ConfigService]
  }
]);

@Module({
  imports: [MessageModule, KafkaClient],
  providers: [DLQProducerService, ClientMessageConsumer],
  controllers: [KafkaController]
})
export class KafkaModule { }
