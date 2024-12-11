export const fetchToken = async () => {
  try {
    console.log("api.js function called");
    const response = await fetch(
      `https://vmeet-4enh.onrender.com/api/meeting/fetch-token`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data.token);
    return data.token;
  } catch (error) {
    console.error("Failed to get an AuthToken from backend", error);
    throw error;
  }
};

export const createMeeting = async (authToken) => {
  try {
    console.log("api.js create meeting called with authtoken",authToken);
    const response = await fetch(
      `https://vmeet-4enh.onrender.com/api/meeting/create-room`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({token:authToken}),
      }
    );

    const data = await response.json();
    return data.meetingId;
  } catch (error) {
    console.error("Error in creating a meeting", error);
    throw error;
  }
};

export const signupUser = async (
  username,
  email,
  password,
  institute,
  role
) => {
  try {
    const response = await fetch(
      `https://vmeet-4enh.onrender.com/api/users/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          institute,
          role,
        }),
      }
    );

    const data = await response.json();
    return {
      status: response.status,
      message: data.message,
      token: data.token,
    };
  } catch (error) {
    console.error("Error in signing up the user", error);
    throw error;
  }
};

export const signinUser = async (email, password) => {
  try {
    const response = await fetch(
      `https://vmeet-4enh.onrender.com/api/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    return {
      status: response.status,
      message: data.message,
      token: data.token,
    };
  } catch (error) {
    console.error("Error in signing in the user", error);
    throw error;
  }
};

export const getGitHubOAuthURL = async () => {
  try {
    const response = await fetch("https://vmeet-4enh.onrender.com/api/users/auth/github", {
      method: "GET",
    });

    const data = await response.json();
    return data.oauthUrl;  // The URL to redirect the user to GitHub for authorization
  } catch (error) {
    console.error("Error fetching GitHub OAuth URL", error);
    throw error;
  }
};

export const handleGitHubOAuthCallback = async (code) => {
  try {
    const response = await fetch("https://vmeet-4enh.onrender.com/api/users/auth/github/callback", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }), // Send the authorization code to the backend
    });

    const data = await response.json();
    return {
      status: response.status,
      token: data.token,  // You should get a JWT token or user details after a successful login
    };
  } catch (error) {
    console.error("Error handling GitHub OAuth callback", error);
    throw error;
  }
};


export const request2FACode = async (email) => {
  console.log("inside req 2fa code func frontend");
  try {
    const response = await fetch("https://vmeet-4enh.onrender.com/api/users/send-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }), // Pass the user's email to generate the code
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to request 2FA code.");
    }

    return data.message; // Success message from backend
  } catch (error) {
    console.error("Error requesting 2FA code", error);
    throw error;
  }
};

export const verify2FACode = async (email, code) => {
  try {
    const response = await fetch(`https://vmeet-4enh.onrender.com/api/users/verify-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, code }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Invalid 2FA code.");
    }

    return data.token; // Return JWT or user info upon successful verification
  } catch (error) {
    console.error("Error verifying 2FA code", error);
    throw error;
  }
};
