import React from 'react';
import {
  LayoutDashboardIcon,
  UsersIcon,
  BookOpenIcon,
  BuildingIcon,
  DollarSignIcon,
  TrophyIcon,
  SettingsIcon,
  CreditCardIcon,
  FolderIcon
} from 'lucide-react';

export const adminSidebarItems = [
  {
    icon: <LayoutDashboardIcon className="w-4 h-4" />,
    label: 'Dashboard',
    path: '/admin'
  },
  {
    icon: <FolderIcon className="w-4 h-4" />,
    label: 'Management',
    subItems: [
      {
        icon: <UsersIcon className="w-4 h-4" />,
        label: 'Users',
        path: '/admin/users'
      },
      {
        icon: <BookOpenIcon className="w-4 h-4" />,
        label: 'Classes',
        path: '/admin/classes'
      },
      {
        icon: <BookOpenIcon className="w-4 h-4" />,
        label: 'Materials',
        path: '/admin/materials'
      },
      {
        icon: <BuildingIcon className="w-4 h-4" />,
        label: 'Branches',
        path: '/admin/branches'
      }
    ]
  },
  {
    icon: <BookOpenIcon className="w-4 h-4" />,
    label: 'Vocabulary',
    path: '/vocabulary'
  },
  {
    icon: <DollarSignIcon className="w-4 h-4" />,
    label: 'Revenue',
    path: '/admin/revenue'
  },
  {
    icon: <CreditCardIcon className="w-4 h-4" />,
    label: 'Payments',
    path: '/admin/payments'
  },
  {
    icon: <TrophyIcon className="w-4 h-4" />,
    label: 'Challenge Zone',
    path: '/admin/gamification'
  },
  {
    icon: <SettingsIcon className="w-4 h-4" />,
    label: 'Settings',
    path: '/admin/settings'
  }
];

