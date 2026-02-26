import React, { useRef, useState } from "react";
import {
  Trophy,
  Calendar,
  Tag,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
} from "lucide-react";

function Admin() {
  const modalRef = useRef(null);

  const [events, setEvents] = useState([]);
  const [input, setInput] = useState("");
  const [modalConfig, setModalConfig] = useState({
    type: null,
    eventId: null,
    categoryId: null,
  });

  // One function to open the modal — just pass what type and which IDs
  const openModal = (type, eventId = null, categoryId = null) => {
    setInput("");
    setModalConfig({ type, eventId, categoryId });
    modalRef.current.showModal();
  };

  const handleConfirm = () => {
    if (input.trim() === "") return;
    const { type, eventId, categoryId } = modalConfig;

    if (type === "event") {
      setEvents([
        ...events,
        { id: Date.now(), name: input, competition: null },
      ]);
    }

    if (type === "competition") {
      setEvents(
        events.map((event) =>
          event.id === eventId
            ? {
                ...event,
                competition: { id: Date.now(), name: input, categories: [] },
              }
            : event,
        ),
      );
    }

    if (type === "category") {
      setEvents(
        events.map((event) =>
          event.id === eventId
            ? {
                ...event,
                competition: {
                  ...event.competition,
                  categories: [
                    ...event.competition.categories,
                    {
                      id: Date.now(),
                      name: input,
                      choices: [],
                      subCategories: [],
                    },
                  ],
                },
              }
            : event,
        ),
      );
    }

    if (type === "choice") {
      setEvents(
        events.map((event) =>
          event.id === eventId
            ? {
                ...event,
                competition: {
                  ...event.competition,
                  categories: event.competition.categories.map((cat) =>
                    cat.id === categoryId
                      ? {
                          ...cat,
                          choices: [
                            ...cat.choices,
                            { id: Date.now(), name: input },
                          ],
                        }
                      : cat,
                  ),
                },
              }
            : event,
        ),
      );
    }

    if (type === "subCategory") {
      setEvents(
        events.map((event) =>
          event.id === eventId
            ? {
                ...event,
                competition: {
                  ...event.competition,
                  categories: event.competition.categories.map((cat) =>
                    cat.id === categoryId
                      ? {
                          ...cat,
                          subCategories: [
                            ...cat.subCategories,
                            { id: Date.now(), name: input, choices: [] },
                          ],
                        }
                      : cat,
                  ),
                },
              }
            : event,
        ),
      );
    }

    setInput("");
    modalRef.current.close();
  };

  const handleDelete = (type, eventId, categoryId = null, itemId = null) => {
    if (type === "event") {
      setEvents(events.filter((event) => event.id !== eventId));
    }

    if (type === "competition") {
      setEvents(
        events.map((event) =>
          event.id === eventId ? { ...event, competition: null } : event,
        ),
      );
    }

    if (type === "category") {
      setEvents(
        events.map((event) =>
          event.id === eventId
            ? {
                ...event,
                competition: {
                  ...event.competition,
                  categories: event.competition.categories.filter(
                    (cat) => cat.id !== categoryId,
                  ),
                },
              }
            : event,
        ),
      );
    }

    if (type === "choice") {
      setEvents(
        events.map((event) =>
          event.id === eventId
            ? {
                ...event,
                competition: {
                  ...event.competition,
                  categories: event.competition.categories.map((cat) =>
                    cat.id === categoryId
                      ? {
                          ...cat,
                          choices: cat.choices.filter(
                            (choice) => choice.id !== itemId,
                          ),
                        }
                      : cat,
                  ),
                },
              }
            : event,
        ),
      );
    }

    if (type === "subCategory") {
      setEvents(
        events.map((event) =>
          event.id === eventId
            ? {
                ...event,
                competition: {
                  ...event.competition,
                  categories: event.competition.categories.map((cat) =>
                    cat.id === categoryId
                      ? {
                          ...cat,
                          subCategories: cat.subCategories.filter(
                            (sub) => sub.id !== itemId,
                          ),
                        }
                      : cat,
                  ),
                },
              }
            : event,
        ),
      );
    }
  };
  // Map type to human-readable labels
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
  };

  const currentLabel = modalLabels[modalConfig.type] ?? {};

  return (
    <div>
      {/* Single shared modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
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

      <button
        className="btn btn-soft btn-primary"
        onClick={() => openModal("event")}
      >
        Add Event
      </button>

      {events.length > 0 && (
        <Hierarchy
          events={events}
          onAddCompetition={(eventId) => openModal("competition", eventId)}
          onAddCategory={(eventId) => openModal("category", eventId)}
          onAddChoice={(eventId, categoryId) =>
            openModal("choice", eventId, categoryId)
          }
          onAddSubCategory={(eventId, categoryId) =>
            openModal("subCategory", eventId, categoryId)
          }
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

// ─── Tree ─────────────────────────────────────────────────────────────────────

function CategoryNode({
  category,
  eventId,
  onAddChoice,
  onAddSubCategory,
  onDelete,
}) {
  const [expanded, setExpanded] = useState(true);
  const hasChoices = category.choices?.length > 0;
  const hasSubCategories = category.subCategories?.length > 0;
  const hasChildren = hasChoices || hasSubCategories;

  return (
    <div className="flex flex-col">
      {/* Category card */}
      <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-all">
        {hasChildren ? (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-slate-400 hover:text-slate-600"
          >
            {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        ) : (
          <div className="w-4" />
        )}
        <Tag size={16} className="text-purple-500" />
        <div className="flex-1 flex justify-between">
          <div>
            <div className="text-[10px] uppercase font-semibold tracking-widest text-slate-400">
              CATEGORY
            </div>
            <div className="font-semibold text-slate-800 text-sm">
              {category.name}
            </div>
          </div>

          <div className="mt-2 mr-4">
            <button
              onClick={() => onDelete("category", eventId, category.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Choices + Sub-categories */}
      {expanded && (
        <div className="ml-6 pl-4 border-l-2 border-slate-200 flex flex-col gap-2 mt-2">
          {/* Choices */}
          {category.choices.map((choice) => (
            <div
              key={choice.id}
              className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm"
            >
              <div className="w-4" />
              <div className="w-2 h-2 rounded-full border-2 border-slate-300 flex-shrink-0" />
              <div className="flex-1 flex justify-between">
                <div>
                  <div className="text-[10px] uppercase font-semibold tracking-widest text-slate-400">
                    CHOICE
                  </div>
                  <div className="font-semibold text-slate-800 text-sm">
                    {choice.name}
                  </div>
                </div>
                <div className="mt-2 mr-4">
                  <button
                    onClick={() =>
                      onDelete("choice", eventId, category.id, choice.id)
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Sub-categories */}
          {category.subCategories.map((sub) => (
            <div
              key={sub.id}
              className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm"
            >
              <div className="w-4" />
              <Tag size={16} className="text-pink-500" />
              <div className="flex-1 flex flex justify-between">
                <div>
                  <div className="text-[10px] uppercase font-semibold tracking-widest text-slate-400">
                    SUB-CATEGORY
                  </div>
                  <div className="font-semibold text-slate-800 text-sm">
                    {sub.name}
                  </div>
                </div>

                <div className="mt-2 mr-4">
                  <button
                    onClick={() =>
                      onDelete("subCategory", eventId, category.id, sub.id)
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Add Choice + Add Sub-Category buttons */}
          <div className="flex gap-2 mt-1">
            <button
              className="flex items-center gap-1 text-xs font-semibold text-green-500 hover:text-white hover:bg-green-500 border border-green-300 hover:border-green-500 px-3 py-1.5 rounded-lg transition-all"
              onClick={() => onAddChoice(eventId, category.id)}
            >
              <Plus size={12} /> Add Choice
            </button>
            <button
              className="flex items-center gap-1 text-xs font-semibold text-pink-500 hover:text-white hover:bg-pink-500 border border-pink-300 hover:border-pink-500 px-3 py-1.5 rounded-lg transition-all"
              onClick={() => onAddSubCategory(eventId, category.id)}
            >
              <Plus size={12} /> Add Sub-Category
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Hierarchy({
  events,
  onAddCompetition,
  onAddCategory,
  onAddChoice,
  onAddSubCategory,
  onDelete,
}) {
  return (
    <div className="flex justify-center items-center mt-7">
      <div className="w-[80vw] min-h-[70vh] border border-slate-300/60 rounded-2xl overflow-hidden">
        <div className="h-[10vh] border-b border-slate-200 px-5 pt-3 bg-white">
          <h2 className="text-xl font-semibold">Structure Hierarchy</h2>
          <h4 className="text-sm text-slate-500">
            Define nested categories and choices
          </h4>
        </div>

        <div className="p-6 flex flex-col gap-4 bg-slate-50">
          {events.map((event) => (
            <div key={event.id} className="flex flex-col">
              {/* Event Type */}
              <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-all">
                <div className="w-4" />
                <Trophy size={16} className="text-amber-500" />
                <div className="flex-1 flex justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-semibold tracking-widest text-slate-400">
                      EVENT TYPE
                    </div>
                    <div className="font-semibold text-slate-800 text-sm">
                      {event.name}
                    </div>
                  </div>
                  <div className="mt-2 mr-4">
                    <button
                      onClick={() => onDelete("event", event.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="ml-6 pl-4 border-l-2 border-slate-200 flex flex-col gap-2 mt-2">
                {/* Competition */}
                {event.competition && (
                  <>
                    <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-all">
                      <div className="w-4" />
                      <Calendar size={16} className="text-blue-500" />
                      <div className="flex-1 flex justify-between">
                        <div>
                          <div className="text-[10px] uppercase font-semibold tracking-widest text-slate-400">
                            COMPETITION
                          </div>
                          <div className="font-semibold text-slate-800 text-sm">
                            {event.competition.name}
                          </div>
                        </div>
                        <div className="mt-2 mr-4">
                          <button
                            onClick={() => onDelete("competition", event.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Categories under Competition */}
                    <div className="ml-6 pl-4 border-l-2 border-slate-200 flex flex-col gap-2">
                      {event.competition.categories.map((cat) => (
                        <CategoryNode
                          key={cat.id}
                          category={cat}
                          eventId={event.id}
                          onAddChoice={onAddChoice}
                          onAddSubCategory={onAddSubCategory}
                          onDelete={onDelete}
                        />
                      ))}

                      {/* Add Category */}
                      <div className="flex flex-col">
                        <div className="ml-[22px] h-4 border-l-2 border-dashed border-slate-300" />
                        <div className="flex items-center ml-3">
                          <div className="w-4 border-t-2 border-dashed border-slate-300" />
                          <button
                            className="flex items-center gap-1.5 text-xs font-semibold text-purple-500 hover:text-white hover:bg-purple-500 border border-purple-300 hover:border-purple-500 px-3 py-1.5 rounded-lg transition-all ml-1"
                            onClick={() => onAddCategory(event.id)}
                          >
                            <Plus size={13} /> Add Category
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Add Competition */}
                {!event.competition && (
                  <div className="flex flex-col">
                    <div className="ml-[22px] h-4 border-l-2 border-dashed border-slate-300" />
                    <div className="flex items-center ml-3">
                      <div className="w-4 border-t-2 border-dashed border-slate-300" />
                      <button
                        className="flex items-center gap-1.5 text-xs font-semibold text-blue-500 hover:text-white hover:bg-blue-500 border border-blue-300 hover:border-blue-500 px-3 py-1.5 rounded-lg transition-all ml-1"
                        onClick={() => onAddCompetition(event.id)}
                      >
                        <Plus size={13} /> Add Competition
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;
