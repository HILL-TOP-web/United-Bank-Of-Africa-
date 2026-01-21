import { Payouts } from '../payouts';
import { recordLedgerEntryAtomic } from '../../ledger/server/recordEntryAtomic';
import { SYSTEM_ACCOUNTS } from '../../system/systemAccounts';
import { recordDailyPayout } from '../../limits/server/recordDailyPayout';
import { initiatePaystackTransfer } from '../../paystack/server/initiateTransfer';

export async function executePayout({ payoutId }) {
  const payout = Payouts.findOne(payoutId);
  if (!payout || payout.status !== 'APPROVED') {
    throw new Error('INVALID_PAYOUT');
  }

  const reference = `PAYOUT_${payout._id}_${Date.now()}`;

  // 🚀 SEND TO PAYSTACK FIRST
  const transfer = initiatePaystackTransfer({
    amountNGN: payout.amount,
    recipientCode: payout.bankAccount.recipientCode,
    reference
  });

  // 🔴 ONLY AFTER PAYSTACK ACCEPTS
  await recordLedgerEntryAtomic({
    fromUserId: payout.userId,
    toUserId: SYSTEM_ACCOUNTS.PAYOUT,
    amount: payout.amount,
    currency: 'NGN',
    narration: 'User withdrawal',
    reference
  });

  recordDailyPayout(payout.userId, payout.amount);

  Payouts.update(
    { _id: payoutId },
    {
      $set: {
        status: 'PAID',
        paystackRef: reference,
        updatedAt: new Date()
      }
    }
  );

  return transfer;
    }
