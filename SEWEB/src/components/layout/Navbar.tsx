import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon, BookOpenIcon } from 'lucide-react';
import { Button } from '../ui/Button';
interface NavbarProps {
  transparent?: boolean;
}
export function Navbar({ transparent = false }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const showBg = !transparent || scrolled;
  const navLinks = [
  {
    label: 'Home',
    path: '/'
  },
  {
    label: 'Classes',
    path: '/classes'
  },
  {
    label: 'Materials',
    path: '/materials'
  },
  {
    label: 'Map',
    path: '/map'
  }];

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-40 transition-all duration-300
        ${showBg ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100' : 'bg-transparent'}
      `}>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${showBg ? 'bg-blue-600' : 'bg-white/20'}`}>

              <BookOpenIcon className="w-5 h-5 text-white" />
            </div>
            <span
              className={`text-xl font-extrabold tracking-tight transition-colors ${showBg ? 'text-slate-900' : 'text-white'}`}>

              Ezy English
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
            <Link
              key={link.path}
              to={link.path}
              className={`
                  px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${location.pathname === link.path ? showBg ? 'text-blue-600 bg-blue-50' : 'text-white bg-white/20' : showBg ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-50' : 'text-white/80 hover:text-white hover:bg-white/10'}
                `}>

                {link.label}
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button
                variant={showBg ? 'ghost' : 'ghost'}
                size="sm"
                className={!showBg ? 'text-white hover:bg-white/10' : ''}>

                Log In
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="sm">
                Get Started
              </Button>
            </Link>
          </div>

          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${showBg ? 'text-slate-600 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu">

            {isOpen ?
            <XIcon className="w-5 h-5" /> :

            <MenuIcon className="w-5 h-5" />
            }
          </button>
        </div>

        {isOpen &&
        <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-1 pt-2">
              {navLinks.map((link) =>
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`
                    px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors
                    ${location.pathname === link.path ? showBg ? 'text-blue-600 bg-blue-50' : 'text-white bg-white/20' : showBg ? 'text-slate-600 hover:bg-slate-50' : 'text-white/80 hover:bg-white/10'}
                  `}>

                  {link.label}
                </Link>
            )}
              <div className="flex gap-2 mt-2 pt-2 border-t border-slate-100">
                <Link
                to="/login"
                className="flex-1"
                onClick={() => setIsOpen(false)}>

                  <Button variant="outline" size="sm" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link
                to="/register"
                className="flex-1"
                onClick={() => setIsOpen(false)}>

                  <Button variant="primary" size="sm" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        }
      </nav>
    </header>);

}