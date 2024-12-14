/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import "./App.css";
import TaskProvider, { useTaskContext } from "./context/TaskProvider";
import { useCallback, useMemo, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { dialog } from "framer-motion/client";

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
      }}
    >
      <TaskNavBar />
      <TaskProvider>
        <Routes>
          <Route exact path="/" element={<>Home</>} />
          <Route exact path="/task" element={<ListTask />} />
          <Route exact path="/stats" element={<TaskStats />} />
          <Route exact path="/add" element={<AddTask />} />
        </Routes>
        {/* <Box sx={{ ...styleObj, flexDirection: "column", marginTop: "100px" }}>
        <AddTask />
        <ListTask />
        <TaskStats />
      </Box> */}
      </TaskProvider>
    </Box>
  );
}

function TaskNavBar() {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: "100px" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Management
          </Typography>
          <Box>
            <Button color="white">Home</Button>
            <Button color="white">Tasks</Button>
            <Button color="white">Stats</Button>
            <Button color="white">Add</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
function AddTask() {
  const { dispatch } = useTaskContext();
  // const [taskText, setTaskText] = useState("");
  const inputRef = useRef(null);
  console.log("addTask Component rerenderd");

  const handleAddTask = () => {
    // if (taskText.trim() === "") return;
    if (inputRef.current?.children[1]?.children[0]?.value === "") return;
    // dispatch({ type: "ADD_TASK", payload: taskText });
    dispatch({
      type: "ADD_TASK",
      payload: inputRef.current?.children[1]?.children[0]?.value,
    });
    inputRef.current.children[1].children[0].value = "";
  };
  return (
    <Box sx={styleObj}>
      <TextField
        ref={inputRef}
        id="outlined-basic"
        label="Enter Task"
        variant="outlined"
        // value={taskText}
        // onChange={(e) => setTaskText(e.target.value)}
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

  const handleToggle = useCallback(
    (id) => {
      console.log("toggle task function rerenderd");
      dispatch({ type: "TOOGLE_TASK", payload: id });
    },
    [dispatch]
  );

  const handleRemove = useCallback(
    (id) => {
      console.log("remove task task function rerenderd");
      dispatch({ type: "REMOVE_TASK", payload: id });
    },
    [dispatch]
  );

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
  const [counter, setCounter] = useState(0);
  console.log("task stats data rerenderd");

  const expensiveCounter = useMemo(() => {
    console.log("Expensive counter recalculated", counter);
    return counter * counter;
  }, [counter]);

  const stats = () => {
    // console.log("task stats recalculated");
    const completedTask = tasks.filter((task) => task.completed == true).length;
    // const totalTask = tasks.length;
    return { completedTask };
  };
  return (
    <Paper>
      <Box sx={{ ...styleObj, flexDirection: "column" }}>
        <Typography variant="h4">Task Stats</Typography>
        <Typography>Completed Task : {stats().completedTask}</Typography>
        <Typography>SQRT Counter {expensiveCounter}</Typography>
        <Button variant="contained" onClick={() => setCounter(counter + 1)}>
          INC
        </Button>
      </Box>
    </Paper>
  );
}
