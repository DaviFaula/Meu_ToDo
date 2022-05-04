import React, { useState } from 'react';
import { TasksCollection } from '../api/TasksCollection';


export const TaskForm = () => {
    const [text, setText] = useState("");

    const handleSubmit = e =>{
        e.preventDefault();

        if (!text) return;

        TasksCollection.insert({
            text: text.trim(),
            createdAt: new Date()
        });
        setText("");
    };

    return (
        <form classname="task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Digite sua nova tarefa!"
                value ={text}
                onChange={(e)=> setText(e.target.value)}
            />
            <button type="submit">+</button>
        </form>
    );
};