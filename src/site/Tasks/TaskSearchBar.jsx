import { TextField } from "@mui/material";
import { useState } from "react";
import { useTaskContext } from "../../context/TaskProvider";

const TaskSearchBar = () => {
  const { dispatch } = useTaskContext();
  const [search, setSearch] = useState("");

  function handleSearch(e) {
    setSearch(e.target.value);
    if (e.target.value == "") {
      dispatch({ type: "REFETCH_TASK" });
      return;
    }
    setTimeout(() => {
      handleDebounceSearch(e.target.value);
    }, 1000);
  }

  function handleDebounceSearch(searchList) {
    dispatch({ type: "SEARCH_TASK", payload: searchList });
  }

  return (
    <div>
      <TextField
        sx={{ width: "80vw" }}
        id="outlined-basic"
        label="Search Bar"
        variant="outlined"
        value={search}
        onChange={(e) => handleSearch(e)}
      />
    </div>
  );
};

export default TaskSearchBar;
