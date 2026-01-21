import { paystackRequest } from './http';

export function initiatePaystackTransfer({
  amountNGN,
  recipientCode,
  reference,
  reason = 'App payout'
}) {
  const response = paystackRequest({
    method: 'POST',
    path: '/transfer',
    data: {
      source: 'balance',
      amount: amountNGN * 100, // Paystack uses kobo
      recipient: recipientCode,
      reason,
      reference
    }
  });

  if (!response.data.status) {
    throw new Error('PAYSTACK_TRANSFER_FAILED');
  }

  return response.data.data;
}
