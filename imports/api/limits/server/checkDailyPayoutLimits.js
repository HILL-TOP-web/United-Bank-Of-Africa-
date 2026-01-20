import { Limits } from '../limits';
import { LIMITS_CONFIG } from './constants';
import { getToday } from './getToday';

export function checkDailyPayoutLimit(userId, amount) {
  const today = getToday();

  const records = Limits.find(
    { userId, type: 'DAILY_PAYOUT', date: today }
  ).fetch();

  const total = records.reduce((s, r) => s + r.amount, 0);

  if (total + amount > LIMITS_CONFIG.DAILY_PAYOUT_MAX) {
    throw new Error('DAILY_PAYOUT_LIMIT_EXCEEDED');
  }

  if (records.length >= LIMITS_CONFIG.MAX_PAYOUTS_PER_DAY) {
    throw new Error('PAYOUT_COUNT_LIMIT_EXCEEDED');
  }
}
