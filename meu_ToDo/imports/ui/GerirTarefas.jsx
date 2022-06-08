import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import { Task } from './Task';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { Box } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';



function toggleChecked({ _id, isChecked }) {
  Meteor.call('tasks.setIsChecked', _id, !isChecked);
}



export const GerirTarefas = () => {
  const user = useTracker(() => Meteor.user());
  const [hideCompleted, setHideCompleted] = useState(false);
  const hideCompletedFilter = { isChecked: { $ne: true } };
  const userFilter = user ? {  privacy: 2 } : {};
  const pendingOnlyFilter = { ...hideCompletedFilter };

  const verifyDelete = ({ userId, _id }) => { (user._id == userId) ? Meteor.call('tasks.remove', _id) : console.log('Usuário não autorizado') };



  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe('tasks');

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }


    const tasks = TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : {},
      { 
        sort: { createdAt: -1 },
      }
    ).fetch();
    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();

    return { tasks, pendingTasksCount };
  });
  const pendingTasksTitle = `${pendingTasksCount ? `(${pendingTasksCount})` : ''}`;
  // <TaskForm user={user} />
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
                <HomeIcon sx={{ color: 'white' }} />
              </IconButton>
            </Link>
          </nav>
          <Box sx={{ overflow: 'auto', flexGrow: 1, bgcolor: 'antiquewhite', maxWidth: 0.85, minWidth: 0.45, marginLeft: 10, marginBottom: 3, borderRadius: 5 }}>



            <Stack direction="row" spacing={2} display="flex" justifyContent="center" alignItems="center" marginBottom={2} marginTop={0}>
              <Button component={Link} to={'/CriarTarefa'} variant="contained" color='info' sx={{ margin: 1 }} endIcon={<AddBoxIcon />}>
                Criar nova tarefa
              </Button>
              <Button  variant="contained" onClick={() => setHideCompleted(!hideCompleted)} color='info' >
                {hideCompleted ? 'Mostrar tarefas ocultas ' : 'Ocultar selecionadas'}
              </Button>

              

            </Stack >
            <Stack marginBottom={3} sx={{ overflow: 'auto', }}>
              <ul className='tasks'>
                {tasks.map(task => (

                  <Task
                    key={task._id}
                    task={task}
                    onCheckboxClick={toggleChecked}
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