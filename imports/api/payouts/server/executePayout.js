import { checkIdempotency } from '../../security/server/checkIdempotency';
import { initiatePaystackTransfer } from '../../paystack/server/initiateTransfer';
import { recordLedgerEntryAtomic } from '../../ledger/server/recordEntryAtomic';
import { SYSTEM_ACCOUNTS } from '../../system/systemAccounts';
import { Payouts } from '../payouts';

export async function executePayout({ payoutId }) {
  const payout = Payouts.findOne(payoutId);
  if (!payout || payout.status !== 'APPROVED') {
    throw new Error('INVALID_PAYOUT');
  }

  const reference = `PAYOUT_${payoutId}`;

  // 🛑 IDEMPOTENCY
  checkIdempotency({ key: reference, scope: 'PAYOUT' });

  // 🚀 PAYSTACK
  initiatePaystackTransfer({
    amountNGN: payout.amount,
    recipientCode: payout.bankAccount.recipientCode,
    reference
  });

  // 💰 LEDGER
  await recordLedgerEntryAtomic({
    fromUserId: payout.userId,
    toUserId: SYSTEM_ACCOUNTS.PAYOUT,
    amount: payout.amount,
    currency: 'NGN',
    narration: 'User withdrawal',
    reference
  });

  Payouts.update(
    { _id: payoutId },
    { $set: { status: 'PAID', updatedAt: new Date() } }
  );
    }
