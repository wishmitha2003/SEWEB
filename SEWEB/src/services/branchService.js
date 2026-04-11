import { api } from './apiClient';

export async function getBranches() {
  return api.get('/api/branches');
}

export async function createBranch(branchData) {
  return api.post('/api/branches', branchData);
}

export async function updateBranch(id, branchData) {
  return api.put(`/api/branches/${id}`, branchData);
}

export async function uploadBranchLogo(id, logoFile) {
  const formData = new FormData();
  formData.append('logo', logoFile);
  return api.patch(`/api/branches/${id}/logo`, formData);
}

export async function deleteBranch(id) {
  return api.del(`/api/branches/${id}`);
}

export default {
  getBranches,
  createBranch,
  updateBranch,
  uploadBranchLogo,
  deleteBranch
};
