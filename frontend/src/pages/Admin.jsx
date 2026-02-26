import { useRef, useState } from "react";
import { Hierarchy } from "./HierarchyTree";
import ModalInput from "../components/Modals";
import {
  addChoiceRecursive,
  addSubCategoryRecursive,
  deleteCategoryRecursive,
  deleteChoiceRecursive,
} from "../utils/treeHelpers";

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
    setModalConfig({ type, eventId, categoryId });
    modalRef.current.open();
  };

  const handleConfirm = (input) => {
    if (input.trim() === "") return;

    const { type, eventId, categoryId } = modalConfig;

    switch (type) {
      case "event":
        setEvents([
          ...events,
          { id: Date.now(), name: input, competition: null },
        ]);
        break;

      case "competition":
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
        break;

      case "category":
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
        break;

      case "choice":
        setEvents(
          events.map((event) =>
            event.id === eventId
              ? {
                  ...event,
                  competition: {
                    ...event.competition,
                    categories: addChoiceRecursive(
                      event.competition.categories,
                      categoryId,
                      input,
                    ),
                  },
                }
              : event,
          ),
        );
        break;

      case "subCategory":
        setEvents(
          events.map((event) =>
            event.id === eventId
              ? {
                  ...event,
                  competition: {
                    ...event.competition,
                    categories: addSubCategoryRecursive(
                      event.competition.categories,
                      categoryId,
                      input,
                    ),
                  },
                }
              : event,
          ),
        );
        break;

      default:
        console.warn("Unknown type:", type);
        break;
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
                  categories: deleteCategoryRecursive(
                    event.competition.categories,
                    categoryId,
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
                  categories: deleteChoiceRecursive(
                    event.competition.categories,
                    itemId,
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

  return (
    <div>
      {/* Single shared modal */}
      <ModalInput
        ref={modalRef}
        type={modalConfig.type}
        onConfirm={(input) => handleConfirm(input)}
      />

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

export default Admin;
