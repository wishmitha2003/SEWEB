import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpenIcon, UsersIcon, ClockIcon, TrophyIcon, ZapIcon, BellIcon, TruckIcon,
  CheckCircleIcon, CircleIcon, CalendarIcon, MapPinIcon, UploadIcon, MessageSquareIcon, FileTextIcon, MoreVerticalIcon
} from 'lucide-react';
import {
  AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { useAuth } from '../../context/AuthContext';
import { studentSidebarItems } from '../../config/studentSidebarItems.jsx';
import { getClasses } from '../../services/classService';
import { useState, useEffect } from 'react';

const chartData = [
  { week: 'Week 1', hours: 3 },
  { week: 'Week 2', hours: 5 },
  { week: 'Week 3', hours: 4 },
  { week: 'Week 4', hours: 7 },
  { week: 'Week 5', hours: 6 },
  { week: 'Week 6', hours: 8 },
  { week: 'Week 7', hours: 7 },
  { week: 'Week 8', hours: 9 }
];

const assignmentData = [
  { name: 'Completed', value: 24, color: '#10b981' },
  { name: 'Pending', value: 8, color: '#f59e0b' },
  { name: 'Overdue', value: 2, color: '#ef4444' }
];

const upcomingClasses = [
  { id: 1, name: 'Grammar Fundamentals', time: 'Today 9:00 AM', room: 'A-101' },
  { id: 2, name: 'Speaking Practice', time: 'Today 2:00 PM', room: 'Online' },
  { id: 3, name: 'IELTS Preparation', time: 'Sep 25, 10:00 AM', room: 'A-205' }
];

export function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClasses() {
      try {
        const res = await getClasses();
        const arr = Array.isArray(res) ? res : (res?.data || []);
        // In a real app, we would filter by student enrollment
        // For now, we'll show classes available to students or all
        setClasses(arr);
      } catch (err) {
        console.error('Failed to load student classes:', err);
      } finally {
        setLoading(false);
      }
    }
    loadClasses();
  }, []);


  return (
    <DashboardLayout sidebarItems={studentSidebarItems}>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Welcome back, {user?.fullName?.split(' ')[0] || 'Student'}! 👋
        </h1>
        <p className="text-slate-500 mt-1">Here's your learning overview for this week.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <BookOpenIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">{classes?.length || '0'}</p>
              <p className="text-sm text-slate-500">Enrolled Classes</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <ZapIcon className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">2,450</p>
              <p className="text-sm text-slate-500">XP Points</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <TrophyIcon className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">Gold</p>
              <p className="text-sm text-slate-500">Current Level</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center flex-shrink-0">
              <ClockIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">
                {classes?.filter(c => c.status === 'Active')?.length || '0'}
              </p>
              <p className="text-sm text-slate-500">Upcoming Classes</p>
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
            {(classes.length > 0 ? classes.slice(0, 3) : upcomingClasses).map((cls) => (
              <div key={cls.id || cls._id} className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors cursor-pointer border border-slate-100">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-slate-900 text-sm">{cls.name}</h3>
                  <Badge variant="info" className="text-xs">{cls.branch || cls.room || 'Online'}</Badge>
                </div>
                <p className="text-xs text-slate-500 mb-2 flex items-center gap-1">
                  <ClockIcon className="w-3 h-3" /> {cls.schedule || cls.time}
                </p>
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
                  data={assignmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {assignmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {assignmentData.map((item) => (
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
            <button className="w-full px-5 py-3 rounded-xl bg-blue-600 text-white font-medium text-base hover:bg-blue-700 transition-colors flex items-center justify-center gap-2" onClick={() => navigate('/student/classes')}>
              <BookOpenIcon className="w-5 h-5" /> Join Live Class
            </button>
            <button className="w-full px-5 py-3 rounded-xl bg-slate-100 text-slate-900 font-medium text-base hover:bg-slate-200 transition-colors flex items-center justify-center gap-2" onClick={() => navigate('/student')}>
              <FileTextIcon className="w-5 h-5" /> Take Quiz
            </button>
            <button className="w-full px-5 py-3 rounded-xl bg-slate-100 text-slate-900 font-medium text-base hover:bg-slate-200 transition-colors flex items-center justify-center gap-2" onClick={() => navigate('/student')}>
              <UploadIcon className="w-5 h-5" /> Download Materials
            </button>
            <button className="w-full px-5 py-3 rounded-xl bg-slate-100 text-slate-900 font-medium text-base hover:bg-slate-200 transition-colors flex items-center justify-center gap-2" onClick={() => navigate('/student/payments')}>
              <MoreVerticalIcon className="w-5 h-5" /> Pay Fees
            </button>
          </div>
        </Card>
      </div>

      <Card className="mb-6">
        <h2 className="text-lg font-bold text-slate-900 mb-1">Learning Progress</h2>
        <p className="text-sm text-slate-500 mb-6">Weekly learning hours over the past 8 weeks</p>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} labelStyle={{ fontWeight: 600 }} />
              <Area type="monotone" dataKey="hours" stroke="#2563eb" strokeWidth={3} fill="url(#colorHours)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Announcements */}
        <Card>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-slate-900">Recent Announcements</h2>
            <BellIcon className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-blue-600">Feb 18, 2026</span>
                <Badge variant="info">New</Badge>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">IELTS Preparation Workshop</h3>
              <p className="text-xs text-slate-600">Join our free IELTS preparation workshop this Saturday at 10 AM. Limited seats available.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-semibold text-slate-500">Feb 15, 2026</span>
              <h3 className="text-sm font-bold text-slate-900 mt-1 mb-1">New Grammar Course Available</h3>
              <p className="text-xs text-slate-600">Advanced Grammar for Professionals is now live. Enroll from the Classes page.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-semibold text-slate-500">Feb 12, 2026</span>
              <h3 className="text-sm font-bold text-slate-900 mt-1 mb-1">Holiday Schedule Update</h3>
              <p className="text-xs text-slate-600">Classes will be suspended on Feb 20 for Poya Day. Regular schedule resumes Feb 21.</p>
            </div>
          </div>
        </Card>

        {/* Payment Status & Delivery Tracking */}
        <div className="flex flex-col gap-6">
          <Card>
            <h2 className="text-lg font-bold text-slate-900 mb-1">Payment Status</h2>
            <p className="text-sm text-slate-500 mb-6">Next payment due</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Monthly Fee</span>
                <Badge variant="warning">Due in 5 days</Badge>
              </div>
              <p className="text-3xl font-extrabold text-slate-900">LKR 5,000</p>
              <p className="text-sm text-slate-500">Due: March 1, 2026</p>
              <ProgressBar value={75} label="Payment cycle" showPercentage size="sm" />
              <Button className="w-full mt-2" size="md" onClick={() => navigate('/student/payments')}>Pay Now</Button>
            </div>
          </Card>
          
          <Card>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-900">Tute Delivery</h2>
              <TruckIcon className="w-5 h-5 text-slate-400" />
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 mb-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-slate-900">Order #1234</span>
                <Badge variant="info">In Transit</Badge>
              </div>
              <p className="text-xs text-slate-500 mb-4">Grammar Workbook + Speaking Guide</p>

              <div className="flex items-center justify-between relative">
                <div className="absolute top-3 left-3 right-3 h-0.5 bg-slate-200" />
                <div className="absolute top-3 left-3 h-0.5 bg-blue-600" style={{ width: '60%' }} />

                <div className="relative flex flex-col items-center gap-1.5 z-10">
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <CheckCircleIcon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-[10px] text-slate-600 font-medium">Ordered</span>
                </div>
                <div className="relative flex flex-col items-center gap-1.5 z-10">
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <CheckCircleIcon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-[10px] text-slate-600 font-medium">Printed</span>
                </div>
                <div className="relative flex flex-col items-center gap-1.5 z-10">
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center ring-4 ring-blue-100">
                    <TruckIcon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-[10px] text-blue-600 font-bold">Shipped</span>
                </div>
                <div className="relative flex flex-col items-center gap-1.5 z-10">
                  <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
                    <CircleIcon className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">Delivered</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-500"><span className="font-medium text-slate-700">Estimated delivery:</span> Feb 22, 2026</p>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}