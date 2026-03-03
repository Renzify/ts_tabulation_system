import { useEffect } from "react";
import { useEventStore } from "../stores/useEventStore";
import EventsList from "../components/EventList";

function Events() {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      <EventsList />
    </div>
  );
}

export default Events;
