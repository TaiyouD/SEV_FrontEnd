import apiClient from "@/services/services.js";

export default {
  getAll() {
    return apiClient.get("/instrument");
  },
  get(id) {
    return apiClient.get(`/instrument/${id}`);
  },
  create(data) {
    return apiClient.post("/instrument", data);
  },
  update(id, data) {
    return apiClient.put(`/instrument/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/instrument/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/instrument`);
  },
};