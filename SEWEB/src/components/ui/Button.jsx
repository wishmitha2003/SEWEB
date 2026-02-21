import React from 'react';
import { LoaderIcon } from 'lucide-react';
const variantClasses = {
  primary:
  'bg-[#0f172a] text-white hover:bg-black active:scale-95 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_25px_-5px_rgba(0,0,0,0.4)]',
  secondary:
  'bg-slate-800 text-white hover:bg-slate-700 active:scale-95',
  outline:
  'border-2 border-slate-800 text-slate-800 hover:bg-slate-50 active:scale-95',
  ghost: 'text-slate-400 hover:text-white hover:bg-white/5 active:scale-95'
};
const sizeClasses = {
  sm: 'px-3.5 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full gap-2',
  md: 'px-5 py-2 text-xs font-black uppercase tracking-widest rounded-full gap-2.5',
  lg: 'px-7 py-2.5 text-sm font-black uppercase tracking-widest rounded-full gap-3',
  xl: 'px-10 py-3.5 text-base font-black uppercase tracking-widest rounded-full gap-4'
};
export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}) {
  return (
    <button
      className={`
        inline-flex items-center justify-center font-semibold
        transition-all duration-200 ease-out
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}>

      {loading ?
      <LoaderIcon className="w-4 h-4 animate-spin" /> :
      icon ?
      <span className="flex-shrink-0">{icon}</span> :
      null}
      {children}
    </button>);

}