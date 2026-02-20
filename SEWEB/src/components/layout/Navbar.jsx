import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MenuIcon, XIcon, BookOpenIcon, UserIcon, LogOutIcon, SettingsIcon, PencilIcon, MailIcon, PhoneIcon, SaveIcon } from 'lucide-react'
import { Button } from '../ui/Button'
import { useAuth } from '../../context/AuthContext'

export function Navbar({ transparent = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [profileEditOpen, setProfileEditOpen] = useState(false)
  const [editForm, setEditForm] = useState({ fullName: '', email: '', phone: '' })
  const profileRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isLoggedIn, logout, updateUser } = useAuth()

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
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${getRoleColor(user?.role)} flex items-center justify-center shadow-lg shadow-blue-500/20 ring-2 ring-white/80 flex-shrink-0`}>
                    <span className="text-xs font-bold text-white">{getInitials(user?.fullName)}</span>
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
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getRoleColor(user?.role)} flex items-center justify-center shadow-xl ring-4 ring-white`}>
                          <span className="text-lg font-bold text-white">{getInitials(user?.fullName)}</span>
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
                            email: user?.email || '',
                            phone: user?.phone || '',
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
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getRoleColor(user?.role)} flex items-center justify-center shadow-lg ring-2 ring-white`}>
                      <span className="text-sm font-bold text-white">{getInitials(user?.fullName)}</span>
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

      {/* Edit Profile Modal */}
      {profileEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setProfileEditOpen(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
            {/* Header with gradient */}
            <div className={`relative h-24 bg-gradient-to-br ${getRoleColor(user?.role)}`}>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-60" />
              <button
                onClick={() => setProfileEditOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <XIcon className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Avatar */}
            <div className="px-6 -mt-10">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${getRoleColor(user?.role)} flex items-center justify-center shadow-xl ring-4 ring-white`}>
                <span className="text-2xl font-bold text-white">{getInitials(editForm.fullName || user?.fullName)}</span>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                updateUser(editForm)
                setProfileEditOpen(false)
              }}
              className="px-6 pt-4 pb-6"
            >
              <h2 className="text-lg font-bold text-slate-900 mb-1">Edit Profile</h2>
              <p className="text-sm text-slate-500 mb-5">Update your personal information</p>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <UserIcon className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={editForm.fullName}
                      onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-slate-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <MailIcon className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-slate-300"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <PhoneIcon className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-slate-300"
                      placeholder="+94 7X XXX XXXX"
                    />
                  </div>
                </div>

                {/* Role (read-only) */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Role</label>
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-100 bg-slate-50">
                    <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${getRoleColor(user?.role)}`} />
                    <span className="text-sm font-medium text-slate-600 capitalize">{user?.role}</span>
                    <span className="text-xs text-slate-400 ml-auto">Cannot be changed</span>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setProfileEditOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r ${getRoleColor(user?.role)} text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2`}
                >
                  <SaveIcon className="w-4 h-4" />
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
