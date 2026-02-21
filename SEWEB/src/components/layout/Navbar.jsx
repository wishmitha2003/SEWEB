import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MenuIcon, XIcon, BookOpenIcon, UserIcon, LogOutIcon, SettingsIcon, PencilIcon, MailIcon, PhoneIcon, SaveIcon, MapPinIcon, HashIcon, GlobeIcon, Trash2Icon, CheckIcon, AtSignIcon, CameraIcon } from 'lucide-react'
import { Button } from '../ui/Button'
import { useAuth } from '../../context/AuthContext'
import { useLoading } from '../../context/LoadingContext'

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
  const { startLoading } = useLoading()
  const [profileImage, setProfileImage] = useState(user?.profileImage || null)

  const handleNavClick = (e, path) => {
    e.preventDefault()
    setIsOpen(false)
    startLoading(() => {
      navigate(path)
    })
  }

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
  const isTransparent = transparent && !scrolled

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
        ${showBg ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100' : (isOpen ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent')}
      `}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2.5 group">
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

          <div className="hidden md:flex items-center gap-1 ml-auto">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className={`
                  px-4 py-2 rounded-full text-[12px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2
                  ${location.pathname === link.path ? (showBg ? 'text-blue-600 bg-blue-50' : 'text-white bg-white/20') : showBg ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-50' : 'text-white/60 hover:text-white hover:bg-white/10'}
                `}
              >
                {link.label === 'Contact' ? (
                  <PhoneIcon className="w-4 h-4" />
                ) : (
                  link.label
                )}
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
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-fade-in z-50">
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
              <>
                <Link to="/login">
                  <Button
                    variant={showBg ? 'ghost' : 'ghost'}
                    size="md"
                    className={!showBg ? 'text-white hover:bg-white/10' : ''}
                  >
                    Log In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="md">
                    Get Started
                  </Button>
                </Link>
              </>
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
                  onClick={(e) => handleNavClick(e, link.path)}
                  className={`
                    px-4 py-3 rounded-xl text-base font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-3
                    ${location.pathname === link.path 
                      ? (showBg ? 'text-blue-600 bg-blue-50' : 'text-white bg-blue-600/20') 
                      : (showBg ? 'text-slate-500 hover:bg-slate-50' : 'text-white/60 hover:text-white hover:bg-white/10')}
                  `}
                >
                  {link.label === 'Contact' ? (
                    <>
                      <PhoneIcon className="w-5 h-5" />
                      <span>Contact</span>
                    </>
                  ) : (
                    link.label
                  )}
                </Link>
              ))}

              {isLoggedIn ? (
                /* Mobile Profile Section */
                <div className={`mt-2 pt-3 border-t ${showBg ? 'border-slate-100' : 'border-white/10'}`}>
                  <button
                    onClick={() => {
                      setIsOpen(false)
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
                    className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-200 group/mbprofile ${showBg ? 'hover:bg-slate-50' : 'hover:bg-white/5'}`}
                  >
                    <div className={`w-10 h-10 rounded-full ${user?.profileImage ? '' : `bg-gradient-to-br ${getRoleColor(user?.role)}`} flex items-center justify-center shadow-lg ring-2 ${showBg ? 'ring-white' : 'ring-white/20'} overflow-hidden transition-transform group-hover/mbprofile:scale-105`}>
                      {user?.profileImage ? (
                        <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-sm font-bold text-white">{getInitials(user?.fullName)}</span>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <p className={`text-sm font-semibold ${showBg ? 'text-slate-900' : 'text-white'}`}>{user?.fullName}</p>
                      <p className={`text-xs capitalize ${showBg ? 'text-slate-500' : 'text-white/60'}`}>{user?.role}</p>
                    </div>
                    <PencilIcon className={`w-4 h-4 ${showBg ? 'text-slate-400' : 'text-white/40'} opacity-0 group-hover/mbprofile:opacity-100 transition-opacity`} />
                  </button>
                  <Link
                    to={getRoleDashboard(user?.role)}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 px-3.5 py-2.5 text-sm font-medium rounded-lg mt-1 transition-colors ${showBg ? 'text-slate-600 hover:bg-slate-50' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
                  >
                    <UserIcon className="w-4 h-4" /> Dashboard
                  </Link>
                  <button
                    onClick={() => { setIsOpen(false); handleLogout(); }}
                    className={`flex items-center gap-2 px-3.5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg w-full transition-colors ${!showBg ? 'hover:bg-red-500/10' : ''}`}
                  >
                    <LogOutIcon className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              ) : (
                <div className={`flex gap-2 mt-2 pt-3 border-t ${showBg ? 'border-slate-100' : 'border-white/10'}`}>
                  <Link
                    to="/login"
                    className="flex-1"
                    onClick={() => setIsOpen(false)}
                  >
                    <Button 
                      variant={showBg ? 'outline' : 'outline'} 
                      size="md" 
                      className={`w-full ${!showBg ? 'border-white/20 text-white hover:bg-white/10' : ''}`}
                    >
                      Log In
                    </Button>
                  </Link>
                  <Link
                    to="/register"
                    className="flex-1"
                    onClick={() => setIsOpen(false)}
                  >
                    <Button variant="primary" size="md" className="w-full">
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
          <div className="relative w-full max-w-5xl bg-[#f8fafc] rounded-[2.5rem] shadow-2xl overflow-hidden animate-scale-in border border-white/40 flex flex-col">
            {/* Modal Header */}
            <div className="px-8 py-6 flex items-center justify-between relative z-10 bg-white border-b border-slate-100 flex-shrink-0">
              <div>
                <h2 className="text-xl font-black text-[#111827] tracking-tight">Profile Settings</h2>
                <p className="text-xs text-slate-500 font-medium">Customize your digital identity and account details.</p>
              </div>
              <button
                onClick={() => setProfileEditOpen(false)}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all"
              >
                <XIcon className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Form Content - Static Layout */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                updateUser({ ...editForm, profileImage })
                setProfileEditOpen(false)
              }}
              className="flex flex-col overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Left Column: Summary */}
                <div className="w-full lg:w-72 p-8 flex flex-col items-center bg-slate-50/50 border-r border-slate-100">
                  <div className="relative mb-6">
                    <div className={`w-40 h-40 rounded-full border-4 border-white shadow-xl overflow-hidden bg-blue-600 flex items-center justify-center`}>
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-5xl font-black text-white">{getInitials(user?.fullName)}</span>
                      )}
                    </div>
                    <label className="absolute bottom-2 right-2 w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center cursor-pointer shadow-lg hover:bg-blue-700 transition-all border-2 border-white">
                      <CameraIcon className="w-4 h-4" />
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                  </div>
                  
                  <h3 className="text-lg font-black text-slate-900 text-center">{editForm.fullName || 'User Name'}</h3>
                  <div className="mt-2 px-3 py-1 bg-blue-50 rounded-full">
                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{user?.role || 'student'}</span>
                  </div>

                  <div className="mt-8 space-y-3 w-full">
                    <div className="flex items-center gap-3 px-4 py-2.5 bg-white/60 border border-slate-200 rounded-xl shadow-sm">
                      <MailIcon className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[11px] text-slate-500 font-bold truncate">{editForm.email || 'kasun@lazy.com'}</span>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-2.5 bg-white/60 border border-slate-200 rounded-xl shadow-sm">
                      <PhoneIcon className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[11px] text-slate-500 font-bold">{editForm.phone || '+94 77 123 4567'}</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Fields */}
                <div className="flex-1 p-9 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    {/* Header: Personal */}
                    <div className="col-span-full mb-1 flex items-center gap-3">
                      <div className="w-1.5 h-4 bg-blue-600 rounded-full" />
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Personal Information</h4>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-900 uppercase tracking-wider ml-1">Full Name</label>
                      <input
                        type="text"
                        value={editForm.fullName}
                        onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all font-bold text-slate-700 text-sm"
                        placeholder="Kasun Perera"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-900 uppercase tracking-wider ml-1">Username</label>
                      <input
                        type="text"
                        value={editForm.username}
                        onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all font-bold text-slate-700 text-sm"
                        placeholder="@kasun_p"
                      />
                    </div>

                    {/* Header: Location */}
                    <div className="col-span-full mt-3 mb-1 flex items-center gap-3">
                      <div className="w-1.5 h-4 bg-emerald-500 rounded-full" />
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location & Contact</h4>
                    </div>

                    <div className="col-span-full space-y-1.5">
                      <label className="text-[9px] font-black text-slate-900 uppercase tracking-wider ml-1">Residential Address</label>
                      <input
                        type="text"
                        value={editForm.address}
                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all font-bold text-slate-700 text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-900 uppercase tracking-wider ml-1">City</label>
                      <input
                        type="text"
                        value={editForm.city}
                        onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all font-bold text-slate-700 text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-900 uppercase tracking-wider ml-1">Postal Code</label>
                      <input
                        type="text"
                        value={editForm.postalCode}
                        onChange={(e) => setEditForm({ ...editForm, postalCode: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all font-bold text-slate-700 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Fixed Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-5 border-t border-slate-100 bg-white flex-shrink-0 relative z-20">
                <button
                  type="button"
                  onClick={() => { if(confirm('Are you sure?')) logout() }}
                  className="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-600 transition-colors"
                >
                  <Trash2Icon className="w-4 h-4" />
                  Delete Account
                </button>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setProfileEditOpen(false)}
                    className="flex-1 sm:flex-none px-7 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    className="flex-1 sm:flex-none px-7 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-black shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <SaveIcon className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
