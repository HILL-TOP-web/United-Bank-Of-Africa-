import { Meteor } from 'meteor/meteor';
import { ComplianceProfiles } from '../../compliance/complianceProfiles';
import { requireAdmin } from './permissions';

Meteor.methods({
  'admin.freezeUser'(userId) {
    requireAdmin(this.userId);
    ComplianceProfiles.update(
      { userId },
      { $set: { frozen: true, frozenAt: new Date() } }
    );
  },

  'admin.unfreezeUser'(userId) {
    requireAdmin(this.userId);
    ComplianceProfiles.update(
      { userId },
      { $set: { frozen: false } }
    );
  }
});
