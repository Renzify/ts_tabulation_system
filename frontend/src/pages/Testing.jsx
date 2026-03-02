import { useEffect, useState } from "react";
import axios from "axios";

export default function EventHierarchy({ eventId }) {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/events/${eventId}/full`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error(err));
  }, [eventId]);

  if (!event) return <p>Loading event...</p>;

  return (
    <div className="p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-2">{event.eventName}</h1>
      <p className="mb-4 text-gray-600">{event.eventDesc}</p>

      {event.competitions.map((comp) => (
        <div key={comp.id} className="ml-4 border-l pl-4 mb-4">
          <h2 className="text-2xl font-semibold">{comp.competitionName}</h2>
          <p className="text-gray-600 mb-2">{comp.competitionDesc}</p>

          {comp.categories.map((cat) => (
            <div key={cat.id} className="ml-4 border-l pl-4 mb-4">
              <h3 className="text-xl font-semibold">{cat.categoryName}</h3>
              <p className="text-gray-600">{cat.categoryDesc}</p>

              {cat.choices.map((choice) => (
                <div key={choice.id} className="ml-4 border-l pl-4 mb-3">
                  <h4 className="text-lg font-medium">{choice.choiceName}</h4>
                  <p className="text-gray-500">{choice.choiceDesc}</p>

                  <div className="ml-4 mt-1">
                    <strong>Judges:</strong>
                    <ul className="list-disc ml-5">
                      {choice.judges.map((j) => (
                        <li key={j.id}>
                          {j.firstName} {j.lastName} ({j.specialization})
                        </li>
                      ))}
                    </ul>

                    <strong>Contestants:</strong>
                    <ul className="list-disc ml-5">
                      {choice.contestants.map((c) => (
                        <li key={c.id}>
                          {c.firstName} {c.lastName}
                        </li>
                      ))}
                    </ul>

                    <strong>Criteria:</strong>
                    <ul className="list-disc ml-5">
                      {choice.criterias.map((cr) => (
                        <li key={cr.id}>
                          {cr.criterion} - Weight: {cr.weight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
