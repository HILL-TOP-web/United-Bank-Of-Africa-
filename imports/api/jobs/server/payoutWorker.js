import { Meteor } from 'meteor/meteor';
import { PayoutQueue } from '../payoutQueue';
import { Payouts } from '../../payouts/payouts';
import { executePaystackTransfer } from '../../paystack/server/transfer';

Meteor.setInterval(async () => {
  const job = PayoutQueue.findOne(
    { status: 'PENDING' },
    { sort: { createdAt: 1 } }
  );

  if (!job) return;

  PayoutQueue.update(job._id, {
    $set: { status: 'PROCESSING' },
    $inc: { attempts: 1 }
  });

  try {
    const reference = await executePaystackTransfer({
      userId: job.userId,
      amount: job.amount
    });

    PayoutQueue.update(job._id, {
      $set: {
        status: 'PAID',
        reference,
        completedAt: new Date()
      }
    });

    Payouts.update(job.payoutId, {
      $set: { status: 'PAID', reference }
    });

  } catch (e) {
    PayoutQueue.update(job._id, {
      $set: { status: 'FAILED', error: e.message }
    });

    Payouts.update(job.payoutId, {
      $set: { status: 'FAILED' }
    });
  }
}, 5000); // runs every 5 seconds
