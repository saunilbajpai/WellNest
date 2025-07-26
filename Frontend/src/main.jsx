import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { AuthProvider } from "./Context/AuthContext.jsx";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material"; // ✅ MUI
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Custom dark theme using your desired background
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "rgb(61, 58, 58)", // your preferred background
    },
    text: {
      primary: "#ffffff", // white text
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}> {/* ✅ MUI dark mode */}
      <CssBaseline /> {/* ✅ Apply base styles */}
      <AuthProvider>
        <App />
        <ToastContainer position="top-center" autoClose={3000} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
