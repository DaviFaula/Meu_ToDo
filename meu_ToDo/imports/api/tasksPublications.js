import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/TasksCollection';

Meteor.publish('tasks', function publishTasks() {
  return TasksCollection.find({ _id: this._id });
});