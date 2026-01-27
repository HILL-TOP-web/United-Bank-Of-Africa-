import { Wallets } from '../wallets';

export function releaseLock({ userId, amount }) {
  Wallets.update(
    { userId },
    {
      $inc: { locked: -amount }
    }
  );
}
