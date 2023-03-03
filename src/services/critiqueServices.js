import apiClient from "@/services/services.js";

export default {
  getAll() {
    return apiClient.get("/critique");
  },
  getAllForUser(userId) {
    return apiClient.get("/critique/user/" + userId);
  },
  get(id) {
    return apiClient.get(`/critique/${id}`);
  },
  create(data) {
    return apiClient.post("/critique", data);
  },
  update(id, data) {
    return apiClient.put(`/critique/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/critique/${id}`);
  },
//   deleteAll() {
//     return apiClient.delete(`/critique`);
//   },
  findByTitle(title) {
    return apiClient.get(`/critique?title=${title}`);
  },
};