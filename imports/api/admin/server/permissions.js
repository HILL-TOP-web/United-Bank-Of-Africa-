import { Meteor } from 'meteor/meteor';

export function requireAdmin(userId) {
  const user = Meteor.users.findOne(userId);
  if (!user || user.role !== 'ADMIN') {
    throw new Meteor.Error('FORBIDDEN');
  }
}
