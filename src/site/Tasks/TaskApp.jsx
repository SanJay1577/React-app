import TaskProvider from "../../context/TaskProvider";
import { Route, Routes } from "react-router-dom";
import ListTask from "./ListTask";

import TaskStats from "./TaskStats";
import AddTask from "./AddTask";
import TaskHome from "./TaskHome";
import TaskDetails from "./TaskDetails";

function TaskApp() {
  return (
    <TaskProvider>
      <Routes>
        <Route exact path="/" element={<TaskHome />} />
        <Route path="/list" element={<ListTask />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/stats" element={<TaskStats />} />
        <Route path="/task/:id" element={<TaskDetails />} />
        <Route path="*" element={<h1>No page</h1>} />
      </Routes>
    </TaskProvider>
  );
}
export default TaskApp;
