import { WebApp } from 'meteor/webapp';

WebApp.connectHandlers.use('/health', (req, res) => {
  res.writeHead(200);
  res.end('OK');
});
