import { Meteor } from 'meteor/meteor';
import React, {useState} from 'react';
import { Accounts } from 'meteor/accounts-base';



export const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = e => {
        e.preventDefault();
        if (!Accounts.findUserByUsername(username)) {
            Accounts.createUser({
              username: username,
              password: password,
            });
          }
    };
    return (
        <form onSubmit={submit} className="register-form">
            

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
                <label htmlFor="password">Crie sua senha</label>

                <input
                    type="password"
                    placeholder="Senha"
                    name="password"
                    required
                    onChange={e => setPassword(e.target.value)}
                />
            </div>

            <div>
                <button className='bl2' type="submit">Registrar e logar</button>
            </div>
        </form>
     
  );  
}