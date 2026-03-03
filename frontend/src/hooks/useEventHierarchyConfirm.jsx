import { useModalStore } from "../stores/useModalStore";
import { axiosInstance } from "../lib/axios";
import { api } from "../lib/api";

export function useEventHierarchyConfirm({
  eventId,
  setEventData,
  normalizeEvent,
}) {
  const handleConfirm = async (input) => {
    if (input.trim() === "") return;

    const { type, competitionId, categoryId, choiceId, closeModal } =
      useModalStore.getState();

    try {
      switch (type) {
        case "competition":
          await api.createCompetition({
            eveFKey: eventId,
            comNameInput: input,
            comDescInput: "",
          });
          break;

        case "category":
          await api.createCategory({
            comFKey: competitionId,
            catNameInput: input,
            catDescInput: "",
            parentCategoryId: null,
          });
          break;

        case "subCategory":
          await api.createCategory({
            comFKey: competitionId,
            catNameInput: input,
            catDescInput: "",
            parentCategoryId: categoryId,
          });
          break;

        case "choice":
          await api.createChoice({
            catFKey: categoryId,
            choNameInput: input,
            choDescInput: "",
            noJudgesInput: 1,
          });
          break;

        case "editEvent":
          await api.updateEvent(eventId, {
            eveId: eventId,
            eveNameInput: input,
          });
          break;

        case "editCompetition":
          await api.updateCompetition(competitionId, {
            comId: competitionId,
            comNameInput: input,
          });
          break;

        case "editCategory":
          await api.updateCategory(categoryId, {
            catId: categoryId,
            catNameInput: input,
          });
          break;

        case "editChoice":
          await api.updateChoice(choiceId, {
            choId: choiceId,
            choNameInput: input,
          });
          break;

        default:
          console.warn("Unhandled modal type:", type);
          return;
      }

      // ✅ Always refetch after mutation
      const res = await axiosInstance.get(`/event/full/${eventId}`);
      setEventData(normalizeEvent(res.data));

      closeModal();
    } catch (error) {
      console.error("API error:", error);
      alert("Failed to save item!");
    }
  };

  return { handleConfirm };
}
