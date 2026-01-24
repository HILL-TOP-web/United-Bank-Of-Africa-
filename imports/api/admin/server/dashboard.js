import { Meteor } from 'meteor/meteor';
import { requireAdmin } from './permissions';
import { Payouts } from '../../payouts/payouts';
import { AuditLogs } from '../../audit/auditLogs';

Meteor.methods({
  'admin.stats'() {
    requireAdmin(this.userId);

    return {
      users: Meteor.users.find().count(),
      payoutsPending: Payouts.find({ status: 'PENDING' }).count(),
      totalLogs: AuditLogs.find().count()
    };
  },

  'admin.recentLogs'() {
    requireAdmin(this.userId);
    return AuditLogs.find({}, { sort: { createdAt: -1 }, limit: 50 }).fetch();
  }
});
