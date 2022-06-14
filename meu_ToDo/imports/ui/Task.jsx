import React from 'react';




import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Stack } from '@mui/material';
import ListSharpIcon from '@mui/icons-material/ListSharp';
import EditIcon from '@mui/icons-material/Edit';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from "react-router-dom";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';




export const Task = ({ task, onCheckboxClick, onDeleteClick, onEditClick }) => {
  const user = useTracker(() => Meteor.user());
  function verifyUser(userId) {
    let ans;
    (user._id == userId) ? ans = false : ans = true;
    return ans;
  };

  function SaveStatus(id, s) {
    Meteor.call('tasks.Status', id, s);
  };

  return (


    <Box sx={{ flexGrow: 1 }} display="flex" justifyContent="center" alignItems="center" marginBottom={0.2}>

      <List sx={{ bgcolor: 'background.paper', flexGrow: 1, minWidth: '300px', maxWidth: '900px', borderRadius: 1.5, borderStyle: 'groove' }} >

        <ListItem >
          <ListSharpIcon />
          <Checkbox
            checked={!!task.isChecked}
            onClick={() => onCheckboxClick(task)}
            readOnly />
          <ListItemText primary={task.text} secondary={task.username} />
          <Stack direction="row" spacing={1}>

            <FormControl >
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                value={task.status}
                label="Status"
                onChange={(e) => { SaveStatus(id = task._id, s = e.target.value) }}
                disabled={verifyUser(task.userId)}
                size='small'
              >
                <MenuItem value={1}>Cadastrada</MenuItem>
                <MenuItem value={2}>Em andamento</MenuItem>
                <MenuItem disabled={(task.status == 1) ? (true) : (false)} value={3}>Concluída</MenuItem>
              </Select>
            </FormControl>

            <IconButton component={Link} to={`/Editar/${task._id}`} sx={{ bgcolor: 'rgba(178, 136, 127, 0.100)' }} color='info' disabled={(verifyUser(task.userId))} onClick={() => onEditClick(task)}><EditIcon /></IconButton>
            <IconButton sx={{ bgcolor: 'rgba(178, 136, 127, 0.100)' }} color='error' disabled={(verifyUser(task.userId))} onClick={() => onDeleteClick(task)}><DeleteIcon /></IconButton>
          </Stack>
        </ListItem>

      </List>

    </Box>

  );

}
