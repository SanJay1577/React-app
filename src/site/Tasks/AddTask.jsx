import { useRef } from "react";
import { useTaskContext } from "../../context/TaskProvider";
import { Button, TextField } from "@mui/material";
import BaseTaskApp from "./BaseTaskApp";
import { useNavigate } from "react-router-dom";
import { addNewTask } from "./taskApiHanders";

function AddTask() {
  const { dispatch } = useTaskContext();
  const navigate = useNavigate();
  // const [taskText, setTaskText] = useState("");
  const inputRef = useRef(null);
  console.log("addTask Component rerenderd");

  const handleAddTask = () => {
    if (inputRef.current?.children[1]?.children[0]?.value === "") return;
    addNewTask(inputRef.current?.children[1]?.children[0]?.value)
      .then((data) => {
        if (data) {
          dispatch({
            type: "ADD_TASK",
            payload: data,
          });
          navigate("/list");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    inputRef.current.children[1].children[0].value = "";
  };
  return (
    <BaseTaskApp>
      <TextField
        sx={{ width: "80vw" }}
        ref={inputRef}
        id="outlined-basic"
        label="Enter Task"
        variant="outlined"
        multiline
        rows={4}
      />
      <Button variant="contained" onClick={handleAddTask}>
        Add Task
      </Button>
    </BaseTaskApp>
  );
}
export default AddTask;
