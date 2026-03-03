import { useEffect } from "react";
import { useEventStore } from "../stores/useEventStore";
import { useNavigate } from "react-router";
import { Edit } from "lucide-react";

function EventsList() {
  const { getAllEvents, allEvents, setSelectedEvent } = useEventStore();
  const navigate = useNavigate();

  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    navigate(`/events/competitions/${event.id}`);
  };

  const handleEditClick = (e, event) => {
    e.stopPropagation(); // prevent triggering parent onClick
    setSelectedEvent(event);
    navigate(`/admin/event/${event.id}`);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-3">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-center text-cyan-700 mb-6">
        Events
      </h1>

      {/* Events List */}
      {allEvents.length === 0 ? (
        <p className="text-center text-slate-500">No events found.</p>
      ) : (
        allEvents.map((event) => (
          <div
            key={event.id}
            onClick={() => handleEventClick(event)}
            className="bg-white border border-cyan-100 shadow-sm p-4 rounded-lg flex justify-between items-center hover:bg-cyan-50 transition-colors cursor-pointer"
          >
            {/* Left: Event Info */}
            <div className="flex-1 pr-6">
              <p className="text-slate-700 truncate">
                <span className="font-semibold text-cyan-700">Event:</span>{" "}
                {event.eventName}
              </p>
            </div>

            {/* Divider */}
            <div className="h-6 border-l border-cyan-200 mx-4" />

            {/* Right: Edit Button */}
            <div className="flex items-center gap-2 justify-end">
              <button
                onClick={(e) => handleEditClick(e, event)}
                className="flex items-center gap-1 px-3 py-1 text-sm rounded-md hover:bg-cyan-500/20 transition-colors"
                title="Edit Event"
              >
                <Edit size={16} className="text-cyan-600" />
                <span className="text-cyan-700 font-medium">Edit</span>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default EventsList;
