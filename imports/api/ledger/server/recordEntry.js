import { Meteor } from 'meteor/meteor';
import { Ledger } from '../ledger';
import { Random } from 'meteor/random';

/**
 * Get current balance for a user
 */
function getBalance(userId, currency) {
  const lastEntry = Ledger.findOne(
    { userId, currency },
    { sort: { createdAt: -1 } }
  );

  return lastEntry ? lastEntry.balanceAfter : 0;
}

/**
 * Record a DOUBLE-ENTRY ledger transaction
 */
export function recordLedgerEntry({
  fromUserId,
  toUserId,
  amount,
  currency = 'NGN',
  narration = '',
  reference = null
}) {
  if (amount <= 0) {
    throw new Meteor.Error('INVALID_AMOUNT');
  }

  const transactionId = Random.id();

  // 🔴 DEBIT ENTRY (SENDER)
  const senderBalanceBefore = getBalance(fromUserId, currency);

  if (senderBalanceBefore < amount) {
    throw new Meteor.Error('INSUFFICIENT_FUNDS');
  }

  const senderBalanceAfter = senderBalanceBefore - amount;

  Ledger.insert({
    transactionId,
    userId: fromUserId,
    type: 'DEBIT',
    amount,
    currency,
    balanceAfter: senderBalanceAfter,
    narration,
    reference,
    createdAt: new Date()
  });

  // 🟢 CREDIT ENTRY (RECEIVER)
  const receiverBalanceBefore = getBalance(toUserId, currency);
  const receiverBalanceAfter = receiverBalanceBefore + amount;

  Ledger.insert({
    transactionId,
    userId: toUserId,
    type: 'CREDIT',
    amount,
    currency,
    balanceAfter: receiverBalanceAfter,
    narration,
    reference,
    createdAt: new Date()
  });

  return {
    transactionId,
    status: 'SUCCESS'
  };
  }
