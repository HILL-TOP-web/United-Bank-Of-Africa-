import { Mongo } from 'meteor/mongo';

export const Banks = new Mongo.Collection('banks');

/*
{
  userId,
  bankCode,
  bankName,
  accountNumber,
  accountName,
  recipientCode, // from Paystack
  verified: true,
  createdAt
}
*/
