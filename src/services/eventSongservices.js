import apiClient from "@/services/services.js";

export default {
  getAll() { 
    return apiClient.get("/eventsongs");
  },
  getAllForUser(userId) { //lemme know if need this so I can add on the backend
    return apiClient.get("/eventsongs/user/" + userId);
  },
  get(id) {
    return apiClient.get(`/eventsongs/${id}`);
  },
  create(data) {
    return apiClient.post("/eventsongs", data);
  },
  update(id, data) {
    return apiClient.put(`/eventsongs/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/eventsongs/${id}`);
  },
//   deleteAll() {
//     return apiClient.delete(`/eventsong`);
//   },
};