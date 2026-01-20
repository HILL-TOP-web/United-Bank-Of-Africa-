import { Limits } from '../limits';
import { getToday } from './getToday';

export function recordDailyConversion(userId, amount) {
  Limits.insert({
    userId,
    type: 'DAILY_CONVERSION',
    amount,
    date: getToday(),
    createdAt: new Date()
  });
}
