import { useReducer, useEffect } from "react";
import { Hierarchy } from "./HierarchyTree";
import ModalInput from "../components/Modals";
import eventsReducer from "../reducers/eventsReducer";
import { api } from "../lib/api";
import axios from "axios";
import { useNavigate } from "react-router";
import { useModalStore } from "../stores/useModalStore";

function Admin() {
  const [events, dispatch] = useReducer(eventsReducer, []);
  const navigate = useNavigate();
  const { openModal } = useModalStore();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/event/");
        // normalize to match your frontend state shape
        const normalizedEvents = res.data.map((e) => ({
          id: e.id,
          name: e.eventName,
          competitions: [], // you can fetch competitions separately
        }));
        dispatch({ type: "SET_EVENTS", payload: normalizedEvents });
      } catch (err) {
        console.error("Failed to fetch events from DB:", err);
      }
    };

    fetchEvents();
  }, []);

  const handleConfirm = async (input) => {
    if (input.trim() === "") return;

    const { type, eventId, competitionId, categoryId, choiceId, closeModal } =
      useModalStore.getState();

    try {
      switch (type) {
        case "event": {
          const res = await axios.post("http://localhost:3000/api/event", {
            eveNameInput: input,
            eveDescInput: "Event description",
          });

          const createdEvent = res.data;
          closeModal(); // optional if ModalInput already closes
          navigate(`/admin/event/${createdEvent.id}`);
          break;
        }

        case "competition": {
          const res = await api.createCompetition({
            eveFKey: eventId,
            comNameInput: input,
            comDescInput: "Competition Description",
          });

          dispatch({ type: "ADD_COMPETITION", eventId, payload: res.data });
          break;
        }

        case "category": {
          const res = await api.createCategory({
            comFKey: competitionId,
            catNameInput: input,
            catDescInput: "Category Description",
            parentCategoryId: null,
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
            parentCategoryId: categoryId,
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
            noJudgesInput: 1,
          });

          dispatch({
            type: "ADD_CHOICE",
            eventId,
            competitionId,
            categoryId,
            payload: res.data,
          });
          break;
        }

        // edits...
        case "editEvent":
          dispatch({ type: "UPDATE_EVENT", eventId, payload: input });
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
            competitionId,
            categoryId,
            payload: input,
          });
          break;

        case "editChoice":
          dispatch({
            type: "UPDATE_CHOICE",
            eventId,
            competitionId,
            categoryId,
            choiceId,
            payload: input,
          });
          break;
      }
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
      <ModalInput onConfirm={handleConfirm} />
      {/*  Hierarchy */}
      {events.length > 0 && (
        <Hierarchy
          events={events}
          onAddCompetition={(eventId) => {
            openModal("competition", eventId);
          }}
          onAddCategory={(eventId, competitionId) =>
            openModal("category", eventId, competitionId)
          }
          onAddChoice={(eventId, competitionId, categoryId) =>
            openModal("choice", eventId, competitionId, categoryId)
          }
          onAddSubCategory={(eventId, competitionId, categoryId) =>
            openModal("subCategory", eventId, competitionId, categoryId)
          }
          onDelete={handleDelete}
          // ✅ EDIT handlers with defaultValue
          onEditEvent={(eventId, defaultValue) =>
            openModal("editEvent", eventId, null, null, null, defaultValue)
          }
          onEditCompetition={(eventId, competitionId, defaultValue) =>
            openModal(
              "editCompetition",
              eventId,
              competitionId,
              null,
              null,
              defaultValue,
            )
          }
          onEditCategory={(eventId, competitionId, categoryId, defaultValue) =>
            openModal(
              "editCategory",
              eventId,
              competitionId,
              categoryId,
              null,
              defaultValue,
            )
          }
          onEditChoice={(
            eventId,
            competitionId,
            categoryId,
            choiceId,
            defaultValue,
          ) =>
            openModal(
              "editChoice",
              eventId,
              competitionId,
              categoryId,
              choiceId,
              defaultValue,
            )
          }
        />
      )}
    </div>
  );
}
export default Admin;
