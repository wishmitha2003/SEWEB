import React from 'react';
const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4'
};
export function ProgressBar({
  value,
  max = 100,
  color = 'bg-blue-600',
  label,
  showPercentage = false,
  size = 'md',
  className = ''
}) {
  const percentage = Math.min(Math.max(value / max * 100, 0), 100);
  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) &&
      <div className="flex items-center justify-between mb-1.5">
          {label &&
        <span className="text-sm font-medium text-slate-700">{label}</span>
        }
          {showPercentage &&
        <span className="text-sm font-semibold text-slate-600">
              {Math.round(percentage)}%
            </span>
        }
        </div>
      }
      <div
        className={`w-full bg-slate-100 rounded-full overflow-hidden ${sizeClasses[size]}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}>

        <div
          className={`${color} ${sizeClasses[size]} rounded-full transition-all duration-700 ease-out`}
          style={{
            width: `${percentage}%`
          }} />

      </div>
    </div>);

}