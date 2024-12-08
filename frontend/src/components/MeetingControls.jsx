import { useMeeting } from "@videosdk.live/react-sdk";

import { Box, IconButton, Typography } from "@mui/material";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MicOffIcon from "@mui/icons-material/MicOff";
import MicIcon from "@mui/icons-material/Mic";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";

import { useAppState } from "../context/AppStateContext";

const MeetingControls = () => {
  const { meetingId, micOn, webcamOn } = useAppState();
  const { toggleMic, toggleWebcam, leave, toggleScreenShare, isScreenShareActive } = useMeeting();

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        py: "1rem",
        px: { xs: "1rem", md: "2rem" },
      }}
    >
      <Box sx={{ flexBasis: "33%" }}>
        <Typography variant="h6">{meetingId}</Typography>
      </Box>

      {/* Controls Box */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          flexBasis: "33%",
        }}
      >
        <IconButton
          onClick={() => toggleMic()}
          size="large"
          sx={{
            ml: "1rem",
            backgroundColor: micOn ? "#808080" : "#808080",
            color: "white",
            "&:hover": {
              backgroundColor: micOn ? "#ff7b7b" : "#40e56b",
            },
          }}
        >
          {micOn ? (
            <MicIcon sx={{ color: "inherit" }} />
          ) : (
            <MicOffIcon sx={{ color: "inherit" }} />
          )}
        </IconButton>

        <IconButton
          onClick={() => toggleWebcam()}
          size="large"
          sx={{
            ml: "1rem",
            backgroundColor: webcamOn ? "#808080" : "#808080",
            color: "white",
            "&:hover": {
              backgroundColor: webcamOn ? "#ff7b7b" : "#40e56b",
            },
          }}
        >
          {webcamOn ? (
            <VideocamIcon sx={{ color: "inherit" }} />
          ) : (
            <VideocamOffIcon sx={{ color: "inherit" }} />
          )}
        </IconButton>

        {/* Screen Sharing Button */}
        <IconButton
          onClick={() => toggleScreenShare()}
          size="large"
          sx={{
            ml: "1rem",
            backgroundColor: "#808080",
            color: "white",
            "&:hover": {
              backgroundColor: isScreenShareActive ? "#ff7b7b" : "#40e56b",
            },
          }}
        >
          {isScreenShareActive ? (
            <StopScreenShareIcon sx={{ color: "inherit" }} />
          ) : (
            <ScreenShareIcon sx={{ color: "inherit" }} />
          )}
        </IconButton>

        <IconButton
          onClick={() => leave()}
          size="large"
          sx={{
            ml: "1rem",
            backgroundColor: "#EE4B2B",
            color: "white",
            "&:hover": {
              backgroundColor: "red",
            },
          }}
        >
          <CallEndIcon />
        </IconButton>
      </Box>

      <Box sx={{ flexBasis: "33%", display: "flex", justifyContent: "right" }}>
        Show your face
      </Box>
    </Box>
  );
};

export default MeetingControls;
