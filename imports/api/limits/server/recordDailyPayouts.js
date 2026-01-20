import { Limits } from '../limits';
import { getToday } from './getToday';

export function recordDailyPayout(userId, amount) {
  Limits.insert({
    userId,
    type: 'DAILY_PAYOUT',
    amount,
    date: getToday(),
    createdAt: new Date()
  });
}
