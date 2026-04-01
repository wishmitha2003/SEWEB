import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
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
  const navigate = useNavigate();

  const handleLogout = () => {
    if(confirm('Are you sure you want to log out?')) {
      logout();
      navigate('/login');
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 via-blue-950 to-blue-900 text-white">
      {/* Top row: Collapse toggle (desktop) */}
      <div className={`hidden lg:flex items-center px-4 pt-4 pb-2 ${collapsed ? 'justify-center' : 'justify-end'}`}>
        <button
          className="flex items-center justify-center w-10 h-10 rounded-2xl border border-white/15 bg-white/5 text-blue-100 hover:bg-white/10 hover:text-white shadow-lg shadow-slate-950/40 transition-all flex-shrink-0"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* User Profile - Mobile only */}
      <Link
        to="/profile"
        className={`p-4 border-b border-white/5 lg:hidden flex items-center gap-4 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer`}
      >
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-400 p-0.5 shadow-lg shadow-blue-900/40">
          <div className="w-full h-full rounded-[14px] bg-slate-900 flex items-center justify-center overflow-hidden">
            {user?.profileImage ? (
              <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-white text-sm font-black">
                {userName.charAt(0)}
              </span>
            )}
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-white truncate">{userName}</p>
          <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">{userRole}</p>
        </div>
      </Link>

      <nav className="flex-1 px-4 pt-2 pb-4 space-y-1.5 overflow-y-auto custom-scrollbar">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`
                flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold
                transition-all duration-300 relative group
                ${collapsed ? 'justify-center' : ''}
                ${isActive 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/40' 
                  : 'text-blue-200/60 hover:bg-white/5 hover:text-white'}
              `}
              title={collapsed ? item.label : undefined}
            >
              <span className={`flex-shrink-0 transition-all duration-300 ${isActive ? 'scale-110 text-white' : 'group-hover:scale-110 text-blue-400/80 group-hover:text-blue-300'} ${collapsed ? 'scale-125' : ''}`}>
                {item.icon}
              </span>
              {!collapsed && <span>{item.label}</span>}
              {isActive && !collapsed && (
                <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5 bg-black/20">
        <button
          onClick={handleLogout}
          className={`
            w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold
            text-blue-300/40 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300
            ${collapsed ? 'justify-center' : ''}
          `}
        >
          <LogOut className={`transition-transform duration-300 ${collapsed ? 'w-5 h-5 scale-110' : 'w-4 h-4'}`} />
          {!collapsed && <span>Log Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-slate-900 border border-white/10 rounded-xl shadow-2xl text-blue-400 hover:text-white transition-all"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-md transition-all duration-500"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`
          lg:hidden fixed top-0 left-0 z-40 h-full w-72 border-r border-white/5 shadow-2xl
          transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={`
          hidden lg:flex flex-col h-screen sticky top-0 border-r border-white/5
          transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
          ${collapsed ? 'w-[88px]' : 'w-72'}
        `}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
