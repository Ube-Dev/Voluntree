import { Roles } from 'meteor/alanning:roles';
import _ from 'lodash';
import { Meteor } from 'meteor/meteor';

export const ROLE = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

export const userPrivileges = {
  hasOrganization: 'hasOrganization',
};

export const adminPrivileges = {

};

export const ROLES = _.values(ROLE);

export const isRole = (role) => (typeof role) === 'string' && (_.values(ROLE)).includes(role);

export const assertRole = (role) => {
  const roleArray = (Array.isArray(role)) ? role : [role];
  roleArray.forEach((theRole) => {
    if (!isRole(theRole)) {
      throw new Meteor.Error(`${role} is not defined, or includes at least one undefined role.`);
    }
  });
};

if (Meteor.isServer) {
  const allDefinedRoles = Roles.getAllRoles().fetch();
  const definedRoleNames = allDefinedRoles.map((role) => role.name);
  const allRoles = { ...ROLE, ...userPrivileges, ...adminPrivileges };
  // define all roles.
  _.values(allRoles).forEach((role) => {
    if (!(definedRoleNames.includes(role))) {
      Roles.createRole(role, { unlessExists: true });
    }
  });
  // define user privileges.
  Object.values(userPrivileges).forEach((childRole) => {
    Roles.addRolesToParent(childRole, ROLE.USER);
  });
  // define admin privileges.
  Object.values(adminPrivileges).forEach((childRole) => {
    Roles.addRolesToParent(childRole, ROLE.ADMIN);
  });


}
