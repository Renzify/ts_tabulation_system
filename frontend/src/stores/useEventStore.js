import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useEventStore = create((set, get) => ({
  allEvents: [],
  allCompetitions: [],
  allCategories: [],
  allChoices: [],
  allJudges: [],
  allContestants: [],
  allLeaderboard: [],

  selectedEvent: null,
  selectedChoice: null,

  setSelectedEvent: (selectedEvent) => set({ selectedEvent }),

  setSelectedChoice: (selectedChoice) => set({ selectedChoice }),

  getAllEvents: async () => {
    try {
      const res = await axiosInstance.get("/event");
      set({ allEvents: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  getAllCompetitions: async () => {
    try {
      const res = await axiosInstance.get("/competition");
      set({ allCompetitions: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  getAllCategory: async () => {
    try {
      const res = await axiosInstance.get("/category");
      set({ allCategories: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  getAllChoices: async () => {
    try {
      const res = await axiosInstance.get("/choice");
      set({ allChoices: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  getAllJudges: async () => {
    try {
      const res = await axiosInstance.get("/judge");
      set({ allJudges: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  getAllContestants: async () => {
    try {
      const res = await axiosInstance.get("/contestant");
      set({ allContestants: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  getLeaderboardByChoice: async (choiceId) => {
    try {
      const res = await axiosInstance.get(`/leaderboard/${choiceId}`);
      set({ allLeaderboard: res.data });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load leaderboard",
      );
    }
  },

  initializeEventData: async (eventId) => {
    const {
      getAllEvents,
      getAllCompetitions,
      getAllCategory,
      getAllChoices,
      allEvents,
      setSelectedEvent,
    } = get();

    // Load all base data
    await Promise.all([
      getAllEvents(),
      getAllCompetitions(),
      getAllCategory(),
      getAllChoices(),
    ]);

    // Once events are fetched, find and set the selected event
    const foundEvent = get().allEvents.find((e) => e.id === eventId);
    if (foundEvent) {
      setSelectedEvent(foundEvent);
    }
  },

  getDetailsByEvent: (eventId) => {
    const { allCompetitions, allCategories, allChoices } = get();

    return allChoices
      .map((choice) => {
        const category = allCategories.find((c) => c.id === choice.categoryId);
        if (!category) return null;

        const competition = allCompetitions.find(
          (comp) => comp.id === category.competitionId,
        );
        if (!competition || competition.eventId !== eventId) return null;

        const subCategory = category.parentCategoryId
          ? allCategories.find((c) => c.id === category.parentCategoryId)
          : null;

        return {
          id: choice.id,
          competitionName: competition.competitionName,
          categoryName: subCategory
            ? subCategory.categoryName
            : category.categoryName,
          subCategoryName: subCategory ? category.categoryName : null,
          choiceName: choice.choiceName,
        };
      })
      .filter(Boolean);
  },
}));
