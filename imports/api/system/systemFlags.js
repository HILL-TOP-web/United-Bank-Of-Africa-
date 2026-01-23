import { Mongo } from 'meteor/mongo';

export const SystemFlags = new Mongo.Collection('system_flags');

/*
{
  _id,
  key,        // 'PAYOUTS'
  enabled,    // true | false
  updatedAt
}
*/
