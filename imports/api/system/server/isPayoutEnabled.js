import { SystemFlags } from '../systemFlags';

export function isPayoutEnabled() {
  const flag = SystemFlags.findOne({ key: 'PAYOUTS' });
  return flag ? flag.enabled === true : true;
}
