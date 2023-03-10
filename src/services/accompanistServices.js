import apiClient from "@/services/services.js";

export default {
  getAll() {
    return apiClient.get("/accompanist");
  },
//  getAllForUser(userId) { -----------> getComposerForSong?
//    return apiClient.get("/accompanist/userTut/" + userId);
  //},
  get(id) {
    return apiClient.get(`/accompanist/${id}`);
  },
  create(data) {
    return apiClient.post("/accompanist", data);
  },
  update(id, data) {
    return apiClient.put(`/accompanist/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/accompanist/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/accompanist`);
  },
  findByLastName(lastName) {
    return apiClient.get(`/accompanist?lastName=${lastName}`);
  },
};
