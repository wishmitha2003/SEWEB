import React, { useState } from 'react';
import {
  SearchIcon,
  FileTextIcon,
  DownloadIcon,
  FilterIcon } from
'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
const materials = [
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
}];

const subjects = ['All', 'Grammar', 'Vocabulary', 'Speaking', 'Writing'];
export function MaterialsPage() {
  const [search, setSearch] = useState('');
  const [activeSubject, setActiveSubject] = useState('All');
  const filtered = materials.filter((m) => {
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase());
    const matchesSubject =
    activeSubject === 'All' || m.subject === activeSubject;
    return matchesSearch && matchesSubject;
  });
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
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
            Learning Materials
          </h1>
          <p className="text-slate-500">
            Download study materials, worksheets, and practice tests.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search materials..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />

          </div>
          <div className="flex gap-1 p-1 bg-white border border-slate-200 rounded-xl">
            {subjects.map((subject) =>
            <button
              key={subject}
              onClick={() => setActiveSubject(subject)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${activeSubject === subject ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}>

                {subject}
              </button>
            )}
          </div>
        </div>

        {/* Materials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((material) =>
          <Card key={material.id} hover>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <FileTextIcon className="w-6 h-6 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5 truncate">
                    {material.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={subjectColor(material.subject)}>
                      {material.subject}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                    <span>{material.fileSize}</span>
                    <span>•</span>
                    <span>{material.dateAdded}</span>
                  </div>
                  <Button
                  size="sm"
                  variant="outline"
                  icon={<DownloadIcon className="w-3.5 h-3.5" />}>

                    Download
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {filtered.length === 0 &&
        <div className="text-center py-16">
            <FileTextIcon className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">No materials found</p>
            <p className="text-sm text-slate-400 mt-1">
              Try adjusting your search or filter
            </p>
          </div>
        }
      </main>
      <Footer />
    </div>);

}