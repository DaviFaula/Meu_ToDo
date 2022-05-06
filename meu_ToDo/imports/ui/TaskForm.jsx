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
        <form  onSubmit={handleSubmit} classname="task-form">
            <div>
                <input
                    type="text"
                    placeholder="Digite sua nova tarefa!"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button type="submit">+</button>
            </div>
            
        </form>
    );
};