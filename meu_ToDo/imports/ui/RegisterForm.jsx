import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';


export const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const registro = e => {

        e.preventDefault();

        //    if (!Accounts.findUserByUsername(username)) {
        setProfile = {
            job: 'none',
            birthDate: '2022-01-01',
            sexo: 3,
            email: 'none',
            profilePicture: 'none',

        }




        Accounts.createUser({
            username: username,
            password: password,
            profile: setProfile,

        });


        //  }

    };
    return (

        <div className='app'>
            <div className='main'>
                <header>
                    <div className='app-bar'>
                        <div className='app-header'>
                            <h1>
                                Tarefas.com
                            </h1>
                           
                        </div>
                        <br></br>
                    </div>
                </header>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ overflow: 'auto', flexGrow: 1, bgcolor: 'rgba(100, 136, 110, 0.450)', maxWidth: 0.85, minWidth: 0.45, marginLeft: 10, marginBottom: 3, borderRadius: 5, marginTop: 2 }}>

                    <form onSubmit={registro} className='register-form' >
                        <h3 >
                            Crie sua conta!
                        </h3>
                        <br></br>
                        <Stack>
                            <label color='white'>Nome de usuário</label>
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
                            <label > Crie sua senha</label>

                            <TextField
                                type="password"
                                placeholder="Senha"
                                name="password"
                                required
                                onChange={e => setPassword(e.target.value)}
                            />
                            <br></br>
                        </Stack>

                        
                        <Stack direction="row" spacing={1}>
                            <Button className='btn-Registrar' type="submit" variant="contained" endIcon={<SendIcon />}>Registrar</Button>
                            <Link to="/" className='Link_rotas'>
                                <Button className='btn-Logar' variant="contained">Login</Button>
                            </Link>
                        </Stack>

                    </form>
                </Box>
            </div>
        </div>


    );
}