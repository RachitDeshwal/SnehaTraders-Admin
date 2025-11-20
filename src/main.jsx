import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
export const serverURL = "http://localhost:8001";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
