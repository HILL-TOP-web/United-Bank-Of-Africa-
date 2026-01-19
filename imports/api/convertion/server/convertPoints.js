import { Meteor } from 'meteor/meteor';
import { getPointsBalance } from '../../rewards/server/getPointsBalance';
import { earnPoints } from '../../rewards/server/earnPoints';
import { recordLedgerEntry } from '../../ledger/server/recordEntry';
import { SYSTEM_ACCOUNTS } from '../../system/systemAccounts';

const POINTS_TO_NGN = 1; // 1 point = ₦1

export function convertPointsToNGN({ userId, points }) {
  const balance = getPointsBalance(userId);

  if (balance < points) {
    throw new Meteor.Error('INSUFFICIENT_POINTS');
  }

  const amountNGN = points * POINTS_TO_NGN;

  // 🔻 Deduct points
  earnPoints({
    userId,
    points: -points,
    reason: 'Points converted to NGN'
  });

  // 💰 Credit user wallet from SYSTEM_PAYOUT
  recordLedgerEntry({
    fromUserId: SYSTEM_ACCOUNTS.PAYOUT,
    toUserId: userId,
    amount: amountNGN,
    currency: 'NGN',
    narration: 'Points conversion payout'
  });

  return { amountNGN };
}
