const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require('axios');
const User = require("../models/User");

const JWT_SECRET="e2440866723fcb7fb48772c00ad7b81c6d3e112a11fd40052d77987d8d0ab5dc";

exports.registerUser = async (req, res) => {
  console.log("sign up called");
  try {
    const { username, email, password, role } = req.body;
    console.log(
      "Data received from frontend: ",
      username,
      email,
      password,
      role
    );

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password before storing in DB
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user and store him in backend
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    const savedUser = await newUser.save();
    console.log("The user entered in db: ", savedUser);

    // Generate token
    const token = jwt.sign(
      {
        userId: savedUser._id,
        username: savedUser.username,
        role: savedUser.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.error("Error in creating a new user", error);
    res.status(500).json({ message: "Error in creating a new user" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Data received from frontend: ", email, password);

    // Check if the user exists in database?
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User with such email doesn't exist" });
    }

    // Compare provided password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate a token
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Now the email and password are both valid, so sign in the user
    res.status(200).json({
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    console.error("Error in logging in user", error);
    res.status(500).json({ message: "Error in loggingg in user" });
  }
};

exports.authUser = async (req, res) => {
  const code = req.body.code;
  console.log(req.body);
  try {
    // Step 1: Get access token from GitHub
    console.log(code);
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: 'Ov23liECOE7wTGHeFuPz',
        client_secret: '6708a336ddd3c91a5b1425d00b0359db4350a38f',
        code:code,
        redirect_uri: 'https://vmeetfrontend.onrender.com/callback',
      },
      { headers: { Accept: 'application/json' } }
    );
    console.log("Token Response:", tokenResponse.data);
    const accessToken = tokenResponse.data.access_token;
    console.log(tokenResponse.data.access_token);

    // Step 2: Get user information from GitHub
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const { id: githubId, login: name, avatar_url: avatarUrl, email } = userResponse.data;

    // Step 3: Check if the user exists in the database
    let user = await User.findOne({ githubId });
    if (!user) {
      // If not, create a new user
      user = new User({ githubId, name, avatarUrl, email });
      await user.save();
    }
    else if (!user.githubId) {
      // If a user exists with the same email but no GitHub ID, link the GitHub account
      user.githubId = githubId;
      await user.save();
    }

    // Step 4: Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,  // The ID of the user in your database
        username: user.name,  // User's name from GitHub
        role: user.role,  // You can decide what role to assign to OAuth users
      },
      process.env.JWT_SECRET,  // Your JWT secret key
      { expiresIn: '1h' }
    );

    // Step 5: Send the token as a cookie and redirect to the dashboard
    res.status(200).json({
      success:"true",
      message: "User logged in successfully",
      token,
    });
    
  } catch (error) {
    console.error('GitHub OAuth Error:', error);
    res.redirect('/login?error=oauth_failed');
  }
};

exports.authGoogleUser = async (req, res) => {
  const { token } = req.body;  // The token sent from frontend after Google OAuth redirect
  console.log('Received Google OAuth token:', token);

  try {
    // Step 1: Verify the Google access token
    const tokenInfoResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`
    );

    console.log('Google Token Info:', tokenInfoResponse.data);
    
    const { sub: googleId, email, name, picture: avatarUrl } = tokenInfoResponse.data;

    // Step 2: Check if the user exists in the database
    let user = await User.findOne({ googleId });
    if (!user) {
      // If the user does not exist, create a new user
      user = new User({ googleId, name, avatarUrl, email });
      await user.save();
    } else if (!user.googleId) {
      // If user exists but no Google ID is linked, update the user
      user.googleId = googleId;
      await user.save();
    }

    // Step 3: Generate a JWT token for the authenticated user
    const jwtToken = jwt.sign(
      {
        userId: user._id,  // User's ID in the database
        username: user.name,  // User's name from Google
        role: user.role,  // You can assign roles if necessary
      },
      process.env.JWT_SECRET,  // Secret key for JWT
      { expiresIn: '1h' }  // Token expiration time
    );

    // Step 4: Respond with the JWT token
    res.status(200).json({
      success: "true",
      message: "User logged in successfully",
      token: jwtToken,
    });
  } catch (error) {
    console.error('Google OAuth Error:', error);
    res.status(500).json({
      success: "false",
      message: "OAuth failed, please try again",
    });
  }
};
