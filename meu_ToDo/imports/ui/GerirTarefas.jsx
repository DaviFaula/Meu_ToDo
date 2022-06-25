import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import { Task } from './Task';
import { Link } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';

import Button from '@mui/material/Button';
import { Stack, TextField } from '@mui/material';
import { Box } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { ReactiveVar } from 'meteor/reactive-var'

import Pagination from '@mui/material/Pagination';
import usePagination from '@mui/material/Pagination';
import { display } from '@mui/system';
import Search from '@mui/icons-material/Search';

this.checkComplete = new ReactiveVar(false);
this.upsearch = new ReactiveVar(false);
function toggleChecked({ _id, isChecked }) {
  Meteor.call('tasks.setIsChecked', _id, !isChecked);
}



export const GerirTarefas = () => {
  const user = useTracker(() => Meteor.user());
 

  const [search, setSearch] = useState('');
  const [searchText, setSearchText] = useState('');

  const [page, setPage] = useState(1);
  const PER_PAGE = 4;

  const TasksCount = TasksCollection.find().count();
  const count = Math.ceil(TasksCount / PER_PAGE);

  const hideCompletedFilter = { isChecked: { $ne: true } };
  const userFilter = user ? { privacy: 2 } : {};
  const pendingOnlyFilter = { ...hideCompletedFilter };

  const handleChange = (e, p) => {
    setPage(p);
  };








  const verifyDelete = ({ userId, _id }) => { (user._id == userId) ? Meteor.call('tasks.remove', _id) : console.log('Usuário não autorizado') };



  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe('tasks',searchText,this.upsearch.get());

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    //console.log(this.checkComplete.get())
    const tasks = TasksCollection.find(
      (this.checkComplete.get()) ? { status: { $ne: 3 } } : {},
      {
        skip:4*(page-1),
        limit:4
      }
    ).fetch();

    /*const tasks = TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : {},
      {
        sort: { createdAt: -1 },
         }
    ).fetch();*/
    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();



    return { tasks, pendingTasksCount };
  });

  const goSearch = () => {
    this.upsearch.set(true);
    setSearchText(search);
    const tasksFounded = TasksCollection.find({ text: search }).count();
    (tasksFounded == 0) ? console.log("NADA AQUI AMIGAO") : console.log(TasksCollection.find({ text: search }).fetch())

  };


  const pendingTasksTitle = `${pendingTasksCount ? `(${pendingTasksCount})` : ''}`;
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



            <Stack direction="row" spacing={4} display="flex" justifyContent="center" alignItems="center" marginBottom={2} marginTop={0}>
              <Button component={Link} to={'/CriarTarefa'} variant="contained" color='info' sx={{ margin: 1 }} endIcon={<AddBoxIcon />}>
                Criar nova tarefa
              </Button>
              {/*
                <Button variant="contained" onClick={() => setHideCompleted(!hideCompleted)} color='info' >
                  {hideCompleted ? 'Mostrar tarefas ocultas ' : 'Ocultar selecionadas'}
                </Button>
              */}

              <FormGroup>
                <FormControlLabel control={<Checkbox checked={!this.checkComplete.get()} />}
                  onChange={() => { this.checkComplete.set(!this.checkComplete.get()) }}
                  label="Concluidas"
                />

              </FormGroup>
              <Stack spacing={1} direction="row">
              <TextField
                label="Pesquisar"
                variant="outlined"
                sx={{ bgcolor: "rgba(187, 182, 182, 0.200)" }}
                size='small'
                type="text"
                disabled={isLoading}
                onChange={
                  (e) => {
                    this.upsearch.set(false);
                    setSearch(e.target.value);
                  }
                }
              />
              <IconButton size='small'  onClick={(e) => {goSearch()}}>
               <SearchIcon/>
              </IconButton>
              </Stack>

            </Stack >
            <Stack marginBottom={3} sx={{ overflow: 'auto', }}>
              <ul className='tasks'>
                {tasks.map(task => (

                  <Task
                    key={task._id}
                    task={task}
                    //onCheckboxClick={toggleChecked}

                    onDeleteClick={verifyDelete}
                  />
                ))
                }
              </ul>
            </Stack>
            <Pagination
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
              count={count}
              size="small"
              page={page}
              variant="outlined"
              shape="rounded"

              onChange={handleChange}
            />
          </Box>
        </Fragment>
      </div>
    </div>
  );
};