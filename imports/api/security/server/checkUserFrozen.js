import { UserFlags } from '../userFlags';

export function checkUserFrozen(userId) {
  const flag = UserFlags.findOne({ userId, frozen: true });
  if (flag) {
    throw new Error('USER_FROZEN');
  }
}
