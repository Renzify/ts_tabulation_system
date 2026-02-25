import React from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home.jsx";
import Admin from "./pages/Admin.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
