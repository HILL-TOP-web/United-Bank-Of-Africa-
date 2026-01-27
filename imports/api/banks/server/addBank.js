import fetch from 'node-fetch';
import { Meteor } from 'meteor/meteor';
import { Banks } from '../banks';

export async function addBank({ userId, bankCode, accountNumber }) {
  const response = await fetch(
    'https://api.paystack.co/transferrecipient',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${Meteor.settings.paystack.secret}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'nuban',
        name: `User ${userId}`,
        account_number: accountNumber,
        bank_code: bankCode,
        currency: 'NGN'
      })
    }
  );

  const data = await response.json();
  if (!data.status) throw new Error(data.message);

  return Banks.insert({
    userId,
    bankCode,
    bankName: data.data.details.bank_name,
    accountNumber,
    accountName: data.data.name,
    recipientCode: data.data.recipient_code,
    verified: true,
    createdAt: new Date()
  });
    }
