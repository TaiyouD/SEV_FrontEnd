import apiClient from "@/services/services.js";

export default {
  getAll() {
    return apiClient.get("/level");
  },
  get(id) {
    return apiClient.get(`/level/${id}`);
  },
  create(data) {
    return apiClient.post("/level", data);
  },
  update(id, data) {
    return apiClient.put(`/level/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/level/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/level`);
  },
};
