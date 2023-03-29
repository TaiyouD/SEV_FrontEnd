import apiClient from "@/services/services.js";

export default {
  getAll() {
    return apiClient.get("/events");
  },
  get(id) {
    return apiClient.get(`/events/${id}`);
  },
  create(data) {
    return apiClient.post("/events", data);
  },
  update(id, data) {
    return apiClient.put(`/events/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/events/${id}`);
  },
//   deleteAll() {
//     return apiClient.delete(`/events`);
//   },
};
