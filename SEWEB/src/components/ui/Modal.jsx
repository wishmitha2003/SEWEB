import React, { useEffect, useRef } from 'react';
import { XIcon } from 'lucide-react';
const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl'
};
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md'
}) {
  const overlayRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}>

      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" />
      <div
        className={`relative bg-white rounded-2xl shadow-xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto animate-slide-up`}>

        {title &&
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <h2 id="modal-title" className="text-lg font-bold text-slate-900">
              {title}
            </h2>
            <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Close modal">

              <XIcon className="w-5 h-5" />
            </button>
          </div>
        }
        {!title &&
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors z-10"
          aria-label="Close modal">

            <XIcon className="w-5 h-5" />
          </button>
        }
        <div className={title ? 'p-6' : 'p-6 pt-12'}>{children}</div>
      </div>
    </div>);

}