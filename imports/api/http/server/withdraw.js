import { WebApp } from 'meteor/webapp';
import { requireAuth } from '../middleware/auth';
import { requestPayout } from '../../../payouts/server/requestPayout';
import { assertUserCanWithdraw } from '../../../security/server/guards';
import { assertIdempotent } from '../../../security/server/idempotency';

WebApp.connectHandlers.use('/api/v1/withdraw', async (req, res) => {
  try {
    const user = requireAuth(req);
    const { amount, key } = JSON.parse(req.body);

    assertIdempotent(key);

    assertUserCanWithdraw({
      userId: user._id,
      amount,
      currency: 'NGN'
    });

    const payoutId = await requestPayout({
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
