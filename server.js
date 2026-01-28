import { Meteor } from 'meteor/meteor';

/**
 * ============================
 * SERVER BOOTSTRAP (RENDER SAFE)
 * ============================
 * - Static imports ONLY
 * - No dynamic imports
 * - Everything is visible at build time
 * - This file is the ignition key
 */

/* ============================
   🔐 SECURITY (LOAD FIRST)
============================ */
import '../imports/api/security/server/guards';
import '../imports/api/security/server/rateLimit';

/* ============================
   🧠 SYSTEM CORE
============================ */
import '../imports/api/system/server/flags';
import '../imports/api/system/server/limits';

/* ============================
   💼 MONEY / BUSINESS LOGIC
============================ */
import '../imports/api/ledger/server/ledger';
import '../imports/api/payouts/server/createPayout';
import '../imports/api/paystack/server/transfer';

/* ============================
   👷 BACKGROUND WORKERS
============================ */
import '../imports/api/jobs/server/payoutWorker';

/* ============================
   🌐 HTTP + WEBHOOKS
============================ */
import '../imports/api/http/server/v1/withdraw';
import '../imports/api/http/server/webhooks/paystack';

/* ============================
   👑 ADMIN METHODS
============================ */
import '../imports/api/admin/server/dashboard';
import '../imports/api/admin/server/payouts';

/* ============================
   🚀 SERVER START
============================ */
Meteor.startup(() => {
  console.log('🚀 Server fully initialized — all systems live');
});
