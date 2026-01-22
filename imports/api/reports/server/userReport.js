import { Ledger } from '../../ledger/ledger';

export function userReport(userId) {
  return Ledger.find({ userId }).fetch();
}
