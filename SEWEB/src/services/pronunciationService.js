import { api } from './apiClient';

const BASE_URL = 'https://ezyenglishweb.onrender.com';

/**
 * Upload pronunciation recording
 * @param {string} vocabularyId - The vocabulary ID
 * @param {File} audioFile - The audio file (Blob/File)
 * @param {string} status - Status (e.g., 'pending')
 * @returns {Promise} - The response from the API
 */
export async function uploadPronunciation(vocabularyId, audioFile, status = 'pending') {
  const formData = new FormData();
  formData.append('vocabularyId', vocabularyId);
  formData.append('audioFile', audioFile);
  formData.append('status', status);

  const token = localStorage.getItem('ezy_token');
  
  const response = await fetch(`${BASE_URL}/api/pronunciation`, {
    method: 'POST',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: formData,
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    const message = payload?.message || payload?.error || 'Failed to upload pronunciation';
    const err = new Error(message);
    err.status = response.status;
    err.payload = payload;
    throw err;
  }

  return response.json();
}

/**
 * Get existing pronunciation recording for a vocabulary
 * @param {string} vocabularyId - The vocabulary ID
 * @returns {Promise} - The existing recording data
 */
export async function getMyPronunciation(vocabularyId) {
  return api.get(`/api/pronunciation/vocabulary/${vocabularyId}/my`);
}

/**
 * Delete a pronunciation recording
 * @param {string} id - The pronunciation recording ID
 * @returns {Promise} - The response from the API
 */
export async function deletePronunciation(id) {
  return api.del(`/api/pronunciation/${id}`);
}

export default {
  uploadPronunciation,
  getMyPronunciation,
  deletePronunciation,
};