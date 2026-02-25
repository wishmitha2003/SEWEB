import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookOpenIcon, 
  PhoneIcon, 
  ShieldCheckIcon, 
  LockIcon, 
  ArrowLeftIcon,
  CheckCircleIcon,
  AlertCircleIcon
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { FormInput } from '../../components/ui/FormInput';

export function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1: Mobile, 2: OTP, 3: New Password, 4: Success
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phone) {
      setError('Please enter your registered mobile number.');
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      setError('');
    }, 1500);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep(3);
      setError('');
    }, 1500);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep(4);
      setError('');
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#f8fbff]">
      {/* Left panel - decorative (minimal for this flow) */}
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
            Security & Recovery
          </h2>
          <p className="text-blue-200/70 text-lg leading-relaxed mb-10">
            We use secure multi-factor authentication to ensure your account 
            remains protected at all times.
          </p>
        </div>
      </div>

      {/* Right panel - form steps */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-[32px] shadow-xl shadow-blue-100/50 border border-slate-100">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <BookOpenIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              Ezy English
            </span>
          </div>

          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors mb-6 group"
          >
            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Sign In
          </Link>

          {step === 1 && (
            <div className="animate-fade-in">
              <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Forgot Password?</h1>
              <p className="text-slate-500 mb-8">Enter your mobile number to receive a verification code.</p>
              
              {error && (
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 mb-6">
                  <AlertCircleIcon className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <p className="text-xs text-red-600 font-bold">{error}</p>
                </div>
              )}

              <form onSubmit={handleSendOtp} className="space-y-6">
                <FormInput
                  label="Mobile Number"
                  type="tel"
                  placeholder="+94 7X XXX XXXX"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); setError(''); }}
                  icon={<PhoneIcon className="w-4 h-4" />}
                />
                <Button className="w-full h-12" loading={loading} disabled={loading}>
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </Button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheckIcon className="w-8 h-8" />
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Verify OTP</h1>
              <p className="text-slate-500 mb-8">
                We've sent a 6-digit code to <span className="text-slate-900 font-bold">{phone}</span>.
              </p>

              {error && (
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 mb-6 text-left">
                  <AlertCircleIcon className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <p className="text-xs text-red-600 font-bold">{error}</p>
                </div>
              )}

              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="flex justify-center">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => { setOtp(e.target.value.replace(/\D/g, '')); setError(''); }}
                    className="w-full h-14 text-center text-3xl font-black tracking-[0.5em] border-2 border-slate-100 bg-slate-50 rounded-2xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
                  />
                </div>
                <Button className="w-full h-12" loading={loading} disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </Button>
                <button 
                  type="button" 
                  className="text-sm font-bold text-blue-600 hover:text-blue-700"
                  onClick={() => setStep(1)}
                >
                  Resend Code
                </button>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Set New Password</h1>
              <p className="text-slate-500 mb-8">Create a strong password to protect your account.</p>

              {error && (
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 mb-6">
                  <AlertCircleIcon className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <p className="text-xs text-red-600 font-bold">{error}</p>
                </div>
              )}

              <form onSubmit={handleResetPassword} className="space-y-5">
                <FormInput
                  label="New Password"
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => { setNewPassword(e.target.value); setError(''); }}
                  icon={<LockIcon className="w-4 h-4" />}
                />
                <FormInput
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                  icon={<LockIcon className="w-4 h-4" />}
                />
                <Button className="w-full h-12" loading={loading} disabled={loading}>
                  {loading ? 'Resetting Password...' : 'Reset Password'}
                </Button>
              </form>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-in text-center py-4">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce-in">
                <CheckCircleIcon className="w-10 h-10" />
              </div>
              <h1 className="text-3xl font-black text-slate-900 mb-3">Password Reset!</h1>
              <p className="text-slate-500 mb-10 leading-relaxed">
                Your password has been successfully updated. You can now use your new password to sign in.
              </p>
              <Link to="/login" className="block">
                <Button className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg shadow-lg shadow-emerald-100">
                  Go to Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
