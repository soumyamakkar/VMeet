const jwt = require("jsonwebtoken");

const BACKEND_URL = process.env.BACKEND_URL;


exports.fetchToken = async (req, res) => {
  try {
    console.log("function called");
    const options = {
      expiresIn: "120m",
      algorithm: "HS256",
    };
    const payload = {
      apikey:process.env.VIDEOSDK_API_KEY,
      permissions:[`allow_join`],
      version:2,
    };

    console.log(payload);
    console.log(process.env.VIDEOSDK_SECRET);
    console.log(options);
    const token = jwt.sign(payload,process.env.VIDEOSDK_SECRET,options);
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
        endPoint: "https://vmeet-4enh.onrender.com/webhook",
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