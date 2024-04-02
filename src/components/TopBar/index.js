import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function Topbar() {
  return (
    <div className="topbar">
      <div className="container">
        <Link to="/" className='button-heading'>Paçaro tarefas</Link>
        <nav>
          <ul>
            <li><Link to="/create-task" className='button-add'>Nova Tarefa</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Topbar;
