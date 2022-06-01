import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from './TasksCollection';
 
Meteor.methods({
  'tasks.insert'(text,dsc, user) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    TasksCollection.insert({
      text,
      createdAt: new Date,
      userId: this.userId,
      username: user.username,
      description: dsc,
      status: 1,
    })
  },

  'tasks.remove'(taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    TasksCollection.remove(taskId);
  },




  'tasks.Edit'(taskId,newTitle,newDcp,newStatus){
    check(newTitle, String);
    check(newDcp, String);
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    TasksCollection.update(taskId, {
      $set: {
        text: newTitle,
        description: newDcp, 
        status: newStatus,
      }
    });



  },

  'tasks.Status'(taskId,newStatus){

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    TasksCollection.update(taskId, {
      $set: {
        status: newStatus
      }
    });
  },



  'tasks.setIsChecked'(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);
 
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    TasksCollection.update(taskId, {
      $set: {
        isChecked
      }
    });
  }
});