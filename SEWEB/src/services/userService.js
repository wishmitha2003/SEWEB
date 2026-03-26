import { api } from './apiClient';

export async function getUsers() {
  return api.get('/api/users');
}

export async function deleteUser(id) {
  if (!id) throw new Error('User id is required');
  return api.del(`/api/users/${id}`);
}

export default { getUsers, deleteUser };