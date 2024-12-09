import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { useMediaDevice } from "@videosdk.live/react-sdk";
import { useAppState } from "../context/AppStateContext";

const HomeScreen = () => {
  const navigate = useNavigate();
  const { requestPermission } = useMediaDevice();
  const { isAuthenticated } = useAppState();

  const checkCompatibility = () => {
    const requestMediaPermission = async () => {
      try {
        await requestPermission("audio_video");
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
        background: "linear-gradient(to bottom right, #134B70, #4F1787, #4F1787, #4F1787, #134B70)", // Gradient background
        fontWeight:100,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white", // Adjust text color for better contrast
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h2" sx={{ mb: "2rem", fontWeight: "10px" }}>
          WELCOME TO VMEET
        </Typography>
        <Typography variant="h4" sx={{ mb: "2rem" }}>
          Where Face-to-Face Learning is Reimagined!
        </Typography>
        <Typography
          variant="h6"
          sx={{
            maxWidth: "800px",
            margin: "0 auto",
            lineHeight: 1.5,
          }}
        >
          Connect with educators and classmates like never before. Our
          cutting-edge video conferencing technology ensures an immersive and
          engaging video calling experience tailored for educational
          environments. Tap "Start Now" to begin your video calls.
        </Typography>
      </Box>
      <Box>
        <Button
          size="large"
          variant="contained"
          onClick={checkCompatibility}
          sx={{
            padding: "1rem 2rem",
            background: "linear-gradient(to right, #2E236C, #433D8B)",
            color: "white",
            fontWeight: "bold",
            fontSize: "1.2rem",
            borderRadius: "50px",
            "&:hover": {
              background: "linear-gradient(to right, #433D8B, #2E236C)",
            },
          }}
        >
          Start Now
        </Button>
      </Box>
    </Box>
  );
};

export default HomeScreen;
