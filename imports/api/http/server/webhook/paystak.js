import { WebApp } from 'meteor/webapp';
import crypto from 'crypto';
import { ReconLogs } from '../../../recon/reconLogs';
import { Payouts } from '../../../payouts/payouts';

WebApp.connectHandlers.use('/webhooks/paystack', (req, res) => {
  let body = '';

  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    const signature = req.headers['x-paystack-signature'];
    const hash = crypto
      .createHmac('sha512', Meteor.settings.paystack.secret)
      .update(body)
      .digest('hex');

    if (hash !== signature) {
      res.writeHead(401);
      return res.end();
    }

    const event = JSON.parse(body);

    ReconLogs.insert({
      event: event.event,
      data: event.data,
      createdAt: new Date()
    });

    if (event.event === 'transfer.success') {
      Payouts.update(
        { reference: event.data.reference },
        { $set: { settled: true, settledAt: new Date() } }
      );
    }

    res.writeHead(200);
    res.end();
  });
});
