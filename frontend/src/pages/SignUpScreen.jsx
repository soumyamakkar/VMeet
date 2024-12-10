import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa"; // Import the GitHub icon
import { FcGoogle } from "react-icons/fc"; // Import the Google icon
import axios from "axios"; // Import axios for making the API request
import {request2FACode } from "../api";

import {
  Box,
  Button,
  CssBaseline,
  TextField,
  ToggleButton,
  Autocomplete,
  ToggleButtonGroup,
  Typography,
  InputAdornment,
  Popper,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useAppState } from "../context/AppStateContext";
import { signupUser } from "../api";

const SignUpScreen = () => {
  const collegeNames = [
    "Chitkara University, Patiala",
    "Punjab Engineering College, Chandigarh",
    "Sikkim Manipal Institute of Technology, Rangpo",
  ];

  const navigate = useNavigate();
  const { setUserData, checkTokenValidity } = useAppState();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [institute, setInstitute] = useState(null);
  const [role, setRole] = useState(null);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const moveToSignIn = () => {
    navigate("/signin");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signupUser(
        username,
        email,
        password,
        institute,
        role
      );
      if (response.status === 201) {
        setUserData(response.token);
        request2FACode(email);
        navigate("/TwoFactorAuthPage");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error in registering user");
    }
  };

  const handleGitHubLogin = () => {
    const clientId = "Ov23liECOE7wTGHeFuPz"; // GitHub OAuth client ID
    const redirectUri = "https://vmeetfrontend.onrender.com/callback"; // Redirect URI
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;

    window.location.href = githubAuthUrl; // Redirect to GitHub's OAuth page
  };

  const handleGoogleLogin = () => {
    const clientId = "715481738239-4grh324jiteif0q8d46fovjbfemh7jda.apps.googleusercontent.com"; // Replace with your Google OAuth client ID
    const redirectUri = "https://vmeetfrontend.onrender.com/google-callback"; // Replace with your callback URL
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=email&response_type=token`;

    window.location.href = googleAuthUrl; // Redirect to Google's OAuth page
  };

  useEffect(() => {
    const isTokenValid = checkTokenValidity();
    if (!isTokenValid) {
      navigate("/signup");
    } else {
      navigate("/prejoin");
    }
  }, []);

  const isPasswordValid = password.length >= 8;
  const isFormValid =
    username &&
    email &&
    password &&
    (passwordTouched ? isPasswordValid : true) &&
    // institute &&
    role;

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom right, #134B70, #4F1787, #4F1787, #4F1787, #134B70)",
        height: "150vh",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <CssBaseline />
      <Typography variant="h4" gutterBottom>
        SIGN UP
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          required
          margin="normal"
          id="username"
          label="Enter Name"
          name="username"
          autoComplete="false"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          required
          margin="normal"
          id="email"
          label="Enter Email"
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
          label="Enter Password"
          name="password"
          autoComplete="current-password"
          onBlur={() => setPasswordTouched(true)}
          error={passwordTouched && !isPasswordValid}
          helperText={
            passwordTouched &&
            !isPasswordValid &&
            "Password must be at least 8 characters long"
          }
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

        {/* <Autocomplete
          disablePortal
          fullWidth
          id="combo-box-demo"
          options={collegeNames}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              label="Choose your Institution"
              margin="normal"
            />
          )}
          PopperComponent={(props) => (
            <Popper {...props} sx={{ backgroundColor: "#4F1787", color: "#fff" }} />
          )}
          value={institute}
          onChange={(event, newValue) => setInstitute(newValue)}
        /> */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            my: "1rem",
          }}
        >
          <Typography>Choose your role</Typography>

          <ToggleButtonGroup
            required
            exclusive
            value={role}
            onChange={(event, newRole) => {
              setRole(newRole);
            }}
          >
            <ToggleButton value="student" sx={{ px: "2rem" }}>
              Student
            </ToggleButton>
            <ToggleButton value="teacher" sx={{ px: "2rem" }}>
              Teacher
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

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
            Sign Up
          </Button>
        </Box>

        <Box sx={{ my: { xs: "1rem", md: "2rem" } }}>
          <Button
            onClick={moveToSignIn}
            sx={{
              fontSize: "1rem",
              textTransform: "none",
              cursor: "pointer",
            }}
          >
            Already have an account? Sign In
          </Button>
        </Box>

        {/* GitHub Login Button */}
        <Box sx={{ my: { xs: "1rem", md: "2rem" } }}>
          <Button
            variant="contained"
            sx={{
              paddingX: "1rem",
              margin: "1rem",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={handleGitHubLogin}
          >
            <FaGithub size={24} style={{ marginRight: "0.5rem" }} />
            Login with GitHub
          </Button>
        </Box>

        {/* Google Login Button */}
        <Box sx={{ my: { xs: "1rem", md: "2rem" } }}>
          <Button
            variant="contained"
            sx={{
              paddingX: "1rem",
              margin: "1rem",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={handleGoogleLogin}
          >
            <FcGoogle size={24} style={{ marginRight: "0.5rem" }} />
            Login with Google
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpScreen;
