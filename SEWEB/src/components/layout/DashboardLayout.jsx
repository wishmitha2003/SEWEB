import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useAuth } from '../../context/AuthContext';

export function DashboardLayout({
  children,
  sidebarItems,
}) {
  const { user } = useAuth();
  const userName = user?.fullName || 'User';
  const userRole = user?.role || 'Student';

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar items={sidebarItems} />
      <main className="flex-1 min-w-0 relative">
        {/* Desktop Top Profile Section - Fixed at the top right */}
        <Link
          to="/profile"
          className="hidden lg:flex absolute top-6 right-8 items-center gap-3 z-30 bg-white/50 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-200 shadow-sm transition-all hover:bg-white hover:shadow-md cursor-pointer"
        >
          <div className="text-right">
            <p className="text-sm font-bold text-slate-900 leading-none">{userName}</p>
            <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-1">{userRole}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
            {user?.profileImage ? (
              <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-white text-sm font-black">{userName.charAt(0)}</span>
            )}
          </div>
        </Link>

        <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8 max-w-[1400px]">
          {children}
        </div>
      </main>
    </div>
  );
}