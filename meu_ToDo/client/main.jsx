import * as React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { App } from '/imports/ui/App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RegisterForm } from '/imports/ui/RegisterForm';

Meteor.startup(() => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
          <Route path="/Reg" element={<RegisterForm/>}/>
      </Routes>
    </BrowserRouter>
  
   , document.getElementById('react-target'));
});
