import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Hierarchy } from "./HierarchyTree"; // adjust path if needed
import ModalInput from "../components/Modals";
import { useModalStore } from "../stores/useModalStore";
import { axiosInstance } from "../lib/axios";
import { api } from "../lib/api";
import { useEventHierarchyConfirm } from "../hooks/useEventHierarchyConfirm";

function EventHierarchy({ input }) {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const { openModal } = useModalStore();
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

  const { handleConfirm } = useEventHierarchyConfirm({
    eventId,
    setEventData,
    normalizeEvent,
  });

  if (!eventData) return <p>Loading...</p>;

  return (
    <div>
      <ModalInput onConfirm={handleConfirm} input={input} />
      <Hierarchy
        events={[eventData]}
        onAddCompetition={(eventId) => openModal("competition", eventId)}
        onAddCategory={(eventId, competitionId) =>
          openModal("category", eventId, competitionId)
        }
        onAddChoice={(eventId, competitionId, categoryId) =>
          openModal("choice", eventId, competitionId, categoryId)
        }
        onAddSubCategory={(eventId, competitionId, categoryId) =>
          openModal("subCategory", eventId, competitionId, categoryId)
        }
        onEditCompetition={(eventId, competitionId, value) =>
          openModal(
            "editCompetition",
            eventId,
            competitionId,
            null,
            null,
            value,
          )
        }
        onEditEvent={(eventId, value) =>
          openModal("editEvent", eventId, null, null, null, value)
        }
        onEditCategory={(eventId, competitionId, categoryId, value) =>
          openModal(
            "editCategory",
            eventId,
            competitionId,
            categoryId,
            null,
            value,
          )
        }
        onEditChoice={(eventId, categoryId, choiceId, competitionId, value) =>
          openModal(
            "editChoice",
            eventId,
            competitionId,
            categoryId,
            choiceId,
            value,
          )
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
    name: data.eventName,
    competitions:
      data.competitions?.map((comp) => ({
        id: comp.id,
        name: comp.competitionName,
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
      name: cat.categoryName,
      choices:
        cat.choices?.map((choice) => ({
          id: choice.id,
          name: choice.choiceName || choice.name,
        })) || [],
      subCategories: [],
      parentCategoryId: cat.parentCategoryId,
    };
  });

  categories.forEach((cat) => {
    if (cat.parentCategoryId) {
      map[cat.parentCategoryId]?.subCategories.push(map[cat.id]);
    } else {
      roots.push(map[cat.id]);
    }
  });

  return roots;
}
