import { Limits } from '../limits';
import { LIMITS_CONFIG } from './constants';
import { getToday } from './getToday';

export function checkDailyConversionLimit(userId, amount) {
  const today = getToday();

  const used = Limits.find(
    { userId, type: 'DAILY_CONVERSION', date: today }
  ).fetch().reduce((sum, r) => sum + r.amount, 0);

  if (used + amount > LIMITS_CONFIG.DAILY_CONVERSION_MAX) {
    throw new Error('DAILY_CONVERSION_LIMIT_EXCEEDED');
  }
}
