import { api } from './apiClient';

export async function getClasses() {
  return api.get('/api/classes');
}

export async function createClass(classData) {
  if (!classData.name) throw new Error('Class name is required');
  return api.post('/api/classes', classData);
}

export async function deleteClass(id) {
  if (!id) throw new Error('Class id is required');
  return api.del(`/api/classes/${id}`);
}

export default { getClasses, createClass, deleteClass };
