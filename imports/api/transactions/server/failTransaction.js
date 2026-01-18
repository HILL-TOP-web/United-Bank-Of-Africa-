import { Transactions } from '../transactions';

export function failTransaction(transactionId, reason = '') {
  Transactions.update(
    { transactionId },
    {
      $set: {
        status: 'FAILED',
        failureReason: reason,
        updatedAt: new Date()
      }
    }
  );
}
