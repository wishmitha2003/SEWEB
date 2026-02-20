import React from 'react';
import {
  LayoutDashboardIcon,
  BookOpenIcon,
  FolderIcon,
  GamepadIcon,
  CreditCardIcon,
  SettingsIcon,
  UsersIcon,
  ClockIcon,
  TrophyIcon,
  ZapIcon,
  BellIcon,
  TruckIcon,
  CheckCircleIcon,
  CircleIcon } from
'lucide-react';
import {
  AreaChart,
  Area,
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
import { ProgressBar } from '../../components/ui/ProgressBar';
import { useAuth } from '../../context/AuthContext';
const sidebarItems = [
{
  icon: <LayoutDashboardIcon className="w-4 h-4" />,
  label: 'Dashboard',
  path: '/student'
},
{
  icon: <BookOpenIcon className="w-4 h-4" />,
  label: 'My Classes',
  path: '/classes'
},
{
  icon: <FolderIcon className="w-4 h-4" />,
  label: 'Materials',
  path: '/materials'
},
{
  icon: <GamepadIcon className="w-4 h-4" />,
  label: 'Gamification',
  path: '/gamification'
},
{
  icon: <CreditCardIcon className="w-4 h-4" />,
  label: 'Payments',
  path: '/student/payments'
},
{
  icon: <SettingsIcon className="w-4 h-4" />,
  label: 'Settings',
  path: '/student/settings'
}];

const chartData = [
{
  week: 'Week 1',
  hours: 3
},
{
  week: 'Week 2',
  hours: 5
},
{
  week: 'Week 3',
  hours: 4
},
{
  week: 'Week 4',
  hours: 7
},
{
  week: 'Week 5',
  hours: 6
},
{
  week: 'Week 6',
  hours: 8
},
{
  week: 'Week 7',
  hours: 7
},
{
  week: 'Week 8',
  hours: 9
}];

export function StudentDashboard() {
  const { user } = useAuth();
  return (
    <DashboardLayout
      sidebarItems={sidebarItems}>

      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Welcome back, {user?.fullName?.split(' ')[0] || 'Student'}! 👋
        </h1>
        <p className="text-slate-500 mt-1">
          Here's your learning overview for this week.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <BookOpenIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">4</p>
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
              <p className="text-2xl font-extrabold text-slate-900">2</p>
              <p className="text-sm text-slate-500">Upcoming Classes</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Progress Chart */}
        <Card className="lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-900 mb-1">
            Learning Progress
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Weekly learning hours over the past 8 weeks
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="week"
                  tick={{
                    fontSize: 12,
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
                  }}
                  labelStyle={{
                    fontWeight: 600
                  }} />

                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  fill="url(#colorHours)" />

              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Payment Status */}
        <Card>
          <h2 className="text-lg font-bold text-slate-900 mb-1">
            Payment Status
          </h2>
          <p className="text-sm text-slate-500 mb-6">Next payment due</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Monthly Fee</span>
              <Badge variant="warning">Due in 5 days</Badge>
            </div>
            <p className="text-3xl font-extrabold text-slate-900">LKR 5,000</p>
            <p className="text-sm text-slate-500">Due: March 1, 2026</p>
            <ProgressBar
              value={75}
              label="Payment cycle"
              showPercentage
              size="sm" />

            <Button className="w-full" size="md">
              Pay Now
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Announcements */}
        <Card>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-slate-900">
              Recent Announcements
            </h2>
            <BellIcon className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-blue-600">
                  Feb 18, 2026
                </span>
                <Badge variant="info">New</Badge>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                IELTS Preparation Workshop
              </h3>
              <p className="text-xs text-slate-600">
                Join our free IELTS preparation workshop this Saturday at 10 AM.
                Limited seats available.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-semibold text-slate-500">
                Feb 15, 2026
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-1 mb-1">
                New Grammar Course Available
              </h3>
              <p className="text-xs text-slate-600">
                Advanced Grammar for Professionals is now live. Enroll from the
                Classes page.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-semibold text-slate-500">
                Feb 12, 2026
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-1 mb-1">
                Holiday Schedule Update
              </h3>
              <p className="text-xs text-slate-600">
                Classes will be suspended on Feb 20 for Poya Day. Regular
                schedule resumes Feb 21.
              </p>
            </div>
          </div>
        </Card>

        {/* Tute Delivery Tracking */}
        <Card>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-slate-900">Tute Delivery</h2>
            <TruckIcon className="w-5 h-5 text-slate-400" />
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 mb-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-slate-900">
                Order #1234
              </span>
              <Badge variant="info">In Transit</Badge>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Grammar Workbook + Speaking Guide
            </p>

            <div className="flex items-center justify-between relative">
              <div className="absolute top-3 left-3 right-3 h-0.5 bg-slate-200" />
              <div
                className="absolute top-3 left-3 h-0.5 bg-blue-600"
                style={{
                  width: '60%'
                }} />


              <div className="relative flex flex-col items-center gap-1.5 z-10">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-[10px] text-slate-600 font-medium">
                  Ordered
                </span>
              </div>
              <div className="relative flex flex-col items-center gap-1.5 z-10">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-[10px] text-slate-600 font-medium">
                  Printed
                </span>
              </div>
              <div className="relative flex flex-col items-center gap-1.5 z-10">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center ring-4 ring-blue-100">
                  <TruckIcon className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-[10px] text-blue-600 font-bold">
                  Shipped
                </span>
              </div>
              <div className="relative flex flex-col items-center gap-1.5 z-10">
                <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
                  <CircleIcon className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <span className="text-[10px] text-slate-400 font-medium">
                  Delivered
                </span>
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-500">
            <span className="font-medium text-slate-700">
              Estimated delivery:
            </span>{' '}
            Feb 22, 2026
          </p>
        </Card>
      </div>
    </DashboardLayout>);

}