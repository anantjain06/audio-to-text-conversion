import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#42a5f5',        // Light Blue - calm and professional
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#81d4fa',        // Lighter Blue - for accents or secondary actions
      contrastText: '#ffffff'
    },
    success: {
      main: '#2e7d32',        // Rich Green - for success buttons
      contrastText: '#ffffff'
    },
    background: {
      default: '#f3ece9',     // Light Gray background for the entire app
      paper: '#ffffff'        // White cards, dialogs, tables
    },
    text: {
      primary: '#1a1a1a',     // Almost black - readable on light gray
      secondary: '#5f6368'    // Soft gray for less important text
    },
    divider: '#e0e0e0'         // Subtle divider lines
  },
  components: {
    MuiCardHeader: {
      styleOverrides: {
        title: {
          textTransform: 'uppercase',
           fontSize: '1.5rem'
        },
      },
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
