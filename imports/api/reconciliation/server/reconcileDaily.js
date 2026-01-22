import { Ledger } from '../../ledger/ledger';
import { verifyPaystackTransfer } from '../../paystack/server/verifyTransfer';

export async function reconcileTransfer(reference) {
  const ledger = Ledger.findOne({ reference });
  if (!ledger) {
    throw new Error('LEDGER_MISSING');
  }

  const paystack = verifyPaystackTransfer(reference);

  if (paystack.amount !== Math.abs(ledger.amount) * 100) {
    throw new Error('AMOUNT_MISMATCH');
  }

  if (paystack.status !== 'success') {
    throw new Error('TRANSFER_NOT_SUCCESSFUL');
  }

  return true;
}
