import { AMLFlags } from '../amlFlags';

export function checkAML({ userId, amount }) {
  if (amount >= 50000000000) {
    AMLFlags.insert({
      userId,
      reason: 'HIGH_VALUE_PAYOUT',
      amount,
      createdAt: new Date()
    });
  }
}
