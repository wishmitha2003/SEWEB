import axios from 'axios';

const API_BASE_URL = 'http://localhost:8082';

// Create axios instance with credentials
const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ezy_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Student: Create a new payment
export async function createPayment(paymentData, slipFile) {
  const formData = new FormData();
  
  // Add payment data fields directly (not as JSON string)
  formData.append('amount', paymentData.amount);
  formData.append('paymentType', paymentData.paymentType);
  formData.append('classId', paymentData.classId || '');
  formData.append('className', paymentData.className || '');
  formData.append('paymentMethod', paymentData.paymentMethod);
  
  // Add slip image if provided
  if (slipFile) {
    formData.append('slipImage', slipFile);
  }
  
  return axiosClient.post('/api/payments', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
}

// Student: Get my payments
export async function getMyPayments() {
  return axiosClient.get('/api/payments/my');
}

// Admin: Get all payments
export async function getAllPayments(statusFilter = null) {
  const query = statusFilter ? `?status=${statusFilter}` : '';
  return axiosClient.get(`/api/payments${query}`);
}

// Admin: Get pending payments
export async function getPendingPayments() {
  return axiosClient.get('/api/payments/pending');
}

// Admin: Approve payment
export async function approvePayment(paymentId, notes = '') {
  return axiosClient.put(`/api/payments/${paymentId}/approve?notes=${notes}`);
}

// Admin: Reject payment
export async function rejectPayment(paymentId, notes = '') {
  return axiosClient.put(`/api/payments/${paymentId}/reject?notes=${notes}`);
}

export default {
  createPayment,
  getMyPayments,
  getAllPayments,
  getPendingPayments,
  approvePayment,
  rejectPayment
};