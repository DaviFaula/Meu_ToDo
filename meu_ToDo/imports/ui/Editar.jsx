import React, {  Fragment } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';



export const Editar = () => {

    return (



        <div className='main'>
            <div className='app'>
                <header>
                    <div className='app-bar'>
                        <div className='app-header'>
                            <h2>
                                Tarefas.com
                            </h2>
                        </div>
                        <h3>Editar tarefa</h3>
                    </div>
                </header>
                <Fragment>
                    <nav className='user' >
                        <Link to='/Gerir'>
                            <IconButton size="small" color='info' sx={{ bgcolor: 'none', boxShadow: 'none' }}>
                                <HomeIcon sx={{ color: 'white' }} />
                            </IconButton>
                        </Link>
                    </nav>
                </Fragment>
            </div>

        </div>
    );
};