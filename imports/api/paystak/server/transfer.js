import fetch from 'node-fetch';
import { Meteor } from 'meteor/meteor';

export async function executePaystackTransfer({ userId, amount }) {
  const response = await fetch('https://api.paystack.co/transfer', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${Meteor.settings.paystack.secret}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      source: 'balance',
      amount: amount * 100,
      reason: `Payout for ${userId}`
    })
  });

  const data = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'PAYSTACK_FAILED');
  }

  return data.data.reference;
}
