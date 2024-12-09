import React, { useMemo, useRef, useEffect, useState } from "react";
import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import { useAppState } from "../context/AppStateContext";
import { useNavigate } from "react-router-dom";
import { Box, Typography, CssBaseline, CircularProgress } from "@mui/material";
import ParticipantView from "./ParticipantView";
import MeetingControls from "../components/MeetingControls";
import ChatView from "./ChatView";
import ReactPlayer from "react-player";

const ScreenShareView = ({ presenterId }) => {
  const { screenShareStream, screenShareAudioStream, screenShareOn } = useParticipant(presenterId);
  const audioRef = useRef();

  useEffect(() => {
    if (screenShareAudioStream && screenShareOn) {
      const audioStream = new MediaStream();
      audioStream.addTrack(screenShareAudioStream.track);
      if (audioRef.current) {
        audioRef.current.srcObject = audioStream;
        audioRef.current.play().catch((err) => console.error("Audio play failed:", err));
      }
    }
  }, [screenShareAudioStream, screenShareOn]);

  const mediaStream = useMemo(() => {
    if (screenShareOn && screenShareStream) {
      const stream = new MediaStream();
      stream.addTrack(screenShareStream.track);
      return stream;
    }
  }, [screenShareOn, screenShareStream]);

  return (
    <>
      {screenShareOn && mediaStream && (
        <ReactPlayer
          url={mediaStream}
          playing
          playsinline
          controls={false}
          muted
          width="100%"
          height="100%"
        />
      )}
      {screenShareAudioStream && (
        <audio ref={audioRef} autoPlay playsInline />
      )}
    </>
  );
};

const Meeting = () => {
  const navigate = useNavigate();
  const [joined, setJoined] = useState(null);
  const { meetingId, onMeetingLeave } = useAppState();
  const { join, participants, presenterId } = useMeeting({
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
    onMeetingLeft: () => {
      onMeetingLeave();
      navigate("/summary");
    },
  });

  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      joinMeeting();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ 
      background: "linear-gradient(to bottom right, #4F1787, #4F1787, #4F1787, #EB3678)",
      display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      {joined === "JOINED" ? (
        <Box sx={{ display: "flex", flex: 1 }}>
          {/* Main Meeting Section */}
          <Box
            sx={{
              flex: 3,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Screen Sharing Section */}
            {presenterId && (
              <Box sx={{ flex: 1, p: 2, background: "#f5f5f5" }}>
                <ScreenShareView presenterId={presenterId} />
              </Box>
            )}

            {/* Participants Section */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                p: 2,
              }}
            >
              {[...participants.keys()].map((participantId) => (
                <Box
                  key={participantId}
                  sx={{
                    flex: participants.size === 1 ? "0 0 auto" : 1,
                    width: participants.size === 1 ? "auto" : "50%",
                    height: participants.size === 1 ? "auto" : "100%",
                    maxWidth: participants.size === 1 ? "80%" : "100%",
                    maxHeight: participants.size === 1 ? "80%" : "100%",
                    p: 1,
                  }}
                >
                  <ParticipantView participantId={participantId} />
                </Box>
              ))}
            </Box>
            {/* Meeting Controls */}
            <Box sx={{ flexShrink: 0 }}>
              <MeetingControls />
            </Box>
          </Box>

          {/* Chat Section */}
          <Box
            sx={{
              flex: 1,
              borderLeft: "1px solid #ddd",
              display: "flex",
              color:"#000",
              flexDirection: "column",
              maxWidth: "300px",
              overflow: "hidden",
            }}
          >
            <ChatView />
          </Box>
        </Box>
      ) : joined === "JOINING" ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            minHeight: "100vh",
          }}
        >
          <Typography variant="h4" sx={{ pr: "1.5rem" }}>
            Joining the meeting
          </Typography>
          <CircularProgress />
        </Box>
      ) : null}
    </Box>
  );
};

export default Meeting;
