import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaProducerService } from './producer/kafka-producer.service';

@Module({
    imports: [
        ClientsModule.registerAsync([
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
        ])
    ],
    providers: [KafkaProducerService],
    exports: [KafkaProducerService]
})
export class KafkaModule { }
