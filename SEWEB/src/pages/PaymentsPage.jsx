import React, { useState, useEffect } from 'react';
import {
  CreditCardIcon,
  CalendarIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  UploadIcon,
  ImageIcon,
  DollarSignIcon,
  BuildingIcon,
  WalletIcon,
  ClockIcon,
  XIcon,
  EyeIcon
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Table } from '../components/ui/Table';
import { Modal } from '../components/ui/Modal';
import { FormInput } from '../components/ui/FormInput';
import { studentSidebarItems } from '../config/studentSidebarItems.jsx';
import { useAuth } from '../context/AuthContext';
import {
  createPayment,
  getMyPayments
} from '../services/paymentService';
import { getClasses } from '../services/classService';

// Bank details for bank transfer
const BANK_DETAILS = {
  bankName: 'Bank of Ceylon',
  accountName: 'SEWEB English Learning',
  accountNumber: '1234567890',
  branch: 'Colombo 07',
  swiftCode: 'BCEYLKLX'
};

const PAYMENT_TYPES = [
  { value: 'CLASS_FEE', label: 'Class Fee' },
  { value: 'OTHER', label: 'Other' }
];

const PAYMENT_METHODS = [
  { value: 'BANK_TRANSFER', label: 'Bank Transfer', icon: BuildingIcon },
  { value: 'ONLINE', label: 'Online Payment', icon: WalletIcon, disabled: true },
  { value: 'CASH', label: 'Cash', icon: DollarSignIcon }
];

