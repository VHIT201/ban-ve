// Core
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

// Internal
import "./main.css";
import router from "./routes";

// if (!import.meta.env.VITE_BACKEND_URL) {
//   throw new Error("Missing BACKEND_URL environment variable");
// }
// console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
