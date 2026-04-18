import React from 'react';
import {
  LayoutDashboardIcon,
  BookOpenIcon,
  FolderIcon,
  GamepadIcon,
  CreditCardIcon,
  SettingsIcon,
  UserIcon,
} from 'lucide-react';

export const studentSidebarItems = [
  {
    icon: <GamepadIcon className="w-4 h-4" />,
    label: 'Challenge Zone',
    path: '/gamification',
  },
  {
    icon: <LayoutDashboardIcon className="w-4 h-4" />,
    label: 'Dashboard',
    path: '/student',
  },
  {
    icon: <UserIcon className="w-4 h-4" />,
    label: 'Profile',
    path: '/profile',
  },
  {
    icon: <BookOpenIcon className="w-4 h-4" />,
    label: 'My Classes',
    path: '/classes',
  },
  {
    icon: <FolderIcon className="w-4 h-4" />,
    label: 'Materials',
    path: '/materials',
  },
  {
    icon: <BookOpenIcon className="w-4 h-4" />,
    label: 'Vocabulary',
    path: '/vocabulary',
  },
  {
    icon: <CreditCardIcon className="w-4 h-4" />,
    label: 'Payments',
    path: '/student/payments',
  },
  {
    icon: <SettingsIcon className="w-4 h-4" />,
    label: 'Settings',
    path: '/student/settings',
  },
];
