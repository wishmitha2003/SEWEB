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
  UploadIcon,
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  ClockIcon,
  DownloadIcon } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Table } from '../../components/ui/Table';
import { useAuth } from '../../context/AuthContext';

const sidebarItems = [
  { icon: <LayoutDashboardIcon className="w-4 h-4" />, label: 'Dashboard', path: '/teacher' },
  { icon: <BookOpenIcon className="w-4 h-4" />, label: 'My Classes', path: '/teacher/classes' },
  { icon: <FileTextIcon className="w-4 h-4" />, label: 'Assignments', path: '/teacher/assignments' },
  { icon: <UsersIcon className="w-4 h-4" />, label: 'Students', path: '/teacher/students' },
  { icon: <CalendarIcon className="w-4 h-4" />, label: 'Schedule', path: '/teacher/schedule' },
  { icon: <UserIcon className="w-4 h-4" />, label: 'Profile', path: '/teacher/profile' }
];

const assignmentsData = [
  {
    id: 1,
    title: 'Grammar Exercise 5',
    class: 'Grammar Fundamentals',
    dueDate: '2024-09-25',
    daysLeft: 1,
    submissions: '28/32',
    status: 'Active',
    type: 'Homework'
  },
  {
    id: 2,
    title: 'Speaking Assessment 3',
    class: 'Speaking Practice',
    dueDate: '2024-09-24',
    daysLeft: 0,
    submissions: '26/28',
    status: 'Due Today',
    type: 'Assessment'
  },
  {
    id: 3,
    title: 'IELTS Mock Test 2',
    class: 'IELTS Preparation',
    dueDate: '2024-09-20',
    daysLeft: -5,
    submissions: '20/24',
    status: 'Overdue',
    type: 'Test'
  },
  {
    id: 4,
    title: 'Business Email Writing',
    class: 'Business English',
    dueDate: '2024-10-02',
    daysLeft: 8,
    submissions: '15/18',
    status: 'Active',
    type: 'Project'
  },
  {
    id: 5,
    title: 'Grammar Quiz 4',
    class: 'Grammar Fundamentals',
    dueDate: '2024-09-22',
    daysLeft: -2,
    submissions: '30/32',
    status: 'Closed',
    type: 'Quiz'
  }
];

const assignmentColumns = [
  {
    key: 'title',
    header: 'Assignment Title',
    render: (val) => <span className="font-semibold text-slate-900">{val}</span>
  },
  {
    key: 'class',
    header: 'Class'
  },
  {
    key: 'type',
    header: 'Type',
    render: (val) => <Badge variant="info">{val}</Badge>
  },
  {
    key: 'dueDate',
    header: 'Due Date'
  },
  {
    key: 'submissions',
    header: 'Submissions'
  },
  {
    key: 'status',
    header: 'Status',
    render: (val) => {
      const variantMap = {
        'Active': 'success',
        'Due Today': 'warning',
        'Overdue': 'danger',
        'Closed': 'info'
      };
      return <Badge variant={variantMap[val] || 'info'}>{val}</Badge>;
    }
  },
  {
    key: 'actions',
    header: 'Actions',
    render: () => (
      <div className="flex gap-2">
        <button className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
          <EyeIcon className="w-4 h-4" />
        </button>
        <button className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors">
          <PencilIcon className="w-4 h-4" />
        </button>
        <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    )
  }
];

const overdueStats = [
  { label: 'Active', count: 2, color: 'bg-emerald-100', textColor: 'text-emerald-600' },
  { label: 'Due Today', count: 1, color: 'bg-amber-100', textColor: 'text-amber-600' },
  { label: 'Overdue', count: 1, color: 'bg-red-100', textColor: 'text-red-600' },
  { label: 'Closed', count: 1, color: 'bg-blue-100', textColor: 'text-blue-600' }
];

export function TeacherAssignments() {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');

  const filteredAssignments = filter === 'all'
    ? assignmentsData
    : assignmentsData.filter(a => a.status.toLowerCase().includes(filter));

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Assignments</h1>
        <p className="text-slate-500 mt-1">Create, manage, and grade student assignments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {overdueStats.map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                <span className={`font-bold text-lg ${stat.textColor}`}>{stat.count}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create New Assignment */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900">Create New Assignment</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Assignment Title
            </label>
            <input
              type="text"
              placeholder="e.g., Grammar Exercise 6"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Select Class
            </label>
            <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
              <option>Grammar Fundamentals</option>
              <option>Speaking Practice</option>
              <option>IELTS Preparation</option>
              <option>Business English</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Assignment Type
            </label>
            <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
              <option>Homework</option>
              <option>Assessment</option>
              <option>Quiz</option>
              <option>Project</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Due Date
            </label>
            <input
              type="date"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Points
            </label>
            <input
              type="number"
              placeholder="100"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Description
          </label>
          <textarea
            rows="3"
            placeholder="Describe the assignment requirements..."
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
          />
        </div>
        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center mb-4 hover:border-blue-300 transition-colors">
          <UploadIcon className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-600">Upload attachment (optional)</p>
          <p className="text-xs text-slate-400">PDF, DOC, DOCX up to 10MB</p>
        </div>
        <Button className="w-full" icon={<PlusIcon className="w-4 h-4" />}>
          Create Assignment
        </Button>
      </Card>

      {/* Assignments Table */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <h2 className="text-lg font-bold text-slate-900">All Assignments</h2>
            <Badge variant="info">{filteredAssignments.length}</Badge>
          </div>
          <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
            {['all', 'active', 'overdue', 'closed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${
                  filter === f
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <Table columns={assignmentColumns} data={filteredAssignments} />
      </Card>
    </DashboardLayout>
  );
}
