import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
export const serverURL = "https://sneha-traders-backend.vercel.app";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
