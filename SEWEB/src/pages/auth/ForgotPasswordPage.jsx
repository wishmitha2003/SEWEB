import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpenIcon, ShieldCheckIcon, LockIcon, ArrowLeftIcon, CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { useAuth } from '../../context/AuthContext';

export function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password, 4: Success
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) { setError('Please enter your registered email address.'); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { setError('Please enter a valid email address.'); return; }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8082/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || 'Failed to send OTP.');

      setSuccess(data?.message || 'OTP sent, please check your email.');
      setError('');
      setStep(2);
    } catch (err) {
      setError(err.message || 'Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.length !== 6) { setError('Please enter a valid 6-digit OTP.'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(3); setError(''); }, 1500);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (newPassword !== confirmPassword) { setError('Passwords do not match.'); return; }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8082/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || 'Reset password failed.');

      setSuccess(data?.message || 'Password reset successfully.');
      setError('');
      setStep(4);
    } catch (err) {
      setError(err.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lp-root">
      {/* ── Background ── */}
      <img
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=85"
        alt=""
        className="lp-bg-img"
      />
      <div className="lp-glow" />

      {/* ── Inner ── */}
      <div className="lp-inner">
        
        {/* LEFT — branding */}
        <div className="lp-left">
          <Link to="/" className="lp-badge">
            <BookOpenIcon style={{ width: '1rem', height: '1rem', color: 'white' }} />
            <span>Ezy English</span>
          </Link>

          <h1 className="lp-headline">
            Security & <br />Account Recovery.
          </h1>
          <p className="lp-sub">
            Follow the steps to securely reset your password.<br />
            Multi-factor protection for your peace of mind.
          </p>

          <div style={{ marginTop: '2rem' }}>
            <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 600 }}>
              <ArrowLeftIcon size={16} />
              Back to Sign In
            </Link>
          </div>
        </div>

        {/* RIGHT — card */}
        <div className="lp-card" style={{ width: '400px' }}>
          
          {step === 1 && (
            <div>
              <h2 className="lp-card-title">Forgot Password?</h2>
              <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.5rem' }}>Enter your email to receive a verification code.</p>
              
              {error && (
                <div className="lp-error">
                  <AlertCircleIcon style={{ width: '0.9rem', height: '0.9rem', flexShrink: 0 }} />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label className="lp-label">Email Address</label>
                  <div className="lp-field-wrap">
                    <BookOpenIcon className="lp-field-icon" />
                    <input className="lp-input" type="email" placeholder="you@example.com" value={email} 
                      onChange={e => { setEmail(e.target.value); setError(''); }} />
                  </div>
                </div>
                <button type="submit" className="lp-signin-btn" disabled={loading} style={{ background: loading ? '#94a3b8' : undefined }}>
                  {loading ? 'SENDING...' : 'SEND OTP'}
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '3.5rem', height: '3.5rem', background: '#f0f9ff', color: '#0ea5e9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', marginBottom: '1rem', margin: '0 auto 1.5rem' }}>
                <ShieldCheckIcon size={32} />
              </div>
              <h2 className="lp-card-title">Verify OTP</h2>
              <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.5rem' }}>
                We've sent a 6-digit code to <span style={{ color: '#0f172a', fontWeight: 700 }}>{email}</span>.
              </p>

              {error && (
                <div className="lp-error" style={{ textAlign: 'left' }}>
                  <AlertCircleIcon style={{ width: '0.9rem', height: '0.9rem', flexShrink: 0 }} />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <input
                  type="text" maxLength={6} placeholder="000000" value={otp}
                  onChange={e => { setOtp(e.target.value.replace(/\D/g, '')); setError(''); }}
                  style={{ width: '100%', height: '3.5rem', textAlign: 'center', fontSize: '2rem', fontWeight: 900, letterSpacing: '0.4em', border: '2px solid #e2e8f0', borderRadius: '0.75rem', outline: 'none', background: '#f8fafc' }}
                />
                <button type="submit" className="lp-signin-btn" disabled={loading}>
                  {loading ? 'VERIFYING...' : 'VERIFY OTP'}
                </button>
                <button type="button" onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#0ea5e9', fontWeight: 700, cursor: 'pointer', fontSize: '0.82rem' }}>Resend Code</button>
              </form>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="lp-card-title">Set New Password</h2>
              <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.5rem' }}>Create a strong password to protect your account.</p>

              {error && (
                <div className="lp-error">
                  <AlertCircleIcon style={{ width: '0.9rem', height: '0.9rem', flexShrink: 0 }} />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="lp-field-wrap">
                  <LockIcon className="lp-field-icon" />
                  <input className="lp-input" type="password" placeholder="New Password" 
                    value={newPassword} onChange={e => { setNewPassword(e.target.value); setError(''); }} />
                </div>
                <div className="lp-field-wrap">
                  <LockIcon className="lp-field-icon" />
                  <input className="lp-input" type="password" placeholder="Confirm Password" 
                    value={confirmPassword} onChange={e => { setConfirmPassword(e.target.value); setError(''); }} />
                </div>
                <button type="submit" className="lp-signin-btn" disabled={loading}>
                  {loading ? 'RESETTING...' : 'RESET PASSWORD'}
                </button>
              </form>
            </div>
          )}

          {step === 4 && (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{ width: '4rem', height: '4rem', background: '#ecfdf5', color: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <CheckCircleIcon size={40} />
              </div>
              <h2 className="lp-card-title" style={{ fontSize: '2rem' }}>Success!</h2>
              <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '2rem', lineHeight: 1.6 }}>
                Your password has been successfully updated. You can now use your new password to sign in.
              </p>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <button className="lp-signin-btn" style={{ background: '#10b981', fontSize: '0.9rem', padding: '1rem' }}>GO TO LOGIN</button>
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
