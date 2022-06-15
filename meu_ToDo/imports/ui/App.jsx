import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';
import { Link, Outlet } from 'react-router-dom';
import Button from '@mui/material/Button';
import AccountBox from '@mui/icons-material/AccountBox';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { Box, CardHeader, ListItemButton } from '@mui/material';

import { TasksCollection } from '/imports/api/TasksCollection';


import { Drawer, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { HomeOutlined, InboxOutlined, ReceiptOutlined } from "@material-ui/icons";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from "@material-ui/core/CardActionArea";






const data = [
  { name: "Home", icon: <HomeOutlined />, goesTo: "/" },
  { name: "Meu Perfil", icon: <AccountBox />, goesTo: "/Perfil" },
  { name: "Minhas tarefas", icon: <InboxOutlined />, goesTo: "/Gerir" },

];

export const App = () => {

  const { tasks, TasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe('tasks');

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }


    const tasks = TasksCollection.find().fetch();
    const TasksCount = TasksCollection.find().count();

    return { tasks, TasksCount };
  });

  const user = useTracker(() => Meteor.user());
  const logout = () => Meteor.logout();

  const [open, setOpen] = useState(false);

  const getList = () => (
    <div style={{ width: 250 }} onClick={() => setOpen(false)}>
      <ListItem>
        <Avatar alt="Remy Sharp" src={user['profile']['profilePicture']} />
        <ListItemText primary={user.username} secondary={user['profile']['email']} />
      </ListItem>
      {data.map((item, index) => (

        <ListItem button component={Link} to={item['goesTo']} key={index}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>

      ))}
    </div>
  );



  const completeTasksCount = TasksCollection.find({ status: 3 }).count();
  const goingTasksCount = TasksCollection.find({ status: 2 }).count();
  const notBeginTasksCount = TasksCollection.find({ status: 1 }).count();
  const notCompleteTasksCount = goingTasksCount + notBeginTasksCount;

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
                <Button className='btn_opcoes' variant="contained" onClick={() => setOpen(true)} endIcon={<ReceiptOutlined />}>Menu</Button>
                <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}>
                  {getList()}
                </Drawer>
                <Card className='card_opcoes' style={{ backgroundColor: "rgba(5, 142, 49, 1)" }}>
                  <CardContent>
                    <Typography display="flex" justifyContent="center" sx={{ fontSize: 17 }} fontWeight='bold' color="white" variant='h6' gutterBottom>
                      Tarefas concluídas
                    </Typography>
                    <Typography display="flex" justifyContent="center" alignItems="center" sx={{ fontSize: 25 }} fontWeight='bold' color="white" variant='button' gutterBottom>
                      {(completeTasksCount <= 9) ? "0" + completeTasksCount : completeTasksCount}
                    </Typography>
                  </CardContent>
                  <CardActions >
                  </CardActions>
                </Card>

              </Stack>
              <Stack className='opcoes' direction="column" spacing={2}>
                <Card className='card_opcoes' style={{ backgroundColor: "rgba(205, 195, 5, 1)" }}>
                  <CardContent>
                    <Typography display="flex" justifyContent="center" sx={{ fontSize: 17 }} fontWeight='bold' color="white" variant='h6' gutterBottom>
                      Tarefas registradas
                    </Typography>
                    <Typography display="flex" justifyContent="center" alignItems="center" sx={{ fontSize: 25 }} fontWeight='bold' color="white" variant='caption' gutterBottom>
                      {(TasksCount <= 9) ? "0" + TasksCount : TasksCount}
                    </Typography>
                  </CardContent>
                  <CardActions  >
                    <Link to="/Gerir" className='Link_rotas'>
                    <Typography sx={{ fontSize: 14 }} ml='7em'  color="white" variant='body1' gutterBottom>
                      {'   > Ir para tarefas'}
                      </Typography>
                    </Link>
                  </CardActions>
                </Card>

                <Card className='card_opcoes' style={{ backgroundColor: "rgba(148, 5, 49, 1)" }}>

                    <CardContent>
                      <Typography display="flex" justifyContent="center" sx={{ fontSize: 17 }} fontWeight='bold' color="white" variant='h6' gutterBottom>
                        Tarefas Pendentes
                      </Typography>
                      <Typography display="flex" justifyContent="center" alignItems="center" sx={{ fontSize: 25 }} fontWeight='bold' color="white" variant='caption' gutterBottom>
                        {(notCompleteTasksCount <= 9) ? "0" + notCompleteTasksCount : notCompleteTasksCount}
                      </Typography>
                    </CardContent>
                  
                </Card>
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