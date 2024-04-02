import React, { useState, useEffect } from 'react';
import "./style.css";
import Card from "../Card";
import fetchTasks from '../../axios';
import Topbar from '../TopBar';
import axios from 'axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksData = await fetchTasks();
      setTasks(tasksData);
    };

    getTasks();
  }, []);

  const handleEdit = (taskId) => {
    window.location.href = `/edit/${taskId}`;
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`https://pacaro-tarefas.netlify.app/api/glauber-neves/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  const todo = tasks.filter(task => task.step === 'Para fazer');
  const doing = tasks.filter(task => task.step === 'Em andamento');
  const done = tasks.filter(task => task.step === 'Pronto');

  return (
    <div>
      <Topbar />
      <div className="task-list-container">
        <div className="task-group">
          <h2>Para fazer</h2>
          {todo.map((task) => (
            <Card
              key={task.id}
              task={task}
              onEdit={() => handleEdit(task.id)}
              onDelete={() => handleDelete(task.id)}
            />
          ))}
        </div>
        <div className="task-group">
          <h2>Em andamento</h2>
          {doing.map((task) => (
            <Card
              key={task.id}
              task={task}
              onEdit={() => handleEdit(task.id)}
              onDelete={() => handleDelete(task.id)}
            />
          ))}
        </div>
        <div className="task-group">
          <h2>Pronto</h2>
          {done.map((task) => (
            <Card
              key={task.id}
              task={task}
              onEdit={() => handleEdit(task.id)}
              onDelete={() => handleDelete(task.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskList;
