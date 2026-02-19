import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpenIcon,
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon } from
'lucide-react';
import { Button } from '../../components/ui/Button';
import { FormInput } from '../../components/ui/FormInput';
export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
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
          <p className="text-blue-200/70 text-lg leading-relaxed">
            Continue where you left off. Your classes, materials, and progress
            are waiting for you.
          </p>
          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-blue-800 flex items-center justify-center text-xs font-bold text-white">
                A
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-400 border-2 border-blue-800 flex items-center justify-center text-xs font-bold text-white">
                K
              </div>
              <div className="w-8 h-8 rounded-full bg-purple-400 border-2 border-blue-800 flex items-center justify-center text-xs font-bold text-white">
                S
              </div>
              <div className="w-8 h-8 rounded-full bg-amber-400 border-2 border-blue-800 flex items-center justify-center text-xs font-bold text-white">
                R
              </div>
            </div>
            <p className="text-sm text-blue-200/70">
              5,000+ students learning today
            </p>
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

          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <FormInput
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<MailIcon className="w-4 h-4" />} />


            <div>
              <FormInput
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<LockIcon className="w-4 h-4" />} />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-600"
                aria-label={showPassword ? 'Hide password' : 'Show password'}>

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
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />

                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">

                Forgot password?
              </a>
            </div>

            <Button className="w-full" size="lg">
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-8">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">

              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>);

}