import { paystackRequest } from './http';

export function verifyPaystackTransfer(reference) {
  const response = paystackRequest({
    method: 'GET',
    path: `/transfer/verify/${reference}`
  });

  if (!response.data.status) {
    throw new Error('PAYSTACK_VERIFY_FAILED');
  }

  return response.data.data;
}
