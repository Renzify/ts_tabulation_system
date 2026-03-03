import { useEffect } from "react";
import { useEventStore } from "../stores/useEventStore";

function EventsList() {
  const { getAllEvents, allEvents, setSelectedEvent } = useEventStore();

  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  return (
    <>
      {allEvents.map((events) => (
        <div
          key={events._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedEvent(events)}
        >
          <div className="flex items-center gap-3">
            <h4 className="text-slate-500 font-medium truncate">
              {events.eventName}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
}

export default EventsList;
