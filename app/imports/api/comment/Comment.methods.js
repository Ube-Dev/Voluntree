import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';
import { generateID, isAOrganization_id, isAUser, isComment_id, isEvent_id } from '../base/BaseUtilities';
import { Comment } from './CommentCollection';

Meteor.methods({ 'Comment.define': function (data) {
  check(data, Object);
  Comment._schema.clean(data);
  console.log(data);

  // check if this user exists.
  if (!isAUser(data.userID)) {
    throw new Meteor.Error('Comment Create Failed,', `userID ${data.userID} does not exists.`);
  }

  // check if the comment is for event/organization.
  if (!(isEvent_id(data.commentFor.ID) || isAOrganization_id(data.commentFor.ID))) {
    throw new Meteor.Error('Comment Create Failed,', 'commentFor either undefined or ID does not exists.');
  }

  // if this is a reply comment, validate with its parent comment
  if (data.parentID) {
    if (Comment._collection.findOne({ _id: data.parentID }) === undefined) {
      throw new Meteor.Error('Comment Create Failed,', 'Parent comment does not exists.');
    }
    const parentComment = Comment._collection.findOne({ _id: data.parentID }).commentFor;
    if (data.commentFor.type !== parentComment.type || data.commentFor.ID !== parentComment.ID) {
      throw new Meteor.Error('Comment Create Failed,', 'commentFor mismatch with its parent: both comments not referring to the same event/organization.');
    }
  }
  try {
    // insert new comment
    const id = data._id === undefined ? generateID() : data._id;
    return Comment._collection.insert(
      { ...data,
        ...{ _id: id } },
    );
  } catch (error) {
    throw new Meteor.Error('Comment.define failed,', 'Failed to insert new Comment', error);
  }
},
});

Meteor.methods({ 'Comment.remove': function (docID) {
  check(docID, String);

  if (!isComment_id(docID)) {
    throw new Meteor.Error('Comment remove Failed,', `comment ${docID} does not exists.`);
  }

  try {
    // const data = Comment._collection.findOne(docID);
    Comment._collection.remove(docID);
  } catch (error) {
    throw new Meteor.Error('Comment.remove failed,', 'Failed to remove new comment', error);
  }
},
});

Meteor.methods({ 'Comment.update': function (docID, updateData) {
  check(updateData, Object);
  check(docID, String);

  // only content are allowed to be updated.
  const schema = new SimpleSchema({
    content: { type: String, optional: true },
  });
  schema.validate(updateData);

  if (!isComment_id(docID)) {
    throw new Meteor.Error('Comment remove Failed,', `Comment ${docID} does not exists.`);
  }
  const oldData = Comment._collection.findOne(docID);
  try {
    Comment._collection.update(docID, { $set: updateData });
  } catch (error) {
    Comment._collection.update(docID, { $set: oldData });
    throw new Meteor.Error('Comment.update failed,', 'Failed to update Comment', error);
  }
},
});
