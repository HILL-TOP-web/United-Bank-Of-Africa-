import { Meteor } from 'meteor/meteor';
import { Ledger } from '../ledger';

Meteor.startup(async () => {
  const raw = Ledger.rawCollection();

  // 🔍 Fast balance lookup & statement queries
  await raw.createIndex(
    { userId: 1, currency: 1, createdAt: -1 },
    { name: 'ledger_user_currency_createdAt' }
  );
});
