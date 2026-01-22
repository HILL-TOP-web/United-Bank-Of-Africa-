import { Mongo } from 'meteor/mongo';

export const RateLimits = new Mongo.Collection('rate_limits');

/*
{
  _id,
  userId,
  action,
  createdAt
}
*/
