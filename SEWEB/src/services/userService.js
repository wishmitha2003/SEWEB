import { api } from './apiClient';

export async function getUsers() {
  return api.get('/api/users');
}

export async function deleteUser(id) {
  if (!id) throw new Error('User id is required');
  return api.del(`/api/users/${id}`);
}

export async function getCurrentUser() {
  return api.get('/api/auth/me');
}

export async function getLeaderboard() {
  return api.get('/api/users/leaderboard');
}

export default { getUsers, deleteUser, getCurrentUser, getLeaderboard };