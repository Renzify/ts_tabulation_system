import axios from "axios";

const API_BASE = "http://localhost:3000/api"; // adjust to your backend URL

export const api = {
  createEvent: (data) => axios.post(`${API_BASE}/event`, data),
  createCompetition: (data) => axios.post(`${API_BASE}/competition`, data),
  createCategory: (data) => axios.post(`${API_BASE}/category`, data),
  createChoice: (data) => axios.post(`${API_BASE}/choice`, data),
  createJudge: (data) => axios.post(`${API_BASE}/judge`, data),
  createContestant: (data) => axios.post(`${API_BASE}/contestant`, data),
  createCriteria: (data) => axios.post(`${API_BASE}/criterion`, data),
  createScore: (data) => axios.post(`${API_BASE}/score`, data),
};
