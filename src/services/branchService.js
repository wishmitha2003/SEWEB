import { api } from './apiClient';

export async function getBranches() {
  return api.get('/api/branches');
}

export async function createBranch(branchData) {
  return api.post('/api/branches', branchData);
}

export async function deleteBranch(id) {
  return api.del(`/api/branches/${id}`);
}

export async function updateBranch(id, branchData) {
  return api.put(`/api/branches/${id}`, branchData);
}

export default {
  getBranches,
  createBranch,
  deleteBranch,
  updateBranch
};
