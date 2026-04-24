import React from 'react';
import {
  LayoutDashboardIcon,
  BookOpenIcon,
  FolderIcon,
  GamepadIcon,
  UsersIcon,
  CalendarIcon,
  SettingsIcon,
} from 'lucide-react';

export const teacherSidebarItems = [
  {
    icon: <LayoutDashboardIcon className="w-4 h-4" />,
    label: 'Dashboard',
    path: '/teacher',
  },
  {
    icon: <BookOpenIcon className="w-4 h-4" />,
    label: 'Classes',
    path: '/teacher/classes',
  },
  {
    icon: <UsersIcon className="w-4 h-4" />,
    label: 'Students',
    path: '/teacher/students',
  },
  {
    icon: <BookOpenIcon className="w-4 h-4" />,
    label: 'Materials',
    path: '/materials',
  },
  {
    icon: <BookOpenIcon className="w-4 h-4" />,
    label: 'Vocabulary',
    path: '/vocabulary',
  },
  {
    icon: <CalendarIcon className="w-4 h-4" />,
    label: 'Schedule',
    path: '/teacher/schedule',
  },
  {
    icon: <FolderIcon className="w-4 h-4" />,
    label: 'Assignments',
    path: '/teacher/assignments',
  },
  {
    icon: <SettingsIcon className="w-4 h-4" />,
    label: 'Settings',
    path: '/settings',
  },
];
