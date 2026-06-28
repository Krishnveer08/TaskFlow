import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <ThemeProvider>

      <App />

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1e293b",
            color: "#fff",
          },
        }}
      />

    </ThemeProvider>

  </React.StrictMode>
);