import { api } from './apiClient';

export async function getMaterials() {
  return api.get('/api/materials');
}

export async function createMaterial(materialData, files) {
  if (!materialData.title) throw new Error('Material title is required');
  
  const formData = new FormData();
  formData.append('material', new Blob([JSON.stringify(materialData)], { type: 'application/json' }));
  
  if (files && files.length > 0) {
    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }
  }

  // Passing undefined to 'data' in request() and using customOptions for body
  return api.post('/api/materials', formData, { headers: { 'Content-Type': undefined } });
}

export async function deleteMaterial(id) {
  if (!id) throw new Error('Material id is required');
  return api.del(`/api/materials/${id}`);
}

export default { getMaterials, createMaterial, deleteMaterial };
