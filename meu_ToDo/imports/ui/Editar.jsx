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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { getThemeProps } from '@mui/system';







export const Editar = () => {
    const { id } = useParams();

    const { task, isLoading } = useTracker(() => {
        const noDataAvailable = { task: [] };
        if (!Meteor.user()) {
            return { noDataAvailable, isLoading: true };
        }
        const handler = Meteor.subscribe('tasks');

        if (!handler.ready()) {
            return { ...noDataAvailable, isLoading: true };
        } else {

            const task = TasksCollection.find(id).fetch();
            return { task }
        }
    });


    console.log(task)



    

   

    function SaveChange(t,d){
        Meteor.call('tasks.Edit',id,t,d);
    };

    function SaveStatus(s){
        Meteor.call('tasks.Status',id,s);
    };




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
                        <Stack  direction="row" spacing={2} display="flex" justifyContent="center" alignItems="center" marginBottom={1} marginTop={1}>
                            <Button variant="contained" size='large' color={colorBtn(isEdit)} onClick={() => SetisEdit(!isEdit)}>
                                {isEdit ? 'Desabilitar Edição' : 'Habilitar Edição'}
                            </Button>

                            
                        </Stack >
                        <Stack marginBottom={3} display="flex" sx={{ overflow: 'auto' }}>
                            <TextField value={isLoading ? 'Carregando...' : task[0]['text']}  onChange={((e)=>{SaveChange(t=e.target.value, d=task[0]['description'], s= task[0]['status'])})} variant="filled" disabled={(!isEdit)} helperText={'Título da tarefa'} sx={{ margin: 2, backgroundColor: "transparent" }} />
                            <TextField value={isLoading ? 'Carregando...' : task[0]['description']} onChange={(e)=>{SaveChange( t=task[0]['text'], d=e.target.value, s= task[0]['status'])}} variant="filled" disabled={(!isEdit)} helperText={'Descrição da tarefa'} sx={{ margin: 2, backgroundColor: "transparent" }} />
                            <Stack  direction="row" spacing={2} marginLeft={2} display="flex">
                                <TextField value={isLoading ? 'Carregando...' : task[0]['createdAt']} variant="filled" disabled={(true)} helperText={'Data de criação'} sx={{ backgroundColor: "transparent" }} />
                                <TextField value={isLoading ? 'Carregando...' : task[0]['username']} variant="filled" disabled={(true)} helperText={'Criada por'} sx={{ backgroundColor: "transparent" }} />
                                <FormControl >
                                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                    <Select 
                                        value={isLoading ? 'Carregando...' : task[0]['status']}
                                        label="Status"
                                        onChange={(e)=>{isLoading ? {} :SaveStatus(s=e.target.value)}}
                                        disabled={(!isEdit)}
                                    >
                                        <MenuItem value={1}>Cadastrada</MenuItem>
                                        <MenuItem value={2}>Em andamento</MenuItem>
                                        <MenuItem value={3}>Concluída</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Stack>
                    </Box>
                </Fragment>
            </div>

        </div>
    );

};