import { useState, useEffect } from "react";
import { useMediaDevice } from "@videosdk.live/react-sdk";
import { useNavigate } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";

import { useAppState } from "../context/AppStateContext";

const HomeScreen = () => {
  const navigate = useNavigate();

  const { requestPermission } = useMediaDevice();
  const { isAuthenticated } = useAppState();

  const checkCompatibility = () => {
    const requestMediaPermission = async () => {
      try {
        const requestAudioVideoPermission = await requestPermission(
          "audio_video"
        );
      } catch (error) {
        console.error("Error in requesting Audio Video Permission", error);
      }
    };

    requestMediaPermission();
    navigate("/signin");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
       
      }}
    >
      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <Typography variant="h2" sx={{ mb: "2rem" }}>
          Welcome to WeMeet!
        </Typography>
        <Typography variant="h4" sx={{ mb: "2rem" }}>
          {/* Where Learning Meets Face-to-Face! */}
          More Than a Call, It's a Connection
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: "800px" }}>
        Experience seamless video communication with Wemeet. Whether it's catching up with friends, collaborating with colleagues, or connecting with loved ones, our Wemeet makes every conversation feel personal and crystal clear. Anywhere, anytime
        </Typography>
      </Box>
      <Box>
        <Button
          size="large"
          variant="contained"
          fullWidth
          onClick={checkCompatibility}
        >
          Start Now
        </Button>
      </Box>
    </Box>
  );
};

export default HomeScreen;
