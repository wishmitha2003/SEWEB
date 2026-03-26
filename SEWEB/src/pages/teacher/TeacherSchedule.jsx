import React, { useState } from 'react';
import {
  LayoutDashboardIcon,
  BookOpenIcon,
  FileTextIcon,
  UsersIcon,
  CalendarIcon,
  UserIcon,
  PencilIcon,
  EyeIcon,
  TrashIcon,
  PlusIcon,
  ClockIcon,
  MapPinIcon,
  ChevronLeftIcon,
  ChevronRightIcon } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

const sidebarItems = [
  { icon: <LayoutDashboardIcon className="w-4 h-4" />, label: 'Dashboard', path: '/teacher' },
  { icon: <UserIcon className="w-4 h-4" />, label: 'Profile', path: '/teacher/profile' },
  { icon: <BookOpenIcon className="w-4 h-4" />, label: 'My Classes', path: '/teacher/classes' },
  { icon: <FileTextIcon className="w-4 h-4" />, label: 'Assignments', path: '/teacher/assignments' },
  { icon: <UsersIcon className="w-4 h-4" />, label: 'Students', path: '/teacher/students' },
  { icon: <CalendarIcon className="w-4 h-4" />, label: 'Schedule', path: '/teacher/schedule' }
];

const weekSchedule = [
  {
    day: 'Monday',
    date: 'Sep 23',
    classes: [
      { time: '9:00 - 10:30', class: 'Grammar Fundamentals', room: 'A-101', students: 32 },
      { time: '11:00 - 12:30', class: 'Basic English A', room: 'A-301', students: 35 }
    ]
  },
  {
    day: 'Tuesday',
    date: 'Sep 24',
    classes: [
      { time: '2:00 - 3:30', class: 'Speaking Practice', room: 'A-102', students: 28 }
    ]
  },
  {
    day: 'Wednesday',
    date: 'Sep 25',
    classes: [
      { time: '9:00 - 10:30', class: 'Grammar Fundamentals', room: 'A-101', students: 32 }
    ]
  },
  {
    day: 'Thursday',
    date: 'Sep 26',
    classes: [
      { time: '2:00 - 3:30', class: 'Speaking Practice', room: 'A-102', students: 28 }
    ]
  },
  {
    day: 'Friday',
    date: 'Sep 27',
    classes: [
      { time: '4:00 - 5:30', class: 'Business English', room: 'A-205', students: 18 }
    ]
  },
  {
    day: 'Saturday',
    date: 'Sep 28',
    classes: [
      { time: '10:00 - 12:00', class: 'IELTS Preparation', room: 'Online', students: 24 }
    ]
  },
  {
    day: 'Sunday',
    date: 'Sep 29',
    classes: []
  }
];

export function TeacherSchedule() {
  const { user } = useAuth();
  const [currentWeek, setCurrentWeek] = useState(0);
  const [view, setView] = useState('week'); // 'week' or 'list'

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Class Schedule</h1>
        <p className="text-slate-500 mt-1">Manage your weekly teaching schedule</p>
      </div>

      {/* View Toggle and Week Navigation */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
          <button
            onClick={() => setView('week')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              view === 'week'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Week View
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              view === 'list'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            List View
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <ChevronLeftIcon className="w-5 h-5 text-slate-600" />
          </button>
          <span className="text-sm font-semibold text-slate-900 min-w-40 text-center">Sep 23 - Sep 29, 2024</span>
          <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <ChevronRightIcon className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        <Button size="sm" icon={<PlusIcon className="w-4 h-4" />}>
          Create Session
        </Button>
      </div>

      {/* Week View */}
      {view === 'week' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {weekSchedule.map((day, idx) => (
            <Card key={idx} className={day.classes.length === 0 ? 'opacity-50' : ''}>
              <div className="mb-4">
                <h3 className="font-bold text-slate-900">{day.day}</h3>
                <p className="text-sm text-slate-500">{day.date}</p>
              </div>

              {day.classes.length > 0 ? (
                <div className="space-y-3">
                  {day.classes.map((cls, cidx) => (
                    <div
                      key={cidx}
                      className="p-3 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 text-sm">{cls.class}</p>
                          <p className="text-xs text-slate-600 flex items-center gap-1 mt-1">
                            <ClockIcon className="w-3 h-3" /> {cls.time}
                          </p>
                        </div>
                        <button className="p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-200">
                          <PencilIcon className="w-3 h-3 text-slate-600" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-600 flex items-center gap-1">
                        <MapPinIcon className="w-3 h-3" /> {cls.room}
                      </p>
                      <p className="text-xs text-slate-500 mt-2">{cls.students} students</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm text-slate-500">No classes scheduled</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <Card className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Weekly Schedule</h2>
          <div className="space-y-4">
            {weekSchedule.map((day, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="min-w-20">
                    <p className="font-semibold text-slate-900">{day.day}</p>
                    <p className="text-sm text-slate-500">{day.date}</p>
                  </div>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>

                {day.classes.length > 0 ? (
                  <div className="space-y-2 ml-8 mb-6">
                    {day.classes.map((cls, cidx) => (
                      <div
                        key={cidx}
                        className="flex items-center justify-between p-4 rounded-lg bg-slate-50 hover:bg-blue-50 transition-colors border border-slate-100 group"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-4">
                            <div className="text-sm font-semibold text-slate-900 min-w-32">
                              <ClockIcon className="w-4 h-4 inline mr-1" />
                              {cls.time}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900">{cls.class}</p>
                              <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                                <MapPinIcon className="w-4 h-4" /> {cls.room} • {cls.students} students
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 rounded-lg hover:bg-blue-100 transition-colors">
                            <EyeIcon className="w-4 h-4 text-slate-600" />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-amber-100 transition-colors">
                            <PencilIcon className="w-4 h-4 text-slate-600" />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-red-100 transition-colors">
                            <TrashIcon className="w-4 h-4 text-slate-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="ml-8 mb-6 text-sm text-slate-500 italic">No classes scheduled</div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <CalendarIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">6</p>
              <p className="text-sm text-slate-500">Classes This Week</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <ClockIcon className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">11.5h</p>
              <p className="text-sm text-slate-500">Teaching Hours</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <UsersIcon className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">165</p>
              <p className="text-sm text-slate-500">Students This Week</p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
