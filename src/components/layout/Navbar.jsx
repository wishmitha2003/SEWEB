import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MenuIcon, XIcon, BookOpenIcon, UserIcon, LogOutIcon, SettingsIcon, PhoneIcon } from 'lucide-react'
import { Button } from '../ui/Button'
import { useAuth } from '../../context/AuthContext'
import { useLoading } from '../../context/LoadingContext'

export function Navbar({ transparent = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isLoggedIn, logout } = useAuth()
  const { startLoading } = useLoading()

  const handleNavClick = (e, path) => {
    e.preventDefault()
    setIsOpen(false)
    startLoading(() => {
      navigate(path)
    })
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    { label: 'Resources', path: '/resources' },
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
    const normalizedRole = (role || '').toLowerCase();
    switch (normalizedRole) {
      case 'teacher': return 'from-emerald-500 to-teal-600'
      case 'admin': return 'from-purple-500 to-indigo-600'
      case 'courier': return 'from-amber-500 to-orange-600'
      case 'parent': return 'from-rose-500 to-pink-600'
      default: return 'from-blue-500 to-blue-700'
    }
  }

  const getRoleDashboard = (role) => {
    const normalizedRole = (role || '').toLowerCase();
    switch (normalizedRole) {
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
    <header
      className={`
        fixed top-0 left-0 right-0 z-40 transition-all duration-300
        ${showBg ? 'bg-gray-900/90 backdrop-blur-md' : (isOpen ? 'bg-slate-950/80 backdrop-blur-xl' : 'bg-transparent')}
      `}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2.5 group">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${showBg ? 'bg-white/10' : 'bg-white/20'}`}
            >
              <BookOpenIcon className="w-5 h-5 text-white" />
            </div>
            <span
              className={`text-xl font-extrabold tracking-tight transition-colors ${showBg ? 'text-white' : 'text-white'}`}
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
                  ${location.pathname === link.path ? (showBg ? 'text-white bg-white/15' : 'text-white bg-white/20') : showBg ? 'text-blue-100 hover:text-white hover:bg-white/10' : 'text-white/60 hover:text-white hover:bg-white/10'}
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

          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
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

                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-fade-in z-50">
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
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors w-full group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                          <SettingsIcon className="w-4 h-4 text-slate-500" />
                        </div>
                        Settings
                      </button>
                    </div>

                    <div className="h-px bg-slate-100 mx-4" />

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
              <>
                <Link to="/login">
                  <Button
                    variant={showBg ? 'ghost' : 'ghost'}
                    size="md"
                    className={!showBg ? 'text-white hover:bg-white/10' : ''}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="md">
                    Get Start
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${showBg ? 'text-white hover:bg-white/10' : 'text-white hover:bg-white/10'}`}
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
                      ? (showBg ? 'text-white bg-white/15' : 'text-white bg-blue-600/20')
                      : (showBg ? 'text-blue-100 hover:text-white hover:bg-white/10' : 'text-white/60 hover:text-white hover:bg-white/10')}
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
                <div className={`mt-2 pt-3 border-t ${showBg ? 'border-slate-100' : 'border-white/10'}`}>
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
  )
}
