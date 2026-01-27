import { PayoutQueue } from '../../api/jobs/payoutQueue';
import { Payouts } from '../../api/payouts/payouts';

Meteor.startup(() => {
  PayoutQueue.rawCollection().createIndex({ status: 1, createdAt: 1 });
  Payouts.rawCollection().createIndex({ userId: 1, createdAt: 1 });
});
