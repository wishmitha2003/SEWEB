import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { FormInput } from '../components/ui/FormInput';
import { SettingsIcon, UserIcon, LockIcon, CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
import { api } from '../services/apiClient';
import { useAuth } from '../context/AuthContext';
import { studentSidebarItems } from '../config/studentSidebarItems.jsx';

export function SettingsPage() {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('edit-profile'); // 'edit-profile' or 'reset-password'
  
  // Edit Profile States
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    profileImageUrl: ''
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileFetchLoading, setProfileFetchLoading] = useState(true);
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');
  
  // Reset Password States
  const [resetStep, setResetStep] = useState(1); // 1: Send OTP, 2: New Password
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (activeTab === 'edit-profile') {
      fetchUserProfile();
    }
  }, [activeTab]);

  const fetchUserProfile = async () => {
    setProfileFetchLoading(true);
    setProfileError('');
    try {
      const response = await api.get('/api/auth/me');
      const userData = response.user || response;
      
      // If API returns firstName/lastName, use them; otherwise split fullName
      let firstName = userData.firstName || '';
      let lastName = userData.lastName || '';
      
      if (!firstName && !lastName && user?.fullName) {
        const nameParts = user.fullName.trim().split(' ');
        firstName = nameParts[0] || '';
        lastName = nameParts.slice(1).join(' ') || '';
      }
      
      setProfileData({
        firstName,
        lastName,
        phone: userData.phone || user?.phone || '',
        address: userData.address || '',
        profileImageUrl: userData.profileImageUrl || userData.profileImage || ''
      });
    } catch (err) {
      setProfileError('Failed to load profile data. Please try again.');
    } finally {
      setProfileFetchLoading(false);
    }
  };

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileError('');
    setProfileSuccess('');
    setProfileLoading(true);

    try {
      const response = await api.put('/api/auth/update-profile', {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phone: profileData.phone,
        address: profileData.address,
        profileImageUrl: profileData.profileImageUrl
      });

      // Update local user data
      updateUser({
        fullName: `${profileData.firstName} ${profileData.lastName}`.trim(),
        phone: profileData.phone,
        profileImage: profileData.profileImageUrl
      });

      setProfileSuccess(response.message || 'Profile updated successfully!');
    } catch (err) {
      setProfileError(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setProfileLoading(false);
    }
  };

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
          <h2 className="text-lg font-bold text-slate-900 mb-6">Edit Profile</h2>

          {/* Error Message */}
          {profileError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex gap-3">
              <AlertCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{profileError}</p>
            </div>
          )}

          {/* Success Message */}
          {profileSuccess && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex gap-3">
              <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-700">{profileSuccess}</p>
            </div>
          )}

          {profileFetchLoading ? (
            <div className="text-center py-8">
              <div className="text-slate-500">Loading profile data...</div>
            </div>
          ) : (
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              {/* Email - Read Only */}
              <FormInput
                label="Email/User Name"
                type="email"
                value={user?.email || ''}
                readOnly
                className="bg-slate-50"
                helperText="Email cannot be changed"
              />

              {/* First Name */}
              <FormInput
                label="First Name"
                name="firstName"
                type="text"
                value={profileData.firstName}
                onChange={handleProfileInputChange}
                placeholder="Enter your first name"
                required
              />

              {/* Last Name */}
              <FormInput
                label="Last Name"
                name="lastName"
                type="text"
                value={profileData.lastName}
                onChange={handleProfileInputChange}
                placeholder="Enter your last name"
                required
              />

              {/* Phone */}
              <FormInput
                label="Phone"
                name="phone"
                type="tel"
                value={profileData.phone}
                onChange={handleProfileInputChange}
                placeholder="Enter your phone number"
              />

              {/* Address */}
              <FormInput
                label="Address"
                name="address"
                type="text"
                value={profileData.address}
                onChange={handleProfileInputChange}
                placeholder="Enter your address"
              />

              {/* Profile Picture URL */}
              <FormInput
                label="Profile Picture URL"
                name="profileImageUrl"
                type="url"
                value={profileData.profileImageUrl}
                onChange={handleProfileInputChange}
                placeholder="Enter profile picture URL"
              />

              {/* Profile Picture Preview */}
              {profileData.profileImageUrl && (
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-blue-600 border-2 border-white shadow-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={profileData.profileImageUrl}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full flex items-center justify-center hidden">
                      <span className="text-white text-lg font-black">
                        {profileData.firstName.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Preview</p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={profileLoading}
                className="w-full"
              >
                {profileLoading ? 'Updating...' : 'Update Profile'}
              </Button>
            </form>
          )}
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
