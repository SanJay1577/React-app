/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Box } from "@mui/material";
import React from "react";
import TaskNavBar from "./TaskNavBar";

const BaseTaskApp = ({ children }) => {
  return (
    <Box>
      <TaskNavBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "100px",
          gap: "1rem",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default BaseTaskApp;
