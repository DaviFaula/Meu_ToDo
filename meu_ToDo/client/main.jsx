import * as React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { App } from '/imports/ui/App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RegisterForm } from '/imports/ui/RegisterForm';
import {GerirTarefas} from '/imports/ui/GerirTarefas';
import {Perfil} from'/imports/ui/Perfil';
import {Editar} from'/imports/ui/Editar';


Meteor.startup(() => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/Entrar" element={<App />}></Route>
        <Route path="/Reg" element={<RegisterForm />} />
        <Route path="/Gerir" element={<GerirTarefas />}></Route>
        <Route path="/Editar" element={<Editar />}></Route>
        <Route path="/Perfil" element={<Perfil />}></Route>
      </Routes>
    </BrowserRouter>

    , document.getElementById('react-target'));
});
