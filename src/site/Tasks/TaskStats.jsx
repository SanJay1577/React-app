import { useMemo, useState } from "react";
import { useTaskContext } from "../../context/TaskProvider";
import { Box, Button, Paper, Typography } from "@mui/material";
import BaseTaskApp from "./BaseTaskApp";

function TaskStats() {
  const { tasks } = useTaskContext();
  const [counter, setCounter] = useState(0);
  console.log("task stats data rerenderd");
  const styleObj = {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    alignItems: "center",
    width: "80vw",
    padding: "10px",
  };

  const expensiveCounter = useMemo(() => {
    console.log("Expensive counter recalculated", counter);
    return counter * counter;
  }, [counter]);

  const stats = () => {
    // console.log("task stats recalculated");
    const completedTask = tasks.filter((task) => task.completed == true).length;
    const overallTask = tasks.length;
    return { completedTask, overallTask };
  };
  return (
    <BaseTaskApp>
      <Paper>
        <Box sx={{ ...styleObj, flexDirection: "column" }}>
          <Typography variant="h4">Task Stats</Typography>
          <Typography>Completed Task : {stats().completedTask}</Typography>
          <Typography>Overall Task : {stats().overallTask}</Typography>
          <Typography>SQRT Counter {expensiveCounter}</Typography>
          <Button variant="contained" onClick={() => setCounter(counter + 1)}>
            INC
          </Button>
        </Box>
      </Paper>
    </BaseTaskApp>
  );
}
export default TaskStats;
