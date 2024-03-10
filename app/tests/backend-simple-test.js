/* eslint-disable */
import { Meteor } from 'meteor/meteor';
import { Events } from '../imports/api/event/EventCollection';

Events.subscribeSingleEvent('UUE2GmRHtbatVSKcXDX9zu');

console.log(Events.find().fetch());