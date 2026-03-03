import { useEffect, useState } from "react";
import { useEventStore } from "../stores/useEventStore";
import { useParams } from "react-router";

import CompetitionRow from "./CompetitionRow";
import AddJudgeModal from "./AddJudgeModal";
import AddContestantModal from "./AddContestantModal";
import AddCriteriaModal from "./AddCriteriaModal";

function CompetitionList() {
  const navigate = useNavigate();
  const { eventId } = useParams();


  const {
    selectedEvent,
    selectedChoice,
    setSelectedChoice,
    initializeEventData,
    getDetailsByEvent,
  } = useEventStore();

  const [isJudgeModalOpen, setJudgeModalOpen] = useState(false);
  const [isContestantModalOpen, setContestantModalOpen] = useState(false);
  const [criteriaModalOpen, setCriteriaModalOpen] = useState(false);

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
    setCriteriaModalOpen(true);
  };

  const handleRowClick = (item) => {
    setSelectedChoice(item);
    navigate(`/events/competitions/participants/${item.id}`); // ✅ updated path
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
              onClick={() => handleRowClick(item)}
              onAddJudge={handleAddJudge}
              onAddContestant={handleAddContestant}
              onAddCriteria={handleAddCriteria}
            />
          ))
        )}
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

      <AddCriteriaModal
        isOpen={criteriaModalOpen}
        onClose={() => setCriteriaModalOpen(false)}
        choiceId={selectedChoice?.id}
      />
    </>
  );
}

export default CompetitionList;
