import { paystackRequest } from './http';

export function createTransferRecipient({
  name,
  accountNumber,
  bankCode
}) {
  const response = paystackRequest({
    method: 'POST',
    path: '/transferrecipient',
    data: {
      type: 'nuban',
      name,
      account_number: accountNumber,
      bank_code: bankCode,
      currency: 'NGN'
    }
  });

  if (!response.data.status) {
    throw new Error('PAYSTACK_RECIPIENT_FAILED');
  }

  return response.data.data.recipient_code;
}
