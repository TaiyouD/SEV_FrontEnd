import apiClient from "@/services/services.js";

export default {
  getAll() {
    return apiClient.get("/eventsessions");
  },
  getAllForRole(userId) {//lemme know if it works
    return apiClient.get("/eventsessions/" + userId);
  },
  getAllForEvent(eventId) {//lemme know if it works
    return apiClient.get("/eventsessions/events/" + eventId);
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
};
