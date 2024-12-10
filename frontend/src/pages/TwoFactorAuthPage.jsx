import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verify2FACode } from "../api"; 
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material"; 

const TwoFactorAuthPage = () => {
  const [email, setEmail] = useState(""); 
  const [code, setCode] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      setErrorMessage(""); // Clear any previous error messages
      const token = await verify2FACode(email, code); 
      console.log("2FA successful, token:", token);
      navigate("/prejoin"); // Redirect to /prejoin on success
    } catch (error) {
      
      setErrorMessage(error.message || "Invalid or expired code. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh", 
        minWidth: "100vh",
        background: "linear-gradient(to bottom right, #134B70, #4F1787, #4F1787, #4F1787, #134B70)",
        // maxWidth: 400,
        margin: "0",
        textAlign: "center",
        padding: 3,
        boxShadow: 3,
        // borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Two-Factor Authentication
      </Typography>
      <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Email (if needed)"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Verification Code"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter 2FA code"
          margin="normal"
          variant="outlined"
        />
        <Button
          onClick={handleVerify}
          variant="contained"
          color="primary"
          maxWidth="400px"
          sx={{ mt: 2 }}
        >
          Verify Code
        </Button>
        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default TwoFactorAuthPage;
