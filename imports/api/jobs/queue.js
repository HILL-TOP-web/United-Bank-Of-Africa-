import { Mongo } from 'meteor/mongo';

export const Jobs = new Mongo.Collection('jobs');

/*
{
  _id,
  type,
  payload,
  status,
  createdAt
}
*/
