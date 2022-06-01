import * as React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { App } from '/imports/ui/App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RegisterForm } from '/imports/ui/RegisterForm';
import {GerirTarefas} from '/imports/ui/GerirTarefas';
import {Perfil} from'/imports/ui/Perfil';
import {Editar} from'/imports/ui/Editar';
import {CriarTarefa} from'/imports/ui/CriarTarefa';

Meteor.startup(() => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/Entrar" element={<App />}></Route>
        <Route path="/Reg" element={<RegisterForm />} />
        <Route path="/Gerir" element={<GerirTarefas />}></Route>
        <Route path="/Editar/:id" exact element={<Editar />}></Route>
        <Route path="/Perfil" element={<Perfil />}></Route>
        <Route path="/CriarTarefa" element={<CriarTarefa />}></Route>
      </Routes>
    </BrowserRouter>

    , document.getElementById('react-target'));
});
