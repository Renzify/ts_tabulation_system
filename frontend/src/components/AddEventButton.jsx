import { useModalStore } from "../stores/useModalStore";

export default function AddEventButton() {
  const { openModal } = useModalStore();

  return (
    <button
      className="btn btn-soft btn-primary"
      onClick={() => openModal("event")}
    >
      Add Event
    </button>
  );
}
