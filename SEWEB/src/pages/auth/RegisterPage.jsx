import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpenIcon, UserIcon, LockIcon, ArrowLeftIcon, AlertCircleIcon, PhoneIcon, MailIcon } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/apiClient';

const FLOAT_CHARS = ['A','B','C','文','学','英','語','أ','ب','த','क','Z','E','G','W','英','语'];

export function RegisterPage() {
  const [form, setForm] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'STUDENT',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [step, setStep] = useState('register');
  const [otp, setOtp] = useState('');
  const [savedEmail, setSavedEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const GOOGLE_ACCOUNTS = [
    { username: 'wishmitha', firstName: 'Wishmitha', lastName: 'Devinda', email: 'wishmitha@gmail.com', role: 'STUDENT', phone: '+94 77 999 8888' },
    { username: 'student',   firstName: 'Kasun', lastName: 'Perera',      email: 'kasun@ezy.com',        role: 'STUDENT' },
  ];

  const update = (field, value) => {
    setError('');
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const getRoleDashboard = (role) => {
    switch (role) {
      case 'TEACHER': return '/teacher';
      case 'ADMIN':   return '/admin';
      case 'COURIER': return '/courier';
      default:        return '/student';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const payload = {
        username: form.username,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: form.role,
      };
      console.log(payload);
      const response = await api.post('/api/auth/signup', payload);
      console.log('Register response status:', response?.status ?? 200); // if wrapped response object has status
      console.log('Register response data:', response);

      if (!response || !response.message) {
        throw new Error('Invalid register response from server.');
      }

      setSuccess(response.message);
      setError('');
      setSavedEmail(form.email);
      setStep('verify');
    } catch (err) {
      const message = err?.message || 'Registration failed. Check server status and CORS.';
      setError(message);
      setSuccess('');
    }
  };

  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => setResendCooldown(prev => Math.max(prev - 1, 0)), 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  const handleVerifyOtp = async () => {
    try {
      const payload = { email: savedEmail, otp };
      console.log('Verify OTP payload:', payload);
      const response = await api.post('/api/auth/verify-registration-otp', payload);
      console.log('Verify OTP response status:', response?.status ?? 200);
      console.log('Verify OTP response data:', response);

      setSuccess('Registration completed successfully! Redirecting to login...');
      setError('');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      const message = err?.message || 'OTP verification failed.';
      setError(message);
      setSuccess('');
    }
  };

  const handleResendOtp = async () => {
    if (!savedEmail) {
      setError('Email is required to resend OTP.');
      setSuccess('');
      return;
    }

    setError('');
    setSuccess('');
    setResendCooldown(30);

    try {
      const response = await api.post('/api/auth/resend-registration-otp', { email: savedEmail });
      setSuccess(response?.message || 'OTP resent successfully. Please check your email.');
    } catch (err) {
      const message = err?.message || 'Failed to resend OTP. Please try again.';
      setError(message);
    }
  };

  const handleSelectAccount = (account) => {
    login({ firstName: account.firstName, lastName: account.lastName, email: account.email, phone: account.phone || '+94 00 000 0000', role: account.role });
    setShowGoogleModal(false);
    navigate('/');
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

      {/* ── Inner layout ── */}
      <div className="lp-inner" style={{ maxWidth: '1150px' }}>

        {/* LEFT — branding + welcome */}
        <div className="lp-left">
          <Link to="/" className="lp-badge">
            <BookOpenIcon style={{ width: '1rem', height: '1rem', color: 'white' }} />
            <span>Ezy English</span>
          </Link>

          <h1 className="lp-headline">
            Begin Your English<br />Mastery Today.
          </h1>
          <p className="lp-sub">
            Create your account and join 5,000+ students.<br />
            Instant access to materials and classes.
          </p>

          <div style={{ marginTop: '2rem' }}>
            <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 600 }}>
              <ArrowLeftIcon size={16} />
              Already have an account? Sign In
            </Link>
          </div>
        </div>

        {/* RIGHT — card */}
        <div className="lp-card" style={{ width: '440px', padding: '1.8rem 2rem' }}>
          <h2 className="lp-card-title">Create Your Account.</h2>

          {error && (
            <div className="lp-error">
              <AlertCircleIcon style={{ width: '0.9rem', height: '0.9rem', flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="lp-success" style={{ color: '#059669', fontWeight: 600 }}>
              <span>{success}</span>
            </div>
          )}

          {step === 'register' && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div>
              <label className="lp-label">Username</label>
              <div className="lp-field-wrap">
                <UserIcon className="lp-field-icon" />
                <input className="lp-input" type="text" name="username" placeholder="Enter your username" 
                  value={form.username} onChange={e => update('username', e.target.value)} />
              </div>
            </div>

            {/* Full Name */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label className="lp-label">First Name</label>
                <div className="lp-field-wrap">
                  <UserIcon className="lp-field-icon" />
                  <input className="lp-input" type="text" placeholder="First name" 
                    value={form.firstName} onChange={e => update('firstName', e.target.value)} />
                </div>
              </div>
              <div>
                <label className="lp-label">Last Name</label>
                <div className="lp-field-wrap">
                  <UserIcon className="lp-field-icon" />
                  <input className="lp-input" type="text" placeholder="Last name" 
                    value={form.lastName} onChange={e => update('lastName', e.target.value)} />
                </div>
              </div>
            </div>

            {/* Email + Phone Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label className="lp-label">Email</label>
                <div className="lp-field-wrap">
                  <input className="lp-input" type="email" placeholder="you@email.com" 
                    value={form.email} onChange={e => update('email', e.target.value)} style={{ paddingLeft: '1rem' }} />
                </div>
              </div>
              <div>
                <label className="lp-label">Phone</label>
                <div className="lp-field-wrap">
                  <input className="lp-input" type="tel" placeholder="+94 7X..." 
                    value={form.phone} onChange={e => update('phone', e.target.value)} style={{ paddingLeft: '1rem' }} />
                </div>
              </div>
            </div>

            {/* Role Select */}
            <div>
              <label className="lp-label">Account Type</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', background: 'rgba(0,0,0,0.05)', padding: '0.3rem', borderRadius: '0.65rem' }}>
                {['STUDENT', 'TEACHER', 'ADMIN', 'COURIER'].map(r => (
                  <button key={r} type="button" onClick={() => update('role', r)}
                    style={{ padding: '0.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                             fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase',
                             background: form.role === r ? 'white' : 'transparent',
                             color: form.role === r ? '#0ea5e9' : '#64748b',
                             boxShadow: form.role === r ? '0 2px 8px rgba(0,0,0,0.08)' : 'none' }}>
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Password Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label className="lp-label">Password</label>
                <div className="lp-field-wrap">
                  <input className="lp-input" type="password" placeholder="Password" 
                    value={form.password} onChange={e => update('password', e.target.value)} style={{ paddingLeft: '1rem' }} />
                </div>
              </div>
              <div>
                <label className="lp-label">Confirm</label>
                <div className="lp-field-wrap">
                  <input className="lp-input" type="password" placeholder="Confirm" 
                    value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} style={{ paddingLeft: '1rem' }} />
                </div>
              </div>
            </div>

            <button type="submit" className="lp-signin-btn" style={{ marginTop: '0.5rem' }}>CREATE ACCOUNT</button>
          </form>
          )}

          {step === 'verify' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label className="lp-label">Enter OTP sent to {savedEmail}</label>
                <div className="lp-field-wrap">
                  <input className="lp-input" type="text" placeholder="Enter 6-digit OTP" 
                    value={otp} onChange={e => setOtp(e.target.value)} style={{ paddingLeft: '1rem' }} />
                </div>
              </div>
              <button type="button" onClick={handleVerifyOtp} className="lp-signin-btn" style={{ marginTop: '0.5rem' }}>VERIFY OTP</button>
              <button
                type="button"
                onClick={handleResendOtp}
                className="lp-signin-btn"
                disabled={resendCooldown > 0}
                style={{ marginTop: '0.5rem', background: resendCooldown > 0 ? '#94a3b8' : undefined }}
              >
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend OTP'}
              </button>
            </div>
          )}

          <div className="lp-divider" style={{ margin: '0.8rem 0' }}><span>OR</span></div>

          <button type="button" className="lp-google-btn" onClick={() => setShowGoogleModal(true)} style={{ padding: '0.6rem' }}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Sign up with Google
          </button>
        </div>

      </div>

      {/* Google Modal Picker */}
      <Modal isOpen={showGoogleModal} onClose={() => setShowGoogleModal(false)} title="Choose an account" size="sm">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1rem' }}>to join <span style={{ fontWeight: 800, color: '#0f172a' }}>Ezy English</span></p>
          <div style={{ width: '100%', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
            {GOOGLE_ACCOUNTS.map(acc => (
              <button key={acc.email} onClick={() => handleSelectAccount(acc)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.65rem 0.4rem', background: 'none', border: 'none', borderBottom: '1px solid #f8fafc', cursor: 'pointer', textAlign: 'left' }}
                onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                <div style={{ width: '1.9rem', height: '1.9rem', borderRadius: '50%', background: '#1e40af', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.72rem', fontWeight: 700 }}>{acc.firstName[0]}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0f172a', margin: 0 }}>{acc.firstName} {acc.lastName}</p>
                  <p style={{ fontSize: '0.72rem', color: '#64748b', margin: 0 }}>{acc.email}</p>
                </div>
              </button>
            ))}
          </div>
          <button type="button" onClick={() => setShowGoogleModal(false)}
            style={{ marginTop: '1rem', width: '100%', padding: '0.6rem', border: '1.5px solid #e2e8f0', borderRadius: '0.65rem', background: '#fff', fontSize: '0.82rem', fontWeight: 600, color: '#1e40af', cursor: 'pointer' }}>Cancel</button>
        </div>
      </Modal>

    </div>
  );
}
