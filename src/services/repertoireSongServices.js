import apiClient from "@/services/services.js";

export default { //howwwwwww
  getAllForUser(userId) {
    return apiClient.get(`${userId}/repertoireSongs`);
  },
  get(id) {
    return apiClient.get(`/repertoireSongs/${id}`);
  },
  create(data) {
    return apiClient.post("/repertoireSongs", data);
  },
  update(id, data) {
    return apiClient.put(`/repertoireSongs/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/repertoireSongs/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/repertoireSongs`);
  },
  findByTitle(title) {
    return apiClient.get(`/repertoireSongs?title=${title}`);
  },
};
