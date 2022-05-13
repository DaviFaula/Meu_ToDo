import React, { useState } from 'react';
import { TasksCollection } from '../api/TasksCollection';


export const TaskForm = ({ user }) => {
    const [text, setText] = useState("");

    const handleSubmit = e => {
        e.preventDefault();

        if (!text) return;

        TasksCollection.insert({
            text: text.trim(),
            createdAt: new Date(),
            userId: user._id
        });
        setText("");
    };

    return (
        <form  onSubmit={handleSubmit} className="task-form">
            <div>
                <input 
                    className='in-tarefa'
                    type="text"
                    placeholder="Digite sua nova tarefa!"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button className='ts-btn' type="submit">+</button>
            </div>
            
        </form>
    );
};