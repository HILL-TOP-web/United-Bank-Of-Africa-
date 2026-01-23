import { requireAdmin } from './permissions';
import { UserFlags } from '../../security/userFlags';

Meteor.methods({
  'admin.freezeUser'(userId, reason) {
    requireAdmin(this.userId);

    UserFlags.insert({
      userId,
      frozen: true,
      reason,
      createdAt: new Date()
    });
  }
});
