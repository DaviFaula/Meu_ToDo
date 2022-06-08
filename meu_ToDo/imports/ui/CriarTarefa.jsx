import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { TaskForm } from './TaskForm';
import { Stack } from '@mui/material';
import { Box } from '@mui/material';





export const CriarTarefa = () => {
    const user = useTracker(() => Meteor.user());

    return (



        <div className='main'>
            <div className='app'>
                <header>
                    <div className='app-bar'>
                        <div className='app-header'>
                            <h2>
                                Tarefas.com
                            </h2>
                        </div>
                        <h3>Criando Tarefa</h3>
                    </div>
                </header>
                <Fragment>
                    <nav className='user' >
                        <Link to='/Gerir'>
                            <IconButton size="small" color='info' sx={{ bgcolor: 'none', boxShadow: 'none' }}>
                                <HomeIcon sx={{ color: 'white' }} />
                            </IconButton>
                        </Link>
                    </nav>
                    <Box sx={{ overflow: 'auto', flexGrow: 1, bgcolor: 'antiquewhite', maxWidth: 0.85, minWidth: 0.45, marginLeft: 10, borderRadius: 5 }}>
                        <Box sx={{ overflow: 'auto', flexGrow: 1, bgcolor: 'white', maxWidth: 0.85, minWidth: 0.45, marginLeft: 10, borderRadius: 5, marginTop: 5}}>
                            <TaskForm user={user} />
                        </Box>
                    </Box>
                </Fragment>
            </div>

        </div>
    );
};