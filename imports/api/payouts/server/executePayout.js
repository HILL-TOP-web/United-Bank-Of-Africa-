import { Payouts } from '../payouts';
import { recordLedgerEntry } from '../../ledger/server/recordEntry';
import { SYSTEM_ACCOUNTS } from '../../system/systemAccounts';

export function executePayout({ payoutId, bankTransferRef }) {
  const payout = Payouts.findOne(payoutId);

  if (!payout || payout.status !== 'APPROVED') {
    throw new Error('INVALID_PAYOUT');
  }

  // 🔴 Debit user wallet → SYSTEM_PAYOUT
  recordLedgerEntry({
    fromUserId: payout.userId,
    toUserId: SYSTEM_ACCOUNTS.PAYOUT,
    amount: payout.amount,
    currency: 'NGN',
    narration: 'User withdrawal',
    reference: bankTransferRef
  });

  Payouts.update(
    { _id: payoutId },
    {
      $set: {
        status: 'PAID',
        updatedAt: new Date()
      }
    }
  );
    }
