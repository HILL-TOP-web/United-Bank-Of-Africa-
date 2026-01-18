import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Transactions } from '../transactions';

export function createTransaction({
  fromUserId,
  toUserId,
  amount,
  currency = 'NGN',
  narration = '',
  reference = null,
  idempotencyKey
}) {
  if (!idempotencyKey) {
    throw new Meteor.Error('IDEMPOTENCY_REQUIRED');
  }

  // 🔒 Idempotency enforcement
  const existing = Transactions.findOne({ idempotencyKey });
  if (existing) {
    return existing;
  }

  const transactionId = Random.id();

  const txId = Transactions.insert({
    transactionId,
    fromUserId,
    toUserId,
    amount,
    currency,
    narration,
    reference,
    idempotencyKey,
    status: 'PENDING',
    createdAt: new Date(),
    updatedAt: new Date()
  });

  return Transactions.findOne(txId);
    }
