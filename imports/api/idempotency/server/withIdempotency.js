import { Idempotency } from '../idempotency';

export async function withIdempotency(key, fn) {
  const existing = Idempotency.findOne({ key });
  if (existing) return existing.result;

  const result = await fn();

  Idempotency.insert({
    key,
    result,
    createdAt: new Date()
  });

  return result;
}
