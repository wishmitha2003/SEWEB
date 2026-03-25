import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { FormInput } from '../components/ui/FormInput';
import { api } from '../services/apiClient';
import { useAuth } from '../context/AuthContext';
import { studentSidebarItems } from '../config/studentSidebarItems.jsx';

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    profileImageUrl: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserProfile = async () => {
    setError('');
    try {
      const response = await api.get('/api/auth/me');
      const data = response.user || response;

      let firstName = data.firstName || '';
      let lastName = data.lastName || '';

      if (!firstName && !lastName && user?.fullName) {
        const nameParts = user.fullName.trim().split(' ');
        firstName = nameParts[0] || '';
        lastName = nameParts.slice(1).join(' ') || '';
      }

      setUserData({
        firstName,
        lastName,
        phone: data.phone || user?.phone || '',
        email: data.email || user?.email || '',
        address: data.address || '',
        profileImageUrl: data.profileImageUrl || data.profileImage || ''
      });
    } catch (err) {
      setError('Failed to load profile data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      const response = await api.put('/api/auth/update-profile', {
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        address: userData.address,
        profileImageUrl: userData.profileImageUrl
      });

      updateUser({
        fullName: `${userData.firstName} ${userData.lastName}`.trim(),
        phone: userData.phone,
        profileImage: userData.profileImageUrl
      });

      setSuccess(response.message || 'Profile updated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const fullName = `${userData.firstName} ${userData.lastName}`.trim() || user?.fullName || 'Your Name';
  const initial = (userData.firstName || user?.fullName || 'U').charAt(0).toUpperCase();
  const roleLabel = user?.role || 'Student';

  if (loading) {
    return (
      <DashboardLayout sidebarItems={studentSidebarItems}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-slate-500">Loading profile...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout sidebarItems={studentSidebarItems}>
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-extrabold text-slate-900">Profile Settings</h1>
        <p className="text-slate-500">Manage your personal information and account details.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] xl:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
        {/* Left summary card */}
        <Card className="h-full">
          <div className="p-6 flex flex-col items-center text-center gap-4">
            <div className="w-24 h-24 rounded-full bg-blue-600 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
              {userData.profileImageUrl ? (
                <img
                  src={userData.profileImageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className={`w-full h-full flex items-center justify-center ${userData.profileImageUrl ? 'hidden' : ''}`}>
                <span className="text-white text-2xl font-black">{initial}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">{fullName}</h2>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                {roleLabel}
              </span>
            </div>

            <div className="w-full pt-2 border-t border-slate-100 mt-2 space-y-2 text-left text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-slate-500">Email</span>
                <span className="font-medium text-slate-900 truncate max-w-[60%]">
                  {userData.email || user?.email || 'Not set'}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-slate-500">Phone</span>
                <span className="font-medium text-slate-900 truncate max-w-[60%]">
                  {userData.phone || 'Not provided'}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-slate-500">Address</span>
                <span className="font-medium text-slate-900 truncate max-w-[60%]">
                  {userData.address || 'Not provided'}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Right form card */}
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Edit Profile</h2>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                label="Email"
                type="email"
                value={userData.email || user?.email || ''}
                readOnly
                className="bg-slate-50"
                helperText="Email cannot be changed"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FormInput
                  label="First Name"
                  name="firstName"
                  type="text"
                  value={userData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  required
                />
                <FormInput
                  label="Last Name"
                  name="lastName"
                  type="text"
                  value={userData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  required
                />
              </div>

              <FormInput
                label="Phone"
                name="phone"
                type="tel"
                value={userData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />

              <FormInput
                label="Address"
                name="address"
                type="text"
                value={userData.address}
                onChange={handleChange}
                placeholder="Enter your address"
              />

              <FormInput
                label="Profile Picture URL"
                name="profileImageUrl"
                type="url"
                value={userData.profileImageUrl}
                onChange={handleChange}
                placeholder="Enter profile picture URL"
              />

              {userData.profileImageUrl && (
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-blue-600 border-2 border-white shadow-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={userData.profileImageUrl}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full flex items-center justify-center hidden">
                      <span className="text-white text-lg font-black">{initial}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Preview</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={saving}
                  className="flex-1"
                >
                  {saving ? 'Saving changes...' : 'Save Changes'}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => navigate('/student')}
                >
                  Back to Dashboard
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}