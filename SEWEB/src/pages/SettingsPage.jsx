import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { FormInput } from '../components/ui/FormInput';
import { SettingsIcon, UserIcon, LockIcon, CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
import { api } from '../services/apiClient';

const sidebarItems = [
  {
    icon: <SettingsIcon className="w-4 h-4" />,
    label: 'Settings',
    path: '/student/settings'
  }
];

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('reset-password'); // 'edit-profile' or 'reset-password'
  
  // Reset Password States
  const [resetStep, setResetStep] = useState(1); // 1: Send OTP, 2: New Password
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account and preferences.</p>
      </div>

      {/* Settings Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Card
          onClick={() => setActiveTab('edit-profile')}
          hover
          className={`cursor-pointer transition-all ${
            activeTab === 'edit-profile'
              ? 'ring-2 ring-blue-500 bg-blue-50'
              : ''
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <UserIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Edit Profile</h3>
              <p className="text-sm text-slate-500 mt-1">Update your personal information</p>
            </div>
          </div>
        </Card>

        <Card
          onClick={() => setActiveTab('reset-password')}
          hover
          className={`cursor-pointer transition-all ${
            activeTab === 'reset-password'
              ? 'ring-2 ring-blue-500 bg-blue-50'
              : ''
          }`}
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
      </div>

      {/* Edit Profile Section */}
      {activeTab === 'edit-profile' && (
        <Card>
          <div className="text-center py-8">
            <UserIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Edit Profile Coming Soon</h3>
            <p className="text-slate-500">Profile editing functionality will be available soon.</p>
          </div>
        </Card>
      )}

      {/* Reset Password Section */}
      {activeTab === 'reset-password' && (
        <Card>
          <h2 className="text-lg font-bold text-slate-900 mb-6">Reset Password</h2>

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
                  <div className="flex gap-3">
                    <Button
                      variant="secondary"
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
        </Card>
      )}
    </DashboardLayout>
  );
}
