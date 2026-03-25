import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  LayoutDashboardIcon,
  UsersIcon,
  BookOpenIcon,
  BuildingIcon,
  DollarSignIcon,
  TrophyIcon,
  SettingsIcon,
  PencilIcon,
  TrashIcon
} from
  'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from
  'recharts';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Table } from '../../components/ui/Table';
import { Modal } from '../../components/ui/Modal';
import { FormInput } from '../../components/ui/FormInput';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';
import { getUsers as fetchUsersFromApi, deleteUser as deleteUserFromApi } from '../../services/userService';
import { getClasses as fetchClassesFromApi, createClass as createClassInApi, deleteClass as deleteClassInApi } from '../../services/classService';
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
    icon: <BookOpenIcon className="w-4 h-4" />,
    label: 'Materials',
    path: '/admin/materials'
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

// users will be loaded from backend; demo/static users removed

// classAdminData will be loaded from backend; demo data removed

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

// userColumns moved inside AdminPanel to handle deletion logic

// classAdminColumns moved inside AdminPanel to handle deletion logic

const materialsData = [
  {
    title: 'Beginner Grammar Guide',
    type: 'PDF',
    className: 'Grammar Fundamentals',
    uploadedBy: 'Ms. Dilani',
    uploadedAt: '2026-02-10',
    status: 'Published'
  },
  {
    title: 'IELTS Practice Pack',
    type: 'ZIP',
    className: 'IELTS Preparation',
    uploadedBy: 'Mr. Kamal',
    uploadedAt: '2026-02-18',
    status: 'Published'
  },
  {
    title: 'Speaking Prompts – Week 4',
    type: 'DOCX',
    className: 'Speaking Practice',
    uploadedBy: 'Ms. Priya',
    uploadedAt: '2026-03-05',
    status: 'Draft'
  }
];

