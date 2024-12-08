/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import {
  Box,
  Button,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import "./App.css";
import TaskProvider, { useTaskContext } from "./context/TaskProvider";
import { useState } from "react";

function App() {
  return (
    <div id="app">
      <TaskApp />
    </div>
  );
}
export default App;
const styleObj = {
  display: "flex",
  gap: "1rem",
  justifyContent: "center",
  alignItems: "center",
  width: "80vw",
  padding: "10px",
};

function TaskApp() {
  return (
    <TaskProvider>
      <Box sx={{ ...styleObj, flexDirection: "column" }}>
        <AddTask />
        <ListTask />
        <TaskStats />
      </Box>
    </TaskProvider>
  );
}

function AddTask() {
  const { dispatch } = useTaskContext();
  const [taskText, setTaskText] = useState("");
  console.log("addTask Component rerenderd");
  const handleAddTask = () => {
    if (taskText.trim() === "") return;
    dispatch({ type: "ADD_TASK", payload: taskText });
    setTaskText("");
  };
  return (
    <Box sx={styleObj}>
      <TextField
        id="outlined-basic"
        label="Enter Task"
        variant="outlined"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <Button variant="contained" onClick={handleAddTask}>
        Add Task
      </Button>
    </Box>
  );
}

function ListTask() {
  const { tasks, dispatch } = useTaskContext();
  console.log("task List component rerenderd");
  const handleToggle = (id) => {
    console.log("toggle task function rerenderd");

    dispatch({ type: "TOOGLE_TASK", payload: id });
  };

  const handleRemove = (id) => {
    console.log("remove task task function rerenderd");
    dispatch({ type: "REMOVE_TASK", payload: id });
  };

  return (
    <Box sx={styleObj}>
      <List>
        <Paper>
          {tasks?.map((task) => (
            <ListItem key={task.id} sx={styleObj}>
              <Typography
                sx={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.text}
              </Typography>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleToggle(task.id)}
              >
                {!task.completed ? "Done" : "Redo"}
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleRemove(task.id)}
              >
                Remove
              </Button>
            </ListItem>
          ))}
        </Paper>
      </List>
    </Box>
  );
}

function TaskStats() {
  const { tasks } = useTaskContext();
  console.log("task stats component rerenderd");
  const stats = () => {
    const completedTask = tasks.filter((task) => task.completed == true).length;
    const totalTask = tasks.length;
    return { completedTask, totalTask };
  };
  return (
    <Paper>
      <Box sx={{ ...styleObj, flexDirection: "column" }}>
        <Typography variant="h4">Task Stats</Typography>
        <Typography>Completed Task : {stats().completedTask}</Typography>
        <Typography>Overall Task {stats().totalTask}</Typography>
      </Box>
    </Paper>
  );
}
