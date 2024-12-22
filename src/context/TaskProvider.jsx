/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { getAllTaskList } from "../site/Tasks/taskApiHanders";

//create context
const TaskContext = createContext();

//task reducer
const taskReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_ALL_TASK":
      return { ...state, task: action.payload };
    case "ADD_TASK":
      return { ...state, task: [...state.task, action.payload] };
    case "TOOGLE_TASK":
      return {
        ...state,
        task: state?.task?.map((task) =>
          task.id === action.payload.id
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    case "SEARCH_TASK":
      return {
        ...state,
        task: state.task.filter((task) => task.text.includes(action.payload)),
      };
    case "REFETCH_TASK":
      return { ...state, refetch: !state.refetch };
    case "REMOVE_TASK":
      return state?.task?.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
};

//Provider component
const TaskProvider = ({ children }) => {
  const initialData = {
    task: [],
    refetch: false,
    loading: "false",
    error: "",
  };

  const [tasks, dispatch] = useReducer(taskReducer, initialData);

  useEffect(() => {
    console.log("data");
    getAllTaskList()
      .then((data) => {
        dispatch({ type: "FETCH_ALL_TASK", payload: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tasks.refetch]);
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
