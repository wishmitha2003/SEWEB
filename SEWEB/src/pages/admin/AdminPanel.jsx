import React from 'react';
import {
  LayoutDashboardIcon,
  UsersIcon,
  BookOpenIcon,
  BuildingIcon,
  DollarSignIcon,
  TrophyIcon,
  SettingsIcon,
  PencilIcon,
  TrashIcon } from
'lucide-react';
import {
  LineChart,
  Line,
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
const sidebarItems = [
{
  icon: <LayoutDashboardIcon className="w-4 h-4" />,
  label: 'Dashboard',
  path: '/admin'
},
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
  icon: <BuildingIcon className="w-4 h-4" />,
  label: 'Branches',
  path: '/admin/branches'
},
{
  icon: <DollarSignIcon className="w-4 h-4" />,
  label: 'Revenue',
  path: '/admin/revenue'
},
{
  icon: <TrophyIcon className="w-4 h-4" />,
  label: 'Leaderboard',
  path: '/admin/leaderboard'
},
{
  icon: <SettingsIcon className="w-4 h-4" />,
  label: 'Settings',
  path: '/admin/settings'
}];

const revenueData = [
{
  month: 'Mar',
  revenue: 1800000
},
{
  month: 'Apr',
  revenue: 2100000
},
{
  month: 'May',
  revenue: 1950000
},
{
  month: 'Jun',
  revenue: 2300000
},
{
  month: 'Jul',
  revenue: 2150000
},
{
  month: 'Aug',
  revenue: 2400000
},
{
  month: 'Sep',
  revenue: 2200000
},
{
  month: 'Oct',
  revenue: 2600000
},
{
  month: 'Nov',
  revenue: 2450000
},
{
  month: 'Dec',
  revenue: 2800000
},
{
  month: 'Jan',
  revenue: 2350000
},
{
  month: 'Feb',
  revenue: 2500000
}];

const userData = [
{
  name: 'Kasun Silva',
  email: 'kasun@email.com',
  role: 'Student',
  status: 'Active',
  joinDate: 'Jan 15, 2026'
},
{
  name: 'Ms. Dilani',
  email: 'dilani@email.com',
  role: 'Teacher',
  status: 'Active',
  joinDate: 'Dec 1, 2025'
},
{
  name: 'Nisha Fernando',
  email: 'nisha@email.com',
  role: 'Parent',
  status: 'Active',
  joinDate: 'Feb 3, 2026'
},
{
  name: 'Ruwan Jay',
  email: 'ruwan@email.com',
  role: 'Student',
  status: 'Inactive',
  joinDate: 'Nov 20, 2025'
},
{
  name: 'Amaya Perera',
  email: 'amaya@email.com',
  role: 'Student',
  status: 'Active',
  joinDate: 'Jan 28, 2026'
}];

const classAdminData = [
{
  name: 'Grammar Fundamentals',
  teacher: 'Ms. Dilani',
  students: 32,
  schedule: 'Mon, Wed 9AM',
  branch: 'Colombo',
  status: 'Active'
},
{
  name: 'IELTS Preparation',
  teacher: 'Mr. Kamal',
  students: 24,
  schedule: 'Sat 10AM',
  branch: 'Online',
  status: 'Active'
},
{
  name: 'Business English',
  teacher: 'Ms. Dilani',
  students: 18,
  schedule: 'Fri 4PM',
  branch: 'Kandy',
  status: 'Active'
},
{
  name: 'Speaking Practice',
  teacher: 'Ms. Priya',
  students: 28,
  schedule: 'Tue, Thu 2PM',
  branch: 'Colombo',
  status: 'Active'
}];

const leaderboardData = [
{
  rank: 1,
  name: 'Kasun Silva',
  xp: 4200,
  level: 'Platinum',
  badges: 12
},
{
  rank: 2,
  name: 'Amaya Perera',
  xp: 3850,
  level: 'Platinum',
  badges: 10
},
{
  rank: 3,
  name: 'Dinesh Kumar',
  xp: 3600,
  level: 'Gold',
  badges: 9
},
{
  rank: 4,
  name: 'Sachini Fernando',
  xp: 3200,
  level: 'Gold',
  badges: 8
},
{
  rank: 5,
  name: 'Ruwan Jayawardena',
  xp: 2900,
  level: 'Gold',
  badges: 7
}];

const userColumns = [
{
  key: 'name',
  header: 'Name'
},
{
  key: 'email',
  header: 'Email'
},
{
  key: 'role',
  header: 'Role',
  render: (val) => {
    const v =
    val === 'Teacher' ? 'info' : val === 'Parent' ? 'warning' : 'success';
    return <Badge variant={v}>{val}</Badge>;
  }
},
{
  key: 'status',
  header: 'Status',
  render: (val) =>
  <Badge variant={val === 'Active' ? 'success' : 'danger'}>{val}</Badge>

},
{
  key: 'joinDate',
  header: 'Join Date'
},
{
  key: 'actions',
  header: 'Actions',
  render: () =>
  <div className="flex gap-2">
        <button className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
          <PencilIcon className="w-4 h-4" />
        </button>
        <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>

}];

