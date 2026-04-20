import { api } from './apiClient';

export async function getVocabularies() {
  return api.get('/api/vocabularies');
}

export async function getVocabulariesByAgeSection(ageSection) {
  return api.get(`/api/vocabularies/age/${ageSection}`);
}

export async function createVocabulary(data) {
  return api.post('/api/vocabularies', data);
}

export async function updateVocabulary(id, data) {
  return api.put(`/api/vocabularies/${id}`, data);
}

export async function deleteVocabulary(id) {
  return api.del(`/api/vocabularies/${id}`);
}

export default {
  getVocabularies,
  getVocabulariesByAgeSection,
  createVocabulary,
  updateVocabulary,
  deleteVocabulary
};