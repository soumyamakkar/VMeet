import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppState } from "../context/AppStateContext";

const GithubCallbackScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuthToken, setUser} = useAppState();

  useEffect(() => {
    // Capture the `code` from the URL query parameters
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    if(!code){
        console.error("no code found");
        navigate("/signin");
    }

    if (code) {
      // Now exchange the code for an access token
      fetch("https://vmeet-4enh.onrender.com/api/users/auth/github/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }), // Send the code in the body
      })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
          // Handle the response, e.g., store the access token or redirect
          if (data.success) {
            setAuthToken(data.token); 
            setUser(data.token);
            navigate("/prejoin"); // Navigate to the dashboard or wherever you need
          } else {
            console.error("GitHub OAuth failed:", data.message);
          }
        })
        .catch((error) => {
          console.error("Error during GitHub OAuth callback:", error);
        });
    } else {
      console.error("No code found in the query string");
    }
  }, [location, navigate, setAuthToken, setUser]);

  return <div>Processing GitHub OAuth callback...</div>;
};

export default GithubCallbackScreen;
