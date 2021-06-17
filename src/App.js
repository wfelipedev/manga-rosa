import React from "react";
import "./App.css";
import { HashRouter } from 'react-router-dom';
import Routes from "./routes/routes";
import { AuthProvider } from "./contexts/auth";

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </HashRouter>
  );
}
