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
    <div className="space-y-3">
      {allEvents.map((event) => (
        <div
          key={event.id}
          className="bg-cyan-500/10 p-4 rounded-lg flex justify-between items-center hover:bg-cyan-500/20 transition-colors cursor-pointer"
          onClick={() => handleEventClick(event)}
        >
          {/* Left: Event Name */}
          <h4 className="text-slate-600 font-medium truncate">
            {event.eventName}
          </h4>

          {/* Right: Edit Button */}
          <button
            onClick={(e) => handleEditClick(e, event)}
            className="p-2 rounded-md hover:bg-cyan-500/30 transition-colors"
            title="Edit Event"
          >
            <Edit size={18} className="text-cyan-600" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default EventsList;
