import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useEventStore = create((set, get) => ({
  allEvents: [],
  selectedEvent: null,

  setSelectedEvent: (selectedEvent) => set({ selectedEvent }),
}));
