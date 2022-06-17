import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Fingerprint from '@mui/icons-material/Fingerprint';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';


export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = e => {
    e.preventDefault();
    Meteor.loginWithPassword(username, password);
  };
  return (

    <div className='app'>
      <header>
        <div className='app-bar'>
          <div className='app-header'>
            <h1>
              Tarefas.com
            </h1>
          </div>
        </div>
      </header>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ overflow: 'auto', flexGrow: 1, bgcolor: 'rgba(100, 136, 110, 0.450)', maxWidth: 0.85, minWidth: 0.45, marginLeft: 10, marginBottom: 3, borderRadius: 5, marginTop: 2 }}>

        <form onSubmit={submit} className="register-form">

          <h2>
            Olá :)
          </h2>
          <h3>
            Faça login para gerenciar suas tarefas
          </h3>

          <Stack>

            <label >Nome de usuário</label>
            <TextField
              type="text"
              placeholder='Nome de usuário'
              name="username"
              required
              onChange={e => setUsername(e.target.value)}
            />
          </Stack>
          <br></br>
          <Stack>
            <label>Senha</label>

            <TextField
              type="password"
              placeholder="Senha"
              name="password"
              required
              onChange={e => setPassword(e.target.value)}
            />
            <br></br>
          </Stack>


          <Stack direction="row" spacing={2}>

            <Button className='Registro' variant="contained" type="submit" endIcon={<Fingerprint />}>Entrar</Button>
            {
              <Link to="/Reg" className='Link_rotas'>
                <Button className='Registro' variant="contained" >Criar conta</Button>
              </Link>
            }
          </Stack>

        </form>
      </Box>
    </div>

  );
}