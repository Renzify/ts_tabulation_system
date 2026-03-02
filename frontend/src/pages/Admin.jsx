import { useRef, useState, useReducer } from "react";
import { Hierarchy } from "./HierarchyTree";
import ModalInput from "../components/Modals";
import eventsReducer from "../reducers/eventsReducer";
import { api } from "../lib/axios";
import axios from "axios";

function Admin() {
  const modalRef = useRef(null);
  const [events, dispatch] = useReducer(eventsReducer, []);
  const [modalConfig, setModalConfig] = useState({
    type: null,
    eventId: null,
    categoryId: null,
  });

  // One function to open the modal
  const openModal = (
    type,
    eventId = null,
    competitionId = null, // ← was categoryId
    categoryId = null, // ← shift down
    choiceId = null,
    defaultValue = "",
  ) => {
    setModalConfig({
      type,
      eventId,
      competitionId,
      categoryId,
      choiceId,
      defaultValue,
    });
    modalRef.current.open(defaultValue);
  };

  const handleConfirm = async (input) => {
    if (input.trim() === "") return;

    const {
      type,
      eventId,
      competitionId,
      categoryId,
      choiceId,
      desc,
      judges,
      noJudgesInput,
    } = modalConfig;

    try {
      switch (type) {
        case "event": {
          const res = await api.createEvent({
            eveNameInput: input,
            eveDescInput: "Event Description", // ← you can extend modal to capture desc
          });
          dispatch({ type: "ADD_EVENT", payload: res.data });
          break;
        }

        case "competition": {
          const res = await api.createCompetition({
            eveFKey: eventId,
            comNameInput: input,
            comDescInput: "Competition Description",
          });
          dispatch({
            type: "ADD_COMPETITION",
            eventId,
            payload: res.data,
          });
          break;
        }

        case "category": {
          const res = await api.createCategory({
            comFKey: competitionId,
            catNameInput: input,
            catDescInput: "Category Description",
          });
          dispatch({
            type: "ADD_CATEGORY",
            eventId,
            competitionId,
            payload: res.data,
          });
          break;
        }

        case "category": {
          const res = await api.createCategory({
            comFKey: competitionId,
            catNameInput: input,
            catDescInput: "Category Description",
            parentCategoryId: null, // ✅ root
          });

          dispatch({
            type: "ADD_CATEGORY",
            eventId,
            competitionId,
            payload: res.data,
          });

          break;
        }

        case "subCategory": {
          const res = await api.createCategory({
            comFKey: competitionId,
            catNameInput: input,
            catDescInput: "Subcategory Description",
            parentCategoryId: categoryId, // ✅ parent
          });

          dispatch({
            type: "ADD_SUBCATEGORY",
            eventId,
            competitionId,
            categoryId,
            payload: res.data,
          });

          break;
        }

        case "choice": {
          const res = await api.createChoice({
            catFKey: categoryId,
            choNameInput: input,
            choDescInput: "Choice Description",
            noJudgesInput: "1",
          });

          dispatch({
            type: "ADD_CHOICE",
            eventId,
            competitionId,
            categoryId,
            payload: res.data, // FULL DB OBJECT
          });
          break;
        }

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
            competitionId,
            payload: input,
          });
          break;

        case "editCategory":
          dispatch({
            type: "UPDATE_CATEGORY",
            eventId,
            categoryId,
            competitionId,
            payload: input,
          });
          break;

        case "editChoice":
          dispatch({
            type: "UPDATE_CHOICE",
            eventId,
            categoryId,
            choiceId,
            competitionId,
            payload: input,
          });
          break;
      }

      modalRef.current.close();
    } catch (error) {
      console.error("API error:", error);
      alert("Failed to save item!");
    }
  };

  const handleDelete = (
    type,
    eventId,
    competitionId = null,
    categoryId = null,
    itemId = null,
  ) => {
    switch (type) {
      case "event":
        dispatch({ type: "DELETE_EVENT", eventId });
        break;

      case "competition":
        dispatch({ type: "DELETE_COMPETITION", eventId, competitionId });
        break;

      case "category":
        dispatch({
          type: "DELETE_CATEGORY",
          eventId,
          categoryId,
          competitionId,
        });
        break;

      case "choice":
        dispatch({ type: "DELETE_CHOICE", eventId, itemId, competitionId });
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
          onAddCategory={(eventId, competitionId) =>
            openModal("category", eventId, competitionId)
          }
          onAddChoice={(eventId, categoryId, competitionId) =>
            openModal("choice", eventId, categoryId, competitionId)
          }
          onAddSubCategory={(eventId, categoryId, competitionId) =>
            openModal("subCategory", eventId, categoryId, competitionId)
          }
          onDelete={handleDelete}
          onEditEvent={(eventId) => openModal("editEvent", eventId)}
          onEditCompetition={(eventId, competitionId) =>
            openModal("editCompetition", eventId, competitionId)
          }
          onEditCategory={(eventId, categoryId, competitionId) =>
            openModal("editCategory", eventId, categoryId, competitionId)
          }
          onEditChoice={(eventId, categoryId, choiceId, competitionId) =>
            openModal(
              "editChoice",
              eventId,
              categoryId,
              choiceId,
              competitionId,
            )
          }
        />
      )}
    </div>
  );
}

export default Admin;
