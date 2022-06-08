import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from './TasksCollection';
 
Meteor.methods({
  'tasks.insert'(text,dsc, user, privcy) {
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
      privacy: privcy,
    })
  },

  'tasks.remove'(taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    TasksCollection.remove(taskId);
  },




  'tasks.Edit'(taskId,newTitle,newDcp,newStatus){
    check(newTitle, String);
    check(newDcp, String);
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error('Access denied.');
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


  'tasks.Privacy'(taskId,newPvc){

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    TasksCollection.update(taskId, {
      $set: {
        privacy: newPvc
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