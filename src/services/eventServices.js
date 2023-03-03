import apiClient from "@/services/services.js";

export default {
  getAll() {
    return apiClient.get("/events");
  },
  getAllForUser(userId) {
    return apiClient.get("/events/user/" + userId);
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
  findByTitle(title) {
    return apiClient.get(`/events?title=${title}`);
  },
};