import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';
import { generateID, isAOrganization_id, isAUser, isEvent_id, isReview_id } from '../base/BaseUtilities';
import { Review } from './ReviewCollection';

Meteor.methods({ 'Review.define': function (data) {
  check(data, Object);
  Review._schema.clean(data);
  console.log(data);

  // check if this user exists.
  if (!isAUser(data.reviewerID)) {
    throw new Meteor.Error('Review Create Failed,', `reviewerID ${data.reviewerID} does not exists.`);
  }

  // check if the review is for event/organization.
  if (!(isEvent_id(data.reviewFor.ID) || isAOrganization_id(data.reviewFor.ID))) {
    throw new Meteor.Error('Review Create Failed,', 'reviewFor either undefined or ID does not exists or .');
  }

  try {
    const id = data._id === undefined ? generateID() : data._id;
    return Review._collection.insert(
      { ...data,
        ...{ _id: id } },
    );
  } catch (error) {
    throw new Meteor.Error('Review.define failed,', 'Failed to insert new Review', error);
  }
},
});

Meteor.methods({ 'Review.remove': function (docID) {
  check(docID, String);

  if (!isReview_id(docID)) {
    throw new Meteor.Error('Review remove Failed,', `review ${docID} does not exists.`);
  }

  try {
    return Review._collection.remove(docID);
  } catch (error) {
    throw new Meteor.Error('Review.remove failed,', 'Failed to remove new Review', error);
  }
},
});

Meteor.methods({ 'Review.update': function (docID, updateData) {
  check(updateData, Object);
  check(docID, String);

  // only content and rating are allowed to be updated.
  const defaultRatingRange = Meteor.settings.defaultRatingRange;
  const schema = new SimpleSchema({
    content: { type: String, optional: true },
    rating: { type: Number, min: defaultRatingRange.min, max: defaultRatingRange.max, optional: true },
  });
  schema.validate(updateData);

  if (!isReview_id(docID)) {
    throw new Meteor.Error('Review remove Failed,', `review ${docID} does not exists.`);
  }

  try {
    return Review._collection.update(docID, { $set: updateData });
  } catch (error) {
    throw new Meteor.Error('Review.update failed,', 'Failed to update Review', error);
  }
},
});
