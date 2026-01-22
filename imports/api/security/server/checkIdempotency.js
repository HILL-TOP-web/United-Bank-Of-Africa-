import { IdempotencyKeys } from '../idempotency';

export function checkIdempotency({ key, scope }) {
  const exists = IdempotencyKeys.findOne({ key, scope });
  if (exists) {
    throw new Error('DUPLICATE_REQUEST');
  }

  IdempotencyKeys.insert({
    key,
    scope,
    createdAt: new Date()
  });
}
