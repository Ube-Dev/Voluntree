import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';
import { generateID, isAOrganization_id, isAUser, isEvent_id, isReview_id } from '../base/BaseUtilities';
import { Review } from './ReviewCollection';
import { Events } from '../event/EventCollection';
import { Organization } from '../organization/OrganizationCollection';

const defaultReviewForType = Meteor.settings.defaultReviewForType;

function updateAverageRating(docID, type, newRating, reviewCount, operation, oldRating = 0) {
  let currentTotalRating;
  let updatedAverageRating;

  // Retrieve current averageRating
  if (type === defaultReviewForType.event) {
    currentTotalRating = Events._collection.findOne(docID)?.averageRating;
  } else if (type === defaultReviewForType.organization) {
    currentTotalRating = Organization._collection.findOne(docID)?.averageRating;
  }

  // throw error if averageRating does not exists while a review exists
  if ((reviewCount > 1) && (currentTotalRating === undefined)) {
    console.error('Inconsistent data: Review count is non-zero, but averageRating is undefined.');
  }

  // If no reviews exist, set averageRating to newRating
  if (currentTotalRating === undefined) {
    updatedAverageRating = reviewCount === 1 ? newRating : 0;
  } else {

    let updatedTotalRating;
    // Calculate the updated total rating by adding/subtracting the new review's rating
    if (operation === 'define') {
      currentTotalRating *= (reviewCount - 1);
      updatedTotalRating = currentTotalRating + newRating;
      updatedAverageRating = updatedTotalRating / (reviewCount);
    } else if (operation === 'remove') {
      currentTotalRating *= (reviewCount + 1);
      updatedTotalRating = currentTotalRating - newRating;
      updatedAverageRating = updatedTotalRating / (reviewCount);
    } else if (operation === 'update') {
      currentTotalRating *= (reviewCount);
      updatedTotalRating = currentTotalRating + newRating - oldRating;
      updatedAverageRating = updatedTotalRating / (reviewCount);
    }
    // console.log('updatedt', updatedTotalRating);
  }
  // console.log('currentv', currentTotalRating);
  // console.log('updatedv', updatedAverageRating);
  // Update the average rating in the corresponding collection
  if (type === defaultReviewForType.event) {
    Events._collection.update(docID, { $set: { averageRating: updatedAverageRating } });
  } else if (type === defaultReviewForType.organization) {
    Organization._collection.update(docID, { $set: { averageRating: updatedAverageRating } });
  }
  console.log(`averageRating: ${updatedAverageRating}`);
  return updatedAverageRating;
}

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
    // insert new review
    const id = data._id === undefined ? generateID() : data._id;
    const result = Review._collection.insert(
      { ...data,
        ...{ _id: id } },
    );
    const reviewCount = Review._collection.find({ reviewFor: data.reviewFor }).count();
    // console.log('count', reviewCount);
    updateAverageRating(data.reviewFor.ID, data.reviewFor.type, data.rating, reviewCount, 'define');
    return result;
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
    const data = Review._collection.findOne(docID);
    const result = Review._collection.remove(docID);
    const reviewCount = Review._collection.find({ reviewFor: data.reviewFor }).count();
    updateAverageRating(data.reviewFor.ID, data.reviewFor.type, data.rating, reviewCount, 'remove');
    return result;
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
  let oldData;
  try {
    oldData = Review._collection.findOne(docID);
    const result = Review._collection.update(docID, { $set: updateData });
    if (updateData.rating) {
      const reviewCount = Review._collection.find({ reviewFor: oldData.reviewFor }).count();
      updateAverageRating(oldData.reviewFor.ID, oldData.reviewFor.type, updateData.rating, reviewCount, 'update', oldData.rating);
    }
    return result;
  } catch (error) {
    Review._collection.update(docID, { $set: oldData });
    throw new Meteor.Error('Review.update failed,', 'Failed to update Review', error);
  }
},
});
