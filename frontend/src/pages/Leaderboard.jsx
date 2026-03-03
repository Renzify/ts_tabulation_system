import React, { useEffect, useState } from "react";
import axios from "axios";

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  const choiceId = "903d2f04-b80c-4fce-bf60-8077a59e0f22";

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/leaderboard/${choiceId}`,
      );
      setLeaders(res.data);
    } catch (err) {
      console.error("Failed to fetch leaderboard", err);
    }
  };

  useEffect(() => {
    fetchLeaderboard();

    // 🔥 Auto refresh every 2 seconds
    const interval = setInterval(() => {
      fetchLeaderboard();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>

      <table border="1">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Total Average</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((person, index) => (
            <tr key={person.contestantId}>
              <td>{index + 1}</td>
              <td>
                {person.firstName} {person.lastName}
              </td>
              <td>{Number(person.totalAverage).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
