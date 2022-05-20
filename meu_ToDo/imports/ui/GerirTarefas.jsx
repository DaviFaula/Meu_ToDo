import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import { Task } from './Task';
import { TaskForm } from './TaskForm';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { Box } from '@mui/material';



function toggleChecked({ _id, isChecked }) {
  TasksCollection.update(_id, {
    $set: {
      isChecked: !isChecked
    }
  });
}

function deleteTask(_id){TasksCollection.remove(_id)};


export const GerirTarefas = () => {
  const user = useTracker(() => Meteor.user());
  const [hideCompleted, setHideCompleted] = useState(false);
  const hideCompletedFilter = { isChecked: { $ne: true } };
  const userFilter = user ? { userId: user._id } : {};
  const pendingOnlyFilter = { ...hideCompletedFilter};

  const verifyDelete =({userId,_id})=>{(user._id==userId)?deleteTask(_id):console.log('Usuário não autorizado')};
 
  const tasks = useTracker(() => {
    if (!user) {
      return [];
    }

    return TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : {},
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
      <div className='main'>
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




        <Fragment>
          <nav className='user' >
            <Link to='/'>
              <IconButton size="small" color='info' sx={{ bgcolor: 'none', boxShadow: 'none' }}>
                <HomeIcon sx={{color:'white'}} />
              </IconButton>
            </Link>
          </nav>
          <Box sx={{overflow: 'auto', flexGrow: 1, bgcolor: 'antiquewhite',  maxWidth: 0.85, minWidth:0.45, marginLeft: 10, marginBottom:3, borderRadius: 5}}>
            <TaskForm user={user} />
            <Stack display="flex" justifyContent="center" alignItems="center" marginBottom={2} marginTop={0}>
              <Button onClick={() => setHideCompleted(!hideCompleted)} variant="contained" color='info' >
                {hideCompleted ? 'Mostrar tarefas ' : 'Ocultar completas'}
              </Button>
            </Stack >
            <Stack marginBottom={3} sx={{overflow: 'auto',}}>
            <ul className='tasks'>
              {tasks.map(task => (

                <Task
                  key={task._id}
                  task={task}
                  onCheckboxClick={toggleChecked}
                  //onEditClick={}
                  onDeleteClick={verifyDelete}
                />
              ))}
            </ul>
            </Stack>
          </Box>
        </Fragment>
      </div>
    </div>
  );
};