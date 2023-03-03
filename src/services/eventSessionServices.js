import apiClient from "@/services/services.js";

export default {
  getAll() {
    return apiClient.get("/eventsessions");
  },
  getAllForUser(userId) {
    return apiClient.get("/eventsessions/user/" + userId);
  },
  get(id) {
    return apiClient.get(`/eventsessions/${id}`);
  },
  create(data) {
    return apiClient.post("/eventsessions", data);
  },
  update(id, data) {
    return apiClient.put(`/eventsessions/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/eventsessions/${id}`);
  },
//   deleteAll() {
//     return apiClient.delete(`/eventsessions`);
//   },
  findByTitle(title) {
    return apiClient.get(`/eventsessions?title=${title}`);
  },
};