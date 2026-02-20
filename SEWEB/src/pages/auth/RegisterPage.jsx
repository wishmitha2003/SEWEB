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
  const { login } = useAuth();
  const navigate = useNavigate();

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
    </div>
  );
}