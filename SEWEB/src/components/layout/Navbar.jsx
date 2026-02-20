import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MenuIcon, XIcon, BookOpenIcon, UserIcon, LogOutIcon, SettingsIcon, PencilIcon, MailIcon, PhoneIcon, SaveIcon, MapPinIcon, HashIcon, GlobeIcon, Trash2Icon, CheckIcon, AtSignIcon, CameraIcon } from 'lucide-react'
import { Button } from '../ui/Button'
import { useAuth } from '../../context/AuthContext'

export function Navbar({ transparent = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [profileEditOpen, setProfileEditOpen] = useState(false)
  const [editForm, setEditForm] = useState({ fullName: '', username: '', email: '', phone: '', address: '', city: '', postalCode: '', country: 'Sri Lanka' })
  const profileRef = useRef(null)
  const fileInputRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isLoggedIn, logout, updateUser } = useAuth()
  const [profileImage, setProfileImage] = useState(user?.profileImage || null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const showBg = !transparent || scrolled

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Classes', path: '/classes' },
    { label: 'Materials', path: '/materials' },
    { label: 'Map', path: '/map' },
    { label: 'Contact', path: '/contact' },
  ]

  const getInitials = (name) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getRoleColor = (role) => {
    switch (role) {
      case 'teacher': return 'from-emerald-500 to-teal-600'
      case 'admin': return 'from-purple-500 to-indigo-600'
      case 'courier': return 'from-amber-500 to-orange-600'
      case 'parent': return 'from-rose-500 to-pink-600'
      default: return 'from-blue-500 to-blue-700'
    }
  }

  const getRoleDashboard = (role) => {
    switch (role) {
      case 'teacher': return '/teacher'
      case 'admin': return '/admin'
      case 'courier': return '/courier'
      default: return '/student'
    }
  }

  const handleLogout = () => {
    setProfileOpen(false)
    logout()
    navigate('/')
  }

  return (
    <>
    <header
      className={`
        fixed top-0 left-0 right-0 z-40 transition-all duration-300
        ${showBg ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100' : 'bg-transparent'}
      `}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${showBg ? 'bg-blue-600' : 'bg-white/20'}`}
            >
              <BookOpenIcon className="w-5 h-5 text-white" />
            </div>
            <span
              className={`text-xl font-extrabold tracking-tight transition-colors ${showBg ? 'text-slate-900' : 'text-white'}`}
            >
              Ezy English
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${location.pathname === link.path ? (showBg ? 'text-blue-600 bg-blue-50' : 'text-white bg-white/20') : showBg ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-50' : 'text-white/80 hover:text-white hover:bg-white/10'}
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side - Auth buttons or Profile */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              /* Profile Avatar & Dropdown */
              <div className="relative group/profile" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className={`
                    relative flex items-center p-1.5 rounded-full transition-all duration-200
                    ${showBg 
                      ? 'hover:bg-slate-50' 
                      : 'hover:bg-white/10'}
                  `}
                >
                  <div className={`w-9 h-9 rounded-full ${user?.profileImage ? '' : `bg-gradient-to-br ${getRoleColor(user?.role)}`} flex items-center justify-center shadow-lg shadow-blue-500/20 ring-2 ring-white/80 flex-shrink-0 overflow-hidden`}>
                    {user?.profileImage ? (
                      <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs font-bold text-white">{getInitials(user?.fullName)}</span>
                    )}
                  </div>
                </button>
                {/* Hover tooltip - name & role */}
                <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 pointer-events-none opacity-0 group-hover/profile:opacity-100 transition-all duration-300 ease-in-out translate-x-2 group-hover/profile:translate-x-0">
                  <div className={`whitespace-nowrap px-3 py-1.5 rounded-xl shadow-lg text-right ${showBg ? 'bg-white border border-slate-100' : 'bg-slate-900/80 backdrop-blur-md'}`}>
                    <p className={`text-sm font-semibold leading-tight ${showBg ? 'text-slate-900' : 'text-white'}`}>
                      {user?.fullName}
                    </p>
                    <p className={`text-[11px] capitalize ${showBg ? 'text-slate-500' : 'text-white/60'}`}>
                      {user?.role}
                    </p>
                  </div>
                </div>

                {/* Profile Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-fade-in z-50">
                    {/* Profile Header */}
                    <div className="relative">
                      <div className={`h-20 bg-gradient-to-br ${getRoleColor(user?.role)}`}>
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-60" />
                      </div>
                      <div className="px-5 -mt-8">
                        <div className={`w-16 h-16 rounded-2xl ${user?.profileImage ? '' : `bg-gradient-to-br ${getRoleColor(user?.role)}`} flex items-center justify-center shadow-xl ring-4 ring-white overflow-hidden`}>
                          {user?.profileImage ? (
                            <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-lg font-bold text-white">{getInitials(user?.fullName)}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Profile Info */}
                    <div className="px-5 pt-3 pb-4">
                      <h3 className="text-base font-bold text-slate-900">{user?.fullName}</h3>
                      <p className="text-sm text-slate-500 mt-0.5">{user?.email}</p>
                      <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getRoleColor(user?.role)}`} />
                        <span className="text-xs font-semibold text-slate-600 capitalize">{user?.role}</span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-slate-100 mx-4" />

                    {/* Menu Items */}
                    <div className="p-2">
                      <Link
                        to={getRoleDashboard(user?.role)}
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                          <UserIcon className="w-4 h-4 text-blue-600" />
                        </div>
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          setProfileOpen(false)
                          setEditForm({
                            fullName: user?.fullName || '',
                            username: user?.username || '',
                            email: user?.email || '',
                            phone: user?.phone || '',
                            address: user?.address || '',
                            city: user?.city || 'Colombo',
                            postalCode: user?.postalCode || '',
                            country: user?.country || 'Sri Lanka',
                          })
                          setProfileEditOpen(true)
                        }}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors w-full group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                          <PencilIcon className="w-4 h-4 text-emerald-600" />
                        </div>
                        Edit Profile
                      </button>
                      <button
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors w-full group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                          <SettingsIcon className="w-4 h-4 text-slate-500" />
                        </div>
                        Settings
                      </button>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-slate-100 mx-4" />

                    {/* Logout */}
                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors w-full group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                          <LogOutIcon className="w-4 h-4 text-red-500" />
                        </div>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Login / Register Buttons */
              <>
                <Link to="/login">
                  <Button
                    variant={showBg ? 'ghost' : 'ghost'}
                    size="sm"
                    className={!showBg ? 'text-white hover:bg-white/10' : ''}
                  >
                    Log In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${showBg ? 'text-slate-600 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <XIcon className="w-5 h-5" />
            ) : (
              <MenuIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-1 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors
                    ${location.pathname === link.path ? (showBg ? 'text-blue-600 bg-blue-50' : 'text-white bg-white/20') : showBg ? 'text-slate-600 hover:bg-slate-50' : 'text-white/80 hover:bg-white/10'}
                  `}
                >
                  {link.label}
                </Link>
              ))}

              {isLoggedIn ? (
                /* Mobile Profile Section */
                <div className="mt-2 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-3 px-3.5 py-2.5">
                    <div className={`w-10 h-10 rounded-full ${user?.profileImage ? '' : `bg-gradient-to-br ${getRoleColor(user?.role)}`} flex items-center justify-center shadow-lg ring-2 ring-white overflow-hidden`}>
                      {user?.profileImage ? (
                        <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-sm font-bold text-white">{getInitials(user?.fullName)}</span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{user?.fullName}</p>
                      <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
                    </div>
                  </div>
                  <Link
                    to={getRoleDashboard(user?.role)}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-3.5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg mt-1"
                  >
                    <UserIcon className="w-4 h-4" /> Dashboard
                  </Link>
                  <button
                    onClick={() => { setIsOpen(false); handleLogout(); }}
                    className="flex items-center gap-2 px-3.5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg w-full"
                  >
                    <LogOutIcon className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 mt-2 pt-2 border-t border-slate-100">
                  <Link
                    to="/login"
                    className="flex-1"
                    onClick={() => setIsOpen(false)}
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      Log In
                    </Button>
                  </Link>
                  <Link
                    to="/register"
                    className="flex-1"
                    onClick={() => setIsOpen(false)}
                  >
                    <Button variant="primary" size="sm" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>

      {profileEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setProfileEditOpen(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header with gradient + avatar + title */}
            <div className={`relative bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 px-6 py-5`}>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIvPjwvc3ZnPg==')] opacity-60" />
              <div className="relative flex items-center gap-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${getRoleColor(user?.role)} flex items-center justify-center shadow-lg ring-2 ring-white/30 cursor-pointer group overflow-hidden`}
                >
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl font-bold text-white">{getInitials(editForm.fullName || user?.fullName)}</span>
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <CameraIcon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{editForm.fullName || user?.fullName || 'Edit Profile'}</h2>
                  <p className="text-sm text-blue-100">@{editForm.username || user?.username || 'username'}</p>
                </div>
              </div>
              <button
                onClick={() => setProfileEditOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
              >
                <XIcon className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                updateUser({ ...editForm, profileImage })
                setProfileEditOpen(false)
              }}
              className="px-6 py-6"
            >
              <div className="space-y-5">
                {/* Row 1: Full Name + Username */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5">Full Name</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <UserIcon className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={editForm.fullName}
                        onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-slate-300"
                        placeholder="Kasun Perera"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5">Username</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <AtSignIcon className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={editForm.username}
                        onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-slate-300"
                        placeholder="kasun_perera"
                      />
                    </div>
                  </div>
                </div>

                {/* Address (full width) */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1.5">Address</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <MapPinIcon className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={editForm.address}
                      onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-slate-300"
                      placeholder="123 Main Street"
                    />
                  </div>
                </div>

                {/* Row 2: Email + City + Postal Code */}
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_0.7fr_0.5fr] gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5">Email Address</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <MailIcon className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-slate-300"
                        placeholder="kasun@ezy.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5">City</label>
                    <input
                      type="text"
                      value={editForm.city}
                      onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-slate-300"
                      placeholder="Colombo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5">Postal Code</label>
                    <input
                      type="text"
                      value={editForm.postalCode}
                      onChange={(e) => setEditForm({ ...editForm, postalCode: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-slate-300"
                      placeholder="00500"
                    />
                  </div>
                </div>

                {/* Row 3: Phone + Country */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5">Phone Number</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <PhoneIcon className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-slate-300"
                        placeholder="+94 77 123 4567"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5">Country</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-lg">
                        🇱🇰
                      </div>
                      <select
                        value={editForm.country}
                        onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-slate-300 cursor-pointer"
                      >
                        <option>Sri Lanka</option>
                        <option>India</option>
                        <option>United Kingdom</option>
                        <option>Australia</option>
                        <option>Canada</option>
                        <option>United States</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Role (read-only) */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1.5">Role</label>
                  <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-slate-100 bg-slate-50">
                    <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${getRoleColor(user?.role)}`} />
                    <span className="text-sm font-medium text-slate-700 capitalize">{user?.role}</span>
                    <span className="text-xs text-slate-400 ml-auto">Cannot be changed</span>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-7 pt-5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setProfileEditOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
                      logout()
                      setProfileEditOpen(false)
                      navigate('/')
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl border border-red-200 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2"
                >
                  <Trash2Icon className="w-4 h-4" />
                  Delete Account
                </button>
                <button
                  type="submit"
                  className="ml-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <CheckIcon className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
