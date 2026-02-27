import { useRef, useState, useReducer } from "react";
import { Hierarchy } from "./HierarchyTree";
import ModalInput from "../components/Modals";
import eventsReducer from "../reducers/eventsReducer";

function Admin() {
  const modalRef = useRef(null);
  const [editingItem, setEditingItem] = useState(null);
  const [events, dispatch] = useReducer(eventsReducer, []);
  const [modalConfig, setModalConfig] = useState({
    type: null,
    eventId: null,
    categoryId: null,
  });

  // One function to open the modal — just pass what type and which IDs
  const openModal = (
    type,
    eventId = null,
    categoryId = null,
    defaultValue = "",
  ) => {
    setModalConfig({ type, eventId, categoryId, defaultValue });
    modalRef.current.open(defaultValue);
  };

  const handleConfirm = (input) => {
    if (input.trim() === "") return;

    const { type, eventId, categoryId } = modalConfig;

    switch (type) {
      case "event":
        dispatch({ type: "ADD_EVENT", payload: input });
        break;

      case "competition":
        dispatch({
          type: "ADD_COMPETITION",
          eventId,
          payload: input,
        });
        break;

      case "category":
        dispatch({
          type: "ADD_CATEGORY",
          eventId,
          payload: input,
        });
        break;

      case "choice":
        dispatch({
          type: "ADD_CHOICE",
          eventId,
          categoryId,
          payload: input,
        });
        break;

      case "subCategory":
        dispatch({
          type: "ADD_SUBCATEGORY",
          eventId,
          categoryId,
          payload: input,
        });
        break;

      case "editEvent":
        dispatch({
          type: "UPDATE_EVENT",
          eventId,
          payload: input,
        });
        break;

      case "editCompetition":
        dispatch({
          type: "UPDATE_COMPETITION",
          eventId,
          payload: input,
        });
        break;
    }

    modalRef.current.close();
  };

  const handleDelete = (type, eventId, categoryId = null, itemId = null) => {
    switch (type) {
      case "event":
        dispatch({ type: "DELETE_EVENT", eventId });
        break;

      case "competition":
        dispatch({ type: "DELETE_COMPETITION", eventId });
        break;

      case "category":
        dispatch({ type: "DELETE_CATEGORY", eventId, categoryId });
        break;

      case "choice":
        dispatch({ type: "DELETE_CHOICE", eventId, itemId });
        break;

      case "subCategory":
        dispatch({ type: "DELETE_SUBCATEGORY", eventId, itemId });
    }
  };

  return (
    <div>
      {/* Modal */}
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
      {/*  Hierarchy */}
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
          onEditEvent={(eventId) => openModal("editEvent", eventId)}
          onEditCompetition={(eventId) => openModal("editCompetition", eventId)}
        />
      )}
    </div>
  );
}

export default Admin;
