import { api } from './apiClient';

const missionService = {
  getDailyMissions: async () => {
    try {
      return await api.get('/api/missions/daily');
    } catch (error) {
      console.error('Error fetching daily missions:', error);
      throw error;
    }
  },

  claimReward: async (missionId) => {
    try {
      return await api.post(`/api/missions/claim/${missionId}`);
    } catch (error) {
      console.error('Error claiming reward:', error);
      throw error;
    }
  }
};

export default missionService;
