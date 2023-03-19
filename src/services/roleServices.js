import apiClient from "@/services/services.js";

export default {
  getAll() {
    return apiClient.get("/roles");
  },
  getAllForUser(userId) {
    return apiClient.get("/roles/user/" + userId);
  },
  get(id) {
    return apiClient.get(`/roles/${id}`);
  },
  create(data) {
    return apiClient.post("/roles", data);
  },
  update(id, data) {
    return apiClient.put(`/roles/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/roles/${id}`);
  },
//   deleteAll() {
//     return apiClient.delete(`/roles`);
//   },
  findByTitle(title) {
    return apiClient.get(`/roles?title=${title}`);
  },
};