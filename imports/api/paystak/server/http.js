import { HTTP } from 'meteor/http';
import { PAYSTACK_CONFIG } from '../config';

export function paystackRequest({ method, path, data = null }) {
  return HTTP.call(method, `${PAYSTACK_CONFIG.BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${PAYSTACK_CONFIG.SECRET_KEY}`,
      'Content-Type': 'application/json'
    },
    data
  });
}
