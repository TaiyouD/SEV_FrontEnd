import apiClient from "@/services/services.js";

export default {
  getAll() {
    return apiClient.get("/event");
  },
  get(id) {
    return apiClient.get(`/event/${id}`);
  },
  create(data) {
    return apiClient.post("/event", data);
  },
  update(id, data) {
    return apiClient.put(`/event/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/event/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/event`);
  },
};
