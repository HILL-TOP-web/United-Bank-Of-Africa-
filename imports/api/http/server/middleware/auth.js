import { Meteor } from 'meteor/meteor';

export function requireAuth(req) {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) {
    throw new Meteor.Error('UNAUTHORIZED', 'API key missing');
  }

  const user = Meteor.users.findOne({ apiKey });
  if (!user) {
    throw new Meteor.Error('UNAUTHORIZED', 'Invalid API key');
  }

  return user;
}
