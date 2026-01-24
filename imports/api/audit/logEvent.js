import { AuditLogs } from '../auditLogs';

export function logEvent({ userId, action, meta = {}, ip }) {
  AuditLogs.insert({
    userId,
    action,
    meta,
    ip,
    createdAt: new Date()
  });
}
