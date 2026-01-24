import { WebApp } from 'meteor/webapp';
import { apiLimiter } from '../api/security/server/rateLimit';

WebApp.connectHandlers.use('/api', apiLimiter);
