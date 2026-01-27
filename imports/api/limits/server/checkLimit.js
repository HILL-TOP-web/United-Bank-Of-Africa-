import { Payouts } from '../../payouts/payouts';
import { Limits } from '../limits';

export function checkDailyLimit({ userId, amount }) {
  const limit = Limits.findOne({ key: 'DAILY_PAYOUT_LIMIT' });
  if (!limit) return true;

  const today = new Date();
  today.setHours(0,0,0,0);

  const totalToday = Payouts.find({
    userId,
    createdAt: { $gte: today },
    status: { $in: ['PENDING', 'PAID'] }
  }).fetch().reduce((sum, p) => sum + p.amount, 0);

  if (totalToday + amount > limit.amount) {
    throw new Error('DAILY_LIMIT_EXCEEDED');
  }
  }
