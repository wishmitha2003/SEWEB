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
  MailIcon,
  PhoneIcon,
  TrendingUpIcon,
  MessageSquareIcon } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Table } from '../../components/ui/Table';
import { useAuth } from '../../context/AuthContext';

const sidebarItems = [
  { icon: <LayoutDashboardIcon className="w-4 h-4" />, label: 'Dashboard', path: '/teacher' },
  { icon: <UserIcon className="w-4 h-4" />, label: 'Profile', path: '/teacher/profile' },
  { icon: <BookOpenIcon className="w-4 h-4" />, label: 'My Classes', path: '/teacher/classes' },
  { icon: <FileTextIcon className="w-4 h-4" />, label: 'Assignments', path: '/teacher/assignments' },
  { icon: <UsersIcon className="w-4 h-4" />, label: 'Students', path: '/teacher/students' },
  { icon: <CalendarIcon className="w-4 h-4" />, label: 'Schedule', path: '/teacher/schedule' }
];

const studentsData = [
  {
    id: 1,
    name: 'Kasun Silva',
    email: 'kasun@example.com',
    phone: '+94 77 123 4567',
    class: 'Grammar Fundamentals',
    enrollment: '2024-01-15',
    attendance: '92%',
    grade: 'A',
    lastActive: '2 hours ago',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Amaya Perera',
    email: 'amaya@example.com',
    phone: '+94 76 234 5678',
    class: 'Speaking Practice',
    enrollment: '2024-02-10',
    attendance: '88%',
    grade: 'A-',
    lastActive: '1 day ago',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Dinesh Kumar',
    email: 'dinesh@example.com',
    phone: '+94 75 345 6789',
    class: 'IELTS Preparation',
    enrollment: '2024-03-05',
    attendance: '95%',
    grade: 'B+',
    lastActive: '3 hours ago',
    status: 'Active'
  },
  {
    id: 4,
    name: 'Sachini Fernando',
    email: 'sachini@example.com',
    phone: '+94 74 456 7890',
    class: 'Business English',
    enrollment: '2024-01-20',
    attendance: '78%',
    grade: 'B',
    lastActive: '2 days ago',
    status: 'Active'
  },
  {
    id: 5,
    name: 'Ruwan Jayawardena',
    email: 'ruwan@example.com',
    phone: '+94 73 567 8901',
    class: 'Grammar Fundamentals',
    enrollment: '2024-02-15',
    attendance: '85%',
    grade: 'A-',
    lastActive: '5 hours ago',
    status: 'Active'
  },
  {
    id: 6,
    name: 'Thilini Kapoor',
    email: 'thilini@example.com',
    phone: '+94 72 678 9012',
    class: 'Speaking Practice',
    enrollment: '2024-03-10',
    attendance: '72%',
    grade: 'B-',
    lastActive: '1 week ago',
    status: 'Inactive'
  }
];

const studentColumns = [
  {
    key: 'name',
    header: 'Student Name',
    render: (val) => <span className="font-semibold text-slate-900">{val}</span>
  },
  {
    key: 'email',
    header: 'Email'
  },
  {
    key: 'class',
    header: 'Class'
  },
  {
    key: 'attendance',
    header: 'Attendance',
    render: (val) => {
      const attendance = parseInt(val);
      const color = attendance >= 90 ? 'text-emerald-600' : attendance >= 80 ? 'text-amber-600' : 'text-red-600';
      return <span className={`font-semibold ${color}`}>{val}</span>;
    }
  },
  {
    key: 'grade',
    header: 'Grade',
    render: (val) => <Badge variant="info">{val}</Badge>
  },
  {
    key: 'status',
    header: 'Status',
    render: (val) => <Badge variant={val === 'Active' ? 'success' : 'warning'}>{val}</Badge>
  },
  {
    key: 'actions',
    header: 'Actions',
    render: () => (
      <div className="flex gap-2">
        <button className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
          <EyeIcon className="w-4 h-4" />
        </button>
        <button className="p-1.5 rounded-lg text-slate-400 hover:text-green-600 hover:bg-green-50 transition-colors">
          <MailIcon className="w-4 h-4" />
        </button>
        <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    )
  }
];

const topPerformers = [
  { name: 'Dinesh Kumar', average: 92, improvement: '+5%' },
  { name: 'Kasun Silva', average: 89, improvement: '+3%' },
  { name: 'Ruwan Jayawardena', average: 87, improvement: '+2%' }
];

const needsAttention = [
  { name: 'Thilini Kapoor', attendance: 72, grade: 'B-', issue: 'Low attendance' },
  { name: 'Sachini Fernando', attendance: 78, grade: 'B', issue: 'Assignment overdue' }
];

export function TeacherStudents() {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = studentsData.filter(s => {
    if (filter === 'active') return s.status === 'Active';
    if (filter === 'inactive') return s.status === 'Inactive';
    return true;
  }).filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">My Students</h1>
        <p className="text-slate-500 mt-1">View and manage your enrolled students</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <UsersIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">156</p>
              <p className="text-sm text-slate-500">Total Students</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <TrendingUpIcon className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">89%</p>
              <p className="text-sm text-slate-500">Avg Attendance</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <TrendingUpIcon className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">85%</p>
              <p className="text-sm text-slate-500">Avg Grade</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center flex-shrink-0">
              <MessageSquareIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">2</p>
              <p className="text-sm text-slate-500">Need Attention</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Top Performers & Needs Attention */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Top Performers */}
        <Card>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Top Performers</h2>
          <div className="space-y-3">
            {topPerformers.map((student, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-emerald-50 transition-colors">
                <div>
                  <p className="font-semibold text-slate-900">{student.name}</p>
                  <p className="text-sm text-slate-500">Average: {student.average}%</p>
                </div>
                <Badge variant="success">{student.improvement}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Needs Attention */}
        <Card>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Students Needing Attention</h2>
          <div className="space-y-3">
            {needsAttention.map((student, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-red-50 transition-colors border border-red-100">
                <div>
                  <p className="font-semibold text-slate-900">{student.name}</p>
                  <p className="text-sm text-red-600 font-medium">{student.issue}</p>
                </div>
                <Button size="sm" variant="outline">Reach Out</Button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Students Table */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <h2 className="text-lg font-bold text-slate-900">All Students</h2>
            <Badge variant="info">{filteredStudents.length}</Badge>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6 flex-col sm:flex-row">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
            {['all', 'active', 'inactive'].map((f) => (
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

        <Table columns={studentColumns} data={filteredStudents} />
      </Card>
    </DashboardLayout>
  );
}
