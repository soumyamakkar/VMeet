const redisClient = require('../config/redis');
const sendEmail = require('../utils/email');

const generateCode = () => Math.floor(100000 + Math.random() * 900000); // 6-digit code

// Send verification code
const sendVerificationCode = async (req, res) => {
    console.log("send email func called");
    const { email } = req.body;

    if (!email) return res.status(400).json({ error: 'Email is required.' });

    const code = generateCode();
    const key = `verification:${email}`;

    try {
        // Store code in Redis with 5-minute expiry
        await redisClient.setEx(key, 300, code.toString());
        await sendEmail(email, 'Your Verification Code', `Your code is: ${code}`);
        res.status(200).json({ message: 'Verification code sent to your email.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send verification code.' });
    }
};

// Verify code
const verifyCode = async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ message: "Email and code are required." });
  }

  try {
    const storedCode = await redisClient.get(`verification:${email}`);
    const userData = await redisClient.get(`pendingUser:${email}`);

    if (!storedCode || !userData) {
      return res.status(400).json({ message: "Code expired or user data invalid." });
    }

    if (storedCode === code) {
      // Verification successful: Save user to database
      const { username, password, role } = JSON.parse(userData);

      const newUser = new User({ username, email, password, role });
      await newUser.save();

      // Delete Redis keys
      await redisClient.del(`verification:${email}`);
      await redisClient.del(`pendingUser:${email}`);

      // Generate JWT token
      const token = jwt.sign({ userId: newUser._id, email }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.status(201).json({ message: "User registered successfully.", token });
    } else {
      res.status(400).json({ message: "Invalid verification code." });
    }
  } catch (error) {
    console.error("Error verifying code:", error);
    res.status(500).json({ message: "Verification failed." });
  }
};

module.exports = { sendVerificationCode, verifyCode };
