import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpenIcon, UserIcon, LockIcon, EyeIcon, EyeOffIcon, AlertCircleIcon } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { useAuth } from '../../context/AuthContext';

const DEMO_ACCOUNTS = [
  { username: 'student',  password: 'student123',  fullName: 'Kasun Perera',     role: 'student',  email: 'kasun@ezy.com',  phone: '+94 77 123 4567' },
  { username: 'teacher',  password: 'teacher123',  fullName: 'Nimal Fernando',   role: 'teacher',  email: 'nimal@ezy.com',  phone: '+94 71 234 5678' },
  { username: 'admin',    password: 'admin123',    fullName: 'Sunil Silva',       role: 'admin',    email: 'sunil@ezy.com',  phone: '+94 76 345 6789' },
  { username: 'courier',  password: 'courier123',  fullName: 'Ruwan Jayasinghe', role: 'courier',  email: 'ruwan@ezy.com',  phone: '+94 75 456 7890' },
];

const FLOAT_CHARS = ['A','B','C','文','学','英','語','أ','ب','த','क','Z','E','G','W','英','语'];

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername]         = useState('');
  const [password, setPassword]         = useState('');
  const [remember, setRemember]         = useState(false);
  const [error, setError]               = useState('');
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const { login }  = useAuth();
  const navigate   = useNavigate();

  const GOOGLE_ACCOUNTS = [
    { username: 'wishmitha', fullName: 'Wishmitha Devinda', email: 'wishmitha@gmail.com', role: 'student', phone: '+94 77 999 8888' },
    ...DEMO_ACCOUNTS,
  ];

  const getRoleDashboard = (role) => {
    switch (role) {
      case 'teacher': return '/teacher';
      case 'admin':   return '/admin';
      case 'courier': return '/courier';
      default:        return '/student';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!username || !password) { setError('Please enter both username and password.'); return; }
    const account = DEMO_ACCOUNTS.find(a => a.username.toLowerCase() === username.toLowerCase() && a.password === password);
    if (account) {
      login({ fullName: account.fullName, email: account.email, phone: account.phone, role: account.role });
      navigate(getRoleDashboard(account.role));
    } else {
      setError('Invalid username or password.');
    }
  };

  const handleSelectAccount = (account) => {
    login({ fullName: account.fullName, email: account.email, phone: account.phone || '+94 00 000 0000', role: account.role });
    setShowGoogleModal(false);
    navigate(getRoleDashboard(account.role));
  };

  return (
    <div className="lp-root">

      {/* ── World-map background image ── */}
      <img
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=85"
        alt=""
        className="lp-bg-img"
      />

      {/* Blue glow overlay */}
      <div className="lp-glow" />

      {/* Floating alphabet / language chars */}
      <div className="lp-float-chars" aria-hidden="true">
        {FLOAT_CHARS.map((ch, i) => (
          <span key={i} className="lp-char" style={{
            top:  `${8 + (i * 5.5) % 88}%`,
            right: `${1 + (i * 3.7) % 18}%`,
            animationDelay: `${i * 0.4}s`,
            fontSize: i % 3 === 0 ? '1.4rem' : '1rem',
            opacity: 0.18 + (i % 4) * 0.06,
          }}>{ch}</span>
        ))}
      </div>

      {/* ── Main content wrapper ── */}
      <div className="lp-inner">

        {/* LEFT — branding + welcome text */}
        <div className="lp-left">
          <Link to="/" className="lp-badge">
            <BookOpenIcon style={{ width: '1rem', height: '1rem', color: 'white' }} />
            <span>Ezy English</span>
          </Link>

          <h1 className="lp-headline">
            Welcome Back to<br />Your English Mastery.
          </h1>
          <p className="lp-sub">
            Your journey to English fluency continues.<br />
            Reconnect and excel.
          </p>

          {/* Demo hint */}
          <div className="lp-demo-box">
            <p className="lp-demo-title">Demo Accounts</p>
            {DEMO_ACCOUNTS.map(acc => (
              <div key={acc.username} className="lp-demo-row">
                <span className="lp-demo-user">{acc.username}</span>
                <span className="lp-demo-pass">{acc.password}</span>
                <span className="lp-demo-role">{acc.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — glassmorphism form card */}
        <div className="lp-card">
          <h2 className="lp-card-title">Sign In to Your Account.</h2>

          {error && (
            <div className="lp-error">
              <AlertCircleIcon style={{ width: '0.9rem', height: '0.9rem', flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Username */}
            <div>
              <label className="lp-label">Username/Email Address</label>
              <div className="lp-field-wrap">
                <UserIcon className="lp-field-icon" />
                <input
                  className="lp-input"
                  type="text"
                  placeholder="Enter your username or email"
                  value={username}
                  onChange={e => { setUsername(e.target.value); setError(''); }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="lp-label">Password</label>
              <div className="lp-field-wrap">
                <LockIcon className="lp-field-icon" />
                <input
                  className="lp-input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  style={{ paddingRight: '2.8rem' }}
                />
                <button type="button" className="lp-eye-btn" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOffIcon style={{ width: '0.95rem', height: '0.95rem' }} /> : <EyeIcon style={{ width: '0.95rem', height: '0.95rem' }} />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="lp-row-check">
              <label className="lp-check-label">
                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="lp-checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="lp-forgot">Forgot password?</Link>
            </div>

            {/* Sign In */}
            <button type="submit" className="lp-signin-btn">SIGN IN</button>
          </form>

          {/* Divider */}
          <div className="lp-divider"><span>OR</span></div>

          {/* Google */}
          <button type="button" className="lp-google-btn" onClick={() => setShowGoogleModal(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <p className="lp-register-link">
            Don't have an account?{' '}
            <Link to="/register">Create a new one</Link>
          </p>
        </div>

      </div>

      {/* ── Google Modal ── */}
      <Modal isOpen={showGoogleModal} onClose={() => setShowGoogleModal(false)} title="Choose an account" size="sm">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '2.8rem', height: '2.8rem', borderRadius: '50%', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.4rem' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1rem' }}>to continue to <strong style={{ color: '#0f172a' }}>Ezy English</strong></p>
          <div style={{ width: '100%', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
            {GOOGLE_ACCOUNTS.map(acc => (
              <button key={acc.email} onClick={() => handleSelectAccount(acc)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.65rem 0.4rem', background: 'none', border: 'none', borderBottom: '1px solid #f8fafc', cursor: 'pointer', textAlign: 'left' }}
                onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                <div style={{ width: '1.9rem', height: '1.9rem', borderRadius: '50%', background: '#1e40af', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.72rem', fontWeight: 700, flexShrink: 0 }}>{acc.fullName[0]}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0f172a', margin: 0 }}>{acc.fullName}</p>
                  <p style={{ fontSize: '0.72rem', color: '#64748b', margin: 0 }}>{acc.email}</p>
                </div>
                <span style={{ fontSize: '0.58rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', background: '#f1f5f9', borderRadius: '999px', padding: '0.12rem 0.45rem', flexShrink: 0 }}>{acc.role}</span>
              </button>
            ))}
          </div>
          <button type="button" onClick={() => setShowGoogleModal(false)}
            style={{ marginTop: '1rem', width: '100%', padding: '0.6rem', border: '1.5px solid #e2e8f0', borderRadius: '0.65rem', background: '#fff', fontSize: '0.82rem', fontWeight: 600, color: '#1e40af', cursor: 'pointer' }}>
            Use another account
          </button>
          <p style={{ marginTop: '1rem', fontSize: '0.68rem', color: '#94a3b8', textAlign: 'center', lineHeight: 1.6 }}>
            Google will share your name, email and profile picture with Ezy English.
          </p>
        </div>
      </Modal>

    </div>
  );
}