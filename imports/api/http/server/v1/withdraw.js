import { WebApp } from 'meteor/webapp';
import { requireAuth } from '../middleware/auth';
import { requestPayout } from '../../../payouts/server/requestPayout';

WebApp.connectHandlers.use('/api/v1/withdraw', async (req, res) => {
  try {
    const user = requireAuth(req);
    const { amount } = JSON.parse(req.body);

    const payoutId = requestPayout({
      userId: user._id,
      amount
    });

    res.writeHead(200);
    res.end(JSON.stringify({ payoutId }));
  } catch (e) {
    res.writeHead(400);
    res.end(e.message);
  }
});
