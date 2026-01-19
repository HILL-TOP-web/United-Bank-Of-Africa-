import { Ledger } from '../ledger';

export function getBalance(userId, currency) {
  const last = Ledger.findOne(
    { userId, currency },
    { sort: { createdAt: -1 } }
  );

  return last ? last.balanceAfter : 0;
}
