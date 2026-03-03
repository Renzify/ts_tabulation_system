import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useEventStore = create((set, get) => ({
  allEvents: [],
  allChoices: [],
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

  getAllChoice: async () => {
    try {
      const res = await axiosInstance.get("/choice");
      set({ allChoices: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));
