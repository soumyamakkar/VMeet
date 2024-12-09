import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useAppState } from "../context/AppStateContext";
import { signinUser } from "../api";

const SignInScreen = () => {
  const navigate = useNavigate();
  const { setUserData, checkTokenValidity } = useAppState();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const moveToSignUp = () => {
    navigate("/signup");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signinUser(email, password);
      if (response.status === 200) {
        setUserData(response.token);
        navigate("/prejoin");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error in logging in user", error);
    }
  };

  useEffect(() => {
    const isTokenValid = checkTokenValidity();
    if (!isTokenValid) {
      navigate("/signin");
    } else {
      navigate("/prejoin");
    }
  }, []);

  const isFormValid = email && password;

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom right, #134B70, #4F1787, #4F1787, #4F1787, #134B70)",
        height: "100vh", // Full height
        width: "100%", // Ensure full width
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        overflow: "auto",
      }}
    >
      <CssBaseline />
      <Typography variant="h4" gutterBottom>
        SIGN IN
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          padding: "2rem", // Add padding to form for spacing
          maxWidth: "400px", // Limit width of form
          width: "100%", // Ensure the form takes full width of its container
          boxSizing: "border-box",
        }}
      >
        <TextField
          fullWidth
          required
          margin="normal"
          id="email"
          label="ENTER EMAIL"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          required
          margin="normal"
          id="password"
          type={showPassword ? "text" : "password"}
          label="ENTER PASSWORD"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            mt: "2rem",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{ paddingX: "1rem", margin: "1rem", fontSize: "1rem" }}
            disabled={!isFormValid}
          >
            SIGN IN
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            my: { xs: "1rem", md: "2rem" },
          }}
        >
          <Box sx={{ my: { xs: "0.2rem" } }}>
            <Button
              onClick={moveToSignUp}
              sx={{
                fontSize: "1rem",
                textTransform: "none",
                cursor: "pointer",
              }}
            >
              Don't have an account? Sign Up
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignInScreen;
