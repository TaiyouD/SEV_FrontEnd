import apiClient from "@/services/services.js";

export default {
  getAll() {
    return apiClient.get("/availability");
  },
  getAllForUser(userId) { //if someone needs this one, lemme know so I can create on the backend
    return apiClient.get("/availability/user/" + userId);
  },
  get(id) {
    return apiClient.get(`/availability/${id}`);
  },
  create(data) {
    return apiClient.post("/availability", data);
  },
  update(id, data) {
    return apiClient.put(`/availability/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/availability/${id}`);
  },
//   deleteAll() {
//     return apiClient.delete(`/availability`);
//   },
};