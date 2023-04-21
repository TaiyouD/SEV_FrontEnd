import apiClient from "@/services/services.js";

export default {
  getAll() {
    return apiClient.get("/notification");
  },
  get(id) {
    return apiClient.get(`/notification/${id}`);
  },
  getNotificationsForRole(roleId) {
    return apiClient.get(`/notification/role/${roleId}`);
  },
  create(data) {
    return apiClient.post("/notification", data);
  },
  update(id, data) {
    return apiClient.put(`/notification/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/notification/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/notification`);
  }
};