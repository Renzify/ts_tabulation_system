import { useEffect, useState } from "react";
import { useEventStore } from "../stores/useEventStore";
import { useParams, useNavigate } from "react-router";
import { UserPlus, Users, ListPlus } from "lucide-react";

import CompetitionRow from "./CompetitionRow";
import AddJudgeModal from "./AddJudgeModal";
import AddContestantModal from "./AddContestantModal";


function CompetitionList() {
  const { eventId } = useParams(); // ✅ read param from route
  const navigate = useNavigate();


  const {
    selectedEvent,
    selectedChoice,
    setSelectedChoice,
    initializeEventData,
    getDetailsByEvent,
  } = useEventStore();

  const [isJudgeModalOpen, setJudgeModalOpen] = useState(false);
  const [isContestantModalOpen, setContestantModalOpen] = useState(false);

  useEffect(() => {
    if (eventId) initializeEventData(eventId);
  }, [eventId, initializeEventData]);

  const choiceDetails = selectedEvent
    ? getDetailsByEvent(selectedEvent.id)
    : [];

  if (!selectedEvent)
    return (
      <div className="text-center text-slate-500 mt-10">No event selected.</div>
    );

  // Handlers
  const handleAddJudge = (e, item) => {
    e.stopPropagation();
    setSelectedChoice(item);
    setJudgeModalOpen(true);
  };

  const handleAddContestant = (e, item) => {
    e.stopPropagation();
    setSelectedChoice(item);
    setContestantModalOpen(true);
  };

  const handleAddCriteria = (e, item) => {
    e.stopPropagation();
    setSelectedChoice(item);
    console.log("Add Criteria for:", item.choiceName);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto mt-10 space-y-3">
        <h1 className="text-2xl font-semibold text-center text-cyan-700 mb-6">
          {selectedEvent.eventName}
        </h1>

        {choiceDetails.length === 0 ? (
          <p className="text-center text-slate-500">
            No competitions for this event.
          </p>
        ) : (
          choiceDetails.map((item) => (
            <CompetitionRow
              key={item.id}
              item={item}
              onAddJudge={handleAddJudge}
              onAddContestant={handleAddContestant}
              onAddCriteria={handleAddCriteria}
            />
          ))
        )}
          <button
    onClick={(e) => {
      e.stopPropagation();
      navigate(`/leaderboard/${item.id}`);
    }}
    className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-cyan-500/20 transition-colors"
    title="View Leaderboard"
  >
    <span className="text-cyan-700 font-medium">View Leaderboard</span>
  </button>
      </div>

      {/* Modals */}
      <AddJudgeModal
        isOpen={isJudgeModalOpen}
        onClose={() => setJudgeModalOpen(false)}
        choiceId={selectedChoice?.id}
      />
      <AddContestantModal
        isOpen={isContestantModalOpen}
        onClose={() => setContestantModalOpen(false)}
        choiceId={selectedChoice?.id}
      />
    </>
  );
}

export default CompetitionList;