export function PaymentsPage() {
  const { user } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState({
    amount: '',
    paymentType: 'CLASS_FEE',
    classId: '',
    paymentMethod: 'BANK_TRANSFER'
  });
  const [slipImage, setSlipImage] = useState(null);
  const [slipPreview, setSlipPreview] = useState(null);
  
  // Data state
  const [classes, setClasses] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Modal state
  const [imageModal, setImageModal] = useState({ open: false, src: '', title: '' });
  const [onlinePaymentModal, setOnlinePaymentModal] = useState(false);
  
  // Active tab
  const [activeTab, setActiveTab] = useState('make-payment');

  useEffect(() => {
    const token = localStorage.getItem('ezy_token');
    if (!token) {
      setError('Please log in to view payments.');
      setLoading(false);
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(''); // Clear any previous errors
      const [classesData, paymentsData] = await Promise.all([
        getClasses(),
        getMyPayments()
      ]);
      setClasses(classesData || []);
      setPayments(paymentsData || []);
    } catch (err) {
      console.error('Error fetching data:', err);
      // Check for various error types
      const status = err.response?.status;
      const errorMessage = err.message || '';
      
      if (status === 401 || errorMessage.includes('401') || errorMessage.includes('unauthorized')) {
        setError('Your session has expired. Please log in again.');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else if (status === 403) {
        setError('You do not have permission to view payments.');
      } else if (status === 0 || errorMessage.includes('Network') || errorMessage.includes('fetch')) {
        setError('Cannot connect to server. Please ensure the backend is running.');
      } else {
        setError('Failed to load data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Reset class selection when payment type changes to OTHER
    if (name === 'paymentType' && value === 'OTHER') {
      setFormData(prev => ({ ...prev, classId: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }
      setSlipImage(file);
      setSlipPreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const removeSlipImage = () => {
    setSlipImage(null);
    if (slipPreview) {
      URL.revokeObjectURL(slipPreview);
      setSlipPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (formData.paymentType === 'CLASS_FEE' && !formData.classId) {
      setError('Please select a class');
      return;
    }

    if (formData.paymentMethod === 'BANK_TRANSFER' && !slipImage) {
      setError('Please upload payment slip for bank transfer');
      return;
    }

    try {
      setSubmitting(true);
      
      // Get selected class name
      const selectedClass = classes.find(c => c.id === formData.classId);
      
      const paymentData = {
        amount: parseFloat(formData.amount),
        paymentType: formData.paymentType,
        classId: formData.classId || '',
        className: selectedClass?.name || '',
        paymentMethod: formData.paymentMethod
      };

      await createPayment(paymentData, slipImage);
      
      setSuccess('Payment submitted successfully! Your payment is pending approval.');
      
      // Reset form
      setFormData({
        amount: '',
        paymentType: 'CLASS_FEE',
        classId: '',
        paymentMethod: 'BANK_TRANSFER'
      });
      removeSlipImage();
      
      // Refresh payments
      fetchData();
      setActiveTab('my-payments');
      
    } catch (err) {
      console.error('Error submitting payment:', err);
      setError(err.message || 'Failed to submit payment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleOnlinePaymentClick = () => {
    setOnlinePaymentModal(true);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      PENDING: { variant: 'warning', label: 'Pending' },
      APPROVED: { variant: 'success', label: 'Approved' },
      REJECTED: { variant: 'danger', label: 'Rejected' }
    };
    const { variant, label } = statusMap[status] || { variant: 'info', label: status };
    return <Badge variant={variant}>{label}</Badge>;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    return `LKR ${parseFloat(amount || 0).toLocaleString('en-LK', { minimumFractionDigits: 2 })}`;
  };

  const getPaymentTypeLabel = (type) => {
    const typeMap = {
      CLASS_FEE: 'Class Fee',
      OTHER: 'Other'
    };
    return typeMap[type] || type;
  };

  const getPaymentMethodLabel = (method) => {
    const methodMap = {
      BANK_TRANSFER: 'Bank Transfer',
      ONLINE: 'Online Payment',
      CASH: 'Cash'
    };
    return methodMap[method] || method;
  };

  const paymentColumns = [
    { 
      key: 'createdAt', 
      header: 'Date', 
      className: 'whitespace-nowrap',
      render: (val) => formatDate(val)
    },
    { 
      key: 'amount', 
      header: 'Amount', 
      className: 'whitespace-nowrap font-semibold',
      render: (val) => formatAmount(val)
    },
    { 
      key: 'paymentType', 
      header: 'Type', 
      className: 'whitespace-nowrap',
      render: (val) => getPaymentTypeLabel(val)
    },
    { 
      key: 'className', 
      header: 'Class Name', 
      className: 'whitespace-nowrap',
      render: (val) => val || '-'
    },
    { 
      key: 'status', 
      header: 'Status', 
      className: 'whitespace-nowrap',
      render: (val) => getStatusBadge(val)
    },
    { 
      key: 'slipImage', 
      header: 'Slip', 
      className: 'whitespace-nowrap',
      render: (val) => val ? (
        <button
          onClick={() => setImageModal({ open: true, src: val, title: 'Payment Slip' })}
          className="p-1.5 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
        >
          <EyeIcon className="w-4 h-4" />
        </button>
      ) : '-'
    }
  ];

  // Calculate stats
  const pendingPayments = payments.filter(p => p.status === 'PENDING');
  const approvedPayments = payments.filter(p => p.status === 'APPROVED');
  const totalPaid = approvedPayments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);

  return (
    <DashboardLayout sidebarItems={studentSidebarItems}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Payments & Billing
            </h1>
            <p className="text-slate-500 mt-1">
              Make payments and view your payment history.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('make-payment')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === 'make-payment'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Make Payment
          </button>
          <button
            onClick={() => setActiveTab('my-payments')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === 'my-payments'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            My Payments
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Make Payment Tab */}
            {activeTab === 'make-payment' && (
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Payment Form */}
                <div className="lg:col-span-2">
                  <Card>
                    <h2 className="text-lg font-bold text-slate-900 mb-6">
                      New Payment
                    </h2>
                    
                    {error && (
                      <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
                        {error}
                      </div>
                    )}
                    
                    {success && (
                      <div className="mb-4 p-3 rounded-lg bg-emerald-50 text-emerald-700 text-sm">
                        {success}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Amount */}
                      <FormInput
                        label="Amount (LKR)"
                        name="amount"
                        type="number"
                        value={formData.amount}
                        onChange={handleInputChange}
                        placeholder="Enter amount"
                        required
                        min="0"
                        step="0.01"
                      />

                      {/* Payment Type */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Payment Type <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="paymentType"
                          value={formData.paymentType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
                        >
                          {PAYMENT_TYPES.map(type => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Class Selection (only for CLASS_FEE) */}
                      {formData.paymentType === 'CLASS_FEE' && (
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Select Class <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="classId"
                            value={formData.classId}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
                          >
                            <option value="">Select a class</option>
                            {classes.map(cls => (
                              <option key={cls.id} value={cls.id}>
                                {cls.name} - LKR {cls.price?.toLocaleString() || '0'}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Payment Method */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Payment Method <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {PAYMENT_METHODS.map(method => {
                            const Icon = method.icon;
                            return (
                              <button
                                key={method.value}
                                type="button"
                                disabled={method.disabled}
                                onClick={() => !method.disabled && setFormData(prev => ({ ...prev, paymentMethod: method.value }))}
                                className={`p-3 rounded-lg border-2 transition-colors flex flex-col items-center gap-2 ${
                                  formData.paymentMethod === method.value
                                    ? 'border-blue-500 bg-blue-50'
                                    : method.disabled
                                    ? 'border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed'
                                    : 'border-slate-200 hover:border-slate-300'
                                }`}
                              >
                                <Icon className={`w-5 h-5 ${
                                  formData.paymentMethod === method.value
                                    ? 'text-blue-600'
                                    : 'text-slate-500'
                                }`} />
                                <span className={`text-xs font-medium ${
                                  formData.paymentMethod === method.value
                                    ? 'text-blue-600'
                                    : 'text-slate-600'
                                }`}>
                                  {method.label}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Slip Upload (for BANK_TRANSFER) */}
                      {formData.paymentMethod === 'BANK_TRANSFER' && (
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Payment Slip <span className="text-red-500">*</span>
                          </label>
                          {slipPreview ? (
                            <div className="relative inline-block">
                              <img
                                src={slipPreview}
                                alt="Payment slip preview"
                                className="max-w-xs max-h-48 rounded-lg border border-slate-200"
                              />
                              <button
                                type="button"
                                onClick={removeSlipImage}
                                className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                              >
                                <XIcon className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <UploadIcon className="w-8 h-8 text-slate-400 mb-2" />
                                <p className="text-sm text-slate-500">
                                  <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-slate-400">PNG, JPG up to 5MB</p>
                              </div>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                              />
                            </label>
                          )}
                        </div>
                      )}

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={submitting}
                      >
                        {submitting ? 'Submitting...' : 'Submit Payment'}
                      </Button>
                    </form>
                  </Card>
                </div>

                {/* Sidebar - Bank Details & Quick Actions */}
                <div className="space-y-6">
                  {/* Bank Details */}
                  <Card>
                    <h3 className="text-md font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <BuildingIcon className="w-5 h-5 text-blue-600" />
                      Bank Transfer Details
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Bank Name</span>
                        <span className="font-semibold text-slate-900">{BANK_DETAILS.bankName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Account Name</span>
                        <span className="font-semibold text-slate-900">{BANK_DETAILS.accountName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Account Number</span>
                        <span className="font-semibold text-slate-900">{BANK_DETAILS.accountNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Branch</span>
                        <span className="font-semibold text-slate-900">{BANK_DETAILS.branch}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">SWIFT Code</span>
                        <span className="font-semibold text-slate-900">{BANK_DETAILS.swiftCode}</span>
                      </div>
                    </div>
                    <p className="mt-4 text-xs text-slate-500">
                      Please upload your payment slip after making the bank transfer.
                    </p>
                  </Card>

                  {/* Online Payment Button */}
                  <Card>
                    <h3 className="text-md font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <WalletIcon className="w-5 h-5 text-blue-600" />
                      Online Payment
                    </h3>
                    <p className="text-sm text-slate-500 mb-4">
                      Pay securely online using credit/debit cards or e-wallets.
                    </p>
                    <Button
                      size="lg"
                      className="w-full"
                      onClick={handleOnlinePaymentClick}
                    >
                      Pay Online
                    </Button>
                  </Card>

                  {/* Quick Stats */}
                  <Card>
                    <h3 className="text-md font-bold text-slate-900 mb-4">
                      Payment Summary
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-2xl bg-amber-100 flex items-center justify-center">
                            <ClockIcon className="w-5 h-5 text-amber-600" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">Pending</p>
                            <p className="text-xs text-slate-500">{pendingPayments.length} payments</p>
                          </div>
                        </div>
                        <span className="font-bold text-amber-600">
                          {formatAmount(pendingPayments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0))}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-2xl bg-emerald-100 flex items-center justify-center">
                            <CheckCircleIcon className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">Approved</p>
                            <p className="text-xs text-slate-500">{approvedPayments.length} payments</p>
                          </div>
                        </div>
                        <span className="font-bold text-emerald-600">
                          {formatAmount(totalPaid)}
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* My Payments Tab */}
            {activeTab === 'my-payments' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <Card className="text-center">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-3">
                      <ClockIcon className="w-6 h-6 text-amber-600" />
                    </div>
                    <p className="text-2xl font-extrabold text-slate-900">{pendingPayments.length}</p>
                    <p className="text-sm text-slate-500">Pending</p>
                  </Card>
                  <Card className="text-center">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                      <CheckCircleIcon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <p className="text-2xl font-extrabold text-slate-900">{approvedPayments.length}</p>
                    <p className="text-sm text-slate-500">Approved</p>
                  </Card>
                  <Card className="text-center">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-3">
                      <DollarSignIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-2xl font-extrabold text-slate-900">{formatAmount(totalPaid)}</p>
                    <p className="text-sm text-slate-500">Total Paid</p>
                  </Card>
                </div>

                {/* Payments Table */}
                <Card>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 mb-1">
                        My Payments
                      </h2>
                      <p className="text-sm text-slate-500">
                        All your payment records.
                      </p>
                    </div>
                  </div>
                  {payments.length > 0 ? (
                    <Table columns={paymentColumns} data={payments} />
                  ) : (
                    <div className="text-center py-12">
                      <CreditCardIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500">No payments yet</p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => setActiveTab('make-payment')}
                      >
                        Make Your First Payment
                      </Button>
                    </div>
                  )}
                </Card>
              </div>
            )}
          </>
        )}

        {/* Image Modal */}
        <Modal
          isOpen={imageModal.open}
          onClose={() => setImageModal({ open: false, src: '', title: '' })}
          title={imageModal.title}
          size="lg"
        >
          <img
            src={imageModal.src}
            alt={imageModal.title}
            className="w-full h-auto rounded-lg"
          />
        </Modal>

        {/* Online Payment Coming Soon Modal */}
        <Modal
          isOpen={onlinePaymentModal}
          onClose={() => setOnlinePaymentModal(false)}
          title="Online Payment"
          size="sm"
        >
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
              <ClockIcon className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Coming Soon!</h3>
            <p className="text-slate-500 mb-6">
              Online payment feature is currently under development. 
              Please use bank transfer or cash payment for now.
            </p>
            <Button onClick={() => setOnlinePaymentModal(false)}>
              Got it
            </Button>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
