import React from 'react';
import { LoaderIcon } from 'lucide-react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  loading?: boolean;
  children: React.ReactNode;
}
const variantClasses: Record<string, string> = {
  primary:
  'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm hover:shadow-md',
  secondary:
  'bg-slate-100 text-slate-700 hover:bg-slate-200 active:bg-slate-300',
  outline:
  'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100',
  ghost: 'text-slate-600 hover:bg-slate-100 active:bg-slate-200'
};
const sizeClasses: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-7 py-3.5 text-base rounded-xl gap-2.5'
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
}: ButtonProps) {
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