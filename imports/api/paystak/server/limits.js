export function enforceDailyLimit(amount) {
  const DAILY_LIMIT = 50000000000; // ₦50bn

  if (amount > DAILY_LIMIT) {
    throw new Error('DAILY_LIMIT_EXCEEDED');
  }
}
