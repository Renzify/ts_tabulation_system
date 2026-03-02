import React from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home.jsx";
import Admin from "./pages/Admin.jsx";
import EventHierarchy from "./pages/Testing.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        {/* 👇 Force show specific event */}
        <Route
          path="/test"
          element={
            <EventHierarchy eventId="8c2b1167-f938-42f1-9abf-340feffeb620" />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
