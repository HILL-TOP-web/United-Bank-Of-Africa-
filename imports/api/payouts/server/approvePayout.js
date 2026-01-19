import { Payouts } from '../payouts';

export function approvePayout(payoutId) {
  Payouts.update(
    { _id: payoutId },
    {
      $set: {
        status: 'APPROVED',
        updatedAt: new Date()
      }
    }
  );
}
