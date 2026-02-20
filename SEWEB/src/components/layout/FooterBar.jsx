import React from 'react';

export function FooterBar() {
  return (
    <footer className="bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-slate-400">
          © 2026 Ezy English. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            href="#"
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
