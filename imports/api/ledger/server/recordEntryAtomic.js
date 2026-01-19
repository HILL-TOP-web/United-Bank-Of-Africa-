import { MongoInternals } from 'meteor/mongo';
import { Ledger } from '../ledger';
import { getBalance } from './getBalance';

export async function recordLedgerEntryAtomic({
  fromUserId,
  toUserId,
  amount,
  currency,
  narration,
  reference = null
}) {
  if (amount <= 0) {
    throw new Error('INVALID_AMOUNT');
  }

  const client = MongoInternals.defaultRemoteCollectionDriver().mongo.client;
  const session = client.startSession();

  try {
    session.startTransaction();

    const fromBalance = getBalance(fromUserId, currency);
    if (fromBalance < amount) {
      throw new Error('INSUFFICIENT_FUNDS');
    }

    const toBalance = getBalance(toUserId, currency);

    const now = new Date();

    // 🔴 Debit
    await Ledger.rawCollection().insertOne(
      {
        userId: fromUserId,
        currency,
        amount: -amount,
        balanceAfter: fromBalance - amount,
        narration,
        reference,
        createdAt: now
      },
      { session }
    );

    // 🟢 Credit
    await Ledger.rawCollection().insertOne(
      {
        userId: toUserId,
        currency,
        amount: amount,
        balanceAfter: toBalance + amount,
        narration,
        reference,
        createdAt: now
      },
      { session }
    );

    await session.commitTransaction();
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }
  }
