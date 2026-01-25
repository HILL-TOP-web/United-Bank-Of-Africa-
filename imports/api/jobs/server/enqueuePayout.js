import { PayoutQueue } from '../payoutQueue';

export function enqueuePayout({ payoutId, userId, amount }) {
  return PayoutQueue.insert({
    payoutId,
    userId,
    amount,
    status: 'PENDING', // PENDING | PROCESSING | PAID | FAILED
    attempts: 0,
    createdAt: new Date()
  });
}
