import { Mongo } from 'meteor/mongo';

export const Limits = new Mongo.Collection('limits');

/*
{
  _id,
  userId,
  type,        // 'DAILY_PAYOUT' | 'DAILY_CONVERSION'
  amount,
  date,        // YYYY-MM-DD
  createdAt
}
*/
