import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  TrendingUpIcon,
  ClockIcon,
  MessageSquareIcon,
  MoreVerticalIcon,
  CameraIcon,
  SaveIcon,
  Trash2Icon,
  MailIcon,
  PhoneIcon,
  MapPinIcon } from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer } from 'recharts';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Table } from '../../components/ui/Table';
import { useAuth } from '../../context/AuthContext';
import { getClasses } from '../../services/classService';
import { getUsers } from '../../services/userService';
import { useEffect } from 'react';

const sidebarItems = [
  { icon: <LayoutDashboardIcon className="w-4 h-4" />, label: 'Dashboard', path: '/teacher' },
  { icon: <UserIcon className="w-4 h-4" />, label: 'Profile', path: '/teacher/profile' },
  { icon: <BookOpenIcon className="w-4 h-4" />, label: 'My Classes', path: '/teacher/classes' },
  { icon: <FileTextIcon className="w-4 h-4" />, label: 'Assignments', path: '/teacher/assignments' },
  { icon: <UsersIcon className="w-4 h-4" />, label: 'Students', path: '/teacher/students' },
  { icon: <CalendarIcon className="w-4 h-4" />, label: 'Schedule', path: '/teacher/schedule' }
];

const performanceData = [
  { class: 'Grammar A', avg: 82 },
  { class: 'Speaking B', avg: 75 },
  { class: 'Writing C', avg: 88 },
  { class: 'IELTS Prep', avg: 71 },
  { class: 'Vocab D', avg: 79 },
  { class: 'Business E', avg: 85 }
];

const engagementData = [
  { name: 'Sep', attendance: 85, participation: 78 },
  { name: 'Oct', attendance: 88, participation: 82 },
  { name: 'Nov', attendance: 92, participation: 87 },
  { name: 'Dec', attendance: 89, participation: 85 },
  { name: 'Jan', attendance: 94, participation: 91 },
  { name: 'Feb', attendance: 91, participation: 88 }
];

const submissionData = [
  { name: 'Submitted', value: 142, color: '#10b981' },
  { name: 'Pending', value: 28, color: '#f59e0b' },
  { name: 'Late', value: 8, color: '#ef4444' }
];

const classData = [
  { name: 'Grammar Fundamentals', schedule: 'Mon, Wed 9:00 AM', students: 32, status: 'Active' },
  { name: 'Speaking Practice', schedule: 'Tue, Thu 2:00 PM', students: 28, status: 'Active' },
  { name: 'IELTS Preparation', schedule: 'Sat 10:00 AM', students: 24, status: 'Active' },
  { name: 'Business English', schedule: 'Fri 4:00 PM', students: 18, status: 'Active' },
  { name: 'Basic English A', schedule: 'Mon 11:00 AM', students: 35, status: 'Completed' }
];

const studentData = [
  { name: 'Kasun Silva', class: 'Grammar Fundamentals', attendance: '92%', grade: 'A', lastActive: '2 hours ago' },
  { name: 'Amaya Perera', class: 'Speaking Practice', attendance: '88%', grade: 'A-', lastActive: '1 day ago' },
  { name: 'Dinesh Kumar', class: 'IELTS Preparation', attendance: '95%', grade: 'B+', lastActive: '3 hours ago' },
  { name: 'Sachini Fernando', class: 'Business English', attendance: '78%', grade: 'B', lastActive: '2 days ago' },
  { name: 'Ruwan Jayawardena', class: 'Grammar Fundamentals', attendance: '85%', grade: 'A-', lastActive: '5 hours ago' }
];

const recentSubmissions = [
  { id: 1, student: 'Kasun Silva', assignment: 'Grammar Exercise 5', class: 'Grammar Fundamentals', submittedAt: '2 hours ago', status: 'pending-review' },
  { id: 2, student: 'Amaya Perera', assignment: 'Speaking Assessment 3', class: 'Speaking Practice', submittedAt: '4 hours ago', status: 'graded' },
  { id: 3, student: 'Dinesh Kumar', assignment: 'IELTS Mock Test 2', class: 'IELTS Preparation', submittedAt: '1 day ago', status: 'pending-review' },
  { id: 4, student: 'Sachini Fernando', assignment: 'Business Email Writing', class: 'Business English', submittedAt: '2 days ago', status: 'graded' }
];

const upcomingClasses = [
  { id: 1, name: 'Grammar Fundamentals', time: 'Today 9:00 AM', students: 32, room: 'A-101' },
  { id: 2, name: 'Speaking Practice', time: 'Today 2:00 PM', students: 28, room: 'Online' },
  { id: 3, name: 'IELTS Preparation', time: 'Sep 25, 10:00 AM', students: 24, room: 'A-205' }
];

