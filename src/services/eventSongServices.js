import apiClient from "@/services/services.js";

export default {
  getAll() {
    return apiClient.get("/eventsong");
  },
  getAllForUser(userId) {
    return apiClient.get("/eventsong/user/" + userId);
  },
  get(id) {
    return apiClient.get(`/eventsong/${id}`);
  },
  create(data) {
    return apiClient.post("/eventsong", data);
  },
  update(id, data) {
    return apiClient.put(`/eventsong/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/eventsong/${id}`);
  },
//   deleteAll() {
//     return apiClient.delete(`/eventsong`);
//   },
  findByTitle(title) {
    return apiClient.get(`/eventsong?title=${title}`);
  },
};