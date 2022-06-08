
import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link, useParams } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { Stack } from '@mui/material';
import { TasksCollection } from '/imports/api/TasksCollection';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';







export const Perfil = () => {

    const user = useTracker(() => Meteor.user());

    const { userData, isLoading } = useTracker(() => {
        const noDataAvailable = { userData: [] };
        if (!Meteor.user()) {
            return { noDataAvailable, isLoading: true };
        }
        const handler = Meteor.subscribe('users', user._id);

        if (!handler.ready()) {
            return { ...noDataAvailable, isLoading: true };
        } else {
            const userData = Meteor.users.findOne(user._id);
            return { userData }
        }
    });

    console.log(userData)

    const [isEdit, SetisEdit] = useState(false);
    function colorBtn(estado) {
        let ans;
        (estado) ? ans = 'error' : ans = 'info';
        return ans;
    }

    const values = {
        someDate: "2022-01-01"
      };


    function setEmail(newEmail) {
        Meteor.users.update(user._id, {
            $set: {
                email: newEmail
            }
        });
    }

    function setJob(NewJob) {
        Meteor.users.update(user._id, {
            $set: {
                job: NewJob
            }
        });
    }
    onChange = (e) => {
        console.log('file to load', e.target.file[0])
        let file = e.target.file[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = this._handleReaderLoaded.bind(this)
            reader.readAsBinaryString(file)
        }

    }

    _handleReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result
        this.SetState({
            base64TextString: btoa(binaryString)
        })

    }

    onFileSubmit = (e) => {
        e.preventDefault()
        const preview = document.getElementById('profile-picture')
        console.log('bynary string', this.state.base64TextString)

        let payload = { image: this.state.base64TextString }
        fetch(`http://localhost:3000/Perfil`, {
            method: "PATCH",
            HEADERS: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)

        })

            .then(resp => resp.json())
            .then(json => console.log(json))
        preview.scroll = "data:image/png;base64," + this.state.base64TextString
    }


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
                        <h3>Meu Perfil</h3>
                    </div>
                </header>
                <Fragment>
                    <nav className='user' >
                        <Link to='/'>
                            <IconButton size="small" color='info' sx={{ bgcolor: 'none', boxShadow: 'none' }}>
                                <HomeIcon sx={{ color: 'white' }} />
                            </IconButton>
                        </Link>
                    </nav>
                    <Box sx={{
                        overflow: 'auto',
                        flexGrow: 1,
                        bgcolor: 'antiquewhite',
                        maxWidth: 0.85,
                        minWidth: 0.45,
                        marginLeft: 10,
                        marginBottom: 3,
                        marginTop: 1,
                        borderRadius: 5
                    }}>
                        <Stack direction="row" spacing={2} display="flex" justifyContent="center" alignItems="center" marginBottom={1} marginTop={1}>
                            <Button variant="contained" size='large' color={colorBtn(isEdit)} onClick={() => SetisEdit(!isEdit)}>
                                {isEdit ? 'Desabilitar Edição' : 'Habilitar Edição'}
                            </Button>


                        </Stack >
                        <Stack marginBottom={3} display="flex" sx={{ overflow: 'auto' }}>
                            <TextField value={isLoading ? 'Carregando...' : 'aa'} disabled={(true)} variant="filled" helperText={'Username'} sx={{ margin: 2, backgroundColor: "transparent" }} />
                            <TextField value={isLoading ? 'Carregando...' : 'aa'} onChange={(e) => { setEmail(e.target.value) }} disabled={(!isEdit)} variant="filled" helperText={'Email'} sx={{ margin: 2, backgroundColor: "transparent" }} />
                            <TextField value={isLoading ? 'Carregando...' : "vazio"} disabled={(!isEdit)} onChange={(e) => { setJob(e.target.value) }} variant="filled" helperText={'Empresa de trabalho'} sx={{ margin: 2, backgroundColor: "transparent" }} />
                            <Stack direction="row" spacing={2} marginLeft={2} display="flex">
                            </Stack>
                        </Stack>
                        <Stack direction="row" spacing={2} marginLeft={2} display="flex">
                            <FormControl >
                                <InputLabel >Sexo</InputLabel>
                                <Select
                                    value={1}
                                    label="Sexo"
                                    disabled={(!isEdit)}
                                // onChange={(e) => { setTipo(e.target.value) }}
                                >
                                    <MenuItem value={1}>Masculino</MenuItem>
                                    <MenuItem value={2}>Feminino</MenuItem>
                                    <MenuItem value={3}>Não declarar</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                name="dataDeNascimento"
                                label="Data de nascimento"
                                InputLabelProps={{ shrink: true, required: true }}
                                type="date"
                                defaultValue={values.someDate}
                                disabled = {(!isEdit)}
                            />

                            <form onSubmit={(e) => this.onFileSubmit(e)} onChange={(e) => this.onChange(e)}>
                                <input
                                    type="file"
                                    name="image"
                                    id="file"
                                    accept=".jpeg, .png, .jpg"
                                />
                                <input type="submit" />
                            </form>
                        </Stack>
                    </Box>
                </Fragment>
            </div>

        </div>
    );
};