const classColumns = [
  { key: 'name', header: 'Class Name', render: (val) => <span className="font-semibold text-slate-900">{val}</span> },
  { key: 'schedule', header: 'Schedule' },
  { key: 'students', header: 'Students' },
  { key: 'status', header: 'Status', render: (val) => <Badge variant={val === 'Active' ? 'success' : 'info'}>{val}</Badge> },
  { key: 'actions', header: 'Actions', render: () => <div className="flex gap-2"><button className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"><EyeIcon className="w-5 h-5" /></button><button className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"><PencilIcon className="w-5 h-5" /></button></div> }
];

const studentColumns = [
  { key: 'name', header: 'Name' },
  { key: 'class', header: 'Class' },
  { key: 'attendance', header: 'Attendance' },
  { key: 'grade', header: 'Grade' },
  { key: 'lastActive', header: 'Last Active' }
];

const submissionColumns = [
  { key: 'student', header: 'Student Name' },
  { key: 'assignment', header: 'Assignment' },
  { key: 'class', header: 'Class' },
  { key: 'submittedAt', header: 'Submitted' },
  { key: 'status', header: 'Status', render: (val) => { const variantMap = { 'pending-review': 'warning', 'graded': 'success', 'late': 'danger' }; const labelMap = { 'pending-review': 'Pending Review', 'graded': 'Graded', 'late': 'Late' }; return <Badge variant={variantMap[val] || 'info'}>{labelMap[val] || val}</Badge>; } },
  { key: 'actions', header: 'Action', render: () => <Button size="sm" variant="outline">Review</Button> }
];

