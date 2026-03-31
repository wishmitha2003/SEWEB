import React from 'react';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#020617] animate-fade-in">
      <div className="flex flex-col items-center gap-8">
        <div className="book-container">
          <div className="book">
            <div className="book-page"></div>
            <div className="book-page"></div>
            <div className="book-page"></div>
            <div className="book-page"></div>
            <div className="book-page"></div>
            <div className="book-page"></div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-blue-400 font-black text-xs uppercase tracking-[0.3em] animate-pulse">
            Ezy English
          </p>
          <p className="text-slate-500 text-[10px] font-bold mt-2">
            Loading your experience...
          </p>
        </div>
      </div>
    </div>
  );
}
