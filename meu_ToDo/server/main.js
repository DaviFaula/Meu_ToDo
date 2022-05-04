import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/TasksCollection';

const insertTask = taskText => TasksCollection.insert({text: taskText});



Meteor.startup(() => {
  if(TasksCollection.find().count()=== 0){
    [
      'Olha que legal',
      'Esse site de tarefas',
      'Coloque suas tarefas'
    ].forEach(insertTask)
  }

});
