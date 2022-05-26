import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link, useParams } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { Stack } from '@mui/material';
import { TasksCollection } from '/imports/api/TasksCollection';
import TextField from '@mui/material/TextField';






export const Editar = () => {
    const {id} = useParams();
    const {task} = useTracker(() => {
       const noData={task:{}};
       if(!Meteor.user()){
           return noData;
           
       } 
       Meteor.subscribe('tasks')
        const task = TasksCollection.findOne({_id:id}); 

        return {task}

    });
    console.log(task._id)

    const [isEdit, SetisEdit] = useState(false);
    function colorBtn(estado) {
        let ans;
        (estado) ? ans = 'error' : ans = 'info';
        return ans;
    }



    


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
                        <h3>Editar tarefa</h3>
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
                    <Box sx={{
                        overflow: 'auto',
                        flexGrow: 1,
                        bgcolor: 'antiquewhite',
                        maxWidth: 0.85,
                        minWidth: 0.45,
                        marginLeft: 10,
                        marginBottom: 3,
                        marginTop: 1,
                        borderRadius: 5
                    }}>
                        <Stack display="flex" justifyContent="center" alignItems="center" marginBottom={1} marginTop={1}>
                            <Button variant="contained" size='large' color={colorBtn(isEdit)} onClick={() => SetisEdit(!isEdit)}>
                                {isEdit ? 'Salvar alterações' : 'Habilitar Edição'}
                            </Button>
                        </Stack >
                        <Stack marginBottom={3} sx={{ overflow: 'auto' }}>
                            <TextField  defaultValue={task.text}/>
                        </Stack>
                    </Box>
                </Fragment>
            </div>

        </div>
    );
};