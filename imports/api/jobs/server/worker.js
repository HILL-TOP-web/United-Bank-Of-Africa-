import { Jobs } from '../queue';
import { executePayout } from '../../payouts/server/executePayout';

export function processJobs() {
  const job = Jobs.findOne({ status: 'PENDING' });
  if (!job) return;

  if (job.type === 'PAYOUT') {
    executePayout(job.payload);
  }

  Jobs.update(job._id, { $set: { status: 'DONE' } });
}
