import { WebApp } from 'meteor/webapp';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import { ApiKeys } from '../../apiKeys/apiKeys';

WebApp.connectHandlers.use(bodyParser.json());

function hashKey(key) {
  return crypto.createHash('sha256').update(key).digest('hex');
}

WebApp.connectHandlers.use('/api/v1/transfer', (req, res) => {
  try {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith('Bearer ')) {
      throw new Error('NO_AUTH');
    }

    const secretKey = auth.replace('Bearer ', '');
    const hashed = hashKey(secretKey);

    const apiKey = ApiKeys.findOne({
      secretKeyHash: hashed,
      status: 'active'
    });

    if (!apiKey) {
      throw new Error('INVALID_KEY');
    }

    const { amount, to } = req.body;

    // ✅ Ledger, limits, payouts go here

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: true,
      message: 'Transfer successful'
    }));

  } catch (err) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: false,
      error: err.message
    }));
  }
});
