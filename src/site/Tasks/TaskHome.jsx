/* eslint-disable no-unused-vars */
import React from "react";
import BaseTaskApp from "./BaseTaskApp";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TaskHome = () => {
  const navigate = useNavigate();
  return (
    <BaseTaskApp>
      <Typography variant="h3">Welcome to task app</Typography>
      <Button variant="contained" onClick={() => navigate("/list")}>
        Task List
      </Button>
    </BaseTaskApp>
  );
};

export default TaskHome;
