// import React, { useState, useEffect } from "react";
// import { useMeeting } from "@videosdk.live/react-sdk";
// import { useAppState } from "../context/AppStateContext";
// import { useNavigate } from "react-router-dom";
// import { Box, Typography, Button } from "@mui/material";
// import ParticipantView from "./ParticipantView";
// import ChatView from "./ChatView"; // Import ChatView component

// const MeetingView = () => {
//   const navigate = useNavigate();
//   const [joined, setJoined] = useState(null);
//   const { meetingId, onMeetingLeave } = useAppState();

//   const { join, participants } = useMeeting({
//     onMeetingJoined: () => {
//       setJoined("JOINED");
//     },
//     onMeetingLeft: () => {
//       onMeetingLeave();
//       navigate("/summary");
//     },
//   });

//   const joinMeeting = () => {
//     setJoined("JOINING");
//     join();
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       joinMeeting();
//     }, 100);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <Box
//       sx={{
//         flex: 1,
//         overflow: "hidden",
//         display: "flex",
//         flexDirection: "column",
//         p: 2,
//       }}
//     >
//       <Typography variant="h4" sx={{ mb: 2 }}>
//         Meeting ID: {meetingId}
//       </Typography>

//       {joined === "JOINED" ? (
//         <Box
//           sx={{
//             display: "flex",
//             flex: 1,
//             overflow: "hidden",
//           }}
//         >
//           {/* Participant Grid */}
//           <Box
//             sx={{
//               flex: 3,
//               display: "flex",
//               flexWrap: "wrap",
//               gap: 2,
//               overflowY: "auto",
//               p: 2,
//             }}
//           >
//             {[...participants.keys()].map((participantId) => (
//               <ParticipantView
//                 key={participantId}
//                 participantId={participantId}
//               />
//             ))}
//           </Box>

//           {/* Chat Section */}
//           <Box
//             sx={{
//               flex: 1,
//               borderLeft: "1px solid #ddd",
//               overflowY: "auto",
//               p: 2,
//             }}
//           >
//             <ChatView />
//           </Box>
//         </Box>
//       ) : joined === "JOINING" ? (
//         <Typography variant="body1" sx={{ mt: 4 }}>
//           Joining the meeting...
//         </Typography>
//       ) : (
//         <Button
//           variant="contained"
//           color="primary"
//           size="large"
//           sx={{ mt: 4 }}
//         >
//           Join Meeting
//         </Button>
//       )}
//     </Box>
//   );
// };

// export default MeetingView;
