import React from 'react';
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  padding?: boolean;
}
export function Card({
  children,
  className = '',
  hover = false,
  onClick,
  padding = true
}: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-2xl shadow-card border border-slate-100
        ${hover ? 'cursor-pointer transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5' : ''}
        ${padding ? 'p-6' : ''}
        ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
      onClick ?
      (e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick();
      } :
      undefined
      }>

      {children}
    </div>);

}