import React from 'react';




import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';

export const Task = ({ task, onCheckboxClick, onDeleteClick }) => {


  return (

    
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>

      <List >
       
          <ListItem>
            <ListItemText  primary={task.text} secondary={task.username}/>
          </ListItem>
        
      </List>

    </Box>

  );

}
//"&times;" Faz ostrar o simbolo "x"