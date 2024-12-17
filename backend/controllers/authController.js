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

    if (!email || !code) return res.status(400).json({ error: 'Email and code are required.' });

    const key = `verification:${email}`;

    try {
        const storedCode = await redisClient.get(key);

        if (!storedCode) return res.status(400).json({ error: 'Code expired or invalid.' });

        if (storedCode === code) {
            // Code matches
            await redisClient.del(key); // Delete key after successful verification
            res.status(200).json({ message: 'Verification successful.' });
        } else {
            res.status(400).json({ error: 'Invalid verification code.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Verification failed.' });
    }
};

module.exports = { sendVerificationCode, verifyCode };
