import { Meteor } from 'meteor/meteor';
import React, {useState} from 'react';


export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = e => {
        e.preventDefault();
        Meteor.loginWithPassword(username, password);
    };
    return (
        <form onSubmit={submit} className="login-form">
            
            <h2>
                Olá :)
            </h2>
            <h3> 
                Faça login para gerenciar suas tarefas
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
                <label htmlFor="password">Senha</label>

                <input
                    type="password"
                    placeholder="Senha"
                    name="password"
                    required
                    onChange={e => setPassword(e.target.value)}
                />
            </div>

            <div>
                <button className='bl1' type="submit">Entrar</button>
            </div>
        </form>
     
  );  
}