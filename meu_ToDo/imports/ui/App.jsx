import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';
import { Link, Outlet } from 'react-router-dom';
import Button from '@mui/material/Button';
import AccountBox from '@mui/icons-material/AccountBox';
import Stack from '@mui/material/Stack';
import { Navigate } from "react-router-dom";








export const App = () => {
  const user = useTracker(() => Meteor.user());
  const logout = () => Meteor.logout();





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
            <div className='user' onClick={logout}>
              {user.username}|sair
            </div>
            <Stack className='opcoes' direction="row" spacing={2}>

              <Button className='btn_opcoes' variant="contained" endIcon={<AccountBox />}>
                Meu Perfil
              </Button>

              <Link to='/Gerir' className='Link_rotas'>
                <Button className='btn_opcoes' variant="contained">
                  Gerir Tarefas
                </Button>
              </Link>
            </Stack>
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