const materialsColumns = [
  {
    key: 'title',
    header: 'Title'
  },
  {
    key: 'type',
    header: 'Type'
  },
  {
    key: 'className',
    header: 'Class'
  },
  {
    key: 'uploadedBy',
    header: 'Uploaded By'
  },
  {
    key: 'uploadedAt',
    header: 'Uploaded On',
    render: (val) => val ? new Date(val).toLocaleDateString() : '-'
  },
  {
    key: 'status',
    header: 'Status',
    render: (val) => (
      <Badge variant={val === 'Published' ? 'success' : 'warning'}>{val}</Badge>
    )
  },
  {
    key: 'actions',
    header: 'Actions',
    render: () => (
      <div className="flex gap-2">
        <button className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
          <PencilIcon className="w-4 h-4" />
        </button>
        <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    )
  }
];

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
  const { user } = useAuth();
  const location = useLocation();
  const path = location.pathname;

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [usersError, setUsersError] = useState(null);

  function isDemo(u) {
    if (!u) return false;
    const email = (u.email || '').toLowerCase();
    const name = (u.fullName || u.name || '').toLowerCase();
    if (email.includes('demo') || name.includes('demo')) return true;
    if (email.endsWith('@example.com')) return true;
    return false;
  }

  async function handleDeleteUser(id) {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await deleteUserFromApi(id);
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      alert('Failed to delete user: ' + (err?.message || String(err)));
    }
  }

  const userColumns = [
    {
      key: 'fullName',
      header: 'Name',
      render: (val, row) => val || row?.name || row?.fullName || row?.email
    },
    {
      key: 'email',
      header: 'Email'
    },
    {
      key: 'role',
      header: 'Role',
      render: (val) => {
        const v = val === 'Teacher' ? 'info' : val === 'Parent' ? 'warning' : 'success';
        return <Badge variant={v}>{val}</Badge>;
      }
    },
    {
      key: 'status',
      header: 'Status',
      render: (val) => <Badge variant={val === 'Active' ? 'success' : 'danger'}>{val}</Badge>
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleDeleteUser(row.id || row._id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

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
      key: 'studentCount',
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
      key: 'type',
      header: 'Class Type',
      render: (val) => (
        <Badge variant={val === 'online' ? 'info' : 'warning'}>
          {val?.charAt(0).toUpperCase() + val?.slice(1)}
        </Badge>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (val) => <Badge variant={val === 'Active' ? 'success' : 'warning'}>{val}</Badge>
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleClassDelete(row.id || row._id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  const [classes, setClasses] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [classesError, setClassesError] = useState(null);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [newClass, setNewClass] = useState({
    name: '',
    teacher: '',
    studentCount: 0,
    schedule: '',
    branch: '',
    type: 'online',
    status: 'Active'
  });

  async function loadClasses() {
    setLoadingClasses(true);
    setClassesError(null);
    try {
      const res = await fetchClassesFromApi();
      const arr = Array.isArray(res) ? res : (res?.data || []);
      setClasses(arr);
    } catch (err) {
      setClassesError(err?.message || String(err));
      setClasses([]);
    } finally {
      setLoadingClasses(false);
    }
  }

  async function handleCreateClass(e) {
    e.preventDefault();
    try {
      const res = await createClassInApi(newClass);
      setClasses(prev => [...prev, res]);
      setIsClassModalOpen(false);
      setNewClass({
        name: '',
        teacher: '',
        studentCount: 0,
        schedule: '',
        branch: '',
        type: 'online',
        status: 'Active'
      });
    } catch (err) {
      alert('Failed to create class: ' + (err?.message || String(err)));
    }
  }

  async function handleClassDelete(id) {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this class?')) return;
    try {
      await deleteClassInApi(id);
      setClasses(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      alert('Failed to delete class: ' + (err?.message || String(err)));
    }
  }

  async function loadUsers() {
    setLoadingUsers(true);
    setUsersError(null);
    try {
      const token = localStorage.getItem('ezy_token');
      if (!token) {
        throw new Error('Not authenticated. Please sign in to view users.');
      }
      const res = await fetchUsersFromApi();
      console.debug('getUsers response ->', res);
      const arr = Array.isArray(res) ? res : (res?.data || []);
      setUsers(arr.filter((u) => !isDemo(u)));
    } catch (err) {
      setUsersError(err?.message || String(err));
      setUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  }

  useEffect(() => {
    if (path.startsWith('/admin')) {
      loadUsers();
      loadClasses();
    }
  }, [path]);

  const renderStats = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0">
            <UsersIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">{users?.length?.toLocaleString?.() || '0'}</p>
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
  );

  const renderDashboard = () => (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome back, {user?.fullName}. Here's what's happening today.</p>
      </div>
      {renderStats()}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-slate-900">Recent Users</h2>
            <Button size="sm" variant="ghost">View All</Button>
          </div>
          <Table columns={userColumns.slice(0, 3)} data={users.slice(0, 5)} />
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-slate-900">Active Classes</h2>
            <Button size="sm" variant="ghost">View All</Button>
          </div>
          <Table columns={classAdminColumns.slice(0, 3)} data={classes.slice(0, 5)} />
        </Card>
      </div>
    </>
  );

  const renderUsers = () => (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">User Management</h1>
        <p className="text-slate-500 mt-1">Manage all students, teachers, and parents on the platform.</p>
      </div>
      <Card>
        <div className="flex items-center justify-between mb-5">
          <div className="flex gap-4 items-center">
            <h2 className="text-lg font-bold text-slate-900">All Users</h2>
            <Badge variant="info">{users?.length?.toLocaleString?.() || '0'} Total</Badge>
          </div>
        </div>
        {usersError && (
          <div className="p-4 mb-4 rounded bg-red-50 text-red-700">Failed to load users: {usersError}</div>
        )}
        {loadingUsers && (
          <div className="p-4 mb-4 rounded bg-slate-50 text-slate-600">Loading users...</div>
        )}
        <Table columns={userColumns} data={users} />
      </Card>
    </>
  );

  const renderClasses = () => (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Class Management</h1>
        <p className="text-slate-500 mt-1">Monitor and organize all active language classes.</p>
      </div>
      <Card>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-900">Active Classes</h2>
          <Button size="sm" onClick={() => setIsClassModalOpen(true)}>Create New Class</Button>
        </div>
        {classesError && (
          <div className="p-4 mb-4 rounded bg-red-50 text-red-700">Failed to load classes: {classesError}</div>
        )}
        {loadingClasses && (
          <div className="p-4 mb-4 rounded bg-slate-50 text-slate-600">Loading classes...</div>
        )}
        <Table columns={classAdminColumns} data={classes} />
      </Card>
    </>
  );

  const renderMaterials = () => (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Materials Management</h1>
        <p className="text-slate-500 mt-1">Upload and organize learning materials for all classes.</p>
      </div>
      <Card>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">All Materials</h2>
            <p className="text-xs text-slate-500 mt-1">This is a demo list. Connect to your API to manage real materials.</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">Create Folder</Button>
            <Button size="sm">Upload Material</Button>
          </div>
        </div>
        <Table columns={materialsColumns} data={materialsData} />
      </Card>
    </>
  );

  const renderBranches = () => (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Branch Management</h1>
        <p className="text-slate-500 mt-1">Manage physical locations and branch managers.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Colombo Main', address: '42 Galle Road, Colombo 03', manager: 'Mr. Perera', students: '1,200', colors: { bg: 'bg-blue-100', text: 'text-blue-600' } },
          { name: 'Kandy Branch', address: '15 Peradeniya Road, Kandy', manager: 'Ms. Silva', students: '850', colors: { bg: 'bg-emerald-100', text: 'text-emerald-600' } },
          { name: 'Galle Branch', address: '78 Main Street, Galle Fort', manager: 'Mr. Fernando', students: '620', colors: { bg: 'bg-amber-100', text: 'text-amber-600' } },
        ].map((branch) => (
          <Card key={branch.name} className="hover:shadow-lg transition-shadow">
            <div className={`w-12 h-12 rounded-2xl ${branch.colors.bg} flex items-center justify-center mb-4`}>
              <BuildingIcon className={`w-6 h-6 ${branch.colors.text}`} />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-1">{branch.name}</h3>
            <p className="text-sm text-slate-500 mb-4">{branch.address}</p>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Manager</span>
                <span className="font-bold text-slate-700">{branch.manager}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Students</span>
                <span className="font-bold text-slate-700">{branch.students}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">Edit</Button>
              <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-50">Delete</Button>
            </div>
          </Card>
        ))}
        <button className="border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50/50 transition-all group">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
            <BuildingIcon className="w-6 h-6" />
          </div>
          <span className="font-bold">Add New Branch</span>
        </button>
      </div>
    </>
  );

  const renderRevenue = () => (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Revenue Analytics</h1>
        <p className="text-slate-500 mt-1">Track payments, subscriptions, and financial growth.</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-900 mb-1">Revenue Overview</h2>
          <p className="text-sm text-slate-500 mb-6">Monthly revenue trends</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <div className="space-y-6">
          <Card>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Total Revenue</p>
            <h3 className="text-3xl font-black text-slate-900">LKR 28.4M</h3>
            <p className="text-xs text-emerald-500 font-bold mt-2">↑ 12.5% from last year</p>
          </Card>
          <Card>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Avg. Ticket Size</p>
            <h3 className="text-3xl font-black text-slate-900">LKR 12.5K</h3>
            <p className="text-xs text-blue-500 font-bold mt-2">Steady growth</p>
          </Card>
          <Card>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Active Subscriptions</p>
            <h3 className="text-3xl font-black text-slate-900">2,450</h3>
            <p className="text-xs text-amber-500 font-bold mt-2">Focus on retention</p>
          </Card>
        </div>
      </div>
    </>
  );

  const renderLeaderboard = () => (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Gamification Leaderboard</h1>
        <p className="text-slate-500 mt-1">Top performing students across all branches.</p>
      </div>
      <Card>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-900">Top Students</h2>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">This Month</Button>
            <Button size="sm" variant="ghost">All Time</Button>
          </div>
        </div>
        <Table columns={leaderboardColumns} data={leaderboardData} />
      </Card>
    </>
  );

  const renderSettings = () => (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Platform Settings</h1>
        <p className="text-slate-500 mt-1">Configure global application parameters and security.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-bold text-slate-900 mb-4">General Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <p className="text-sm font-bold text-slate-700">Maintenance Mode</p>
                <p className="text-xs text-slate-500">Disable platform access for students</p>
              </div>
              <div className="w-10 h-5 bg-slate-300 rounded-full relative">
                <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-all" />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <p className="text-sm font-bold text-slate-700">Public Registration</p>
                <p className="text-xs text-slate-500">Allow new students to sign up</p>
              </div>
              <div className="w-10 h-5 bg-blue-600 rounded-full relative">
                <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-white rounded-full transition-all" />
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <h3 className="font-bold text-slate-900 mb-4">Security & Access</h3>
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start gap-3">
              <PencilIcon className="w-4 h-4" />
              Change Admin Credentials
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <TrashIcon className="w-4 h-4" />
              Purge System Logs (30+ days)
            </Button>
          </div>
        </Card>
      </div>
    </>
  );

  const getContent = () => {
    switch (path) {
      case '/admin/users': return renderUsers();
      case '/admin/classes': return renderClasses();
      case '/admin/materials': return renderMaterials();
      case '/admin/branches': return renderBranches();
      case '/admin/revenue': return renderRevenue();
      case '/admin/leaderboard': return renderLeaderboard();
      case '/admin/settings': return renderSettings();
      default: return renderDashboard();
    }
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      {getContent()}

      <Modal
        isOpen={isClassModalOpen}
        onClose={() => setIsClassModalOpen(false)}
        title="Create New Class"
        size="md"
      >
        <form onSubmit={handleCreateClass} className="space-y-4">
          <FormInput
            label="Class Name"
            value={newClass.name}
            onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
            placeholder="e.g. English Grammar"
            required
          />
          <FormInput
            label="Teacher"
            value={newClass.teacher}
            onChange={(e) => setNewClass({ ...newClass, teacher: e.target.value })}
            placeholder="e.g. Ms. Dilani"
          />
          <FormInput
            label="Student Count"
            type="number"
            value={newClass.studentCount}
            onChange={(e) => setNewClass({ ...newClass, studentCount: parseInt(e.target.value) || 0 })}
          />
          <FormInput
            label="Schedule"
            value={newClass.schedule}
            onChange={(e) => setNewClass({ ...newClass, schedule: e.target.value })}
            placeholder="e.g. Mon, Wed 9AM"
          />
          <FormInput
            label="Branch"
            value={newClass.branch}
            onChange={(e) => setNewClass({ ...newClass, branch: e.target.value })}
            placeholder="e.g. Colombo"
          />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Class Type</label>
            <select 
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newClass.type}
              onChange={(e) => setNewClass({ ...newClass, type: e.target.value })}
            >
              <option value="online">Online</option>
              <option value="physical">Physical</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="ghost" type="button" onClick={() => setIsClassModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Create Class
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
