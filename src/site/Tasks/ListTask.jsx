import { useCallback } from "react";
import { useTaskContext } from "../../context/TaskProvider";
import { Box, Button, List, ListItem, Paper, Typography } from "@mui/material";
import BaseTaskApp from "./BaseTaskApp";
import { useNavigate } from "react-router-dom";
import { deleteTask } from "./taskApiHanders";

function ListTask() {
  const styleObj = {
    display: "flex",
    gap: "1rem",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80vw",
    padding: "10px",
    margin: "10px",
  };
  const { tasks, dispatch } = useTaskContext();
  const navigate = useNavigate();
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
      deleteTask(id)
        .then((data) => {
          if (data) {
            dispatch({ type: "REMOVE_TASK", payload: data.id });
          }
        })
        .catch((err) => console.log(err));
    },
    [dispatch]
  );

  return (
    <BaseTaskApp>
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
              <Box sx={{ display: "flex", gap: "0.5rem" }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleToggle(task.id)}
                >
                  {!task.completed ? "Done" : "Redo"}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate(`/task/${task.id}`)}
                >
                  View
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleRemove(task.id)}
                >
                  Remove
                </Button>
              </Box>
            </ListItem>
          ))}
        </Paper>
      </List>
    </BaseTaskApp>
  );
}
export default ListTask;
