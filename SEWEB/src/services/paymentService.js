import { api } from './apiClient';

// Student: Create a new payment
export async function createPayment(paymentData, slipFile) {
  const formData = new FormData();
  
  // Add payment data fields directly
  formData.append('amount', paymentData.amount);
  formData.append('paymentType', paymentData.paymentType);
  formData.append('classId', paymentData.classId || '');
  formData.append('className', paymentData.className || '');
  formData.append('paymentMethod', paymentData.paymentMethod);
  
  // Add slip image if provided
  if (slipFile) {
    formData.append('slipImage', slipFile);
  }
  
  return api.post('/api/payments', formData);
}

// Student: Get my payments
export async function getMyPayments() {
  return api.get('/api/payments/my');
}

// Admin: Get all payments
export async function getAllPayments(statusFilter = null) {
  const query = statusFilter ? `?status=${statusFilter}` : '';
  return api.get(`/api/payments${query}`);
}

// Admin: Get pending payments
export async function getPendingPayments() {
  return api.get('/api/payments/pending');
}

// Admin: Approve payment
export async function approvePayment(paymentId, notes = '') {
  return api.put(`/api/payments/${paymentId}/approve?notes=${notes}`);
}

// Admin: Reject payment
export async function rejectPayment(paymentId, notes = '') {
  return api.put(`/api/payments/${paymentId}/reject?notes=${notes}`);
}

export default {
  createPayment,
  getMyPayments,
  getAllPayments,
  getPendingPayments,
  approvePayment,
  rejectPayment
};