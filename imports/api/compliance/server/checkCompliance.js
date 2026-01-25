import { ComplianceProfiles } from '../complianceProfiles';
import { COMPLIANCE_LIMITS } from '../limits';
import { DailyVolumes } from '../dailyVolume';
import { AMLFlags } from '../amlFlags';

export function checkCompliance({ userId, amount }) {
  const profile = ComplianceProfiles.findOne({ userId });

  if (!profile) {
    throw new Error('NO_COMPLIANCE_PROFILE');
  }

  if (profile.frozen) {
    throw new Error('ACCOUNT_FROZEN');
  }

  const limits = COMPLIANCE_LIMITS[profile.tier];
  if (!limits) {
    throw new Error('INVALID_TIER');
  }

  if (amount > limits.single) {
    throw new Error('SINGLE_LIMIT_EXCEEDED');
  }

  const today = new Date().toISOString().slice(0, 10);

  const volume =
    DailyVolumes.findOne({ userId, date: today })?.amount || 0;

  if (volume + amount > limits.daily) {
    throw new Error('DAILY_LIMIT_EXCEEDED');
  }

  return true;
}
