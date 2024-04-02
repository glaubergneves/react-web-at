import React from 'react';
import './style.css';
import axios from 'axios'; 

function Card({ task, onEdit, onDelete }) {
  const { id, description, completed, title, step } = task;

  const toLeft = async (task) => {
    try {
      if (step === 'Em andamento') {
        await axios.patch(`https://pacaro-tarefas.netlify.app/api/glauber-neves/tasks/${id}/update-step`, { step: 'Para fazer' });
        window.location.reload();
      } else if (step === 'Pronto') {
        await axios.patch(`https://pacaro-tarefas.netlify.app/api/glauber-neves/tasks/${id}/update-step`, { step: 'Em andamento' });
        window.location.reload();
      }
    } catch (error) {
      console.error('Erro ao mover tarefa para a esquerda:', error);
    }
  };

  const toRight = async (task) => {
    try {
      if (step === 'Para fazer') {
        await axios.patch(`https://pacaro-tarefas.netlify.app/api/glauber-neves/tasks/${id}/update-step`, { step: 'Em andamento' });
        window.location.reload();
      } else if (step === 'Em andamento') {
        await axios.patch(`https://pacaro-tarefas.netlify.app/api/glauber-neves/tasks/${id}/update-step`, { step: 'Pronto' });
        window.location.reload();
      }
    } catch (error) {
      console.error('Erro ao mover tarefa para a direita:', error);
    }
  };

  return (
    <div className={`card ${completed ? 'completed' : ''}`}>
      <p className="card-description">ID: {id}</p>
      <p className="card-description">{title}</p>
      <p className="card-description">{description}</p>
      <div className="card-buttons">
        <button className="arrow-button" onClick={() => toLeft(task, 'left')}>&larr;</button>
        <button className="arrow-button" onClick={() => toRight(task, 'right')}>&rarr;</button>
        <button className="edit-button" onClick={() => onEdit(task)}>Editar</button>
        <button className="delete-button" onClick={() => onDelete(task)}>Excluir</button>
      </div>
    </div>
  );
}

export default Card;
