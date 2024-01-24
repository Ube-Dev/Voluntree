import { Meteor } from 'meteor/meteor';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { UserSkills } from '../../api/skill/UserSkillCollection';
import { Events } from '../../api/event/EventCollection';
import { RequiredSkills } from '../../api/skill/RequiredSkillCollection';
import { Skills } from '../../api/skill/SkillCollection';

const updateUserProfileMethod = 'userProfiles.update';

/**
 * The server-side Profiles.update Meteor Method is called by the client-side Home page after pushing the update button.
 * Its purpose is to update the User, and UserSkill collections to reflect the
 * updated situation specified by the user.
 */
Meteor.methods({
  'userProfiles.update'({ profileId, email, firstName, lastName, skills }) {
    UserProfiles.update(profileId, { firstName, lastName });
    if (skills) {
      skills.map(skill => UserSkills.define({ skills: skill, user: email }));
      skills.map(skill => Skills.define({ skills: skill }));
    }
  },
});

const addEventMethod = 'Events.add';

Meteor.methods({
  'Events.add'({ title, image, description, location, time, frequency, accessibilities, requirements, impact, eventPlanner, requiredSkills }) {
    Events.define({ title: title, image: image, description: description, location: location, time: time, frequency: frequency, accessibilities: accessibilities, requirements: requirements, impact: impact, eventPlanner: eventPlanner });
    if (requiredSkills) {
      requiredSkills.map(skill => RequiredSkills.define({ requiredSkills: skill, event: title }));
      requiredSkills.map(skill => Skills.define({ skills: skill }));
    }
  },
});
const updateEventMethod = 'Events.update';

Meteor.methods({
  'Events.update'({ eventId, title, image, description, location, time, frequency, accessibilities, requirements, impact, eventPlanner, skills }) {
    Events.update(eventId, { title, image, description, location, time, frequency, accessibilities, requirements, impact, eventPlanner });
    skills.map(skill => RequiredSkills.define(skill, title));
  },
});

export { updateUserProfileMethod, updateEventMethod, addEventMethod };
