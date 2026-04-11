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
import { getMaterials as fetchMaterialsFromApi, createMaterial as createMaterialInApi, deleteMaterial as deleteMaterialInApi } from '../../services/materialService';
import { getBranches as fetchBranchesFromApi, createBranch as createBranchInApi, deleteBranch as deleteBranchInApi, updateBranch as updateBranchInApi, uploadBranchLogo } from '../../services/branchService';
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

  const [confirmModal, setConfirmModal] = useState({ open: false, message: '', title: '', onConfirm: null });

  function showConfirm(title, message, onConfirm) {
    setConfirmModal({ open: true, title, message, onConfirm });
  }

  function closeConfirm() {
    setConfirmModal({ open: false, message: '', title: '', onConfirm: null });
  }

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [usersError, setUsersError] = useState(null);

  const [materials, setMaterials] = useState([]);
  const [loadingMaterials, setLoadingMaterials] = useState(false);
  const [materialsError, setMaterialsError] = useState(null);
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);
  const [newMaterialFiles, setNewMaterialFiles] = useState([]);
  const [newMaterial, setNewMaterial] = useState({
    title: '',
    type: 'PDF',
    className: '',
    uploadedBy: user?.fullName || '',
    status: 'Published'
  });

  const [branches, setBranches] = useState([]);
  const [loadingBranches, setLoadingBranches] = useState(false);
  const [branchesError, setBranchesError] = useState(null);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [newBranch, setNewBranch] = useState({
    name: '',
    address: '',
    managerName: '',
    phone: '',
    locationUrl: '',
    logoUrl: '',
    lat: '',
    lng: ''
  });
  const [branchLogoFile, setBranchLogoFile] = useState(null);
  const [isEditingBranch, setIsEditingBranch] = useState(false);
  const [currentBranchId, setCurrentBranchId] = useState(null);

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
    showConfirm(
      'Delete User',
      'Are you sure you want to permanently delete this user? This action cannot be undone.',
      async () => {
        try {
          await deleteUserFromApi(id);
          setUsers(prev => prev.filter(u => u.id !== id));
        } catch (err) {
          alert('Failed to delete user: ' + (err?.message || String(err)));
        }
      }
    );
    return;


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
    showConfirm(
      'Delete Class',
      'Are you sure you want to permanently delete this class? All associated data will be removed.',
      async () => {
        try {
          await deleteClassInApi(id);
          setClasses(prev => prev.filter(c => c.id !== id));
        } catch (err) {
          alert('Failed to delete class: ' + (err?.message || String(err)));
        }
      }
    );
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

  async function loadMaterials() {
    setLoadingMaterials(true);
    setMaterialsError(null);
    try {
      const res = await fetchMaterialsFromApi();
      const arr = Array.isArray(res) ? res : (res?.data || []);
      setMaterials(arr);
    } catch (err) {
      setMaterialsError(err?.message || String(err));
      setMaterials([]);
    } finally {
      setLoadingMaterials(false);
    }
  }

  async function handleUploadMaterial(e) {
    e.preventDefault();
    if (!newMaterialFiles || newMaterialFiles.length === 0) {
      alert('Please select at least one file to upload');
      return;
    }
    
    try {
      const res = await createMaterialInApi({
        ...newMaterial,
        uploadedBy: user?.fullName || newMaterial.uploadedBy
      }, newMaterialFiles);
      setMaterials(prev => [...prev, res]);
      setIsMaterialModalOpen(false);
      setNewMaterialFiles([]);
      setNewMaterial({
        title: '',
        type: 'PDF',
        className: '',
        uploadedBy: user?.fullName || '',
        status: 'Published'
      });
    } catch (err) {
      alert('Failed to upload material: ' + (err?.message || String(err)));
    }
  }

  async function handleDeleteMaterial(id) {
    if (!id) return;
    showConfirm(
      'Delete Material',
      'Are you sure you want to permanently delete this material? Students will no longer be able to access it.',
      async () => {
        try {
          await deleteMaterialInApi(id);
          setMaterials(prev => prev.filter(m => m.id !== id && m._id !== id));
        } catch (err) {
          alert('Failed to delete material: ' + (err?.message || String(err)));
        }
      }
    );
  }

  async function loadBranches() {
    setLoadingBranches(true);
    setBranchesError(null);
    try {
      const res = await fetchBranchesFromApi();
      const arr = Array.isArray(res) ? res : (res?.data || []);
      setBranches(arr);
    } catch (err) {
      setBranchesError(err?.message || String(err));
      setBranches([]);
    } finally {
      setLoadingBranches(false);
    }
  }

  async function handleCreateBranch(e) {
    e.preventDefault();
    try {
      let saved;
      if (isEditingBranch) {
        saved = await updateBranchInApi(currentBranchId, newBranch);
        setBranches(prev => prev.map(b => (b.id === currentBranchId || b._id === currentBranchId) ? saved : b));
      } else {
        saved = await createBranchInApi(newBranch);
        setBranches(prev => [...prev, saved]);
      }
      // Upload logo separately if a file was selected
      if (branchLogoFile) {
        const savedId = saved.id || saved._id;
        const updated = await uploadBranchLogo(savedId, branchLogoFile);
        setBranches(prev => prev.map(b => (b.id === savedId || b._id === savedId) ? updated : b));
      }
      setIsBranchModalOpen(false);
      resetBranchForm();
    } catch (err) {
      alert('Failed to save branch: ' + (err?.message || String(err)));
    }
  }

  function resetBranchForm() {
    setNewBranch({
      name: '',
      address: '',
      managerName: '',
      phone: '',
      locationUrl: '',
      logoUrl: '',
      lat: '',
      lng: ''
    });
    setBranchLogoFile(null);
    setIsEditingBranch(false);
    setCurrentBranchId(null);
  }

  async function handleDeleteBranch(id) {
    if (!id) return;
    showConfirm(
      'Delete Branch',
      'Are you sure you want to permanently delete this branch? This action cannot be reversed.',
      async () => {
        try {
          await deleteBranchInApi(id);
          setBranches(prev => prev.filter(b => b.id !== id && b._id !== id));
        } catch (err) {
          alert('Failed to delete branch: ' + (err?.message || String(err)));
        }
      }
    );
  }

  function openEditBranch(branch) {
    setNewBranch({
      name: branch.name,
      address: branch.address,
      managerName: branch.managerName,
      phone: branch.phone,
      locationUrl: branch.locationUrl || '',
      logoUrl: branch.logoUrl || '',
      lat: branch.lat || '',
      lng: branch.lng || ''
    });
    setBranchLogoFile(null);
    setIsEditingBranch(true);
    setCurrentBranchId(branch.id || branch._id);
    setIsBranchModalOpen(true);
  }

  useEffect(() => {
    if (path.startsWith('/admin')) {
      loadUsers();
      loadClasses();
      loadMaterials();
      loadBranches();
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
            <p className="text-2xl font-extrabold text-slate-900">{classes?.length?.toLocaleString?.() || '0'}</p>
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
            <p className="text-2xl font-extrabold text-slate-900">{branches?.length?.toLocaleString?.() || '0'}</p>
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
            <p className="text-xs text-slate-500 mt-1">Manage real teaching resources via API.</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">Create Folder</Button>
            <Button size="sm" onClick={() => setIsMaterialModalOpen(true)}>Upload Material</Button>
          </div>
        </div>
        {materialsError && (
          <div className="p-4 mb-4 rounded bg-red-50 text-red-700">Failed to load materials: {materialsError}</div>
        )}
        {loadingMaterials && (
          <div className="p-4 mb-4 rounded bg-slate-50 text-slate-600">Loading materials...</div>
        )}
        <Table 
            columns={[
                {
                  key: 'title',
                  header: 'Title',
                  render: (val, row) => (
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-900">{val}</span>
                      {row.fileUrls && row.fileUrls.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {row.fileUrls.map((url, idx) => (
                            <a 
                              key={idx}
                              href={`http://localhost:8082${url}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded hover:bg-blue-100 transition-colors border border-blue-100"
                            >
                              File {idx + 1}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                },
                {
                  key: 'type',
                  header: 'Type',
                  render: (val) => (
                    <Badge variant="info">{val}</Badge>
                  )
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
                  key: 'uploadedOn',
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
                  render: (_, row) => (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleDeleteMaterial(row.id || row._id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  )
                }
              ]} 
            data={materials} 
        />
      </Card>
    </>
  );

  const renderBranches = () => (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Branch Management</h1>
        <p className="text-slate-500 mt-1">Manage physical locations and branch managers.</p>
      </div>
      {branchesError && (
        <div className="p-4 mb-4 rounded bg-red-50 text-red-700">Failed to load branches: {branchesError}</div>
      )}
      {loadingBranches && (
        <div className="p-4 mb-4 rounded bg-slate-50 text-slate-600">Loading branches...</div>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((branch, idx) => {
          const colorSchemes = [
            { bg: 'bg-blue-100', text: 'text-blue-600' },
            { bg: 'bg-emerald-100', text: 'text-emerald-600' },
            { bg: 'bg-amber-100', text: 'text-amber-600' },
            { bg: 'bg-purple-100', text: 'text-purple-600' },
            { bg: 'bg-rose-100', text: 'text-rose-600' }
          ];
          const color = colorSchemes[idx % colorSchemes.length];
          
          return (
            <Card key={branch.id || branch._id} className="hover:shadow-lg transition-shadow">
              <div className={`w-12 h-12 rounded-2xl ${color.bg} flex items-center justify-center mb-4 overflow-hidden border border-slate-100`}>
                {branch.logoUrl ? (
                  <img 
                    src={branch.logoUrl.startsWith('http') ? branch.logoUrl : `http://localhost:8082${branch.logoUrl}`} 
                    alt={branch.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <BuildingIcon className={`w-6 h-6 ${color.text}`} />
                )}
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-1">{branch.name}</h3>
              {branch.locationUrl ? (
                <a 
                  href={branch.locationUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline mb-4 block"
                >
                  {branch.address}
                </a>
              ) : (
                <p className="text-sm text-slate-500 mb-4">{branch.address}</p>
              )}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Manager</span>
                  <span className="font-bold text-slate-700">{branch.managerName}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Phone</span>
                  <span className="font-bold text-slate-700">{branch.phone}</span>
                </div>
                {(branch.lat || branch.lng) && (
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Coordinates</span>
                    <span className="font-bold text-slate-700">{branch.lat || '0'}, {branch.lng || '0'}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1" onClick={() => openEditBranch(branch)}>Edit</Button>
                <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-50" onClick={() => handleDeleteBranch(branch.id || branch._id)}>Delete</Button>
              </div>
            </Card>
          );
        })}
        <button 
          onClick={() => { resetBranchForm(); setIsBranchModalOpen(true); }}
          className="border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50/50 transition-all group"
        >
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

      {/* Custom Confirmation Modal */}
      {confirmModal.open && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(15, 23, 42, 0.55)',
            backdropFilter: 'blur(4px)',
            animation: 'fadeIn 0.15s ease'
          }}
          onClick={closeConfirm}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '36px 32px 28px',
              maxWidth: '420px',
              width: 'calc(100% - 40px)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.18), 0 8px 20px rgba(0,0,0,0.1)',
              animation: 'slideUp 0.2s cubic-bezier(0.34,1.56,0.64,1)',
              textAlign: 'center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon */}
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
              </svg>
            </div>

            {/* Title */}
            <h3 style={{
              fontSize: '20px',
              fontWeight: '800',
              color: '#0f172a',
              margin: '0 0 10px',
              letterSpacing: '-0.3px'
            }}>
              {confirmModal.title}
            </h3>

            {/* Message */}
            <p style={{
              fontSize: '14px',
              color: '#64748b',
              lineHeight: '1.6',
              margin: '0 0 28px'
            }}>
              {confirmModal.message}
            </p>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={closeConfirm}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  borderRadius: '12px',
                  border: '1.5px solid #e2e8f0',
                  background: '#f8fafc',
                  color: '#475569',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseOver={e => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
                onMouseOut={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  closeConfirm();
                  if (confirmModal.onConfirm) confirmModal.onConfirm();
                }}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: '0 4px 12px rgba(220,38,38,0.35)'
                }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(220,38,38,0.45)'; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(220,38,38,0.35)'; }}
              >
                Yes, Delete
              </button>
            </div>
          </div>

          <style>{`
            @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
            @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.95) } to { opacity: 1; transform: translateY(0) scale(1) } }
          `}</style>
        </div>
      )}

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

      <Modal
        isOpen={isMaterialModalOpen}
        onClose={() => setIsMaterialModalOpen(false)}
        title="Upload Learning Material"
        size="md"
      >
        <form onSubmit={handleUploadMaterial} className="space-y-4">
          <FormInput
            label="Material Title"
            value={newMaterial.title}
            onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
            placeholder="e.g. Grammar Fundamentals Pack"
            required
          />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Attach Documents (Select one or more)</label>
            <input 
              type="file" 
              multiple
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all border border-slate-200 rounded-xl p-2"
              onChange={(e) => setNewMaterialFiles(e.target.files)}
              required
            />
            <p className="text-[10px] text-slate-400 mt-1">You can select multiple files at once.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">File Type (Main)</label>
              <select 
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newMaterial.type}
                onChange={(e) => setNewMaterial({ ...newMaterial, type: e.target.value })}
              >
                <option value="PDF">PDF Document</option>
                <option value="ZIP">ZIP Archive</option>
                <option value="DOCX">Word Document</option>
                <option value="MULTI">Multiple Files</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Class</label>
              <select 
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newMaterial.className}
                onChange={(e) => setNewMaterial({ ...newMaterial, className: e.target.value })}
                required
              >
                <option value="">Select Class</option>
                {classes.map(c => (
                  <option key={c.id || c._id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
            <select 
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newMaterial.status}
              onChange={(e) => setNewMaterial({ ...newMaterial, status: e.target.value })}
            >
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="ghost" type="button" onClick={() => setIsMaterialModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Upload Material
            </Button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={isBranchModalOpen}
        onClose={() => setIsBranchModalOpen(false)}
        title={isEditingBranch ? "Edit Branch" : "Add New Branch"}
        size="md"
      >
        <form onSubmit={handleCreateBranch} className="space-y-4">
          <FormInput
            label="Institute Name"
            value={newBranch.name}
            onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
            placeholder="e.g. Colombo Main Institute"
            required
          />
          <FormInput
            label="Address"
            value={newBranch.address}
            onChange={(e) => setNewBranch({ ...newBranch, address: e.target.value })}
            placeholder="e.g. 42 Galle Road, Colombo"
            required
          />
          <FormInput
            label="Branch Manager Name"
            value={newBranch.managerName}
            onChange={(e) => setNewBranch({ ...newBranch, managerName: e.target.value })}
            placeholder="e.g. Mr. Sunil Perera"
            required
          />
          <FormInput
            label="Contact Number"
            value={newBranch.phone}
            onChange={(e) => setNewBranch({ ...newBranch, phone: e.target.value })}
            placeholder="e.g. 0112345678"
            required
          />
          <FormInput
            label="Google Maps / Location URL"
            value={newBranch.locationUrl}
            onChange={(e) => setNewBranch({ ...newBranch, locationUrl: e.target.value })}
            placeholder="e.g. https://maps.google.com/..."
          />
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Latitude"
              type="number"
              step="any"
              value={newBranch.lat}
              onChange={(e) => setNewBranch({ ...newBranch, lat: e.target.value })}
              placeholder="e.g. 6.9271"
            />
            <FormInput
              label="Longitude"
              type="number"
              step="any"
              value={newBranch.lng}
              onChange={(e) => setNewBranch({ ...newBranch, lng: e.target.value })}
              placeholder="e.g. 79.8612"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Branch Logo</label>
            <div className="flex items-center gap-4 mb-3">
              {(newBranch.logoUrl || branchLogoFile) ? (
                <div className="relative group">
                  <img
                    src={branchLogoFile ? URL.createObjectURL(branchLogoFile) : (newBranch.logoUrl.startsWith('http') ? newBranch.logoUrl : `http://localhost:8082${newBranch.logoUrl}`)}
                    alt="Logo preview"
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-100 shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setNewBranch({ ...newBranch, logoUrl: '' });
                      setBranchLogoFile(null);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"
                    title="Remove Logo"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              )}
              <div className="flex-1">
                <input
                  type="file"
                  id="branch-logo-input"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setBranchLogoFile(e.target.files?.[0] || null)}
                />
                <label
                  htmlFor="branch-logo-input"
                  className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 text-sm font-bold rounded-xl cursor-pointer hover:bg-blue-100 transition-all border border-blue-100"
                >
                  {branchLogoFile || newBranch.logoUrl ? "Change Logo" : "Upload Logo"}
                </label>
                <p className="text-[11px] text-slate-400 mt-1.5">Square JPG, PNG or SVG. Max 2MB.</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="ghost" type="button" onClick={() => setIsBranchModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditingBranch ? "Update Branch" : "Save Branch"}
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
