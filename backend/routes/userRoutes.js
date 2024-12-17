const express = require("express");
const passport = require('passport');
const router = express.Router();

const userController = require("../controllers/userController");
const { sendVerificationCode, verifyCode } = require('../controllers/authController');

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);


router.post('/send-code', sendVerificationCode);
router.post('/verifyCode', verifyCode);



router.post("/auth/github/callback",userController.authUser);

router.get('/auth/github', (req, res) => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}`;
    res.redirect(githubAuthUrl);
  });


router.post("/auth/google/callback",userController.authGoogleUser);



module.exports = router;
