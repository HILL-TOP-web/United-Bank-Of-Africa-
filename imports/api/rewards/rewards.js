import { Mongo } from 'meteor/mongo';

export const Rewards = new Mongo.Collection('rewards');

/*
{
  _id,
  userId,
  points,
  reason,
  createdAt
}
*/
