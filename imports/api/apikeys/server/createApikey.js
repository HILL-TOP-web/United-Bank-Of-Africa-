import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import crypto from 'crypto';
import { ApiKeys } from '../apiKeys';

function hashKey(key) {
  return crypto.createHash('sha256').update(key).digest('hex');
}

Meteor.methods({
  'apikeys.create'() {
    if (!this.userId) {
      throw new Meteor.Error('UNAUTHORIZED');
    }

    const publicKey = `pk_live_${Random.id(24)}`;
    const secretKey = `sk_live_${Random.id(48)}`;

    ApiKeys.insert({
      userId: this.userId,
      publicKey,
      secretKeyHash: hashKey(secretKey),
      status: 'active',
      createdAt: new Date(),
      lastUsedAt: null
    });

    return {
      publicKey,
      secretKey, // 🔐 returned ONCE
      endpoints: {
        baseUrl: Meteor.absoluteUrl(),
        transfer: Meteor.absoluteUrl('api/v1/transfer')
      }
    };
  }
});
