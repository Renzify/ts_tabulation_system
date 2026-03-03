import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { useEventStore } from "../stores/useEventStore";

function AddCriteriaModal({ isOpen, onClose, choiceId }) {
  const [criterionName, setCriterionName] = useState("");
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(false);

  const { allCriteria, getAllCriteria } = useEventStore();

  useEffect(() => {
    if (isOpen) {
      getAllCriteria();
    }
  }, [isOpen]);

  //   useEffect(() => {
  //     console.log("CHOICE ID:", choiceId);
  //     console.log("ALL CRITERIA:", allCriteria);
  //   }, [choiceId, allCriteria]);

  const existingCriteria = allCriteria.filter((c) => c.choiceId === choiceId);

  const handleSubmit = async () => {
    if (!criterionName || !weight) {
      toast.error("Criterion and weight are required");
      return;
    }

    if (Number(weight) <= 0) {
      toast.error("Weight must be greater than 0");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post("/criteria", {
        choFKey: choiceId,
        criterionName,
        criterionWeight: Number(weight),
      });

      toast.success("Criteria added successfully!");

      setCriterionName("");
      setWeight("");

      await getAllCriteria(); // refresh list
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add criteria");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4">
        <h2 className="text-lg font-semibold text-cyan-700">Add Criteria</h2>

        {/* EXISTING CRITERIA SECTION */}
        <div className="max-h-40 overflow-y-auto border rounded-md p-3 bg-slate-50 space-y-2">
          {existingCriteria.length === 0 ? (
            <p className="text-sm text-slate-500">No criteria added yet.</p>
          ) : (
            existingCriteria.map((c) => (
              <div
                key={c.id}
                className="flex justify-between text-sm text-slate-700"
              >
                <span>{c.criterion}</span>
                <span className="font-medium text-cyan-700">{c.weight}</span>
              </div>
            ))
          )}
        </div>

        {/* INPUT SECTION */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Criterion Name"
            value={criterionName}
            onChange={(e) => setCriterionName(e.target.value)}
            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <input
            type="number"
            step="0.01"
            placeholder="Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-slate-200 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 rounded-md bg-cyan-600 text-white hover:bg-cyan-700 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCriteriaModal;
