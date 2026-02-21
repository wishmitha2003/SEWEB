import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Sidebar({
  items = [],
}) {
  const { user, logout } = useAuth();
  const userName = user?.fullName || 'User';
  const userRole = user?.role || 'Student';
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    if(confirm('Are you sure you want to log out?')) {
      logout();
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Home & Collapse Toggle */}
      <div className="p-3 border-b border-slate-100 flex items-center gap-2">
        {!collapsed && (
          <Link
            to="/"
            className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl text-blue-600 bg-blue-50 font-bold hover:bg-blue-100 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
        )}
        <button
          className={`p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors flex-shrink-0 ${collapsed ? 'w-full flex justify-center' : ''}`}
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* User Profile - Only shown on Mobile Sidebar or when very necessary */}
      <div className={`p-3 border-b border-slate-100 lg:hidden flex items-center gap-3`}>
        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {user?.profileImage ? (
            <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-white text-sm font-bold">
              {userName.charAt(0)}
            </span>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900 truncate">{userName}</p>
          <p className="text-xs text-slate-500">{userRole}</p>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-200
                ${collapsed ? 'justify-center' : ''}
                ${isActive ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
              `}
              title={collapsed ? item.label : undefined}
            >
              <span className={`flex-shrink-0 transition-transform duration-200 ${collapsed ? 'scale-125' : ''}`}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-100">
        <button
          onClick={handleLogout}
          className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
            text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors
            ${collapsed ? 'justify-center' : ''}
          `}
        >
          <LogOut className={`transition-transform duration-200 ${collapsed ? 'w-5 h-5 scale-110' : 'w-4 h-4'}`} />
          {!collapsed && <span>Log Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-md text-slate-600 hover:bg-slate-50 transition-colors"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`
          lg:hidden fixed top-0 left-0 z-40 h-full w-64 bg-white border-r border-slate-100 shadow-xl
          transition-transform duration-300
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={`
          hidden lg:flex flex-col h-screen bg-white border-r border-slate-100 sticky top-0
          transition-all duration-300
          ${collapsed ? 'w-[72px]' : 'w-64'}
        `}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
