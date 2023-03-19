import apiClient from "@/services/services.js";

export default {
  getAllCritique(eventsessionId) {
    return apiClient.get(`/eventsessions/${eventsessionId}/critique`);
  },
  getCritique(eventsessionId, id) {
    return apiClient.get(`/eventsessions/${eventsessionId}/critique/${id}`);
  },
  createCritique(eventsessionId, data) {
    return apiClient.post(`/eventsessions/${eventsessionId}/critique`, data);
  },
  updateCritique(eventsessionId, id, data) {
    return apiClient.put(`/eventsessions/${eventsessionId}/critique/${id}`, data);
  },
  deleteCritique(eventsessionId, id) {
    return apiClient.delete(`/eventsessions/${eventsessionId}/critique/${id}`);
  },
};
