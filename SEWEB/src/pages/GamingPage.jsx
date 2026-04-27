import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { ShootingGame } from '../components/games/ShootingGame';
import { studentSidebarItems } from '../config/studentSidebarItems';

export function GamingPage() {
  return (
    <DashboardLayout sidebarItems={studentSidebarItems}>
      <div className="w-full">
        <ShootingGame />
      </div>
    </DashboardLayout>
  );
}
