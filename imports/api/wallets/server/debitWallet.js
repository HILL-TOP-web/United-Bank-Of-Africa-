import { Wallets } from '../wallets';

export function debitWallet({ userId, amount }) {
  const result = Wallets.update(
    {
      userId,
      balance: { $gte: amount }
    },
    {
      $inc: {
        balance: -amount,
        locked: amount
      }
    }
  );

  if (!result) throw new Error('INSUFFICIENT_FUNDS');
}
