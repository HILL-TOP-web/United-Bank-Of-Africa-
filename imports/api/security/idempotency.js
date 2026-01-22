import { Mongo } from 'meteor/mongo';

export const IdempotencyKeys = new Mongo.Collection('idempotency_keys');

/*
{
  _id,
  key,
  scope,        // 'PAYOUT' | 'CONVERSION'
  createdAt
}
*/
