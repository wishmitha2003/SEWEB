import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const ToastContext = createContext(null);

const ICONS = {
  success: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  error: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  warning: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  info: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
};

const STYLES = {
  success: {
    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    border: '1px solid #86efac',
    iconColor: '#16a34a',
    iconBg: '#dcfce7',
    titleColor: '#15803d',
    textColor: '#166534',
  },
  error: {
    background: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)',
    border: '1px solid #fca5a5',
    iconColor: '#dc2626',
    iconBg: '#fee2e2',
    titleColor: '#b91c1c',
    textColor: '#991b1b',
  },
  warning: {
    background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
    border: '1px solid #fcd34d',
    iconColor: '#d97706',
    iconBg: '#fef3c7',
    titleColor: '#b45309',
    textColor: '#92400e',
  },
  info: {
    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    border: '1px solid #93c5fd',
    iconColor: '#2563eb',
    iconBg: '#dbeafe',
    titleColor: '#1d4ed8',
    textColor: '#1e40af',
  },
};

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 350);
    clearTimeout(timers.current[id]);
    delete timers.current[id];
  }, []);

  const toast = useCallback((message, type = 'info', duration = 4000) => {
    const id = ++idCounter;
    setToasts(prev => [...prev, { id, message, type, exiting: false }]);
    timers.current[id] = setTimeout(() => dismiss(id), duration);
    return id;
  }, [dismiss]);

  // Convenience shortcuts
  toast.success = (msg, dur) => toast(msg, 'success', dur);
  toast.error = (msg, dur) => toast(msg, 'error', dur);
  toast.warning = (msg, dur) => toast(msg, 'warning', dur);
  toast.info = (msg, dur) => toast(msg, 'info', dur);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastRenderer toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  );
}

function ToastRenderer({ toasts, dismiss }) {
  if (toasts.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes toastSlideIn {
          from { opacity: 0; transform: translateX(110%); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes toastSlideOut {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(110%); }
        }
      `}</style>
      <div style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '380px',
        width: 'calc(100vw - 48px)',
        pointerEvents: 'none',
      }}>
        {toasts.map(({ id, message, type, exiting }) => {
          const s = STYLES[type] || STYLES.info;
          return (
            <div
              key={id}
              style={{
                background: s.background,
                border: s.border,
                borderRadius: '14px',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
                animation: exiting
                  ? 'toastSlideOut 0.35s cubic-bezier(0.4,0,1,1) forwards'
                  : 'toastSlideIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards',
                pointerEvents: 'all',
              }}
            >
              {/* Icon */}
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: s.iconBg,
                color: s.iconColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                {ICONS[type]}
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0, paddingTop: '2px' }}>
                <p style={{
                  margin: 0,
                  fontSize: '14px',
                  fontWeight: '600',
                  color: s.titleColor,
                  lineHeight: '1.4',
                  wordBreak: 'break-word',
                }}>
                  {message}
                </p>
              </div>

              {/* Close button */}
              <button
                onClick={() => dismiss(id)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '2px',
                  cursor: 'pointer',
                  color: s.iconColor,
                  opacity: 0.6,
                  lineHeight: 1,
                  flexShrink: 0,
                  marginTop: '2px',
                  borderRadius: '4px',
                  transition: 'opacity 0.15s',
                }}
                onMouseOver={e => e.currentTarget.style.opacity = '1'}
                onMouseOut={e => e.currentTarget.style.opacity = '0.6'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}
