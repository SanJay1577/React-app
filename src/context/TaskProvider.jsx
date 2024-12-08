/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useContext, useReducer, useState } from "react";

//create context
const TaskContext = createContext();

//task reducer
const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false,
        },
      ];
    case "TOOGLE_TASK":
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
    case "REMOVE_TASK":
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
};

//Provider component
const TaskProvider = ({ children }) => {
  const initialData = [
    {
      id: Date.now(),
      text: "task text",
      completed: false,
    },
  ];
  const [tasks, dispatch] = useReducer(taskReducer, initialData);
  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;

export function useTaskContext() {
  return useContext(TaskContext);
}
