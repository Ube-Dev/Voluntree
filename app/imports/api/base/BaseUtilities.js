import { Meteor } from 'meteor/meteor';
import { MATPCollections } from '../matp/MATPCollections';
import { UserProfiles } from '../user/UserProfileCollection';
import { Organization } from '../organization/OrganizationCollection';
import { MainCategory } from '../category/MainCategoryCollection';
import { SubCategory } from '../category/SubCategoryCollection';
import { Events } from '../event/EventCollection';
import { Skills } from '../skill/SkillCollection';

export const removeAllEntities = () => {
  if (Meteor.isTest || Meteor.isAppTest) {
    MATPCollections.collections.forEach(collection => {
      collection._collection.remove({});
    });
  } else {
    throw new Meteor.Error('removeAllEntities not called in testing mode.');
  }
  return true;
};

export const generateID = () => {
  let credential = '';
  const maxPasswordLength = 30;
  const minPasswordLength = 6;
  const passwordLength = Math.floor(Math.random() * (maxPasswordLength - (minPasswordLength + 1))) + minPasswordLength;
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < passwordLength; i++) {
    credential += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return credential;
};

export const isAUser = (userID) => UserProfiles.findOne({ userID: userID }) != null;

export const isAUser_id = (_id) => UserProfiles.findOne({ _id: _id });

export const isAOrganization = (organizationID) => Organization.findOne({ organizationID: organizationID }) != null;

export const isAOrganization_id = (_id) => Organization.findOne({ _id: _id }) != null;

export const validMainCategory = (category) => MainCategory.findOne({ category: category }) != null;

export const validSubCategory = (category) => SubCategory.findOne({ category: category }) != null;

export const isEvent = (eventID) => Events.findOne({ eventID: eventID }) != null;

export const isEvent_id = (_id) => Events.findOne({ _id: _id }) != null;

export const isSkill = (skill) => Skills.findOne({ skill: skill }) != null;
