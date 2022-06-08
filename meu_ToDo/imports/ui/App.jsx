import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';
import { Link, Outlet } from 'react-router-dom';
import Button from '@mui/material/Button';
import AccountBox from '@mui/icons-material/AccountBox';
import Stack from '@mui/material/Stack';
import { Box, ListItemButton } from '@mui/material';

import { Drawer, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { HomeOutlined, InboxOutlined, ReceiptOutlined } from "@material-ui/icons";



const data = [
  { name: "Home", icon: <HomeOutlined />,goesTo:"/" },
  { name: "Meu Perfil", icon: <AccountBox />, goesTo:"/Perfil" },
  { name: "Minhas tarefas", icon: <InboxOutlined />, goesTo:"/Gerir"  },

];

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const logout = () => Meteor.logout();

  const [open, setOpen] = useState(false);

  const getList = () => (
    <div style={{ width: 250 }} onClick={() => setOpen(false)}>
      {data.map((item, index) => (
        
        <ListItem button component={Link} to= {item['goesTo']} key={index}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>
        
      ))}
    </div>
  );





  // console.log(tasks);

  return (



    <div className='main'>
      {user ? (

        <div className='app'>
          <header>
            <div className='app-bar'>
              <div className='app-header'>
                <h2>
                  Tarefas.com
                </h2>
              </div>
              <h3>Painel inicial</h3>
            </div>
          </header>
          <Fragment>
            <div className='user' onClick={logout} >
              <h3 className='user'>{user.username}|sair</h3>
            </div>
            <Box className='opcoes'>
              <Stack className='opcoes' direction="column" spacing={2} >
                <Button className='btn_opcoes' variant="contained" onClick={() => setOpen(true)} endIcon={<ReceiptOutlined/>}>Menu</Button>
                <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}>
                  {getList()}
                </Drawer>
                <Button className='btn_opcoes' variant="contained" endIcon={<ReceiptOutlined/>}>AÇÃO 2</Button>
              
              </Stack>
              <Stack className='opcoes' direction="column" spacing={2}>
                <Button className='btn_opcoes' variant="contained" endIcon={<ReceiptOutlined/>}>AÇÃO 3</Button>
                <Button className='btn_opcoes' variant="contained" endIcon={<ReceiptOutlined/>}>AÇÃO 4</Button>
              </Stack>
            </Box>
            <Outlet />
          </Fragment>
        </div>

      ) : (

        <Fragment>


          <LoginForm />


        </Fragment>
      )}
    </div>
  );
};