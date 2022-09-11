import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/auth-context";
import { NotesContextProvider } from "./context/notes-context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthContextProvider>
    <NotesContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </NotesContextProvider>
  </AuthContextProvider>
);
