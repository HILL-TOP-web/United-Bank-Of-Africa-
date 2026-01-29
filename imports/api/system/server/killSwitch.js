import { Meteor } from 'meteor/meteor';
import { SystemFlags } from '../collections';

Meteor.methods({
  'system.assertLive'() {
    const flag = SystemFlags.findOne({ key: 'SYSTEM_LIVE' });
    if (!flag || flag.enabled !== true) {
      throw new Meteor.Error('system-down', 'System is offline');
    }
  },
});
