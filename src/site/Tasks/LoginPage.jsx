import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API = "http://localhost:8000/api/v1/users/login";

function setAccessToken(token) {
  localStorage.setItem("accesToken", token);
}
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function loginUser() {
    const payload = {
      email,
      password,
    };
    let res = await fetch(API, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let { error, accessToken } = await res.json();
    if (accessToken) {
      setAccessToken(accessToken);
      setErr("");
      navigate("/list");
    }
    if (error) {
      setErr(error);
    }
  }
  const styleObj = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    justifyContent: "center",
    alignItems: "center",
    width: "80vw",
    padding: "10px",
    margin: "10px",
  };
  return (
    <div>
      <Box sx={{ ...styleObj }}>
        <TextField
          variant="outlined"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={loginUser}>
          Login
        </Button>
        {err && (
          <Typography variant="h5" color="error">
            {err}
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default LoginPage;
