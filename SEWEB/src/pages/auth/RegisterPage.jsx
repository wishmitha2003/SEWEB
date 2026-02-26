import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpenIcon, UserIcon, LockIcon } from 'lucide-react';
import { FormInput } from '../../components/ui/FormInput';
import { Modal } from '../../components/ui/Modal';
import { useAuth } from '../../context/AuthContext';

export function RegisterPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const GOOGLE_ACCOUNTS = [
    { username: 'wishmitha', fullName: 'Wishmitha Devinda', email: 'wishmitha@gmail.com', role: 'student', phone: '+94 77 999 8888' },
    { username: 'student',   fullName: 'Kasun Perera',      email: 'kasun@ezy.com',        role: 'student' },
    { username: 'teacher',   fullName: 'Nimal Fernando',    email: 'nimal@ezy.com',         role: 'teacher' },
  ];

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const getRoleDashboard = (role) => {
    switch (role) {
      case 'teacher': return '/teacher';
      case 'admin':   return '/admin';
      default:        return '/student';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ fullName: form.fullName || 'Student', email: form.email, phone: form.phone, role: form.role });
    navigate(getRoleDashboard(form.role));
  };

  const handleSelectAccount = (account) => {
    login({ fullName: account.fullName, email: account.email, phone: account.phone || '+94 00 000 0000', role: account.role });
    setShowGoogleModal(false);
    navigate('/');
  };

  return (
    <div className="register-root">
      {/* ── Full-bleed blue map background ── */}
      <div className="register-bg" />

      {/* ── Animated glow arcs ── */}
      <svg className="register-arcs" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <path d="M0,600 Q360,100 900,400"  stroke="rgba(100,200,255,0.35)" fill="none" strokeWidth="2"/>
        <path d="M200,900 Q600,300 1300,250" stroke="rgba(255,255,255,0.18)" fill="none" strokeWidth="1.5"/>
        <path d="M1440,700 Q900,200 300,500" stroke="rgba(100,220,255,0.28)" fill="none" strokeWidth="2"/>
        <circle cx="900" cy="400" r="6" fill="#38bdf8" opacity="0.9"/>
        <circle cx="560" cy="220" r="5" fill="#ffffff" opacity="0.8"/>
        <circle cx="1100" cy="340" r="5" fill="#38bdf8" opacity="0.9"/>
        <circle cx="300" cy="500" r="5" fill="#bae6fd" opacity="0.8"/>
        <circle cx="700" cy="600" r="4" fill="#ffffff" opacity="0.7"/>
      </svg>

      {/* ── Two-column layout ── */}
      <div className="register-inner">

        {/* LEFT – branding + map text */}
        <div className="register-left">
          <div className="register-brand-badge">
            <BookOpenIcon className="w-5 h-5 text-white" />
            <span>Ezy English</span>
          </div>

          <h2 className="register-headline">
            Begin your English<br />mastery today
          </h2>
          <p className="register-subtext">
            Create your account and get instant access to classes,<br />
            materials, and a community of learners across Sri Lanka.
          </p>
        </div>

        {/* RIGHT – glass form card */}
        <div className="register-right">
          <div className="register-card">
            <div className="mb-5">
              <h1 className="text-2xl font-black text-slate-800 mb-0.5">Create your account</h1>
              <p className="text-sm text-slate-500">Fill in your details to get started</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Full Name */}
              <div>
                <label className="reg-label">Full Name</label>
                <div className="reg-input-wrap">
                  <UserIcon className="reg-input-icon" />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={form.fullName}
                    onChange={(e) => update('fullName', e.target.value)}
                    className="reg-input"
                  />
                </div>
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="reg-label">Email Address</label>
                  <div className="reg-input-wrap">
                    <span className="reg-input-icon text-xs">🇱🇰</span>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      className="reg-input"
                    />
                  </div>
                </div>
                <div>
                  <label className="reg-label">Phone Number</label>
                  <div className="reg-input-wrap">
                    <span className="reg-input-icon text-xs">📞</span>
                    <input
                      type="tel"
                      placeholder="+94 7X XXX XXXX"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      className="reg-input"
                    />
                  </div>
                </div>
              </div>

              {/* Role Toggle */}
              <div>
                <label className="reg-label">Role</label>
                <div className="reg-role-bar">
                  {['student', 'teacher', 'admin'].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => update('role', r)}
                      className={`reg-role-btn ${form.role === r ? 'reg-role-active' : ''}`}
                    >
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="reg-label">Password</label>
                <div className="reg-input-wrap">
                  <LockIcon className="reg-input-icon" />
                  <input
                    type="password"
                    placeholder="Create a password"
                    value={form.password}
                    onChange={(e) => update('password', e.target.value)}
                    className="reg-input"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="reg-label">Confirm Password</label>
                <div className="reg-input-wrap">
                  <LockIcon className="reg-input-icon" />
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    value={form.confirmPassword}
                    onChange={(e) => update('confirmPassword', e.target.value)}
                    className="reg-input"
                  />
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="reg-btn-primary">
                CREATE ACCOUNT
              </button>
            </form>

            <div className="flex items-center gap-3 my-3">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <button onClick={() => setShowGoogleModal(true)} type="button" className="reg-btn-google">
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <p className="text-center text-xs text-slate-500 mt-3">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700">Sign in</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Google Account Picker Modal */}
      <Modal isOpen={showGoogleModal} onClose={() => setShowGoogleModal(false)} title="Choose an account" size="sm">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-2">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </div>
          <p className="text-sm text-slate-500 mb-6">to continue to <span className="font-bold text-slate-900">Ezy English</span></p>
          <div className="w-full divide-y divide-slate-100 border-y border-slate-100">
            {GOOGLE_ACCOUNTS.map((acc) => (
              <button key={acc.email} onClick={() => handleSelectAccount(acc)} className="w-full flex items-center gap-3 py-3 px-2 hover:bg-slate-50 transition-colors text-left group">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">{acc.fullName[0]}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 truncate">{acc.fullName}</p>
                  <p className="text-xs text-slate-500 truncate">{acc.email}</p>
                </div>
                <span className="text-[9px] font-bold uppercase text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">{acc.role}</span>
              </button>
            ))}
          </div>
          <button type="button" className="w-full mt-6 py-2 text-sm font-semibold text-blue-600 hover:text-blue-700 border border-slate-200 rounded-xl" onClick={() => setShowGoogleModal(false)}>Use another account</button>
          <p className="mt-6 text-[11px] text-slate-400 text-center">To continue, Google will share your name, email address, and profile picture with Ezy English.</p>
        </div>
      </Modal>
    </div>
  );
}
