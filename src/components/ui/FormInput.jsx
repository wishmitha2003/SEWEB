import React from 'react';
export function FormInput({
  label,
  error,
  icon,
  helperText,
  id,
  className = '',
  labelClassName = '',
  ...props
}) {
  const inputId = id || (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : Math.random().toString(36).substring(2, 11));
  return (
    <div className={`w-full ${className}`}>
      {label &&
      <label
        htmlFor={inputId}
        className={`block text-sm font-medium text-slate-700 mb-1.5 ${labelClassName}`}>

          {label}
        </label>
      }
      <div className="relative">
        {icon &&
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            {icon}
          </div>
        }
        <input
          id={inputId}
          className={`
            w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-900
            placeholder:text-slate-400
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 hover:border-slate-300'}
          `}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={
          error ?
          `${inputId}-error` :
          helperText ?
          `${inputId}-helper` :
          undefined
          }
          {...props} />

      </div>
      {error &&
      <p
        id={`${inputId}-error`}
        className="mt-1.5 text-sm text-red-600"
        role="alert">

          {error}
        </p>
      }
      {helperText && !error &&
      <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-slate-500">
          {helperText}
        </p>
      }
    </div>);

}