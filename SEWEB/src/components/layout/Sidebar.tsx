import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpenIcon, MenuIcon, XIcon, LogOutIcon } from 'lucide-react';
interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}
interface SidebarProps {
  items: SidebarItem[];
  userName?: string;
  userRole?: string;
}
export function Sidebar({
  items,
  userName = 'User',
  userRole = 'Student'
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const sidebarContent =
  <div className="flex flex-col h-full">
      <div className="p-5 flex items-center justify-between border-b border-slate-100">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
            <BookOpenIcon className="w-5 h-5 text-white" />
          </div>
          {!collapsed &&
        <span className="text-lg font-extrabold text-slate-900 tracking-tight">
              Ezy English
            </span>
        }
        </Link>
        <button
        className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>

          <MenuIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="p-3 border-b border-slate-100">
        <div
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-50 ${collapsed ? 'justify-center' : ''}`}>

          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-bold">
              {userName.charAt(0)}
            </span>
          </div>
          {!collapsed &&
        <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">
                {userName}
              </p>
              <p className="text-xs text-slate-500">{userRole}</p>
            </div>
        }
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
            title={collapsed ? item.label : undefined}>

              <span className="flex-shrink-0">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>);

      })}
      </nav>

      <div className="p-3 border-t border-slate-100">
        <Link
        to="/"
        className={`
            flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
            text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors
            ${collapsed ? 'justify-center' : ''}
          `}>

          <LogOutIcon className="w-4 h-4" />
          {!collapsed && <span>Log Out</span>}
        </Link>
      </div>
    </div>;

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-md text-slate-600 hover:bg-slate-50 transition-colors"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle sidebar">

        {mobileOpen ?
        <XIcon className="w-5 h-5" /> :

        <MenuIcon className="w-5 h-5" />
        }
      </button>

      {/* Mobile overlay */}
      {mobileOpen &&
      <div
        className="lg:hidden fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm"
        onClick={() => setMobileOpen(false)} />

      }

      {/* Mobile sidebar */}
      <aside
        className={`
          lg:hidden fixed top-0 left-0 z-40 h-full w-64 bg-white border-r border-slate-100 shadow-xl
          transition-transform duration-300
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>

        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={`
          hidden lg:flex flex-col h-screen bg-white border-r border-slate-100 sticky top-0
          transition-all duration-300
          ${collapsed ? 'w-[72px]' : 'w-64'}
        `}>

        {sidebarContent}
      </aside>
    </>);

}