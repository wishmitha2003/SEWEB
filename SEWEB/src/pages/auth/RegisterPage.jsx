import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpenIcon, UserIcon, LockIcon, ArrowLeftIcon, AlertCircleIcon, PhoneIcon, MailIcon } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { useAuth } from '../../context/AuthContext';
import { signup, signin } from '../../services/authService';

const FLOAT_CHARS = ['A','B','C','文','学','英','語','أ','ب','த','क','Z','E','G','W','英','语'];

export function RegisterPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });
  const [error, setError] = useState('');
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const GOOGLE_ACCOUNTS = [
    { username: 'wishmitha', fullName: 'Wishmitha Devinda', email: 'wishmitha@gmail.com', role: 'student', phone: '+94 77 999 8888' },
    { username: 'student',   fullName: 'Kasun Perera',      email: 'kasun@ezy.com',        role: 'student' },
  ];

  const update = (field, value) => {
    setError('');
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const getRoleDashboard = (role) => {
    switch (role) {
      case 'teacher': return '/teacher';
      case 'admin':   return '/admin';
      default:        return '/student';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 6 || form.password.length > 40) {
      setError('Password must be between 6 and 40 characters.');
      return;
    }
    setError('');
    const [firstName, ...rest] = form.fullName.trim().split(' ');
    const lastName = rest.join(' ');
    const payload = { username: form.email, email: form.email, password: form.password, firstName, lastName, phone: form.phone, roles: [form.role] };
    console.log('Signup payload:', payload);
    signup(payload)
      .then(() => signin({ username: form.email, password: form.password }))
      .then(data => {
        const fullName = data.firstName ? `${data.firstName} ${data.lastName || ''}`.trim() : form.fullName;
        const role = (data.roles && data.roles[0]) || form.role;
        login({ fullName, email: data.email || form.email, phone: data.phone || form.phone, role }, data.accessToken || data.token);
        navigate(getRoleDashboard(role));
      })
      .catch(err => {
        console.error('Signup error status:', err.status);
        console.error('Signup error body:', err.body);
        console.error(err);
        let bodyMsg = null;
        if (err && err.body) {
          if (typeof err.body === 'string') bodyMsg = err.body;
          else {
            try {
              bodyMsg = JSON.stringify(err.body);
            } catch { bodyMsg = String(err.body); }
          }
        }
        // attempt to extract common validation messages
        let userMessage = err.message || 'Signup failed';
        if (err.body) {
          if (err.body.message) userMessage = err.body.message;
          else if (err.body.error) userMessage = err.body.error;
          else if (err.body.errors) userMessage = Array.isArray(err.body.errors) ? err.body.errors.join('; ') : String(err.body.errors);
        }
        setError(userMessage + (bodyMsg ? ` — ${bodyMsg}` : ''));
      });
  };

  const handleSelectAccount = (account) => {
    login({ fullName: account.fullName, email: account.email, phone: account.phone || '+94 00 000 0000', role: account.role });
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

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {/* Full Name */}
            <div>
              <label className="lp-label">Full Name</label>
              <div className="lp-field-wrap">
                <UserIcon className="lp-field-icon" />
                <input className="lp-input" type="text" placeholder="Enter your full name" 
                  value={form.fullName} onChange={e => update('fullName', e.target.value)} />
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
              <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.05)', padding: '0.3rem', borderRadius: '0.65rem' }}>
                {['student', 'teacher'].map(r => (
                  <button key={r} type="button" onClick={() => update('role', r)}
                    style={{ flex: 1, padding: '0.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', transition: 'all 0.2s',
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
                <div style={{ width: '1.9rem', height: '1.9rem', borderRadius: '50%', background: '#1e40af', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.72rem', fontWeight: 700 }}>{acc.fullName[0]}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0f172a', margin: 0 }}>{acc.fullName}</p>
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
