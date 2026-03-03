import { useEventStore } from "../stores/useEventStore";

function LeaderboardList() {
  const { allLeaderboard } = useEventStore();

  if (!allLeaderboard || allLeaderboard.length === 0) {
    return (
      <div className="text-center text-slate-500 mt-10">
        No leaderboard data available.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-3">
      <h1 className="text-2xl font-semibold text-center text-cyan-700 mb-6">
        Leaderboard
      </h1>

      {allLeaderboard.map((item, index) => (
        <div
          key={item.id}
          className="bg-white border border-cyan-100 shadow-sm p-4 rounded-lg flex justify-between items-center hover:bg-cyan-50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <span className="text-cyan-700 font-bold text-lg">
              #{index + 1}
            </span>

            <span className="text-slate-700 font-medium">
              {item.firstName} {item.lastName}
            </span>
          </div>

          <div className="text-cyan-700 font-semibold">{item.totalAverage}</div>
        </div>
      ))}
    </div>
  );
}

export default LeaderboardList;
