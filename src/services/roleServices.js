import apiClient from "@/services/services.js";

export default { 
  getRoleForUser(userId) {
    return apiClient.get(`/role/userPerf/${userId}`);
  },
  get(id) {
    return apiClient.get(`/role/${id}`);
  },
  create(data) {
    return apiClient.post("/role", data);
  },
  update(id, data) {
    return apiClient.put(`/role/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/role/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/role`);
  },
  findByTitle(title) {
    return apiClient.get(`/role?title=${title}`);
  }
};