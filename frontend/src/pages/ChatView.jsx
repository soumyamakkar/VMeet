import React, { useState } from "react";
import { usePubSub } from "@videosdk.live/react-sdk";

const ChatView = () => {
  // Use the usePubSub hook for chat
  const { publish, messages } = usePubSub("CHAT");

  // State to manage the user's typed message
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      // Publish the message to the CHAT topic
      publish(message, { persist: true });
      // Clear the input field
      setMessage("");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Chat Messages Display */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "10px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <p style={{ fontWeight: "bold", marginBottom: "8px" }}>Chat Messages:</p>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              marginBottom: "8px",
              padding: "8px",
              backgroundColor: "#f5f5f5",
              borderRadius: "5px",
            }}
          >
            <strong>{msg.senderName || "Anonymous"}:</strong>{" "}
            <span>{msg.message}</span>
          </div>
        ))}
      </div>

      {/* Input for Sending Messages */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          borderTop: "1px solid #ddd",
        }}
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            marginRight: "10px",
          }}
        />
        <button
          onClick={handleSendMessage}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatView;
