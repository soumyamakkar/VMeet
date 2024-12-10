import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppState } from "../context/AppStateContext";

const GoogleCallbackScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuthToken, setUser } = useAppState();

  useEffect(() => {
    // Capture the `access_token` from the URL query parameters (Google uses token)
    const hashParams = new URLSearchParams(location.hash.substring(1)); // Skip the '#' part
    const token = hashParams.get("access_token");

    // const token = params.get("access_token");
    console.log("token: ",token);

    if (!token) {
      console.error("No access token found");
    //   navigate("/signin");
    }

    if (token) {
      // Now exchange the token for user info if necessary (optional)
      fetch("https://vmeet-4enh.onrender.com/api/users/auth/google/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }), // Send the token in the body
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Handle the response, e.g., store the access token or redirect
          if (data.success) {
            console.log("data sucess");
            setAuthToken(data.token); 
            setUser(data.token);
            navigate("/prejoin");
          } else {
            console.error("Google OAuth failed:", data.message);
          }
        })
        .catch((error) => {
          console.error("Error during Google OAuth callback:", error);
        });
    } else {
      console.error("No token found in the query string");
    }
  }, [location, navigate, setAuthToken, setUser]);

  return <div>Processing Google OAuth callback...</div>;
};

export default GoogleCallbackScreen;
