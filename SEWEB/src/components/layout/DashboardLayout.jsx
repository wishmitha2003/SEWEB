import React from 'react';
import { Sidebar } from './Sidebar';

export function DashboardLayout({
  children,
  sidebarItems,
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar items={sidebarItems} />
      <main className="flex-1 min-w-0 relative">
        <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8 max-w-[1400px]">
          {children}
        </div>
      </main>
    </div>
  );
}