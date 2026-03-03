import { useEffect } from "react";
import { useParams } from "react-router";
import { useEventStore } from "../stores/useEventStore";

import BackButton from "../components/BackButton";
import LeaderboardList from "../components/LeaderboardList";

function Leaderboard() {
  const { choiceId } = useParams();
  const { getLeaderboardByChoice } = useEventStore();

  useEffect(() => {
    if (choiceId) {
      getLeaderboardByChoice(choiceId);
    }
  }, [choiceId, getLeaderboardByChoice]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="mb-6">
        <BackButton />
      </div>

      <LeaderboardList />
    </div>
  );
}

export default Leaderboard;
