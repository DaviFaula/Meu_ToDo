import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '/imports/api/TasksCollection';
import '/imports/api/tasksMethods';
import '/imports/api/tasksPublications';
import '/imports/api/usersPublications';

const insertTask = (taskText, user) =>
  TasksCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });

const SEED_USERNAME = 'davifaula';
const SEED_PASSWORD = '12345678';
const SEED_EMAIL = 'teste@gmail.com';


Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
      email: SEED_EMAIL,
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
