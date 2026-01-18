import { Meteor } from 'meteor/meteor';
import { Transactions } from '../transactions';
import { recordLedgerEntry } from '../../ledger/server/recordEntry';

export function finalizeTransaction(transactionId) {
  const tx = Transactions.findOne({ transactionId });

  if (!tx) {
    throw new Meteor.Error('TRANSACTION_NOT_FOUND');
  }

  if (tx.status !== 'PENDING') {
    return tx; // already processed
  }

  // 🔐 WRITE TO LEDGER (DOUBLE-ENTRY)
  recordLedgerEntry({
    fromUserId: tx.fromUserId,
    toUserId: tx.toUserId,
    amount: tx.amount,
    currency: tx.currency,
    narration: tx.narration,
    reference: tx.reference
  });

  // ✅ Mark transaction successful
  Transactions.update(
    { transactionId },
    {
      $set: {
        status: 'SUCCESS',
        updatedAt: new Date()
      }
    }
  );

  return Transactions.findOne({ transactionId });
      }
