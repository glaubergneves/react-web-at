import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./style.css";
import Topbar from "../TopBar";

function EditTask() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `https://pacaro-tarefas.netlify.app/api/glauber-neves/tasks/${taskId}`
        );
        setTask(response.data);
        setFormData({
          title: response.data.title,
          description: response.data.description
        });
      } catch (error) {
        console.error("Erro ao buscar a tarefa:", error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://pacaro-tarefas.netlify.app/api/glauber-neves/tasks/${taskId}`,
        formData
      );
      window.location.href = "/";
    } catch (error) {
      console.error("Erro ao atualizar a tarefa:", error);
    }
  };

  if (!task) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <Topbar></Topbar>
      <div className="container">
        <h1>Editar Tarefa</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Título:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="description">Descrição:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>
  );
}

export default EditTask;
