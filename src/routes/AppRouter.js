import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../App.css";
import TaskList from "../components/TaskList";
import EditTask from "../components/EditTask.js";
import CreateTask from "../components/CreateTask/index.js";

function AppRouter() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/edit/:taskId" element={<EditTask />} />
          <Route path="/create-task" element={<CreateTask />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default AppRouter;
