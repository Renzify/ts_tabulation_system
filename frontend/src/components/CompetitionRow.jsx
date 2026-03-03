import { useNavigate } from "react-router";
import { UserPlus, Users, ListPlus } from "lucide-react";

function CompetitionRow({ item, onAddJudge, onAddContestant, onAddCriteria }) {
  const navigate = useNavigate(); // ✅ add navigation hook

  const handleLeaderboardClick = (e) => {
    e.stopPropagation();
    navigate(`/leaderboard/${item.id}`); // ✅ redirect safely
  };

  return (
    <div
      onClick={() => console.log("Selected choice:", item.choiceName)}
      className="bg-white border border-cyan-100 shadow-sm p-4 rounded-lg flex justify-between items-center hover:bg-cyan-50 transition-colors cursor-pointer"
    >
      {/* Left: Info */}
      <div className="flex-1 pr-6">
        <p className="text-slate-700 truncate">
          <span className="font-semibold text-cyan-700">Competition:</span>{" "}
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
          onClick={(e) => onAddJudge(e, item)}
          className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-cyan-500/20 transition-colors"
          title="Add Judge"
        >
          <UserPlus size={16} className="text-cyan-600" />
          <span className="text-cyan-700 font-medium">Add Judge</span>
        </button>

        <button
          onClick={(e) => onAddContestant(e, item)}
          className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-cyan-500/20 transition-colors"
          title="Add Contestant"
        >
          <Users size={16} className="text-cyan-600" />
          <span className="text-cyan-700 font-medium">Add Contestant</span>
        </button>

        <button
          onClick={(e) => onAddCriteria(e, item)}
          className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-cyan-500/20 transition-colors"
          title="Add Criteria"
        >
          <ListPlus size={16} className="text-cyan-600" />
          <span className="text-cyan-700 font-medium">Add Criteria</span>
        </button>

        {/* ✅ View Leaderboard Button */}
        <button
          onClick={handleLeaderboardClick}
          className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-cyan-500/20 transition-colors"
          title="View Leaderboard"
        >
          <span className="text-cyan-700 font-medium">View Leaderboard</span>
        </button>
      </div>
    </div>
  );
}

export default CompetitionRow;
