import apiClient from "@/services/services.js";

export default { 
  getAllForUser(userId) {
    return apiClient.get(`/instrumentrole/userPerf/${userId}`);
  },
  get(id) {
    return apiClient.get(`/instrumentrole/${id}`);
  },
  create(data) {
    return apiClient.post("/instrumentrole", data);
  },
  update(id, data) {
    return apiClient.put(`/instrumentrole/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/instrumentrole/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/instrumentrole`);
  }
};