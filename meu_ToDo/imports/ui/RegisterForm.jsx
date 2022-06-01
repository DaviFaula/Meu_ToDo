import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';


export const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const registro = e => {

        e.preventDefault();

        //    if (!Accounts.findUserByUsername(username)) {

        Accounts.createUser({
            username: username,
            password: password,
            email: email,
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
                    </div>
                </header>
                <Box sx={{ overflow: 'auto', flexGrow: 1, bgcolor: 'rgba(100, 136, 110, 0.450)', maxWidth: 0.85, minWidth: 0.45, marginLeft: 10, marginBottom: 3, borderRadius: 5, marginTop: 2 }}>


                    <form onSubmit={registro} className="register-form">


                        <h3>
                            Crie sua conta!
                        </h3>

                        <div>

                            <label htmlFor="username">Nome de usuário</label>
                            <input
                                type="text"
                                placeholder='Nome de usuário'
                                name="username"
                                required
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" color='white'>Crie sua senha</label>

                            <input
                                type="password"
                                placeholder="Senha"
                                name="password"
                                required
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" color='white'>Coloque um email válido</label>

                            <input
                                type="email"
                                placeholder="Digite seu email"
                                name="email"
                                required
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='btns_acesso'>
                            <Stack direction="row" spacing={2}>

                                <Button className='btn-Registrar' type="submit" variant="contained" endIcon={<SendIcon />}>Registrar</Button>
                                <Link to="/" className='Link_rotas'>
                                    <Button className='btn-Logar' variant="contained">Tela de Login</Button>
                                </Link>
                            </Stack>
                        </div>
                    </form>
                </Box>
            </div>
        </div>


    );
}