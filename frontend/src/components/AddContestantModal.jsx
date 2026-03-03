import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

function AddContestantModal({ isOpen, onClose, choiceId }) {
  const [fNameInput, setFNameInput] = useState("");
  const [lNameInput, setLNameInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!fNameInput || !lNameInput) {
      toast.error("First and last name are required");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post("/contestant", {
        choFKey: choiceId,
        fNameInput,
        lNameInput,
      });

      toast.success("Contestant added successfully!");
      onClose();
      setFNameInput("");
      setLNameInput("");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add contestant");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4">
        <h2 className="text-lg font-semibold text-cyan-700">Add Contestant</h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="First Name"
            value={fNameInput}
            onChange={(e) => setFNameInput(e.target.value)}
            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lNameInput}
            onChange={(e) => setLNameInput(e.target.value)}
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

export default AddContestantModal;
