const jwt = require("jsonwebtoken");

const SECRET="63bcec40956c34f991aa2a486117eeeaf9f303d01049b7f3073d66ca84efe5b8";
const API_KEY="7c46fcfc-1056-41fb-bcbe-555462e5566c";


exports.fetchToken = async (req, res) => {
  try {
    console.log("function called");
    const options = {
      expiresIn: "120m",
      algorithm: "HS256",
    };
    const payload = {
      apikey:API_KEY,
      permissions:[`allow_join`],
      version:2,
    };

    console.log(payload);
    console.log(SECRET);
    console.log(options);
    const token = jwt.sign(payload,SECRET,options);
    res.json({ token: token });
  } catch (error) {
    console.error("Failed to fetch authToken ");
    res.status(500).json({ error: "Failed to fetch authToken" });
  }
};

exports.createRoom = async (req, res) => {
  console.log(`${req.body.token}`);
  console.log("create room called");
  try {
    const bodyPayload = {
      webhook: {
        endPoint:"https://08f8-152-58-89-8.ngrok-free.app/webhook",
        events: ["session-ended"],
      },
    };

    const response = await fetch("https://api.videosdk.live/v2/rooms", {
      method: "POST",
      headers: {
        Authorization: `${req.body.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyPayload),
    });

    const data = await response.json();
    console.log(data);
    res.json({ meetingId: data.roomId });
  } catch (error) {
    console.error("Error in creating meeting", error);
    res.status(500).json({ error: "Failed to create meeting" });
  }
};