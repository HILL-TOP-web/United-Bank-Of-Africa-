import { RateLimits } from '../rateLimit';

export function checkRateLimit(userId, action, limit = 5, seconds = 60) {
  const since = new Date(Date.now() - seconds * 1000);

  const count = RateLimits.find({
    userId,
    action,
    createdAt: { $gte: since }
  }).count();

  if (count >= limit) {
    throw new Error('RATE_LIMIT_EXCEEDED');
  }

  RateLimits.insert({ userId, action, createdAt: new Date() });
}
