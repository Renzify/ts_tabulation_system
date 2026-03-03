import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Hierarchy } from "./HierarchyTree"; // adjust path if needed
import ModalInput from "../components/Modals";
import { useModalStore } from "../stores/useModalStore";
import { axiosInstance } from "../lib/axios";
import { api } from "../lib/api";

function EventHierarchy({ input }) {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const { openModal, type, competitionId, categoryId, choiceId, closeModal } =
    useModalStore();
  useEffect(() => {
    const fetchFullEvent = async () => {
      try {
        const res = await axiosInstance.get(`/event/full/${eventId}`);
        console.log("FULL EVENT FROM BACKEND:", res.data);

        const normalized = normalizeEvent(res.data);
        setEventData(normalized);
      } catch (err) {
        console.error("Failed to fetch full event:", err);
      }
    };

    if (eventId) fetchFullEvent();
  }, [eventId]);

  const handleConfirm = async (input) => {
    if (input.trim() === "") return;

    const {
      type,
      competitionId,
      categoryId,
      choiceId,
      defaultValue,
      closeModal,
    } = useModalStore.getState();

    try {
      switch (type) {
        case "competition": {
          await api.createCompetition({
            eveFKey: eventId, // from useParams()
            comNameInput: input,
            comDescInput: "",
          });
          break;
        }

        case "category": {
          await api.createCategory({
            comFKey: competitionId,
            catNameInput: input,
            catDescInput: "",
            parentCategoryId: null, // root
          });
          break;
        }

        case "subCategory": {
          await api.createCategory({
            comFKey: competitionId,
            catNameInput: input,
            catDescInput: "",
            parentCategoryId: categoryId, // parent
          });
          break;
        }

        case "choice": {
          await api.createChoice({
            catFKey: categoryId,
            choNameInput: input,
            choDescInput: "",
            noJudgesInput: 1,
          });
          break;
        }

        case "editEvent": {
          await api.updateEvent({
            eveId: eventId,
            eveNameInput: input,
          });
          break;
        }

        case "editCompetition": {
          await api.updateCompetition({
            comId: competitionId,
            comNameInput: input,
          });
          break;
        }

        case "editCategory": {
          await api.updateCategory({
            catId: categoryId,
            catNameInput: input,
          });
          break;
        }

        case "editChoice": {
          await api.updateChoice({
            choId: choiceId,
            choNameInput: input,
          });
          break;
        }

        default:
          console.warn("Unhandled modal type:", type);
          break;
      }

      const res = await axiosInstance.get(`/event/full/${eventId}`);
      setEventData(normalizeEvent(res.data));

      closeModal();
    } catch (error) {
      console.error("API error:", error);
      alert("Failed to save item!");
    }
  };

  if (!eventData) return <p>Loading...</p>;

  return (
    <div>
      <ModalInput onConfirm={handleConfirm} input={input} />
      <Hierarchy
        events={[eventData]}
        onAddCompetition={(eId) => openModal("competition", eId)}
        onAddCategory={(eId, compId) => openModal("category", eId, compId)}
        onAddChoice={(eId, compId, catId) =>
          openModal("choice", eId, compId, catId)
        }
        onAddSubCategory={(eId, compId, catId) =>
          openModal("subCategory", eId, compId, catId)
        }
        onEditCompetition={(eId, compId, val) =>
          openModal("editCompetition", eId, compId, null, null, val)
        }
        onEditEvent={(eId, val) =>
          openModal("editEvent", eId, null, null, null, val)
        }
        onEditCategory={(eId, compId, catId, val) =>
          openModal("editCategory", eId, compId, catId, null, val)
        }
        onEditChoice={(eId, catId, choId, compId, val) =>
          openModal("editChoice", eId, compId, catId, choId, val)
        }
        onDelete={() => {}} // add delete logic similarly
      />
    </div>
  );
}

export default EventHierarchy;

function normalizeEvent(data) {
  return {
    id: data.id,
    name: data.eventName, // FIX: eventName → name
    competitions:
      data.competitions?.map((comp) => ({
        id: comp.id,
        name: comp.competitionName, // FIX: competitionName → name
        categories: buildCategoryTree(comp.categories),
      })) || [],
  };
}

function buildCategoryTree(categories = []) {
  const map = {};
  const roots = [];

  // Create map first
  categories.forEach((cat) => {
    map[cat.id] = {
      id: cat.id,
      name: cat.categoryName, // FIX: categoryName → name
      choices:
        cat.choices?.map((choice) => ({
          id: choice.id,
          name: choice.choiceName || choice.name,
        })) || [],
      subCategories: [],
      parentCategoryId: cat.parentCategoryId,
    };
  });

  // Build tree
  categories.forEach((cat) => {
    if (cat.parentCategoryId) {
      map[cat.parentCategoryId]?.subCategories.push(map[cat.id]);
    } else {
      roots.push(map[cat.id]);
    }
  });

  return roots;
}
