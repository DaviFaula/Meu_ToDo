import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/TasksCollection';

Meteor.publish('tasks', function publishTasks() {
 

  return TasksCollection.find({       
    $or: [
    { privacy: 2 },
    { userId: this.userId },
  ],
});
});

/// condição para MOSTRAR taferas: (se for pública )OU(for privada E o usuário que criou está logado)
/// condição para NÃO mostrar tarefas: (se for privda e o usuário logado não for o que a criou)

/*

  if((privacy==1 &&  userId != this.userId )){
    throw new Meteor.Error('Private task.');
  }

*/