import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '/imports/api/TasksCollection';

const insertTask = (taskText, user) =>
  TasksCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });

const SEED_USERNAME = 'davifaula';
const SEED_PASSWORD = '12345678';


Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

   const user = Accounts.findUserByUsername(SEED_USERNAME);
  if(TasksCollection.find().count()=== 0){
    [
      'Olha que legal',
      'Esse site de tarefas',
      'Coloque suas tarefas'
    ].forEach(taskText => insertTask(taskText, user));
  }

});
