import { createContext, useContext, useState, useEffect } from "react";

import {fetchToken, createMeeting } from "../api";
import { decodeToken } from "../utils/tokenUtils";

// Create context
const AppStateContext = createContext({
  authToken: null,
  meetingId: null,
  lastMeetingId: null,
  meetingEnded: null,
  totalFaceTime: null,
  user: null,
  micOn: null,
  webcamOn: null,
  setAuthToken: () => {},
  setMeetingId: () => {},
  setLastMeetingId: () => {},
  setMeetingEnded: () => {},
  setTotalFaceTime: () => {},
  setUser: () => {},
  setMicOn: () => {},
  setWebcamOn: () => {},
});

// Provider component to wrap the app
export const AppStateProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [meetingId, setMeetingId] = useState(null);
  const [lastMeetingId, setLastMeetingId] = useState(null);
  const [meetingEnded, setMeetingEnded] = useState(false);
  const [totalFaceTime, setTotalFaceTime] = useState(0);
  const [user, setUser] = useState(null);
  const [micOn, setMicOn] = useState(false);
  const [webcamOn, setWebcamOn] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);

  const toggleMic = () => {
    console.log("toggle mic called");
    if (mediaStream) {
      const audioTracks = mediaStream.getAudioTracks();
      console.log("Audio Tracks:", audioTracks);
      if (audioTracks.length > 0) {
        audioTracks.forEach((track) => {
          track.enabled = !micOn;
        });
        setMicOn(!micOn);
      } else {
        console.log("No audio tracks found in mediaStream");
      }
    } else {
      console.log("Media stream is not available");
    }
  };
  
  const toggleWebcamm = () => {
    if (mediaStream) {
      const videoTracks = mediaStream.getVideoTracks();
      videoTracks.forEach((track) => {
        track.enabled = !webcamOn;
      });
      setWebcamOn(!webcamOn);
    }
  };

  const checkTokenValidity = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = decodeToken(token);
        if (decodedToken) {
          setUser({ username: decodedToken.username, role: decodedToken.role });
          return true;
        } else {
          console.error("Invalid token");
          localStorage.removeItem("token");
          return false;
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
        return false;
      }
    }
    return false;
  };

  const setUserData = (token) => {
    try {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        setUser({ username: decodedToken.username, role: decodedToken.role });
        localStorage.setItem("token", token);
      } else {
        console.error("Invalid token");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  const clearUserData = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const getAuthToken = async () => {
    const newAuthToken = await fetchToken();
    console.log("get auth token called with token",newAuthToken);
    setAuthToken(newAuthToken);
    console.log(authToken);
  };

  useEffect(() => {
    console.log("Updated authToken:", authToken);
  }, [authToken]);

  const getMeetingId = async () => {
    console.log("authtoken in getmeetingid: ",authToken);
    if (authToken) {
      const newMeetingId = await createMeeting(authToken);
      setMeetingId(newMeetingId);
    } else {
      console.error("Auth token not available");
    }
  };
  

  const onMeetingLeave = async () => {
    setLastMeetingId(meetingId);
    setMeetingId(null);
    setMeetingEnded(true);
  };

  return (
    <AppStateContext.Provider
      value={{
        authToken,
        meetingId,
        lastMeetingId,
        meetingEnded,
        totalFaceTime,
        user,
        micOn,
        webcamOn,
        mediaStream,
        setAuthToken,
        setMeetingId,
        setLastMeetingId,
        setMeetingEnded,
        setTotalFaceTime,
        setUser,
        setMicOn,
        setWebcamOn,
        setMediaStream,

        getAuthToken,
        getMeetingId,
        onMeetingLeave,
        setUserData,
        clearUserData,
        checkTokenValidity,
        toggleMic,
        toggleWebcamm,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

// Custom hook to access the context
export const useAppState = () => useContext(AppStateContext);
