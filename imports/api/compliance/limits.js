import { USER_TIERS } from './userTiers';

export const COMPLIANCE_LIMITS = {
  [USER_TIERS.UNVERIFIED]: {
    daily: 0,
    single: 0
  },
  [USER_TIERS.BASIC]: {
    daily: 10000000000,      // ₦10bn/day
    single: 50000000000       // ₦50bn per payout
  },
  [USER_TIERS.FULL]: {
    daily: 20000000000,     // ₦20bn/day
    single: 50000000000      // ₦50bn per payout
  }
};
