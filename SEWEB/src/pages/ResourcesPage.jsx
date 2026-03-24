import React, { useState } from 'react';
import {
  MonitorIcon,
  BuildingIcon,
  UsersIcon,
  ClockIcon,
  MapPinIcon,
  SearchIcon,
  FileTextIcon,
  DownloadIcon,
  FilterIcon,
  ChevronRightIcon
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { FooterBar } from '../components/layout/FooterBar';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

const allClasses = [
  {
    id: 1,
    title: 'Grammar Fundamentals',
    teacher: 'Ms. Dilani',
    schedule: 'Mon, Wed 9:00 AM',
    level: 'Beginner',
    students: 32,
    price: 'LKR 3,500',
    description: 'Master the basics of English grammar with interactive exercises and real-world examples. Perfect for beginners looking to build a strong foundation.',
    type: 'online'
  },
  {
    id: 2,
    title: 'Speaking Practice',
    teacher: 'Mr. Kamal',
    schedule: 'Tue, Thu 2:00 PM',
    level: 'Intermediate',
    students: 28,
    price: 'LKR 4,000',
    description: 'Improve your spoken English through group discussions, role-plays, and presentation practice. Build confidence in everyday conversations.',
    type: 'online'
  },
  {
    id: 3,
    title: 'IELTS Preparation',
    teacher: 'Ms. Priya',
    schedule: 'Sat 10:00 AM',
    level: 'Advanced',
    students: 24,
    price: 'LKR 6,500',
    description: 'Comprehensive IELTS preparation covering all four modules: Listening, Reading, Writing, and Speaking. Includes mock tests and personalized feedback.',
    type: 'online'
  },
  {
    id: 4,
    title: 'Business English',
    teacher: 'Mr. Rajitha',
    schedule: 'Fri 4:00 PM',
    level: 'Intermediate',
    students: 18,
    price: 'LKR 5,000',
    description: 'Professional English for the workplace. Learn email writing, presentation skills, meeting vocabulary, and business communication etiquette.',
    type: 'online'
  },
  {
    id: 5,
    title: 'Creative Writing',
    teacher: 'Ms. Dilani',
    schedule: 'Wed 6:00 PM',
    level: 'Intermediate',
    students: 15,
    price: 'LKR 4,500',
    description: 'Explore creative writing techniques including storytelling, poetry, and essay writing. Develop your unique voice and style.',
    type: 'online'
  },
  {
    id: 6,
    title: 'Vocabulary Builder',
    teacher: 'Mr. Kamal',
    schedule: 'Mon 11:00 AM',
    level: 'Beginner',
    students: 35,
    price: 'LKR 3,000',
    description: 'Expand your English vocabulary with themed lessons, word games, and practical usage exercises. Learn 50+ new words every week.',
    type: 'online'
  },
  {
    id: 7,
    title: 'Spoken English - Colombo',
    teacher: 'Ms. Priya',
    schedule: 'Mon, Wed 3:00 PM',
    level: 'Beginner',
    students: 25,
    price: 'LKR 4,500',
    description: 'In-person spoken English classes at our Colombo branch. Small class sizes for personalized attention and maximum speaking practice.',
    type: 'physical',
    branch: 'Colombo Main'
  },
  {
    id: 8,
    title: 'Grammar Workshop - Kandy',
    teacher: 'Mr. Rajitha',
    schedule: 'Tue, Thu 10:00 AM',
    level: 'Intermediate',
    students: 20,
    price: 'LKR 4,000',
    description: 'Intensive grammar workshops at our Kandy branch. Hands-on exercises with immediate feedback from experienced instructors.',
    type: 'physical',
    branch: 'Kandy Branch'
  },
  {
    id: 9,
    title: 'IELTS Bootcamp - Galle',
    teacher: 'Ms. Dilani',
    schedule: 'Sat, Sun 9:00 AM',
    level: 'Advanced',
    students: 16,
    price: 'LKR 8,000',
    description: 'Weekend IELTS bootcamp at our Galle branch. Intensive preparation with practice tests, strategies, and one-on-one coaching.',
    type: 'physical',
    branch: 'Galle Branch'
  }
];

const allMaterials = [
  {
    id: 1,
    title: 'English Grammar Workbook - Level 1',
    subject: 'Grammar',
    fileSize: '2.4 MB',
    dateAdded: 'Feb 15, 2026'
  },
  {
    id: 2,
    title: 'Vocabulary Building Exercises',
    subject: 'Vocabulary',
    fileSize: '1.8 MB',
    dateAdded: 'Feb 12, 2026'
  },
  {
    id: 3,
    title: 'Speaking Practice Dialogues',
    subject: 'Speaking',
    fileSize: '3.1 MB',
    dateAdded: 'Feb 10, 2026'
  },
  {
    id: 4,
    title: 'Essay Writing Guide',
    subject: 'Writing',
    fileSize: '1.5 MB',
    dateAdded: 'Feb 8, 2026'
  },
  {
    id: 5,
    title: 'IELTS Reading Practice Tests',
    subject: 'Grammar',
    fileSize: '4.2 MB',
    dateAdded: 'Feb 5, 2026'
  },
  {
    id: 6,
    title: 'Business English Phrases',
    subject: 'Vocabulary',
    fileSize: '0.9 MB',
    dateAdded: 'Feb 3, 2026'
  },
  {
    id: 7,
    title: 'Pronunciation Guide with Audio',
    subject: 'Speaking',
    fileSize: '5.6 MB',
    dateAdded: 'Jan 30, 2026'
  },
  {
    id: 8,
    title: 'Creative Writing Prompts',
    subject: 'Writing',
    fileSize: '1.2 MB',
    dateAdded: 'Jan 28, 2026'
  },
  {
    id: 9,
    title: 'Advanced Grammar - Tenses',
    subject: 'Grammar',
    fileSize: '2.0 MB',
    dateAdded: 'Jan 25, 2026'
  }
];

const subjects = ['All', 'Grammar', 'Vocabulary', 'Speaking', 'Writing'];

export function ResourcesPage() {
  const [activeTab, setActiveTab] = useState('classes'); // 'classes' or 'resources'
  const [classType, setClassType] = useState('online'); // 'online' or 'physical'
  const [activeSubject, setActiveSubject] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);

  const filteredClasses = allClasses.filter(
    (c) => c.type === classType && 
    (search === '' || c.title.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredMaterials = allMaterials.filter((m) => {
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase());
    const matchesSubject = activeSubject === 'All' || m.subject === activeSubject;
    return matchesSearch && matchesSubject;
  });

  const levelColor = (level) => {
    if (level === 'Beginner') return 'success';
    if (level === 'Intermediate') return 'info';
    return 'warning';
  };

  const subjectColor = (subject) => {
    if (subject === 'Grammar') return 'info';
    if (subject === 'Vocabulary') return 'success';
    if (subject === 'Speaking') return 'warning';
    return 'danger';
  };

  return (
    <div className="w-full min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="relative mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
              {activeTab === 'classes' ? 'Our Classes' : 'Learning Resources'}
            </h1>
            <p className="text-slate-500">
              {activeTab === 'classes' 
                ? 'Browse and enroll in our online and physical English classes.' 
                : 'Download study materials, worksheets, and practice tests.'}
            </p>
          </div>

          {/* Level 1 Filter: Classes vs Resources - Top Right Corner No Space */}
          <div className="absolute top-0 right-0 flex bg-white rounded-xl border border-slate-200 overflow-hidden">
            <button
              onClick={() => setActiveTab('classes')}
              className={`px-5 py-2 text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${activeTab === 'classes' ? 'bg-blue-600 text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
            >
              <MonitorIcon className="w-3.5 h-3.5" />
              Classes
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-5 py-2 text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${activeTab === 'resources' ? 'bg-blue-600 text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
            >
              <FileTextIcon className="w-3.5 h-3.5" />
              Resources
            </button>
          </div>
        </div>

        {/* Level 2/3 Filters & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            {activeTab === 'classes' ? (
              <>
                <button
                  onClick={() => setClassType('online')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${classType === 'online' ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
                >
                  Online
                </button>
                <button
                  onClick={() => setClassType('physical')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${classType === 'physical' ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
                >
                  Physical
                </button>
              </>
            ) : (
              subjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => setActiveSubject(subject)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeSubject === subject ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
                >
                  {subject}
                </button>
              ))
            )}
          </div>

          <div className="relative w-full md:w-72">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Content Grid */}
        {activeTab === 'classes' ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((cls) => (
              <Card
                key={cls.id}
                hover
                onClick={() => setSelectedClass(cls)}
                padding={false}
                className="overflow-hidden group"
              >
                <div className="h-40 bg-gradient-to-br from-blue-100 to-sky-50 flex items-center justify-center relative">
                  {cls.type === 'online' ? (
                    <MonitorIcon className="w-12 h-12 text-blue-300 group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <BuildingIcon className="w-12 h-12 text-blue-300 group-hover:scale-110 transition-transform duration-500" />
                  )}
                  <div className="absolute top-4 right-4">
                    <Badge variant={levelColor(cls.level)}>{cls.level}</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {cls.branch && (
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                        <MapPinIcon className="w-3 h-3" /> {cls.branch}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {cls.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">{cls.teacher}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <ClockIcon className="w-3.5 h-3.5 text-blue-400" />
                      {cls.schedule}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <UsersIcon className="w-3.5 h-3.5 text-blue-400" />
                      {cls.students} Students
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <span className="text-lg font-black text-blue-600">
                      {cls.price}<span className="text-[10px] text-slate-400 ml-1 uppercase">/mo</span>
                    </span>
                    <Button size="sm" className="rounded-xl px-5">Join</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMaterials.map((material) => (
              <Card key={material.id} hover className="p-5 group">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors duration-300">
                    <FileTextIcon className="w-7 h-7 text-blue-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge variant={subjectColor(material.subject)} className="mb-2">
                      {material.subject}
                    </Badge>
                    <h3 className="text-sm font-bold text-slate-900 mb-1.5 line-clamp-2 min-h-[40px]">
                      {material.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[11px] font-medium text-slate-400 mb-4">
                      <span>{material.fileSize}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-200" />
                      <span>{material.dateAdded}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50"
                      icon={<DownloadIcon className="w-3.5 h-3.5" />}
                    >
                      Download PDF
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {((activeTab === 'classes' && filteredClasses.length === 0) || 
          (activeTab === 'resources' && filteredMaterials.length === 0)) && (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <SearchIcon className="w-8 h-8 text-slate-200" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">No results found</h3>
            <p className="text-slate-500 max-w-xs mx-auto text-sm">
              We couldn't find what you're looking for. Try adjusting your filters or search terms.
            </p>
          </div>
        )}
      </main>

      {/* Class Detail Modal */}
      <Modal
        isOpen={!!selectedClass}
        onClose={() => setSelectedClass(null)}
        title={selectedClass?.title || ''}
        size="lg"
      >
        {selectedClass && (
          <div className="space-y-6">
            <div className="h-48 bg-gradient-to-br from-blue-100 to-sky-50 rounded-2xl flex items-center justify-center">
              {selectedClass.type === 'online' ? (
                <MonitorIcon className="w-20 h-20 text-blue-300" />
              ) : (
                <BuildingIcon className="w-20 h-20 text-blue-300" />
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant={levelColor(selectedClass.level)}>{selectedClass.level}</Badge>
              <Badge variant="info">{selectedClass.type === 'online' ? 'Online' : 'Physical'}</Badge>
              {selectedClass.branch && <Badge variant="info">{selectedClass.branch}</Badge>}
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">About this class</h4>
              <p className="text-slate-600 leading-relaxed text-sm">
                {selectedClass.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Teacher</p>
                <p className="text-sm font-bold text-slate-900 leading-none">{selectedClass.teacher}</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Schedule</p>
                <p className="text-sm font-bold text-slate-900 leading-none">{selectedClass.schedule}</p>
              </div>
            </div>

            <Button className="w-full py-6 rounded-2xl text-base shadow-xl shadow-blue-100" size="lg">
              Enroll Now — {selectedClass.price}/mo
            </Button>
          </div>
        )}
      </Modal>

      <FooterBar />
    </div>
  );
}
