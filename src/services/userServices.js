
import apiClient from "@/services/services.js";

export default {
  getAll() {
    return apiClient.get("/user");
  },
  get(id) {
    return apiClient.get(`/user/${id}`);
  },
  create(data) {
    return apiClient.post("/user", data);
  },
  update(id, data) {
    return apiClient.put(`/user/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/user/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/user`);
  },
};