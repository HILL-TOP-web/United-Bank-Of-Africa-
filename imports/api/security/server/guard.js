import { Meteor } from 'meteor/meteor';
import { UserFlags } from './userFlags';
import { isPayoutEnabled } from '../../system/flags';
import { getBalance } from '../../ledger/server/getBalance';

export function assertUserCanWithdraw({ userId, amount, currency }) {
  if (!isPayoutEnabled()) {
    throw new Meteor.Error('SYSTEM_PAUSED', 'Payouts are disabled');
  }

  const frozen = UserFlags.findOne({ userId, frozen: true });
  if (frozen) {
    throw new Meteor.Error('ACCOUNT_FROZEN', frozen.reason || 'Account frozen');
  }

  const balance = getBalance(userId, currency);
  if (balance < amount) {
    throw new Meteor.Error('INSUFFICIENT_FUNDS');
  }
                             }
