import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Topbar from "../TopBar";

const initialValues = {
  title: "",
  description: "",
  step: "Para fazer"
};

const validationSchema = yup.object({
  title: yup
    .string()
    .required("É necessário informar o título")
    .min(4, "O título precisa ter pelo menos 4 caracteres")
    .max(64, "O título pode ter no máximo 64 caracteres"),
  description: yup
    .string()
    .required("É necessário informar a descrição")
    .min(8, "A descrição precisa ter pelo menos 8 caracteres")
    .max(128, "A descrição pode ter no máximo 128 caracteres"),
  step: yup
    .string()
    .matches(
      /Para fazer|Em andamento|Pronto/,
      'Os passos devem ser "Para fazer", "Em andamento" ou "Pronto"'
    )
});

function CreateTask() {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await axios.post(
        "https://pacaro-tarefas.netlify.app/api/glauber-neves/tasks",
        values
      );
      navigate("/");
      console.log("Tarefa criada com sucesso:", values);
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  return (
    <div>
      <Topbar />
      <div className="container">
        <h1>Adicionar Tarefa</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="title">Título:</label>
              <Field type="text" id="title" name="title" />
              <ErrorMessage name="title" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="description">Descrição:</label>
              <Field as="textarea" id="description" name="description" />
              <ErrorMessage
                name="description"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="step">Passo:</label>
              <Field as="select" id="step" name="step">
                <option value="Para fazer">Para fazer</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Pronto">Pronto</option>
              </Field>
              <ErrorMessage name="step" component="div" className="error" />
            </div>
            <button type="submit">Adicionar Tarefa</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default CreateTask;
