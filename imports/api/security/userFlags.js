import { Mongo } from 'meteor/mongo';

export const UserFlags = new Mongo.Collection('user_flags');

/*
{
  _id,
  userId,
  frozen,
  reason,
  createdAt
}
*/
