import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

function AddJudgeModal({ isOpen, onClose, choiceId }) {
  const [judgeFName, setJudgeFName] = useState("");
  const [judgeLName, setJudgeLName] = useState("");
  const [judgeSpe, setJudgeSpe] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!judgeFName || !judgeLName || !judgeSpe) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post("/judge", {
        choFKey: choiceId,
        judgeFName,
        judgeLame: judgeLName,
        judgeSpe,
      });

      toast.success("Judge added successfully!");
      onClose();
      setJudgeFName("");
      setJudgeLName("");
      setJudgeSpe("");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add judge");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4">
        <h2 className="text-lg font-semibold text-cyan-700">Add Judge</h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="First Name"
            value={judgeFName}
            onChange={(e) => setJudgeFName(e.target.value)}
            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={judgeLName}
            onChange={(e) => setJudgeLName(e.target.value)}
            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="text"
            placeholder="Specialization"
            value={judgeSpe}
            onChange={(e) => setJudgeSpe(e.target.value)}
            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

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

export default AddJudgeModal;
