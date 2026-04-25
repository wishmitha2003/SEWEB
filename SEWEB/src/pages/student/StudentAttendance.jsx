import React, { useState, useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon, CalendarIcon, ClockIcon } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Table } from '../../components/ui/Table';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { studentSidebarItems } from '../../config/studentSidebarItems.jsx';
import { getStudentAttendance } from '../../services/attendanceService';

export function StudentAttendance() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getStudentAttendance();
        setAttendanceRecords(data);
      } catch (err) {
        console.error('Failed to load attendance:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalClasses = attendanceRecords.length;
  const attendedClasses = attendanceRecords.filter(r => r.status === 'Present').length;
  const missedClasses = totalClasses - attendedClasses;
  const attendancePercentage = totalClasses === 0 ? 0 : Math.round((attendedClasses / totalClasses) * 100);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const columns = [
    { header: 'Class Name', accessor: 'className' },
    { 
      header: 'Date & Time', 
      accessor: 'date',
      render: (value) => (
        <span className="flex items-center gap-1 text-slate-600">
          <CalendarIcon className="w-4 h-4" /> {formatDate(value)}
        </span>
      )
    },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (value) => (
        <Badge variant={value === 'Present' ? 'success' : 'danger'} className="flex items-center gap-1 w-fit">
          {value === 'Present' ? <CheckCircleIcon className="w-3 h-3" /> : <XCircleIcon className="w-3 h-3" />}
          {value}
        </Badge>
      )
    }
  ];

  return (
    <DashboardLayout sidebarItems={studentSidebarItems}>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">My Attendance</h1>
        <p className="text-slate-500">Monitor your participation in live classes and track your attendance record.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-1 flex flex-col items-center justify-center text-center py-8">
          <div className="relative w-32 h-32 flex items-center justify-center mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={attendancePercentage >= 75 ? "#10b981" : attendancePercentage >= 50 ? "#f59e0b" : "#ef4444"}
                strokeWidth="3"
                strokeDasharray={`${attendancePercentage}, 100`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-slate-900">{attendancePercentage}%</span>
            </div>
          </div>
          <h2 className="text-lg font-bold text-slate-900">Overall Attendance</h2>
          <p className="text-sm text-slate-500 mt-1">
            {attendancePercentage >= 75 ? 'Great job! Keep it up.' : 'Try to attend more classes.'}
          </p>
        </Card>

        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          <Card className="flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Attended Classes</p>
                <p className="text-3xl font-extrabold text-slate-900">{attendedClasses}</p>
              </div>
            </div>
            <ProgressBar value={totalClasses ? (attendedClasses / totalClasses) * 100 : 0} color="emerald" size="sm" />
          </Card>
          
          <Card className="flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
                <XCircleIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Missed Classes</p>
                <p className="text-3xl font-extrabold text-slate-900">{missedClasses}</p>
              </div>
            </div>
            <ProgressBar value={totalClasses ? (missedClasses / totalClasses) * 100 : 0} color="red" size="sm" />
          </Card>
        </div>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900">Attendance History</h2>
          <Badge variant="info">{totalClasses} Total Sessions</Badge>
        </div>
        
        {loading ? (
          <div className="py-8 text-center text-slate-500">Loading attendance records...</div>
        ) : attendanceRecords.length > 0 ? (
          <Table columns={columns} data={attendanceRecords} />
        ) : (
          <div className="py-8 text-center text-slate-500">No attendance records found.</div>
        )}
      </Card>
    </DashboardLayout>
  );
}
