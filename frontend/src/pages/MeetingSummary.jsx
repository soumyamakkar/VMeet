import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../context/AppStateContext";

const MeetingSummary = () => {
  const navigate = useNavigate();
  const { lastMeetingId, setMeetingEnded, setLastMeetingId, setTotalFaceTime } =
    useAppState();

  const onGoHome = () => {
    setMeetingEnded(false);
    setLastMeetingId(null);
    setTotalFaceTime(0);
    navigate("/");
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
      <Box sx={{ textAlign: "center", mb: "4rem" }}>
        <Typography variant="h3" sx={{ mb: "3rem" }}>
          Meeting Summary
        </Typography>
        <Typography variant="h4" sx={{ mb: "2rem" }}>
          Meeting Id: {lastMeetingId}
        </Typography>
      </Box>

      <Box>
        <Button size="large" variant="contained" fullWidth onClick={onGoHome}>
          Go to Home Page
        </Button>
      </Box>
    </Box>
  );
};

export default MeetingSummary;
