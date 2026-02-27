import { forwardRef, useImperativeHandle, useState } from "react";

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
};

const ModalInput = forwardRef(({ type, onConfirm }, ref) => {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const currentLabel = modalLabels[type] ?? {};

  useImperativeHandle(ref, () => ({
    open: (defaultValue = "") => {
      setInput(defaultValue);
      setIsOpen(true);
    },
    close: () => setIsOpen(false),
  }));

  const handleConfirm = () => {
    if (input.trim() === "") return;
    onConfirm(input);
    setInput("");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <dialog open className="modal">
      <div className="modal-box">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => setIsOpen(false)}
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
});

export default ModalInput;
