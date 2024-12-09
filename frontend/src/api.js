export const fetchToken = async () => {
  try {
    console.log("api.js function called");
    const response = await fetch(
      `http://localhost:5000/api/meeting/fetch-token`,
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
      `http://localhost:5000/api/meeting/create-room`,
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
      `http://localhost:5000/api/users/register`,
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
      `http://localhost:5000/api/users/login`,
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
    const response = await fetch("http://localhost:5000/api/users/auth/github", {
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
    const response = await fetch("http://localhost:5000/api/users/auth/github/callback", {
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
