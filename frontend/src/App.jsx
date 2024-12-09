import React from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./fonts.css"; // Import the CSS where you defined the font

const theme = createTheme({
  typography: {
    fontFamily: "Newake", 
    fontWeight: 0,
    allVariants: {
      color: '#fff', // Change to any color you prefer, like '#000', 'red', or a hex code
    },
    fontSize: 20,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
