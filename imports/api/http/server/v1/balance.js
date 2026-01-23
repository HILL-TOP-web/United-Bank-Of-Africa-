import { WebApp } from 'meteor/webapp';
import { requireAuth } from '../middleware/auth';
import { getBalance } from '../../../ledger/server/getBalance';

WebApp.connectHandlers.use('/api/v1/balance', (req, res) => {
  try {
    const user = requireAuth(req);
    const balance = getBalance(user._id, 'NGN');

    res.writeHead(200);
    res.end(JSON.stringify({ balance }));
  } catch (e) {
    res.writeHead(401);
    res.end(e.message);
  }
});
