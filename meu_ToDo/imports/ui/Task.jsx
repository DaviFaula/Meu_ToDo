import React from 'react';




import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';


export const Task = ({ task, onCheckboxClick, onDeleteClick }) => {


  return (


    <Box sx={{ flexGrow: 1}} display ="flex" justifyContent="center" alignItems="center" marginBottom={0.2}>

      <List  sx={{ bgcolor: 'background.paper',flexGrow: 1, minWidth:'300px', maxWidth:'900px', borderRadius:1.5, borderStyle:'groove'}} >
        
        <ListItem>
        <Checkbox
        checked = {!!task.isChecked}
        onClick = {()=> onCheckboxClick(task)}
        readOnly/>
          <ListItemText primary={task.text} secondary={task.username} />
          <IconButton sx={{bgcolor: 'black'}} color='error'  onClick={()=> onDeleteClick(task)}><DeleteIcon/></IconButton>
        </ListItem>

      </List>

    </Box>

  );

}
//"&times;" Faz ostrar o simbolo "x"