import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function TaskNavBar() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1, marginBottom: "100px" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Management
          </Typography>
          <Box>
            <Button color="white" onClick={() => navigate("/")}>
              Home
            </Button>
            <Button color="white" onClick={() => navigate("/list")}>
              Tasks
            </Button>
            <Button color="white" onClick={() => navigate("/stats")}>
              Stats
            </Button>
            <Button color="white" onClick={() => navigate("/add")}>
              Add
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default TaskNavBar;
