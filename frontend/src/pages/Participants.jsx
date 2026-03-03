import { useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { useEventStore } from "../stores/useEventStore";
import { ListPlus } from "lucide-react";

function Participants() {
  const { choiceId } = useParams();
  const {
    getAllJudges,
    getAllContestants,
    allJudges,
    allContestants,
    selectedChoice, // ✅ access current choice details
  } = useEventStore();

  // Load judges & contestants when mounted
  useEffect(() => {
    getAllJudges();
    getAllContestants();
  }, [getAllJudges, getAllContestants]);

  // Filter by selected choiceId
  const judges = useMemo(
    () => allJudges.filter((j) => j.choiceId === choiceId),
    [allJudges, choiceId],
  );

  const contestants = useMemo(
    () => allContestants.filter((c) => c.choiceId === choiceId),
    [allContestants, choiceId],
  );

  // Handler for Add Score button
  const handleAddScore = (contestant) => {
    console.log("Add Score for:", contestant.firstName, contestant.lastName);
    // TODO: open AddScoreModal later
  };

  // Fallback if choiceId missing
  if (!choiceId)
    return (
      <div className="text-center text-slate-500 mt-10">
        No choice selected.
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-8">
      {/* Page Title */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-cyan-700">Participants</h1>

        {/* ✅ Competition subtitle */}
        {selectedChoice && (
          <p className="text-slate-600 mt-1 text-sm">
            <span className="font-semibold text-cyan-700">Competition:</span>{" "}
            {selectedChoice.competitionName}, {selectedChoice.categoryName}
            {selectedChoice.subCategoryName &&
              `, ${selectedChoice.subCategoryName}`}
            , {selectedChoice.choiceName}
          </p>
        )}
      </div>

      {/* Judges Section */}
      <section>
        <h2 className="text-lg font-semibold text-cyan-700 mb-3 text-center">
          Judges
        </h2>

        {judges.length === 0 ? (
          <p className="text-center text-slate-500">No judges found.</p>
        ) : (
          judges.map((judge) => (
            <div
              key={judge.id}
              className="bg-white border border-cyan-100 shadow-sm p-4 rounded-lg flex items-center hover:bg-cyan-50 transition-colors cursor-default"
            >
              {/* Left: Info */}
              <div className="flex-1">
                <p className="text-slate-700 truncate">
                  <span className="font-semibold text-cyan-700">Judge:</span>{" "}
                  {judge.firstName} {judge.lastName}{" "}
                  <span className="text-slate-500 italic">
                    ({judge.specialization})
                  </span>
                </p>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Contestants Section */}
      <section>
        <h2 className="text-lg font-semibold text-cyan-700 mb-3 text-center">
          Contestants
        </h2>

        {contestants.length === 0 ? (
          <p className="text-center text-slate-500">No contestants found.</p>
        ) : (
          contestants.map((contestant) => (
            <div
              key={contestant.id}
              className="bg-white border border-cyan-100 shadow-sm p-4 rounded-lg flex justify-between items-center hover:bg-cyan-50 transition-colors cursor-default"
            >
              {/* Left: Info */}
              <div className="flex-1 pr-6">
                <p className="text-slate-700 truncate">
                  <span className="font-semibold text-cyan-700">
                    Contestant:
                  </span>{" "}
                  {contestant.firstName} {contestant.lastName}
                </p>
              </div>

              {/* Divider */}
              <div className="h-6 border-l border-cyan-200 mx-4" />

              {/* Right: Add Score Button */}
              <div className="flex items-center gap-2 justify-end">
                <button
                  onClick={() => handleAddScore(contestant)}
                  className="flex items-center gap-1 px-3 py-1 text-sm rounded-md hover:bg-cyan-500/20 transition-colors"
                  title="Add Score"
                >
                  <ListPlus size={16} className="text-cyan-600" />
                  <span className="text-cyan-700 font-medium">Add Score</span>
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default Participants;
