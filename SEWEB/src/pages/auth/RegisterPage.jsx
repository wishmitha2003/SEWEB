import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpenIcon,
  UserIcon,
  MailIcon,
  PhoneIcon,
  LockIcon
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
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
    role: 'student'
  });
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const GOOGLE_ACCOUNTS = [
    { username: 'wishmitha', fullName: 'Wishmitha Devinda', email: 'wishmitha@gmail.com', role: 'student', phone: '+94 77 999 8888' },
    { username: 'student', fullName: 'Kasun Perera', email: 'kasun@ezy.com', role: 'student' },
    { username: 'teacher', fullName: 'Nimal Fernando', email: 'nimal@ezy.com', role: 'teacher' },
  ];

  const update = (field, value) =>
    setForm({
      ...form,
      [field]: value
    });

  const getRoleDashboard = (role) => {
    switch (role) {
      case 'teacher': return '/teacher';
      case 'admin': return '/admin';
      case 'courier': return '/courier';
      default: return '/student';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      fullName: form.fullName || 'Student',
      email: form.email,
      phone: form.phone,
      role: form.role,
    });
    navigate(getRoleDashboard(form.role));
  };

  const handleGoogleLogin = () => {
    setShowGoogleModal(true);
  };

  const handleSelectAccount = (account) => {
    login({
      fullName: account.fullName,
      email: account.email,
      phone: account.phone || '+94 00 000 0000',
      role: account.role,
    });
    setShowGoogleModal(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-sky-400/15 rounded-full blur-3xl" />
        </div>
        <div className="relative flex flex-col justify-center px-16">
          <Link to="/" className="flex items-center gap-2.5 mb-8">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <BookOpenIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-extrabold text-white tracking-tight">
              Ezy English
            </span>
          </Link>
          <h2 className="text-3xl font-extrabold text-white leading-tight mb-3">
            Begin your English mastery today
          </h2>
          <p className="text-blue-200/70 text-base leading-relaxed">
            Create your account and get instant access to classes, materials,
            and a community of learners across Sri Lanka.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white py-6">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <BookOpenIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              Ezy English
            </span>
          </div>

          <h1 className="text-xl font-extrabold text-slate-900 mb-1">
            Create your account
          </h1>
          <p className="text-slate-500 text-sm mb-5">
            Fill in your details to get started
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <FormInput
              label="Full Name"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={(e) => update('fullName', e.target.value)}
              icon={<UserIcon className="w-4 h-4" />}
            />
            <FormInput
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              icon={<MailIcon className="w-4 h-4" />}
            />
            <FormInput
              label="Phone Number"
              type="tel"
              placeholder="+94 7X XXX XXXX"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              icon={<PhoneIcon className="w-4 h-4" />}
            />

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Role
              </label>
              <select
                value={form.role}
                onChange={(e) => update('role', e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="parent">Parent</option>
              </select>
            </div>

            <FormInput
              label="Password"
              type="password"
              placeholder="Create a password"
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              icon={<LockIcon className="w-4 h-4" />}
            />
            <FormInput
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={(e) => update('confirmPassword', e.target.value)}
              icon={<LockIcon className="w-4 h-4" />}
            />

            <Button className="w-full" size="md">
              Create Account
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-4">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">or</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          {/* Google Sign-In Button */}
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          <p className="text-center text-sm text-slate-500 mt-4">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Google Account Picker Modal */}
      <Modal 
        isOpen={showGoogleModal} 
        onClose={() => setShowGoogleModal(false)}
        title="Choose an account"
        size="sm"
      >
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-2">
            <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </div>
          <p className="text-sm text-slate-500 mb-6">to continue to <span className="font-bold text-slate-900">Ezy English</span></p>
          
          <div className="w-full space-y-1 divide-y divide-slate-100 border-y border-slate-100">
            {GOOGLE_ACCOUNTS.map((acc) => (
              <button
                key={acc.email}
                onClick={() => handleSelectAccount(acc)}
                className="w-full flex items-center gap-3 py-3 px-2 hover:bg-slate-50 transition-colors text-left group"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                  {acc.fullName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 truncate transition-colors">
                    {acc.fullName}
                  </p>
                  <p className="text-xs text-slate-500 truncate">{acc.email}</p>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">
                    {acc.role}
                  </span>
                </div>
              </button>
            ))}
          </div>
          
          <button 
            type="button"
            className="w-full mt-6 py-2 px-4 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors border border-slate-200 rounded-xl hover:border-blue-200 hover:bg-blue-50/30"
            onClick={() => setShowGoogleModal(false)}
          >
            Use another account
          </button>
          
          <p className="mt-8 text-[11px] text-slate-400 text-center leading-relaxed">
            To continue, Google will share your name, email address, language preference, and profile picture with Ezy English.
          </p>
        </div>
      </Modal>
    </div>
  );
}