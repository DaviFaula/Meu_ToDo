import React, { useState } from 'react';
import { TasksCollection } from '../api/TasksCollection';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';




export const TaskForm = ({ user }) => {
    const [text, setText] = useState("");

    const handleSubmit = e => {
        e.preventDefault();

        if (!text) return;

        TasksCollection.insert({
            text: text.trim(),
            createdAt: new Date(),
            userId: user._id,
            username: user.username
        });
        setText("");
    };

    return (
        <form  onSubmit={handleSubmit} className="task-form" >
            <Box display="flex" justifyContent="center" alignItems="center" sx={{marginBottom: 2}}>
                < TextField  
                    label="Nova tarefa" 
                    variant="outlined" 
                    sx={{ bgcolor:"rgba(187, 182, 182, 0.100)"}}

                    className='in-tarefa'
                    type="text"
                    placeholder="Digite sua nova tarefa!"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <IconButton  type="submit"  size='small'  sx={{bgcolor: 'none',  boxShadow: 'none'}}><AddBoxIcon sx={{fontSize: 70, color: 'black'}}/></IconButton>
            </Box>
            
        </form>
    );
};