import React, { useState, useEffect, useRef } from 'react';
import {
  SearchIcon,
  PlusIcon,
  PencilIcon,
  Trash2Icon,
  BookOpenIcon,
  XIcon
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { PronunciationRecorder } from '../components/ui/PronunciationRecorder';
import { useAuth } from '../context/AuthContext';
import {
  getVocabularies,
  getVocabulariesByAgeSection,
  createVocabulary,
  updateVocabulary,
  deleteVocabulary
} from '../services/vocabularyService';
import { studentSidebarItems } from '../config/studentSidebarItems.jsx';
import { adminSidebarItems } from '../config/adminSidebarItems.jsx';
import { teacherSidebarItems } from '../config/teacherSidebarItems.jsx';

const AGE_SECTIONS = ['1-5', '6-10', '11-15', '16-20', '20+'];

export function VocabularyPage() {
  const { user, isLoggedIn } = useAuth();
  console.log('VocabularyPage - User:', user, 'isLoggedIn:', isLoggedIn);
  const isTeacher = user?.role === 'teacher' || user?.role === 'TEACHER' || user?.role === 'Teacher';
  const isAdmin = user?.role === 'admin' || user?.role === 'ADMIN' || user?.role === 'Admin';
  
  const [activeTab, setActiveTab] = useState('1-5');
  const [vocabularies, setVocabularies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVocabulary, setEditingVocabulary] = useState(null);
  const [formData, setFormData] = useState({
    word: '',
    meaning: '',
    example: '',
    ageSection: '1-5'
  });
  const [saving, setSaving] = useState(false);
  const [playingId, setPlayingId] = useState(null);
  const currentAudioRef = useRef(null);

  // Pre-load voices for SpeechSynthesis
  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  useEffect(() => {
    fetchVocabularies();
  }, [activeTab]);

  const fetchVocabularies = async () => {
    try {
      setLoading(true);
      const data = await getVocabulariesByAgeSection(activeTab);
      setVocabularies(data || []);
    } catch (error) {
      console.error('Error fetching vocabularies:', error);
      setVocabularies([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredVocabularies = vocabularies.filter(v => 
    v.word?.toLowerCase().includes(search.toLowerCase()) ||
    v.meaning?.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenModal = (vocabulary = null) => {
    if (vocabulary) {
      setEditingVocabulary(vocabulary);
      setFormData({
        word: vocabulary.word || '',
        meaning: vocabulary.meaning || '',
        example: vocabulary.example || '',
        ageSection: vocabulary.ageSection || activeTab
      });
    } else {
      setEditingVocabulary(null);
      setFormData({
        word: '',
        meaning: '',
        example: '',
        ageSection: activeTab
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingVocabulary(null);
    setFormData({
      word: '',
      meaning: '',
      example: '',
      ageSection: '1-5'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.word || !formData.meaning) return;
    
    try {
      setSaving(true);
      if (editingVocabulary) {
        await updateVocabulary(editingVocabulary.id, formData);
      } else {
        await createVocabulary(formData);
      }
      await fetchVocabularies();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving vocabulary:', error);
      alert('Failed to save vocabulary. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this vocabulary?')) return;
    
    try {
      await deleteVocabulary(id);
      await fetchVocabularies();
    } catch (error) {
      console.error('Error deleting vocabulary:', error);
      alert('Failed to delete vocabulary. Please try again.');
    }
  };

  const playPronunciation = (word, id) => {
    // Cancel any current speech
    window.speechSynthesis.cancel();

    if (playingId === id) {
      setPlayingId(null);
      return;
    }

    setPlayingId(id);

    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const findVoice = (voiceList) => {
      return voiceList.find(v => 
        (v.lang.includes('en') && (v.name.includes('Google') || v.name.includes('Premium') || v.name.includes('Natural')))
      ) || voiceList.find(v => v.lang.startsWith('en'));
    };

    const voice = findVoice(voices);
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = () => setPlayingId(null);
    utterance.onerror = () => setPlayingId(null);

    // Speak it
    window.speechSynthesis.speak(utterance);
  };

  return (
    <DashboardLayout sidebarItems={isAdmin ? adminSidebarItems : isTeacher ? teacherSidebarItems : studentSidebarItems}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
            Vocabulary
          </h1>
          <p className="text-slate-500">
            Learn and practice English vocabulary by age group.
          </p>
        </div>

        {/* Search, Filter and Actions */}
        <div className="flex flex-col lg:flex-row gap-4 mb-10 items-center">
          {/* Search input */}
          <div className="relative flex-1 w-full">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search words..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
            />
          </div>

          {/* Age Group Filters */}
          <div className="flex gap-1.5 p-1 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-x-auto max-w-full">
            {AGE_SECTIONS.map((section) => (
              <button
                key={section}
                onClick={() => setActiveTab(section)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
                  activeTab === section
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {section}
              </button>
            ))}
          </div>

          {/* Action Button */}
          {isTeacher && (
            <Button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 px-6 py-3 rounded-xl shadow-md h-[46px] whitespace-nowrap"
            >
              <PlusIcon className="w-4 h-4" />
              Add Word
            </Button>
          )}
        </div>

        {/* Vocabulary Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredVocabularies.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpenIcon className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No vocabulary found
            </h3>
            <p className="text-slate-500">
              {isTeacher 
                ? 'Click "Add Word" to add vocabulary for this age group.'
                : 'No vocabulary available for this age group yet.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredVocabularies.map((vocab) => (
              <Card key={vocab.id} hover className="relative p-4 overflow-hidden" padding={false}>
                {isTeacher && (
                  <div className="absolute top-2 right-2 flex gap-0.5">
                    <button
                      onClick={() => handleOpenModal(vocab)}
                      className="p-1 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      title="Edit"
                    >
                      <PencilIcon className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(vocab.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <Trash2Icon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                <div className={isTeacher ? "pr-12" : ""}>
                  <div className="flex flex-col gap-2 mb-3">
                    <h3 className="text-base font-black text-slate-900 truncate" title={vocab.word}>
                      {vocab.word}
                    </h3>
                    <button
                      onClick={() => playPronunciation(vocab.word, vocab.id)}
                      className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-sm ${
                        playingId === vocab.id ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {playingId === vocab.id ? '⏹ Stop' : '🔊 Play'}
                    </button>
                  </div>
                  <p className="text-xs font-bold text-slate-600 mb-3 line-clamp-2 min-h-[2rem]">
                    {vocab.meaning}
                  </p>
                  {vocab.example && (
                    <div className="p-2 border-l-2 border-blue-100 bg-blue-50/50 rounded-r-lg mb-2">
                      <p className="text-[10px] text-slate-500 italic leading-relaxed line-clamp-2">
                        "{vocab.example}"
                      </p>
                    </div>
                  )}
                  {/* Pronunciation Recorder for students */}
                  {!isTeacher && (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <PronunciationRecorder vocabularyId={vocab.id} />
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingVocabulary ? 'Edit Vocabulary' : 'Add New Vocabulary'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Word <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.word}
              onChange={(e) => setFormData({ ...formData, word: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter the word"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Meaning <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.meaning}
              onChange={(e) => setFormData({ ...formData, meaning: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter the meaning"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Example (Optional)
            </label>
            <textarea
              value={formData.example}
              onChange={(e) => setFormData({ ...formData, example: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              placeholder="Enter an example sentence"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Age Section
            </label>
            <select
              value={formData.ageSection}
              onChange={(e) => setFormData({ ...formData, ageSection: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              {AGE_SECTIONS.map((section) => (
                <option key={section} value={section}>
                  Age {section}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCloseModal}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving || !formData.word || !formData.meaning}
              className="flex-1"
            >
              {saving ? 'Saving...' : (editingVocabulary ? 'Update' : 'Add')}
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}