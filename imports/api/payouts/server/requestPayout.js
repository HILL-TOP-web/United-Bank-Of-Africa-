import { Meteor } from 'meteor/meteor';
import { Payouts } from '../payouts';
import { Ledger } from '../../ledger/ledger';

export function requestPayout({ userId, amount, bankAccount }) {
  const balance = Ledger.findOne(
    { userId, currency: 'NGN' },
    { sort: { createdAt: -1 } }
  )?.balanceAfter || 0;

  if (balance < amount) {
    throw new Meteor.Error('INSUFFICIENT_BALANCE');
  }

  return Payouts.insert({
    userId,
    amount,
    bankAccount,
    status: 'PENDING',
    createdAt: new Date(),
    updatedAt: new Date()
  });
    }
