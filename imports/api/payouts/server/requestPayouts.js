import { Meteor } from 'meteor/meteor';
import { Payouts } from '../payouts';
import { Ledger } from '../../ledger/ledger';
import { checkDailyPayoutLimit } from '../../limits/server/checkDailyPayoutLimit';

export function requestPayout({ userId, amount, bankAccount }) {
  const balance = Ledger.findOne(
    { userId, currency: 'NGN' },
    { sort: { createdAt: -1 } }
  )?.balanceAfter || 0;

  if (balance < amount) {
    throw new Meteor.Error('INSUFFICIENT_BALANCE');
  }

  // 🛑 AML CHECK
  checkDailyPayoutLimit(userId, amount);

  return Payouts.insert({
    userId,
    amount,
    bankAccount,
    status: 'PENDING',
    createdAt: new Date(),
    updatedAt: new Date()
  });
}
