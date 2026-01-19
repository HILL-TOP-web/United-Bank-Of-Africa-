import { Rewards } from '../rewards';

export function earnPoints({ userId, points, reason }) {
  if (points <= 0) {
    throw new Error('INVALID_POINTS');
  }

  Rewards.insert({
    userId,
    points,
    reason,
    createdAt: new Date()
  });
}
