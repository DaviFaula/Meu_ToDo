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
import { Link, useParams } from "react-router-dom";



export const Task = ({ task, onCheckboxClick, onDeleteClick, onEditClick }) => {
  const user = useTracker(() => Meteor.user());
  function verifyUser(userId){
     let ans;
    (user._id==userId)?ans=false:ans=true;
    return ans;};


  return (


    <Box  sx={{ flexGrow: 1}} display ="flex" justifyContent="center" alignItems="center" marginBottom={0.2}>

      <List   sx={{ bgcolor: 'background.paper',flexGrow: 1, minWidth:'300px', maxWidth:'900px', borderRadius:1.5, borderStyle:'groove'}} >
        
        <ListItem >
        <ListSharpIcon/>
        <Checkbox
        checked = {!!task.isChecked}
        onClick = {()=> onCheckboxClick(task)}
        readOnly/>
          <ListItemText primary={task.text} secondary={task.username} />
          <Stack direction="row" spacing={1}>
        
          <IconButton  component={Link} to={`/Editar/${task._id}` }  sx={{bgcolor: 'rgba(178, 136, 127, 0.100)'}} color='info'  disabled={(verifyUser(task.userId))} onClick={()=> onEditClick(task)}><EditIcon/></IconButton>
          
          <IconButton sx={{bgcolor: 'rgba(178, 136, 127, 0.100)'}} color='error'  disabled={(verifyUser(task.userId))} onClick={()=> onDeleteClick(task)}><DeleteIcon/></IconButton>
          </Stack>
        </ListItem>

      </List>

    </Box>

  );

}
//"&times;" Faz ostrar o simbolo "x"