export function TeacherDashboard() {
  const location = useLocation();
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState(location.pathname === '/teacher/profile' ? 'profile' : 'dashboard');
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);
  const [editForm, setEditForm] = useState({
    fullName: user?.fullName || '',
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || 'Colombo',
    postalCode: user?.postalCode || '',
    country: user?.country || 'Sri Lanka'
  });

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [clsRes, userRes] = await Promise.all([getClasses(), getUsers()]);
        const clsArr = Array.isArray(clsRes) ? clsRes : (clsRes?.data || []);
        const userArr = Array.isArray(userRes) ? userRes : (userRes?.data || []);
        
        // Filter classes for this teacher
        const teacherClasses = clsArr.filter(c => 
          c.teacher?.toLowerCase() === user?.fullName?.toLowerCase() ||
          c.teacherId === user?.id
        );
        
        setClasses(teacherClasses);
        setAllUsers(userArr);
      } catch (err) {
        console.error('Failed to load teacher data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [user]);

  // Total students for this teacher (sum of studentCount in their classes)
  const totalStudentsCount = classes.reduce((sum, c) => sum + (parseInt(c.studentCount) || 0), 0);


  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUser({ ...editForm, profileImage });
    alert('Profile updated successfully!');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      {activeTab === 'dashboard' ? (
        <>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Teacher Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome back, {user?.fullName || 'Ms. Dilani'}. Here's your teaching overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <UsersIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">{totalStudentsCount || '0'}</p>
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
              <p className="text-2xl font-extrabold text-slate-900">{classes?.length || '0'}</p>
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
              <TrendingUpIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">85%</p>
              <p className="text-sm text-slate-500">Avg Score</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-1">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-slate-900">Upcoming Classes</h2>
            <CalendarIcon className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-3">
            {upcomingClasses.map((cls) => (
              <div key={cls.id} className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors cursor-pointer border border-slate-100">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-slate-900 text-sm">{cls.name}</h3>
                  <Badge variant="info" className="text-xs">{cls.room}</Badge>
                </div>
                <p className="text-xs text-slate-500 mb-2 flex items-center gap-1">
                  <ClockIcon className="w-3 h-3" /> {cls.time}
                </p>
                <p className="text-xs text-slate-600 font-medium">{cls.students} Students</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-1">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Assignment Status</h2>
          <div className="h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={submissionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {submissionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {submissionData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-semibold text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-1">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full px-5 py-3 rounded-xl bg-blue-600 text-white font-medium text-base hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <UploadIcon className="w-5 h-5" /> Upload Assignment
            </button>
            <button className="w-full px-5 py-3 rounded-xl bg-slate-100 text-slate-900 font-medium text-base hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
              <MessageSquareIcon className="w-5 h-5" /> Send Announcement
            </button>
            <button className="w-full px-5 py-3 rounded-xl bg-slate-100 text-slate-900 font-medium text-base hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
              <FileTextIcon className="w-5 h-5" /> Create Quiz
            </button>
            <button className="w-full px-5 py-3 rounded-xl bg-slate-100 text-slate-900 font-medium text-base hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
              <MoreVerticalIcon className="w-5 h-5" /> View Reports
            </button>
          </div>
        </Card>
      </div>

      <Card className="mb-6">
        <h2 className="text-lg font-bold text-slate-900 mb-1">Student Engagement Trends</h2>
        <p className="text-sm text-slate-500 mb-6">Attendance and participation over time</p>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <Legend />
              <Line type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="participation" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-900">Recent Submissions</h2>
          <Badge variant="info">12 Pending Review</Badge>
        </div>
        <Table columns={submissionColumns} data={recentSubmissions} />
      </Card>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <h2 className="text-lg font-bold text-slate-900 mb-1">Class Performance</h2>
          <p className="text-sm text-slate-500 mb-6">Average scores by class</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="class" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                <Bar dataKey="avg" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Upload New Assignment</h2>
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center mb-4 hover:border-blue-300 transition-colors">
            <UploadIcon className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-600 mb-1">Drop files here or click to upload</p>
            <p className="text-xs text-slate-400">PDF, DOC, DOCX up to 10MB</p>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Select Class</label>
              <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                <option>Grammar Fundamentals</option>
                <option>Speaking Practice</option>
                <option>IELTS Preparation</option>
                <option>Business English</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Due Date</label>
              <input type="date" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
            </div>
            <Button className="w-full" icon={<UploadIcon className="w-4 h-4" />}>Upload Assignment</Button>
          </div>
        </Card>
      </div>

      <Card className="mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-900">Class Management</h2>
          <Button size="sm" variant="outline">Add Class</Button>
        </div>
        <Table columns={classColumns} data={classes.length > 0 ? classes : classData} />
      </Card>

      <Card>
        <h2 className="text-lg font-bold text-slate-900 mb-5">Student List</h2>
        <Table columns={studentColumns} data={studentData} />
      </Card>
        </>
      ) : (
        // Profile Section
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-slate-900">Profile Settings</h1>
          <p className="text-slate-500 mt-1">Customize your digital identity and account details.</p>

          <div className="grid lg:grid-cols-3 gap-6 mt-8">
            {/* Left Column: Profile Summary */}
            <Card className="lg:col-span-1">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-40 h-40 rounded-full border-4 border-white shadow-xl overflow-hidden bg-blue-600 flex items-center justify-center">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-5xl font-black text-white">{getInitials(user?.fullName)}</span>
                    )}
                  </div>
                  <label className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center cursor-pointer shadow-lg hover:bg-blue-700 transition-all border-2 border-white">
                    <CameraIcon className="w-5 h-5" />
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                  </label>
                </div>

                <h3 className="text-xl font-bold text-slate-900">{editForm.fullName || user?.fullName}</h3>
                <Badge variant="info" className="mt-2 capitalize">{user?.role}</Badge>

                <div className="mt-6 space-y-3 w-full">
                  <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 rounded-lg border border-slate-200">
                    <MailIcon className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600">{editForm.email}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 rounded-lg border border-slate-200">
                    <PhoneIcon className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600">{editForm.phone || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 rounded-lg border border-slate-200">
                    <MapPinIcon className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600">{editForm.city}, {editForm.country}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Right Column: Edit Form */}
            <Card className="lg:col-span-2">
              <h2 className="text-lg font-bold text-slate-900 mb-6">Edit Profile Information</h2>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={editForm.fullName}
                      onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Identity Card No</label>
                    <input
                      type="text"
                      value={editForm.username}
                      onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="e.g. 199012345678"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Email/User Name</label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="+94 77..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Residential Address</label>
                  <input
                    type="text"
                    value={editForm.address}
                    onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">City</label>
                    <input
                      type="text"
                      value={editForm.city}
                      onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Postal Code</label>
                    <input
                      type="text"
                      value={editForm.postalCode}
                      onChange={(e) => setEditForm({ ...editForm, postalCode: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Country</label>
                    <input
                      type="text"
                      value={editForm.country}
                      onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-slate-200">
                  <Button
                    type="submit"
                    className="flex items-center gap-2"
                    icon={<SaveIcon className="w-4 h-4" />}
                  >
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveTab('dashboard')}
                  >
                    Back to Dashboard
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
