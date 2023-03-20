import apiClient from "@/services/services.js";

export default {
  getAll() {
    return apiClient.get("/composer");
  },
//  getAllForUser(userId) { -----------> getComposerForSong?
//    return apiClient.get("/composer/userTut/" + userId);
  //},
  get(id) {
    return apiClient.get(`/composer/${id}`);
  },
  create(data) {
    return apiClient.post("/composer", data);
  },
  update(id, data) {
    return apiClient.put(`/composer/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/composer/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/composer`);
  },
  findByLastName(lastName) {
    return apiClient.get(`/composer?lastName=${lastName}`);
  },
};