import { Mongo } from 'meteor/mongo';

export const Transactions = new Mongo.Collection('transactions');

/*
{
  _id,
  transactionId,        // Internal ID (links to ledger later)
  fromUserId,
  toUserId,
  amount,
  currency,
  narration,
  reference,
  status,               // 'PENDING' | 'SUCCESS' | 'FAILED' | 'REVERSED'
  idempotencyKey,
  createdAt,
  updatedAt
}
*/
