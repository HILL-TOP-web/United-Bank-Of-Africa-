import { checkDailyLimit } from '../../limits/server/checkLimit';
import { debitWallet } from '../../wallets/server/debitWallet';
import { requestPayout } from './requestPayout';
import { withIdempotency } from '../../idempotency/server/withIdempotency';

export async function createPayout({ userId, amount, key }) {
  return withIdempotency(key, async () => {
    checkDailyLimit({ userId, amount });
    debitWallet({ userId, amount });
    return requestPayout({ userId, amount });
  });
}
