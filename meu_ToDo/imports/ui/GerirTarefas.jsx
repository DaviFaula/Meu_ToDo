import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import { Task } from './Task';
import { TaskForm } from './TaskForm';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import { Button } from '@mui/material';


function toggleChecked({ _id, isChecked }) {
    TasksCollection.update(_id, {
      $set: {
        isChecked: !isChecked
      }
    });
  }
  
  const deleteTask = ({ _id }) => TasksCollection.remove(_id);


export const GerirTarefas = () => {
    const user = useTracker(() => Meteor.user());
    const [hideCompleted, setHideCompleted] = useState(false);
    const hideCompletedFilter = { isChecked: { $ne: true } };
    const userFilter = user ? { userId: user._id } : {};
    const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };
  
  
    const tasks = useTracker(() => {
      if (!user) {
        return [];
      }
  
      return TasksCollection.find(
        hideCompleted ? pendingOnlyFilter : userFilter,
        {
          sort: { createdAt: -1 },
        }
      ).fetch();
    });
  
    const pendingTasksCount = useTracker(() => {
      if (!user) {
        return 0;
      }
  
      return TasksCollection.find(pendingOnlyFilter).count();
    });
  
    const pendingTasksTitle = `${pendingTasksCount ? `(${pendingTasksCount})` : ''}`;

  
  
  
    // console.log(tasks);
  
    return (
  
      <div className='app'>
  
        <header>
          <div className='app-bar'>
            <div className='app-header'>
              <h2>
                Tarefas.com
                {pendingTasksTitle}
              </h2>
            </div>
            <h3>Gerir Tarefas</h3>
          </div>
        </header>
  
  
  
        <div className='main'>
            <Fragment>
              <nav className='user' >
                 <Link to='/'>
                   <IconButton size="small">
                      <HomeIcon/>
                   </IconButton>
                 </Link>
              </nav>
             
              <TaskForm user={user} />
              <div className='filter'>
                <button onClick={() => setHideCompleted(!hideCompleted)}>
                  {hideCompleted ? 'Mostrar tarefas ' : 'Ocultar completas'}
                </button>
              </div>
              <ul className='tasks'>
                {tasks.map(task => (
  
                  <Task
                    key={task._id}
                    task={task}
                    onCheckboxClick={toggleChecked}
                    onDeleteClick={deleteTask}
                  />
                ))}
              </ul>
            
            </Fragment>
        </div>
      </div>
    );
  };