import { Mongo } from 'meteor/mongo';

export const Wallets = new Mongo.Collection('wallets');

/*
{
  userId,
  balance,
  locked: 0
}
*/
