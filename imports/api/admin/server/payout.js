import { Meteor } from 'meteor/meteor';
import { requireAdmin } from './permissions';
import { PayoutQueue } from '../../jobs/payoutQueue';

Meteor.methods({
  'admin.payoutQueue'() {
    requireAdmin(this.userId);
    return PayoutQueue.find({}, { sort: { createdAt: -1 } }).fetch();
  }
});
