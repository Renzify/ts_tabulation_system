import React, { useRef, useState } from "react";
import {
  Trophy,
  Calendar,
  Tag,
  ChevronDown,
  ChevronRight,
  Plus,
} from "lucide-react";

function Admin() {
  const eventModalRef = useRef(null);
  const competitionModalRef = useRef(null);
  const categoryModalRef = useRef(null);
  const choiceModalRef = useRef(null);
  const subCategoryModalRef = useRef(null);

  const [events, setEvents] = useState([]);
  const [eventInput, setEventInput] = useState("");
  const [competitionInput, setCompetitionInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [choiceInput, setChoiceInput] = useState("");
  const [subCategoryInput, setSubCategoryInput] = useState("");

  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleAddEvent = () => {
    if (eventInput.trim() === "") return;
    setEvents([
      ...events,
      { id: Date.now(), name: eventInput, competition: null },
    ]);
    setEventInput("");
    eventModalRef.current.close();
  };

  const handleAddCompetition = () => {
    if (competitionInput.trim() === "") return;
    setEvents(
      events.map((event) =>
        event.id === selectedEventId
          ? {
              ...event,
              competition: {
                id: Date.now(),
                name: competitionInput,
                categories: [],
              },
            }
          : event,
      ),
    );
    setCompetitionInput("");
    competitionModalRef.current.close();
  };

  const handleAddCategory = () => {
    if (categoryInput.trim() === "") return;
    setEvents(
      events.map((event) =>
        event.id === selectedEventId
          ? {
              ...event,
              competition: {
                ...event.competition,
                categories: [
                  ...event.competition.categories,
                  {
                    id: Date.now(),
                    name: categoryInput,
                    choices: [],
                    subCategories: [],
                  },
                ],
              },
            }
          : event,
      ),
    );
    setCategoryInput("");
    categoryModalRef.current.close();
  };

  const handleAddChoice = () => {
    if (choiceInput.trim() === "") return;
    setEvents(
      events.map((event) =>
        event.id === selectedEventId
          ? {
              ...event,
              competition: {
                ...event.competition,
                categories: event.competition.categories.map((cat) =>
                  cat.id === selectedCategoryId
                    ? {
                        ...cat,
                        choices: [
                          ...cat.choices,
                          { id: Date.now(), name: choiceInput },
                        ],
                      }
                    : cat,
                ),
              },
            }
          : event,
      ),
    );
    setChoiceInput("");
    choiceModalRef.current.close();
  };

  const handleAddSubCategory = () => {
    if (subCategoryInput.trim() === "") return;
    setEvents(
      events.map((event) =>
        event.id === selectedEventId
          ? {
              ...event,
              competition: {
                ...event.competition,
                categories: event.competition.categories.map((cat) =>
                  cat.id === selectedCategoryId
                    ? {
                        ...cat,
                        subCategories: [
                          ...cat.subCategories,
                          {
                            id: Date.now(),
                            name: subCategoryInput,
                            choices: [],
                          },
                        ],
                      }
                    : cat,
                ),
              },
            }
          : event,
      ),
    );
    setSubCategoryInput("");
    subCategoryModalRef.current.close();
  };

  const openCompetitionModal = (eventId) => {
    setSelectedEventId(eventId);
    competitionModalRef.current.showModal();
  };

  const openCategoryModal = (eventId) => {
    setSelectedEventId(eventId);
    categoryModalRef.current.showModal();
  };

  const openChoiceModal = (eventId, categoryId) => {
    setSelectedEventId(eventId);
    setSelectedCategoryId(categoryId);
    choiceModalRef.current.showModal();
  };

  const openSubCategoryModal = (eventId, categoryId) => {
    setSelectedEventId(eventId);
    setSelectedCategoryId(categoryId);
    subCategoryModalRef.current.showModal();
  };

  return (
    <div>
      <AddEventModal
        modalRef={eventModalRef}
        inputValue={eventInput}
        setInputValue={setEventInput}
        handleConfirm={handleAddEvent}
      />
      <AddCompetitionModal
        modalRef={competitionModalRef}
        inputValue={competitionInput}
        setInputValue={setCompetitionInput}
        handleConfirm={handleAddCompetition}
      />
      <AddCategoryModal
        modalRef={categoryModalRef}
        inputValue={categoryInput}
        setInputValue={setCategoryInput}
        handleConfirm={handleAddCategory}
      />
      <AddChoiceModal
        modalRef={choiceModalRef}
        inputValue={choiceInput}
        setInputValue={setChoiceInput}
        handleConfirm={handleAddChoice}
      />
      <AddSubCategoryModal
        modalRef={subCategoryModalRef}
        inputValue={subCategoryInput}
        setInputValue={setSubCategoryInput}
        handleConfirm={handleAddSubCategory}
      />

      <button
        className="btn btn-soft btn-primary"
        onClick={() => eventModalRef.current.showModal()}
      >
        Add Event
      </button>

      {events.length > 0 && (
        <Hierarchy
          events={events}
          onAddCompetition={openCompetitionModal}
          onAddCategory={openCategoryModal}
          onAddChoice={openChoiceModal}
          onAddSubCategory={openSubCategoryModal}
        />
      )}
    </div>
  );
}

// ─── Modals ──────────────────────────────────────────────────────────────────

function Modal({
  modalRef,
  id,
  title,
  label,
  placeholder,
  inputValue,
  setInputValue,
  handleConfirm,
}) {
  return (
    <dialog ref={modalRef} id={id} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="flex flex-col">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{label}</p>
          <textarea
            className="textarea"
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
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
}

const AddEventModal = (props) => (
  <Modal
    {...props}
    id="add_event_modal"
    title="Add Event"
    label="Event name:"
    placeholder="Event name"
  />
);
const AddCompetitionModal = (props) => (
  <Modal
    {...props}
    id="add_competition_modal"
    title="Add Competition"
    label="Competition name:"
    placeholder="Competition name"
  />
);
const AddCategoryModal = (props) => (
  <Modal
    {...props}
    id="add_category_modal"
    title="Add Category"
    label="Category name:"
    placeholder="Category name"
  />
);
const AddChoiceModal = (props) => (
  <Modal
    {...props}
    id="add_choice_modal"
    title="Add Choice"
    label="Choice name:"
    placeholder="Choice name"
  />
);
const AddSubCategoryModal = (props) => (
  <Modal
    {...props}
    id="add_subcategory_modal"
    title="Add Sub-Category"
    label="Sub-category name:"
    placeholder="Sub-category name"
  />
);

// ─── Tree ─────────────────────────────────────────────────────────────────────

function CategoryNode({ category, eventId, onAddChoice, onAddSubCategory }) {
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
        <div className="flex-1">
          <div className="text-[10px] uppercase font-semibold tracking-widest text-slate-400">
            CATEGORY
          </div>
          <div className="font-semibold text-slate-800 text-sm">
            {category.name}
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
              <div className="flex-1">
                <div className="text-[10px] uppercase font-semibold tracking-widest text-slate-400">
                  CHOICE
                </div>
                <div className="font-semibold text-slate-800 text-sm">
                  {choice.name}
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
              <div className="flex-1">
                <div className="text-[10px] uppercase font-semibold tracking-widest text-slate-400">
                  SUB-CATEGORY
                </div>
                <div className="font-semibold text-slate-800 text-sm">
                  {sub.name}
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
                <div className="flex-1">
                  <div className="text-[10px] uppercase font-semibold tracking-widest text-slate-400">
                    EVENT TYPE
                  </div>
                  <div className="font-semibold text-slate-800 text-sm">
                    {event.name}
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
                      <div className="flex-1">
                        <div className="text-[10px] uppercase font-semibold tracking-widest text-slate-400">
                          COMPETITION
                        </div>
                        <div className="font-semibold text-slate-800 text-sm">
                          {event.competition.name}
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
