import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CameraIcon, SaveIcon, MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { api } from '../services/apiClient';
import { useAuth } from '../context/AuthContext';
import { studentSidebarItems } from '../config/studentSidebarItems.jsx';

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const [userData, setUserData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    address: '',
    city: 'Colombo',
    postalCode: '',
    country: 'Sri Lanka'
  });
  
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserProfile = async () => {
    setError('');
    try {
      const response = await api.get('/api/auth/me');
      const data = response.user || response;

      let fullName = data.fullName || user?.fullName || '';
      if (!fullName && data.firstName) {
        fullName = `${data.firstName} ${data.lastName || ''}`.trim();
      }

      setUserData({
        fullName: fullName || '',
        username: data.username || user?.username || '',
        email: data.email || user?.email || '',
        phone: data.phone || user?.phone || '',
        address: data.address || '',
        city: data.city || 'Colombo',
        postalCode: data.postalCode || '',
        country: data.country || 'Sri Lanka'
      });
      if (data.profileImageUrl || data.profileImage) {
        setProfileImage(data.profileImageUrl || data.profileImage);
      }
    } catch (err) {
      const message = err?.message || '';
      if (!message) {
        // eslint-disable-next-line no-console
        console.error('Failed to load profile data', err);
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
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
    setSaving(true);

    try {
      const parts = userData.fullName.trim().split(' ');
      const firstName = parts[0] || '';
      const lastName = parts.slice(1).join(' ') || '';

      await api.put('/api/auth/update-profile', {
        firstName,
        lastName,
        phone: userData.phone,
        address: userData.address,
        profileImageUrl: profileImage
      });

      updateUser({
        fullName: userData.fullName,
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        city: userData.city,
        postalCode: userData.postalCode,
        country: userData.country,
        profileImage
      });

      alert('Profile updated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const roleLabel = user?.role || 'STUDENT';

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
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Edit Profile</h1>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Profile Summary */}
        <Card className="lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6 mt-4">
              <div className="w-40 h-40 rounded-full border-4 border-white shadow-xl overflow-hidden bg-[#78bdeb] flex items-center justify-center">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-6xl font-black text-white">{getInitials(userData.fullName)}</span>
                )}
              </div>
              <label className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center cursor-pointer shadow-lg hover:bg-blue-700 transition-all border-2 border-white opacity-0 hover:opacity-100">
                <CameraIcon className="w-5 h-5" />
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">{userData.username || user?.username || userData.fullName || 'User'}</h3>
            <Badge variant="info" className="uppercase tracking-widest text-[#1e40af] bg-[#eff6ff] border-[#bfdbfe]">{roleLabel}</Badge>

            <div className="mt-8 space-y-3 w-full">
              <div className="flex items-center gap-3 px-4 py-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <MailIcon className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-700 font-medium">{userData.email || 'Not provided'}</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <PhoneIcon className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-500">{userData.phone || 'Not provided'}</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <MapPinIcon className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-500">{userData.address || 'Not provided'}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Right Column: Edit Profile Information */}
        <Card className="lg:col-span-2">
          <div className="p-2">
            <h2 className="text-lg font-extrabold text-slate-900 mb-6">Edit Profile Information</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={userData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Identity Card No</label>
                  <input
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                    placeholder="e.g. 199012345678"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Email/User Name</label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                    placeholder="+94 77..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Residential Address</label>
                <input
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={userData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={userData.postalCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={userData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-slate-200 mt-6">
                <Button
                  type="submit"
                  disabled={saving}
                  size="lg"
                  icon={<SaveIcon className="w-4 h-4" />}
                >
                  {saving ? 'SAVING...' : 'SAVE CHANGES'}
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/student')}
                >
                  BACK TO DASHBOARD
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}