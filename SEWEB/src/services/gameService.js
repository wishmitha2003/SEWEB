import { apiClient } from './apiClient';

export const gameService = {
  async getGameData(gameId) {
    try {
      const response = await apiClient.get(`/api/games/play/${gameId}`);
      return response.data || response;
    } catch (error) {
      console.error('Error fetching game data:', error);
      throw error;
    }
  },

  async submitGameResult(gameId, score, correctCount, wrongCount) {
    try {
      const response = await apiClient.post(`/api/games/submit`, {
        gameId,
        score,
        correctCount,
        wrongCount,
      });
      return response.data || response;
    } catch (error) {
      console.error('Error submitting game result:', error);
      throw error;
    }
  },
};
