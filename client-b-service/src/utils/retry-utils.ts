export interface RetryOptions {
  maxRetries?: number;
  delayMs?: number;
  onRetry?: (attempt: number, error: unknown) => void;
}

export async function retry<T>(
  fn: () => Promise<T>,
  {
    maxRetries = 5,
    delayMs = 1000,
    onRetry
  }: RetryOptions
): Promise<T> {
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      return await fn();
    } catch (error) {
      attempt++;

      if (onRetry) onRetry(attempt, error);

      if (attempt >= maxRetries) {
        throw error;
      }

      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }

  throw new Error('Retry mechanism failed unexpectedly');
}
