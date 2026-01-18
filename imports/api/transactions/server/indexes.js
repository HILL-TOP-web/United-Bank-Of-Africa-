import { Meteor } from 'meteor/meteor';
import { Transactions } from '../transactions';

Meteor.startup(async () => {
  const raw = Transactions.rawCollection();

  // 🔐 Idempotency protection (ABSOLUTELY REQUIRED)
  await raw.createIndex(
    { idempotencyKey: 1 },
    { unique: true, name: 'unique_idempotency_key' }
  );

  // 🔗 Fast transaction lookup
  await raw.createIndex(
    { transactionId: 1 },
    { name: 'transaction_id_index' }
  );
});
