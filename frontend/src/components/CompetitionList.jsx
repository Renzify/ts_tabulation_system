import { useEffect, useMemo } from "react";
import { useEventStore } from "../stores/useEventStore";
import { useParams, useNavigate } from "react-router";
import { UserPlus, Users, ListPlus } from "lucide-react";

function CompetitionList() {
  const { eventId } = useParams(); // ✅ read param from route
  const navigate = useNavigate();

  const {
    allEvents,
    allCompetitions,
    allCategories,
    allChoices,
    getAllEvents,
    getAllCompetitions,
    getAllCategory,
    getAllChoices,
    setSelectedEvent,
    selectedEvent,
    setSelectedChoice,
  } = useEventStore();

  // Load all data
  useEffect(() => {
    getAllEvents();
    getAllCompetitions();
    getAllCategory();
    getAllChoices();
  }, [getAllEvents, getAllCompetitions, getAllCategory, getAllChoices]);

  // Set selectedEvent based on URL param once events are loaded
  useEffect(() => {
    if (allEvents.length > 0 && eventId) {
      const foundEvent = allEvents.find((e) => e.id === eventId);
      if (foundEvent) setSelectedEvent(foundEvent);
    }
  }, [allEvents, eventId, setSelectedEvent]);

  // Filter only competitions under selected event
  const eventCompetitions = useMemo(() => {
    if (!selectedEvent) return [];
    return allCompetitions.filter((comp) => comp.eventId === selectedEvent.id);
  }, [selectedEvent, allCompetitions]);

  // Flatten choices for display
  const choiceDetails = useMemo(() => {
    return allChoices
      .map((choice) => {
        const category = allCategories.find(
          (cat) => cat.id === choice.categoryId,
        );
        if (!category) return null;

        const competition = allCompetitions.find(
          (comp) => comp.id === category.competitionId,
        );
        if (!competition || competition.eventId !== selectedEvent?.id)
          return null;

        const subCategory = category.parentCategoryId
          ? allCategories.find((c) => c.id === category.parentCategoryId)
          : null;

        return {
          id: choice.id,
          competitionName: competition.competitionName,
          categoryName: subCategory
            ? subCategory.categoryName
            : category.categoryName,
          subCategoryName: subCategory ? category.categoryName : null,
          choiceName: choice.choiceName,
        };
      })
      .filter(Boolean);
  }, [selectedEvent, allCompetitions, allCategories, allChoices]);

  if (!selectedEvent)
    return (
      <div className="text-center text-slate-500 mt-10">No event selected.</div>
    );

  // Click handlers for buttons
  const handleAddJudge = (e, item) => {
    e.stopPropagation();
    setSelectedChoice(item);
    console.log("Add Judge for:", item.choiceName);
  };

  const handleAddContestant = (e, item) => {
    e.stopPropagation();
    setSelectedChoice(item);
    console.log("Add Contestant for:", item.choiceName);
  };

  const handleAddCriteria = (e, item) => {
    e.stopPropagation();
    setSelectedChoice(item);
    console.log("Add Criteria for:", item.choiceName);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-3">
      {/* Event Header */}
      <h1 className="text-2xl font-semibold text-center text-cyan-700 mb-6">
        {selectedEvent.eventName}
      </h1>

      {/* Choice List */}
      {choiceDetails.length === 0 ? (
        <p className="text-center text-slate-500">
          No competitions or choices found for this event.
        </p>
      ) : (
        choiceDetails.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedChoice(item)}
            className="bg-white border border-cyan-100 shadow-sm p-4 rounded-lg flex justify-between items-center hover:bg-cyan-50 transition-colors cursor-pointer"
          >
            {/* Left: Info */}
            <div className="flex-1 pr-6">
              <p className="text-slate-700 truncate">
                <span className="font-semibold text-cyan-700">
                  Competition:
                </span>{" "}
                {item.competitionName}, {item.categoryName}
                {item.subCategoryName && `, ${item.subCategoryName}`},{" "}
                {item.choiceName}
              </p>
            </div>

            {/* Divider */}
            <div className="h-6 border-l border-cyan-200 mx-4" />

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap justify-end text-sm">
              <button
                onClick={(e) => handleAddJudge(e, item)}
                className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-cyan-500/20 transition-colors"
                title="Add Judge"
              >
                <UserPlus size={16} className="text-cyan-600" />
                <span className="text-cyan-700 font-medium">Add Judge</span>
              </button>

              <button
                onClick={(e) => handleAddContestant(e, item)}
                className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-cyan-500/20 transition-colors"
                title="Add Contestant"
              >
                <Users size={16} className="text-cyan-600" />
                <span className="text-cyan-700 font-medium">
                  Add Contestant
                </span>
              </button>

              <button
                onClick={(e) => handleAddCriteria(e, item)}
                className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-cyan-500/20 transition-colors"
                title="Add Criteria"
              >
                <ListPlus size={16} className="text-cyan-600" />
                <span className="text-cyan-700 font-medium">Add Criteria</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/leaderboard/${item.id}`);
                }}
                className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-cyan-500/20 transition-colors"
                title="View Leaderboard"
              >
                <span className="text-cyan-700 font-medium">
                  View Leaderboard
                </span>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default CompetitionList;