const classAdminColumns = [
{
  key: 'name',
  header: 'Class Name'
},
{
  key: 'teacher',
  header: 'Teacher'
},
{
  key: 'students',
  header: 'Students'
},
{
  key: 'schedule',
  header: 'Schedule'
},
{
  key: 'branch',
  header: 'Branch'
},
{
  key: 'status',
  header: 'Status',
  render: (val) => <Badge variant="success">{val}</Badge>
}];

const leaderboardColumns = [
{
  key: 'rank',
  header: 'Rank',
  render: (val) => {
    const colors = {
      1: 'text-amber-500',
      2: 'text-slate-400',
      3: 'text-amber-700'
    };
    return (
      <span className={`font-bold ${colors[val] || 'text-slate-600'}`}>
          #{val}
        </span>);

  }
},
{
  key: 'name',
  header: 'Student'
},
{
  key: 'xp',
  header: 'XP Points',
  render: (val) =>
  <span className="font-semibold">{val.toLocaleString()}</span>

},
{
  key: 'level',
  header: 'Level',
  render: (val) =>
  <Badge variant={val === 'Platinum' ? 'info' : 'warning'}>{val}</Badge>

},
{
  key: 'badges',
  header: 'Badges'
}];

export function AdminPanel() {
  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      userName="Admin"
      userRole="Administrator">

      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Admin Panel</h1>
        <p className="text-slate-500 mt-1">
          Overview of the entire Ezy English platform.
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
              <p className="text-2xl font-extrabold text-slate-900">5,234</p>
              <p className="text-sm text-slate-500">Total Users</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <BookOpenIcon className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">45</p>
              <p className="text-sm text-slate-500">Active Classes</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <DollarSignIcon className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">LKR 2.5M</p>
              <p className="text-sm text-slate-500">Revenue</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center flex-shrink-0">
              <BuildingIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">10</p>
              <p className="text-sm text-slate-500">Branches</p>
            </div>
          </div>
        </Card>
      </div>

      {/* User Management */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-900">User Management</h2>
          <Button size="sm">Add User</Button>
        </div>
        <Table columns={userColumns} data={userData} />
      </Card>

      {/* Revenue Chart + Class Management */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <h2 className="text-lg font-bold text-slate-900 mb-1">
            Revenue Overview
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Monthly revenue over the past 12 months
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="month"
                  tick={{
                    fontSize: 12,
                    fill: '#94a3b8'
                  }}
                  axisLine={false}
                  tickLine={false} />

                <YAxis
                  tick={{
                    fontSize: 11,
                    fill: '#94a3b8'
                  }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />

                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                  }}
                  formatter={(value) => [
                  `LKR ${value.toLocaleString()}`,
                  'Revenue']
                  } />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  dot={{
                    r: 4,
                    fill: '#2563eb'
                  }} />

              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-bold text-slate-900 mb-5">
            Class Management
          </h2>
          <Table columns={classAdminColumns} data={classAdminData} />
        </Card>
      </div>

      {/* Branch Management */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-900">
            Branch Management
          </h2>
          <Button size="sm">Add Branch</Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
            <h3 className="font-bold text-slate-900 mb-1">Colombo Main</h3>
            <p className="text-xs text-slate-500 mb-1">
              42 Galle Road, Colombo 03
            </p>
            <p className="text-xs text-slate-500 mb-1">Manager: Mr. Perera</p>
            <p className="text-xs text-slate-500 mb-3">1,200 students</p>
            <Button size="sm" variant="outline">
              Edit
            </Button>
          </div>
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
            <h3 className="font-bold text-slate-900 mb-1">Kandy Branch</h3>
            <p className="text-xs text-slate-500 mb-1">
              15 Peradeniya Road, Kandy
            </p>
            <p className="text-xs text-slate-500 mb-1">Manager: Ms. Silva</p>
            <p className="text-xs text-slate-500 mb-3">850 students</p>
            <Button size="sm" variant="outline">
              Edit
            </Button>
          </div>
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
            <h3 className="font-bold text-slate-900 mb-1">Galle Branch</h3>
            <p className="text-xs text-slate-500 mb-1">
              78 Main Street, Galle Fort
            </p>
            <p className="text-xs text-slate-500 mb-1">Manager: Mr. Fernando</p>
            <p className="text-xs text-slate-500 mb-3">620 students</p>
            <Button size="sm" variant="outline">
              Edit
            </Button>
          </div>
        </div>
      </Card>

      {/* Leaderboard */}
      <Card>
        <h2 className="text-lg font-bold text-slate-900 mb-5">
          Gamification Leaderboard
        </h2>
        <Table columns={leaderboardColumns} data={leaderboardData} />
      </Card>
    </DashboardLayout>);

}