import { Mongo } from 'meteor/mongo';

export const Payouts = new Mongo.Collection('payouts');

/*
{
  _id,
  userId,
  amount,
  bankAccount,
  status,        // PENDING | APPROVED | PAID | REJECTED
  createdAt,
  updatedAt
}
*/
