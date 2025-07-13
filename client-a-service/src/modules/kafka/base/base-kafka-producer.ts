import { Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

export abstract class BaseKafkaProducer {
  protected readonly logger = new Logger('KafkaProducer');

  constructor(protected readonly kafkaClient: ClientKafka) {}

  protected async emit<T>(
    topic: string,
    payload: T,
    customHeaders: Record<string, any> = {}
  ): Promise<void> {
    const message = {
      value: payload,
      headers: {
        retryCount: 0,
        ...customHeaders,
      },
    };

    try {
      const observable = this.kafkaClient.emit(topic, message);
      await firstValueFrom(observable);
    } catch (error) {
      this.logger.error(`Kafka emit failed to topic "${topic}"`, error);
      throw error;
    }
  }
}
