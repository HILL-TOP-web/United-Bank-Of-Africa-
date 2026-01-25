import { checkCompliance } from '../../compliance/server/checkCompliance';
import { recordDailyVolume } from '../../compliance/server/recordVolume';
import { checkAML } from '../../compliance/server/amlEngine';
import { enqueuePayout } from '../../jobs/server/enqueuePayout';
import { Payouts } from '../payouts';

export function requestPayout({ userId, amount }) {
  checkCompliance({ userId, amount });

  const payoutId = Payouts.insert({
    userId,
    amount,
    status: 'PENDING',
    createdAt: new Date()
  });

  recordDailyVolume({ userId, amount });
  checkAML({ userId, amount });

  enqueuePayout({ payoutId, userId, amount });

  return payoutId;
}
