import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { UserIcon } from 'lucide-react';
import { api } from '../services/apiClient';
import { useAuth } from '../context/AuthContext';

const sidebarItems = [
  {
    icon: <UserIcon className="w-4 h-4" />,
    label: 'Profile',
    path: '/profile'
  }
];

export function ProfilePage() {
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    profileImageUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/api/auth/me');
      const data = response.user || response;
      
      // If API returns firstName/lastName, use them; otherwise split fullName
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

  if (loading) {
    return (
      <DashboardLayout sidebarItems={sidebarItems}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-slate-500">Loading profile...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Profile</h1>
        <p className="text-slate-600 mt-1">View your account information</p>
      </div>

      <Card className="max-w-2xl">
        <div className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
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
                  <span className="text-white text-2xl font-black">
                    {userData.firstName.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-500 mt-2">Profile Picture</p>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email
              </label>
              <div className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900">
                {userData.email}
              </div>
            </div>

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                First Name
              </label>
              <div className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900">
                {userData.firstName}
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Last Name
              </label>
              <div className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900">
                {userData.lastName}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Phone
              </label>
              <div className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900">
                {userData.phone || 'Not provided'}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Address
              </label>
              <div className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900">
                {userData.address || 'Not provided'}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
}