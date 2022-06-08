import React, { useState } from 'react';
import { TasksCollection } from '../api/TasksCollection';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextField from '@mui/material/TextField';
import { Box, Stack } from '@mui/material';
import Button from '@mui/material/Button';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';




export const TaskForm = ({ user }) => {
    const [text, setText] = useState("");
    const [dsc, setDsc] = useState("");
    const [tipo, setTipo] = useState(1);

    const handleSubmit = e => {
        e.preventDefault();

        if (!text) return;

        Meteor.call('tasks.insert', text,dsc, user,tipo);


        setText("");
        setDsc("");
    };

    return (
        <form onSubmit={handleSubmit} className="task-form" >
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginBottom: 2 }}>
                <Stack spacing={4} minWidth={800}  direction='column' display="flex" justifyContent="center" alignItems="center" marginTop={5}>
                    < TextField
                        label="Título da tarefa"
                        variant="outlined"
                        sx={{ bgcolor: "rgba(187, 182, 182, 0.200)" }}

                        className='in-tarefa'
                        type="text"
                        placeholder="Nova tarefa!"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    < TextField
                        label="Descrição da tarefa"
                        variant="outlined"
                        sx={{ bgcolor: "rgba(187, 182, 182, 0.200)" }}

                        className='in-tarefa'
                        type="text"
                        value={dsc}
                        onChange={(e) => setDsc(e.target.value)}
                    />
                                <FormControl >
              <InputLabel >Privacidade</InputLabel>
              <Select
                value={tipo}
                label="Privacidade"
                onChange={(e) => { setTipo( e.target.value) }}
              >
                <MenuItem value={1}>Privada</MenuItem>
                <MenuItem value={2}>Pública</MenuItem>
              </Select>
            </FormControl>
                       <Button  variant="contained" type="submit" size='large'  sx={{ bgcolor: 'none', boxShadow: 'none' }} endIcon={<AddBoxIcon sx={{ fontSize: 60, color: 'white' }} />}>Criar Tarefa</Button>
                </Stack>
            </Box>

        </form>
    );
};