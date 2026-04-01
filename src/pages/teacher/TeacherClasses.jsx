import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
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
  MoreVerticalIcon,
  ClockIcon,
  MapPinIcon,
  AlertCircleIcon,
  CheckCircleIcon
} from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Table } from '../../components/ui/Table';
import { Modal } from '../../components/ui/Modal';
import { FormInput } from '../../components/ui/FormInput';
import { getClasses as fetchClassesFromApi, createClass as createClassInApi } from '../../services/classService';

const sidebarItems = [
  { icon: <LayoutDashboardIcon className="w-4 h-4" />, label: 'Dashboard', path: '/teacher' },
  { icon: <UserIcon className="w-4 h-4" />, label: 'Profile', path: '/teacher/profile' },
  { icon: <BookOpenIcon className="w-4 h-4" />, label: 'My Classes', path: '/teacher/classes' },
  { icon: <FileTextIcon className="w-4 h-4" />, label: 'Assignments', path: '/teacher/assignments' },
  { icon: <UsersIcon className="w-4 h-4" />, label: 'Students', path: '/teacher/students' },
  { icon: <CalendarIcon className="w-4 h-4" />, label: 'Schedule', path: '/teacher/schedule' }
];

const classesData = [
  {
    id: 1,
    name: 'Grammar Fundamentals',
    schedule: 'Mon, Wed 9:00 AM',
    students: 32,
    room: 'A-101',
    status: 'Active',
    enrollment: '32/40',
    avgScore: 82
  },
  {
    id: 2,
    name: 'Speaking Practice',
    schedule: 'Tue, Thu 2:00 PM',
    students: 28,
    room: 'A-102',
    status: 'Active',
    enrollment: '28/35',
    avgScore: 78
  },
  {
    id: 3,
    name: 'IELTS Preparation',
    schedule: 'Sat 10:00 AM',
    students: 24,
    room: 'Online',
    status: 'Active',
    enrollment: '24/30',
    avgScore: 85
  },
  {
    id: 4,
    name: 'Business English',
    schedule: 'Fri 4:00 PM',
    students: 18,
    room: 'A-205',
    status: 'Active',
    enrollment: '18/25',
    avgScore: 88
  },
  {
    id: 5,
    name: 'Basic English A',
    schedule: 'Mon 11:00 AM',
    students: 0,
    room: 'A-301',
    status: 'Completed',
    enrollment: '35/40',
    avgScore: 79
  }
];

const classColumns = [
  {
    key: 'name',
    header: 'Class Name',
    render: (val) => <span className="font-semibold text-slate-900">{val}</span>
  },
  {
    key: 'schedule',
    header: 'Schedule'
  },
  {
    key: 'room',
    header: 'Room/Location',
    render: (val) => <Badge variant="info">{val}</Badge>
  },
  {
    key: 'enrollment',
    header: 'Enrollment'
  },
  {
    key: 'avgScore',
    header: 'Avg Score',
    render: (val) => <span className="font-semibold text-slate-900">{val}%</span>
  },
  {
    key: 'status',
    header: 'Status',
    render: (val) => <Badge variant={val === 'Active' ? 'success' : 'info'}>{val}</Badge>
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

const upcomingLectures = [
  { class: 'Grammar Fundamentals', time: 'Today 9:00 AM', duration: '1.5 hours', room: 'A-101' },
  { class: 'Speaking Practice', time: 'Today 2:00 PM', duration: '2 hours', room: 'A-102' },
  { class: 'IELTS Preparation', time: 'Sep 25, 10:00 AM', duration: '3 hours', room: 'Online' }
];

export function TeacherClasses() {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [classes, setClasses] = useState([]);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [newClass, setNewClass] = useState({
    name: '',
    teacher: user?.fullName || '',
    studentCount: 0,
    schedule: '',
    branch: '',
    type: 'online', // Default value
    status: 'Active'
  });

  const loadClasses = async () => {
    try {
      const res = await fetchClassesFromApi();
      const arr = Array.isArray(res) ? res : (res?.data || []);
      setClasses(arr);
    } catch (err) {
      console.error('Failed to load classes', err);
    }
  };

  useEffect(() => {
    loadClasses();
  }, []);

  const handleCreateClass = async (e) => {
    e.preventDefault();
    try {
      const res = await createClassInApi(newClass);
      setClasses(prev => [...prev, res]);
      setIsClassModalOpen(false);
      setNewClass({
        name: '',
        teacher: user?.fullName || '',
        studentCount: 0,
        schedule: '',
        branch: '',
        status: 'Active'
      });
    } catch (err) {
      alert('Failed to create class: ' + (err?.message || String(err)));
    }
  };

  const filteredClasses = filter === 'active'
    ? classes.filter(c => c.status === 'Active')
    : classes;

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">My Classes</h1>
        <p className="text-slate-500 mt-1">Manage and track all your classes</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <BookOpenIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">8</p>
              <p className="text-sm text-slate-500">Total Classes</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <CheckCircleIcon className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">4</p>
              <p className="text-sm text-slate-500">Active Classes</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <UsersIcon className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">102</p>
              <p className="text-sm text-slate-500">Total Students</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center flex-shrink-0">
              <CalendarIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">3</p>
              <p className="text-sm text-slate-500">Today's Classes</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Upcoming Lectures */}
      <Card className="mb-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Today's Lectures</h2>
        <div className="space-y-3">
          {upcomingLectures.map((lecture, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-blue-50 transition-colors">
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900">{lecture.class}</h3>
                <div className="flex gap-4 mt-1">
                  <span className="text-sm text-slate-500 flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" /> {lecture.time} ({lecture.duration})
                  </span>
                  <span className="text-sm text-slate-500 flex items-center gap-1">
                    <MapPinIcon className="w-4 h-4" /> {lecture.room}
                  </span>
                </div>
              </div>
              <Button size="sm" variant="outline">Join Class</Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Classes Table */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <h2 className="text-lg font-bold text-slate-900">All Classes</h2>
            <Badge variant="info">{filteredClasses.length} Classes</Badge>
          </div>
          <div className="flex gap-2">
            <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${filter === 'all'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${filter === 'active'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                Active
              </button>
            </div>
            <Button 
                size="sm" 
                icon={<PlusIcon className="w-4 h-4" />}
                onClick={() => setIsClassModalOpen(true)}
            >
              Create Class
            </Button>
          </div>
        </div>
        <Table columns={classColumns} data={filteredClasses} />
      </Card>

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
          <div className="mt-4">
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
