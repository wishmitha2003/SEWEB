import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, GraduationCapIcon, UsersIcon, ArrowLeftIcon } from 'lucide-react';

export function RoleSelectPage() {
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
      <div className="lp-inner" style={{ maxWidth: '1000px', flexDirection: 'column', gap: '2.5rem' }}>
        
        <div style={{ textAlign: 'center' }}>
          <Link to="/" className="lp-badge" style={{ margin: '0 auto 1.5rem' }}>
            <BookOpenIcon style={{ width: '1rem', height: '1rem', color: 'white' }} />
            <span>Ezy English</span>
          </Link>
          <h1 className="lp-headline" style={{ fontSize: '3rem', textAlign: 'center' }}>Choose Your Path.</h1>
          <p className="lp-sub" style={{ textAlign: 'center', marginTop: '0.5rem' }}>Select how you'd like to use Ezy English to get started.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', width: '100%' }}>
          
          {/* Student */}
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <div className="lp-card" style={{ width: '100%', textAlign: 'center', height: '100%', transition: 'transform 0.3s', cursor: 'pointer' }} 
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ width: '4rem', height: '4rem', background: '#e0f2fe', color: '#0ea5e9', borderRadius: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <BookOpenIcon size={32} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Student</h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6 }}>Access classes, track progress, earn XP, and download learning materials.</p>
            </div>
          </Link>

          {/* Teacher */}
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <div className="lp-card" style={{ width: '100%', textAlign: 'center', height: '100%', transition: 'transform 0.3s', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ width: '4rem', height: '4rem', background: '#ecfdf5', color: '#10b981', borderRadius: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <GraduationCapIcon size={32} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Teacher</h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6 }}>Manage classes, upload assignments, track student performance and attendance.</p>
            </div>
          </Link>

          {/* Parent */}
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <div className="lp-card" style={{ width: '100%', textAlign: 'center', height: '100%', transition: 'transform 0.3s', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ width: '4rem', height: '4rem', background: '#f5f3ff', color: '#8b5cf6', borderRadius: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <UsersIcon size={32} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Parent</h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6 }}>Monitor your child's progress, view grades, manage payments and schedules.</p>
            </div>
          </Link>

        </div>

        <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(255,255,255,0.8)', fontSize: '1rem', textDecoration: 'none', fontWeight: 700 }}>
          <ArrowLeftIcon size={18} />
          Already have an account? Sign In
        </Link>
      </div>
    </div>
  );
}