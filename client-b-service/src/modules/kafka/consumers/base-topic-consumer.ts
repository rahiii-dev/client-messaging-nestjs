import { Logger } from '@nestjs/common';
import { retry } from 'src/utils/retry-utils';

export interface KafkaConsumerOptions {
    maxRetries?: number;
    retryDelayMs?: number;
}

export abstract class BaseKafkaTopicConsumer<T = any> {
    protected readonly logger: Logger;
    private readonly maxRetries: number;
    private readonly retryDelayMs: number;

    constructor(
        protected readonly topic: string,
        options?: KafkaConsumerOptions,
    ) {
        this.logger = new Logger(`Consumer:${topic}`);
        this.maxRetries = options?.maxRetries ?? 3;
        this.retryDelayMs = options?.retryDelayMs ?? 1000;
    }

    /**
     * Must be implemented by subclass to handle actual topic
     */
    protected abstract handleTopic(payload: T): Promise<void>;

    /**
     * Optional: Subclass can override to handle DLQ logic
     */
    protected async handleDLQ(payload: T, error: unknown): Promise<void> {
        this.logger.warn(
            `⚠️ DLQ handler not implemented. Message dropped. Payload: ${JSON.stringify(payload)} | Error: ${error}`,
        );
    }

    /**
     * Public method to call from controller or listener
     */
    async processMessage(payload: T): Promise<void> {
        try {
            await retry(
                async () => {
                    await this.handleTopic(payload);
                },
                {
                    maxRetries: this.maxRetries,
                    delayMs: this.retryDelayMs,
                }
            );

        } catch (finalError) {
            await this.handleDLQ(payload, finalError);
        }
    }
}
