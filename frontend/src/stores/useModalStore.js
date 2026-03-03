// stores/useModalStore.js
import { create } from "zustand";

export const useModalStore = create((set) => ({
  isOpen: false,
  type: null,
  eventId: null,
  competitionId: null,
  categoryId: null,
  choiceId: null,
  defaultValue: "",

  openModal: (
    type,
    eventId = null,
    competitionId = null,
    categoryId = null,
    choiceId = null,
    defaultValue = "",
  ) => {
    console.log("Clickeddd");
    set({
      isOpen: true,
      type,
      eventId,
      competitionId,
      categoryId,
      choiceId,
      defaultValue,
    });
  },

  closeModal: () =>
    set({
      isOpen: false,
      type: null,
      eventId: null,
      competitionId: null,
      categoryId: null,
      choiceId: null,
      defaultValue: "",
    }),
}));
