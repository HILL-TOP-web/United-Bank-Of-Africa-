import { Rewards } from '../rewards';

export function getPointsBalance(userId) {
  const result = Rewards.aggregate([
    { $match: { userId } },
    { $group: { _id: null, total: { $sum: '$points' } } }
  ]);

  return result.length ? result[0].total : 0;
}
