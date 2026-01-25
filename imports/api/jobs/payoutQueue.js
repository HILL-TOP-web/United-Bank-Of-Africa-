import { Mongo } from 'meteor/mongo';

export const PayoutQueue = new Mongo.Collection('payout_queue');
