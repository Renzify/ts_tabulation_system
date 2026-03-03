import ModalInput from "../components/Modals";
import { useModalStore } from "../stores/useModalStore";
import { useNavigate } from "react-router";
import AddEventButton from "../components/AddEventButton";
import EventsList from "../components/EventList";
import axios from "axios";
import { axiosInstance } from "../lib/axios";

function Events() {
  const navigate = useNavigate();

  const handleConfirm = async (input) => {
    if (input.trim() === "") return;

    const { type, closeModal } = useModalStore.getState();
    if (type !== "event") return;

    const res = await axiosInstance.post("/event", {
      eveNameInput: input,
      eveDescInput: "Event description",
    });

    closeModal();
    navigate(`/admin/event/${res.data.id}`);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      <ModalInput onConfirm={handleConfirm} />
      <AddEventButton />
      <EventsList />
    </div>
  );
}

export default Events;
