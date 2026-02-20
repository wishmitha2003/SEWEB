import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpenIcon,
  UserIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  AlertCircleIcon
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { FormInput } from '../../components/ui/FormInput';
import { useAuth } from '../../context/AuthContext';

// Demo accounts for login
const DEMO_ACCOUNTS = [
  { username: 'student', password: 'student123', fullName: 'Kasun Perera', role: 'student', email: 'kasun@ezy.com', phone: '+94 77 123 4567' },
  { username: 'teacher', password: 'teacher123', fullName: 'Nimal Fernando', role: 'teacher', email: 'nimal@ezy.com', phone: '+94 71 234 5678' },
  { username: 'admin', password: 'admin123', fullName: 'Sunil Silva', role: 'admin', email: 'sunil@ezy.com', phone: '+94 76 345 6789' },
  { username: 'courier', password: 'courier123', fullName: 'Ruwan Jayasinghe', role: 'courier', email: 'ruwan@ezy.com', phone: '+94 75 456 7890' },
];

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

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
    setError('');

    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    const account = DEMO_ACCOUNTS.find(
      (a) => a.username.toLowerCase() === username.toLowerCase() && a.password === password
    );

    if (account) {
      login({
        fullName: account.fullName,
        email: account.email,
        phone: account.phone,
        role: account.role,
      });
      navigate('/');
    } else {
      setError('Invalid email or password. Try one of the demo accounts below.');
    }
  };

  const handleGoogleLogin = () => {
    // Simulate Google login — logs in as a student
    login({
      fullName: 'Wishmitha Mendis',
      email: 'wishmitha@gmail.com',
      phone: '+94 77 999 8888',
      role: 'student',
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left panel - decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-400/15 rounded-full blur-3xl" />
        </div>
        <div className="relative flex flex-col justify-center px-16">
          <Link to="/" className="flex items-center gap-2.5 mb-12">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <BookOpenIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-extrabold text-white tracking-tight">
              Ezy English
            </span>
          </Link>
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Welcome back to your learning journey
          </h2>
          <p className="text-blue-200/70 text-lg leading-relaxed mb-10">
            Continue where you left off. Your classes, materials, and progress
            are waiting for you.
          </p>

          {/* Demo accounts hint */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5">
            <p className="text-sm font-semibold text-white mb-3">Demo Accounts</p>
            <div className="space-y-2">
              {DEMO_ACCOUNTS.map((acc) => (
                <div key={acc.username} className="flex items-center justify-between text-xs">
                  <span className="text-blue-200/80 font-medium">{acc.username}</span>
                  <span className="text-blue-200/50 font-mono">{acc.password}</span>
                  <span className="text-blue-300/70 capitalize bg-white/10 px-2 py-0.5 rounded-full text-[10px] font-bold">{acc.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <BookOpenIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              Ezy English
            </span>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 mb-2">
            Sign in to your account
          </h1>
          <p className="text-slate-500 mb-8">
            Enter your credentials to access your dashboard
          </p>

          {/* Error message */}
          {error && (
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 mb-5 animate-fade-in">
              <AlertCircleIcon className="w-4 h-4 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <FormInput
              label="Username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(''); }}
              icon={<UserIcon className="w-4 h-4" />}
            />

            <div className="relative">
              <FormInput
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                icon={<LockIcon className="w-4 h-4" />}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ?
                  <EyeOffIcon className="w-4 h-4" /> :
                  <EyeIcon className="w-4 h-4" />
                }
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <Button className="w-full" size="lg">
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Google Sign-In Button */}
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm transition-all duration-200 group"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="group-hover:text-slate-900 transition-colors">Continue with Google</span>
          </button>

          {/* Demo accounts for mobile */}
          <div className="lg:hidden mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <p className="text-xs font-semibold text-slate-700 mb-2">Demo Accounts</p>
            <div className="space-y-1.5">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.username}
                  onClick={() => { setUsername(acc.username); setPassword(acc.password); setError(''); }}
                  className="flex items-center justify-between w-full text-xs py-1.5 px-2 rounded-lg hover:bg-white transition-colors"
                >
                  <span className="text-slate-600 font-medium">{acc.username}</span>
                  <span className="text-slate-400 capitalize bg-slate-200 px-2 py-0.5 rounded-full text-[10px] font-bold">{acc.role}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-sm text-slate-500 mt-8">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Create new account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}