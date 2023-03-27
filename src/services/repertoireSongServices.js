import apiClient from "@/services/services.js";

export default {
  getAllForUser(userId) {
    return apiClient.get("/repertoireSong/user/" + userId);
  },
  get(id) {
    return apiClient.get(`/repertoireSong/${id}`);
  },/*
  createRepSong(userId, data) {
    return apiClient.post(`/users/${userId}/repertoireSong`, data);
  },*/
  create(data) {
    return apiClient.post("/repertoireSong", data);
  },
  update(id, data) {
    return apiClient.put(`/repertoireSong/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/repertoireSong/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/repertoireSong`);
  },
  findByTitle(title) {
    return apiClient.get(`/repertoireSong?title=${title}`);
  },
};
