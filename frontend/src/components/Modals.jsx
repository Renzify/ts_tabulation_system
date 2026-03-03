// Modals.jsx
import { useEffect, useState } from "react";
import { useModalStore } from "../stores/useModalStore";

const modalLabels = {
  event: {
    title: "Add Event",
    label: "Event name:",
    placeholder: "Event name",
  },
  competition: {
    title: "Add Competition",
    label: "Competition name:",
    placeholder: "Competition name",
  },
  category: {
    title: "Add Category",
    label: "Category name:",
    placeholder: "Category name",
  },
  choice: {
    title: "Add Choice",
    label: "Choice name:",
    placeholder: "Choice name",
  },
  subCategory: {
    title: "Add Sub-Category",
    label: "Sub-category name:",
    placeholder: "Sub-category name",
  },
  editEvent: {
    title: "Edit Event",
    label: "Event name:",
    placeholder: "Event name",
  },
  editCompetition: {
    title: "Edit Competition",
    label: "Competition name:",
    placeholder: "Competition name",
  },
  editCategory: {
    title: "Edit Category",
    label: "Category name:",
    placeholder: "Category name",
  },
  editChoice: {
    title: "Edit Choice",
    label: "Choice name:",
    placeholder: "Choice name",
  },
  editSubCategory: {
    title: "Edit Sub-category",
    label: "Sub-category name:",
    placeholder: "Sub-category name",
  },
};

const ModalInput = ({ onConfirm }) => {
  const { isOpen, type, closeModal, defaultValue } = useModalStore();
  const [input, setInput] = useState(defaultValue);

  // Sync input when modal opens with a new defaultValue
  useEffect(() => {
    setInput(defaultValue);
  }, [defaultValue, isOpen]);

  const currentLabel = modalLabels[type] ?? {};

  const handleConfirm = () => {
    if (input.trim() === "") return;
    onConfirm(input);
    setInput("");
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <dialog open className="modal">
      <div className="modal-box">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={closeModal}
        >
          ✕
        </button>

        <div className="flex flex-col">
          <h3 className="font-bold text-lg">{currentLabel.title}</h3>
          <p className="py-4">{currentLabel.label}</p>
          <textarea
            className="textarea"
            placeholder={currentLabel.placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <button
              className="btn btn-neutral bg-white text-black"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ModalInput;
