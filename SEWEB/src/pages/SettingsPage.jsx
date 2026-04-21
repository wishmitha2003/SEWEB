import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { FormInput } from '../components/ui/FormInput';
import { Modal } from '../components/ui/Modal';
import { SettingsIcon, UserIcon, LockIcon, CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
import { api } from '../services/apiClient';
import { useAuth } from '../context/AuthContext';
import { studentSidebarItems } from '../config/studentSidebarItems.jsx';

export function SettingsPage() {
  const { user, updateUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false); 
  
  // Reset Password States
  const [resetStep, setResetStep] = useState(1); // 1: Send OTP, 2: New Password
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);



  const resetForm = () => {
    setResetStep(1);
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    setLoading(true);
    try {
      const response = await api.post('/api/auth/send-reset-password-otp', {});
      setSuccess(response.message || 'OTP sent to your email. Please check your inbox.');
      setResetStep(2);
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setSuccess('');
    setResendCooldown(30);

    try {
      const response = await api.post('/api/auth/resend-reset-password-otp', {});
      setSuccess(response.message || 'OTP resent successfully. Please check your email.');
    } catch (err) {
      setError(err.message || 'Failed to resend OTP. Please try again.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!newPassword) {
      setError('Please enter a new password.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (!confirmPassword) {
      setError('Please confirm your password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/api/auth/reset-password-authenticated', {
        otp,
        newPassword
      });
      setSuccess(response.message || 'Password reset successfully! Redirecting...');
      setTimeout(() => {
        resetForm();
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Countdown timer effect
  React.useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  return (
    <DashboardLayout sidebarItems={studentSidebarItems}>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account and preferences.</p>
      </div>

      {/* Settings Navigation */}


        <Card
          onClick={() => setIsModalOpen(true)}
          hover
          className="cursor-pointer transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <LockIcon className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Reset Password</h3>
              <p className="text-sm text-slate-500 mt-1">Change your account password</p>
            </div>
          </div>
        </Card>



      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title="Reset Password"
        size="md"
      >
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex gap-3">
            <AlertCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex gap-3">
            <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-700">{success}</p>
          </div>
        )}

        <form className="space-y-4">
          {/* Step 1: Send OTP */}
          {resetStep === 1 && (
            <Button
              onClick={handleSendOtp}
              loading={loading}
              className="w-full"
            >
              Send OTP
            </Button>
          )}

          {/* Step 2: OTP and New Password */}
          {resetStep >= 2 && (
            <>
              <FormInput
                label="One-Time Password (OTP)"
                type="text"
                placeholder="Enter OTP from your email"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                icon={<LockIcon className="w-4 h-4" />}
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendCooldown > 0 || loading}
                  className={`text-sm font-medium ${
                    resendCooldown > 0 || loading
                      ? 'text-slate-400 cursor-not-allowed'
                      : 'text-blue-600 hover:text-blue-700 cursor-pointer'
                  }`}
                >
                  {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend OTP'}
                </button>
              </div>
              <FormInput
                label="New Password"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                icon={<LockIcon className="w-4 h-4" />}
              />
              <FormInput
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                icon={<LockIcon className="w-4 h-4" />}
              />
              {resetStep === 2 && (
                <div className="flex gap-3 mt-6">
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => {
                      setResetStep(1);
                      setOtp('');
                      setNewPassword('');
                      setConfirmPassword('');
                    }}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleResetPassword}
                    loading={loading}
                    className="flex-1"
                  >
                    Reset Password
                  </Button>
                </div>
              )}
            </>
          )}
        </form>
      </Modal>
    </DashboardLayout>
  );
}
