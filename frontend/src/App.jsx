import React from "react";
import { Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home.jsx";
import EventHierarchy from "./pages/EventHierarchy.jsx";
import Events from "./pages/Events.jsx";
import Competitions from "./pages/Competitions.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/admin/event/:eventId" element={<EventHierarchy />} />
        <Route
          path="/events/competitions/:eventId"
          element={<Competitions />}
        />
        <Route path="/leaderboard/:choiceId" element={<Leaderboard />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
