import React from 'react';
import {
  LayoutDashboardIcon,
  BookOpenIcon,
  FileTextIcon,
  UsersIcon,
  CalendarIcon,
  PencilIcon,
  EyeIcon,
  UploadIcon } from
'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer } from
'recharts';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Table } from '../../components/ui/Table';
import { useAuth } from '../../context/AuthContext';
const sidebarItems = [
{
  icon: <LayoutDashboardIcon className="w-4 h-4" />,
  label: 'Dashboard',
  path: '/teacher'
},
{
  icon: <BookOpenIcon className="w-4 h-4" />,
  label: 'My Classes',
  path: '/teacher/classes'
},
{
  icon: <FileTextIcon className="w-4 h-4" />,
  label: 'Assignments',
  path: '/teacher/assignments'
},
{
  icon: <UsersIcon className="w-4 h-4" />,
  label: 'Students',
  path: '/teacher/students'
},
{
  icon: <CalendarIcon className="w-4 h-4" />,
  label: 'Schedule',
  path: '/teacher/schedule'
}];

const performanceData = [
{
  class: 'Grammar A',
  avg: 82
},
{
  class: 'Speaking B',
  avg: 75
},
{
  class: 'Writing C',
  avg: 88
},
{
  class: 'IELTS Prep',
  avg: 71
},
{
  class: 'Vocab D',
  avg: 79
},
{
  class: 'Business E',
  avg: 85
}];

const classData = [
{
  name: 'Grammar Fundamentals',
  schedule: 'Mon, Wed 9:00 AM',
  students: 32,
  status: 'Active'
},
{
  name: 'Speaking Practice',
  schedule: 'Tue, Thu 2:00 PM',
  students: 28,
  status: 'Active'
},
{
  name: 'IELTS Preparation',
  schedule: 'Sat 10:00 AM',
  students: 24,
  status: 'Active'
},
{
  name: 'Business English',
  schedule: 'Fri 4:00 PM',
  students: 18,
  status: 'Active'
},
{
  name: 'Basic English A',
  schedule: 'Mon 11:00 AM',
  students: 35,
  status: 'Completed'
}];

const studentData = [
{
  name: 'Kasun Silva',
  class: 'Grammar Fundamentals',
  attendance: '92%',
  grade: 'A',
  lastActive: '2 hours ago'
},
{
  name: 'Amaya Perera',
  class: 'Speaking Practice',
  attendance: '88%',
  grade: 'A-',
  lastActive: '1 day ago'
},
{
  name: 'Dinesh Kumar',
  class: 'IELTS Preparation',
  attendance: '95%',
  grade: 'B+',
  lastActive: '3 hours ago'
},
{
  name: 'Sachini Fernando',
  class: 'Business English',
  attendance: '78%',
  grade: 'B',
  lastActive: '2 days ago'
},
{
  name: 'Ruwan Jayawardena',
  class: 'Grammar Fundamentals',
  attendance: '85%',
  grade: 'A-',
  lastActive: '5 hours ago'
}];

const classColumns = [
{
  key: 'name',
  header: 'Class Name'
},
{
  key: 'schedule',
  header: 'Schedule'
},
{
  key: 'students',
  header: 'Students'
},
{
  key: 'status',
  header: 'Status',
  render: (val) =>
  <Badge variant={val === 'Active' ? 'success' : 'info'}>{val}</Badge>

},
{
  key: 'actions',
  header: 'Actions',
  render: () =>
  <div className="flex gap-2">
        <button className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
          <EyeIcon className="w-4 h-4" />
        </button>
        <button className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
          <PencilIcon className="w-4 h-4" />
        </button>
      </div>

}];

const studentColumns = [
{
  key: 'name',
  header: 'Name'
},
{
  key: 'class',
  header: 'Class'
},
{
  key: 'attendance',
  header: 'Attendance'
},
{
  key: 'grade',
  header: 'Grade'
},
{
  key: 'lastActive',
  header: 'Last Active'
}];

export function TeacherDashboard() {
  const { user } = useAuth();
  return (
    <DashboardLayout
      sidebarItems={sidebarItems}>

      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Teacher Dashboard - {user?.fullName || 'Ms. Dilani'}
        </h1>
        <p className="text-slate-500 mt-1">
          Manage your classes, students, and assignments.
        </p>
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
              <BookOpenIcon className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">8</p>
              <p className="text-sm text-slate-500">Active Classes</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <FileTextIcon className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">24</p>
              <p className="text-sm text-slate-500">Assignments</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center flex-shrink-0">
              <CalendarIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">78%</p>
              <p className="text-sm text-slate-500">Avg Score</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Class Management */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-900">Class Management</h2>
          <Button size="sm" variant="outline">
            Add Class
          </Button>
        </div>
        <Table columns={classColumns} data={classData} />
      </Card>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Assignment Upload */}
        <Card>
          <h2 className="text-lg font-bold text-slate-900 mb-5">
            Upload Assignment
          </h2>
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center mb-4 hover:border-blue-300 transition-colors">
            <UploadIcon className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-600 mb-1">
              Drop files here or click to upload
            </p>
            <p className="text-xs text-slate-400">PDF, DOC, DOCX up to 10MB</p>
          </div>
          <div className="space-y-3">
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
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Due Date
              </label>
              <input
                type="date"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />

            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Description
              </label>
              <textarea
                rows={3}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                placeholder="Assignment description..." />

            </div>
            <Button
              className="w-full"
              icon={<UploadIcon className="w-4 h-4" />}>

              Upload Assignment
            </Button>
          </div>
        </Card>

        {/* Performance Chart */}
        <Card>
          <h2 className="text-lg font-bold text-slate-900 mb-1">
            Class Performance
          </h2>
          <p className="text-sm text-slate-500 mb-6">Average scores by class</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="class"
                  tick={{
                    fontSize: 11,
                    fill: '#94a3b8'
                  }}
                  axisLine={false}
                  tickLine={false} />

                <YAxis
                  tick={{
                    fontSize: 12,
                    fill: '#94a3b8'
                  }}
                  axisLine={false}
                  tickLine={false} />

                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                  }} />

                <Bar dataKey="avg" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Student List */}
      <Card>
        <h2 className="text-lg font-bold text-slate-900 mb-5">Student List</h2>
        <Table columns={studentColumns} data={studentData} />
      </Card>
    </DashboardLayout>);

}