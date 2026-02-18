/**
 * Helper de retry com exponential backoff
 * Útil para tolerar falhas transitórias (ex: Chromium, APIs externas)
 * 
 * @param fn Função assíncrona a ser executada
 * @param retries Número máximo de tentativas (padrão: 3)
 * @param delayMs Delay inicial em ms (padrão: 1000ms)
 * @returns Resultado da função ou lança o último erro
 * 
 * @example
 * const result = await withRetry(async () => {
 *   return await someUnstableOperation();
 * }, 3, 1000);
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delayMs = 1000
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;

      // Log útil para debug
      console.warn(`[Retry] Tentativa ${attempt}/${retries} falhou:`, err instanceof Error ? err.message : String(err));

      // Se não é a última tentativa, aguarda com exponential backoff
      if (attempt < retries) {
        const wait = delayMs * Math.pow(2, attempt - 1);
        console.log(`[Retry] Aguardando ${wait}ms antes da próxima tentativa...`);
        await new Promise((resolve) => setTimeout(resolve, wait));
      }
    }
  }

  // Se chegou aqui, todas as tentativas falharam
  console.error(`[Retry] Todas as ${retries} tentativas falharam`);
  throw lastError;
}
