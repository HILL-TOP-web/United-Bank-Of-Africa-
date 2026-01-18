import { createTransaction } from '../../transactions/server/createTransaction';
import { finalizeTransaction } from '../../transactions/server/finalizeTransaction';

Meteor.methods({
  'api.transfer'({ toUserId, amount, idempotencyKey }) {
    const fromUserId = this.userId;

    // 1️⃣ Create transaction (PENDING)
    const tx = createTransaction({
      fromUserId,
      toUserId,
      amount,
      currency: 'NGN',
      narration: 'Wallet transfer',
      idempotencyKey
    });

    // 2️⃣ Finalize → writes ledger
    return finalizeTransaction(tx.transactionId);
  }
});
