import React, { useState } from 'react';
import {
  MonitorIcon,
  BuildingIcon,
  UsersIcon,
  ClockIcon,
  StarIcon,
  MapPinIcon,
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { studentSidebarItems } from '../config/studentSidebarItems.jsx';
import { getClasses } from '../services/classService';
import { useEffect } from 'react';

export function ClassesPage() {
  const [activeTab, setActiveTab] = useState('online');
  const [selectedClass, setSelectedClass] = useState(null);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getClasses();
        const arr = Array.isArray(res) ? res : (res?.data || []);
        // Map backend fields to frontend local names if needed
        const mapped = arr.map(c => ({
          ...c,
          title: c.name || c.title,
          students: c.studentCount != null ? c.studentCount : c.students,
          price: 'LKR 0',
          level: 'Beginner', 
          description: 'No description provided.',
          type: (c.name || '').toLowerCase().includes('online') ? 'online' : 'physical'
        }));
        setClasses(mapped);
      } catch (err) {
        console.error('Failed to load classes', err);
      }
    };
    loadData();
  }, []);

  const filteredClasses = classes.filter((c) => (c.type || 'online').toLowerCase() === activeTab);

  const levelColor = (level) => {
    if (level === 'Beginner') return 'success';
    if (level === 'Intermediate') return 'info';
    return 'warning';
  };

  return (
    <DashboardLayout sidebarItems={studentSidebarItems}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
            Our Classes
          </h1>
          <p className="text-slate-500">
            Browse and enroll in our online and physical English classes.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit mb-8">
          <button
            onClick={() => setActiveTab('online')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === 'online'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            <MonitorIcon className="w-4 h-4" />
            Online Classes
          </button>
          <button
            onClick={() => setActiveTab('physical')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === 'physical'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            <BuildingIcon className="w-4 h-4" />
            Physical Classes
          </button>
        </div>

        {/* Class Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((cls) => (
            <Card
              key={cls.id}
              hover
              onClick={() => setSelectedClass(cls)}
              padding={false}
            >
              <div className="h-36 bg-gradient-to-br from-blue-100 to-sky-50 rounded-t-2xl flex items-center justify-center">
                {cls.type === 'online' ? (
                  <MonitorIcon className="w-12 h-12 text-blue-300" />
                ) : (
                  <BuildingIcon className="w-12 h-12 text-blue-300" />
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={levelColor(cls.level)}>{cls.level}</Badge>
                  {cls.branch && (
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPinIcon className="w-3 h-3" /> {cls.branch}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  {cls.title}
                </h3>
                <p className="text-sm text-slate-500 mb-3">{cls.teacher}</p>
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                  <span className="flex items-center gap-1">
                    <ClockIcon className="w-3.5 h-3.5" /> {cls.schedule}
                  </span>
                  <span className="flex items-center gap-1">
                    <UsersIcon className="w-3.5 h-3.5" /> {cls.students}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-blue-600">
                    {cls.price}/mo
                  </span>
                  <Button size="sm">Enroll</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Class Detail Modal */}
        <Modal
          isOpen={!!selectedClass}
          onClose={() => setSelectedClass(null)}
          title={selectedClass?.title || ''}
          size="lg"
        >
          {selectedClass && (
            <div className="space-y-5">
              <div className="h-40 bg-gradient-to-br from-blue-100 to-sky-50 rounded-xl flex items-center justify-center">
                {selectedClass.type === 'online' ? (
                  <MonitorIcon className="w-16 h-16 text-blue-300" />
                ) : (
                  <BuildingIcon className="w-16 h-16 text-blue-300" />
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant={levelColor(selectedClass.level)}>
                  {selectedClass.level}
                </Badge>
                <Badge variant="info">
                  {selectedClass.type === 'online' ? 'Online' : 'Physical'}
                </Badge>
                {selectedClass.branch && (
                  <Badge variant="info">{selectedClass.branch}</Badge>
                )}
              </div>
              <p className="text-slate-600 leading-relaxed">
                {selectedClass.description}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-slate-50">
                  <p className="text-xs text-slate-500">Teacher</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {selectedClass.teacher}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50">
                  <p className="text-xs text-slate-500">Schedule</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {selectedClass.schedule}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50">
                  <p className="text-xs text-slate-500">Students Enrolled</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {selectedClass.students}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50">
                  <p className="text-xs text-slate-500">Monthly Fee</p>
                  <p className="text-sm font-semibold text-blue-600">
                    {selectedClass.price}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50">
                  <p className="text-xs text-slate-500">Rating</p>
                  <p className="text-sm font-semibold text-slate-900 flex items-center gap-1">
                    <StarIcon className="w-4 h-4 text-amber-400" /> 4.8 / 5.0
                  </p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">
                  Syllabus Preview
                </h4>
                <ul className="space-y-1.5 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    Introduction & Assessment
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    Core Concepts & Practice
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    Advanced Topics & Application
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    Review & Final Assessment
                  </li>
                </ul>
              </div>
              <Button className="w-full" size="lg">
                Enroll Now — {selectedClass.price}/mo
              </Button>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
}
