import { Mongo } from 'meteor/mongo';

export const Ledger = new Mongo.Collection('ledger');

/*
Ledger document structure:

{
  _id,
  transactionId,      // Same ID for debit & credit pair
  userId,             // Owner of the entry
  type,               // 'DEBIT' | 'CREDIT'
  amount,             // Number (positive)
  currency,           // 'NGN', 'USD'
  balanceAfter,       // Balance after this entry
  narration,          // Description
  reference,          // External ref if any
  createdAt           // Timestamp
}
*/
