import { Mongo } from 'meteor/mongo';

export const IdempotencyKeys = new Mongo.Collection('idempotency_keys');

export function assertIdempotent(key) {
  const exists = IdempotencyKeys.findOne({ key });
  if (exists) {
    throw new Error('DUPLICATE_REQUEST');
  }

  IdempotencyKeys.insert({
    key,
    createdAt: new Date()
  });
}
