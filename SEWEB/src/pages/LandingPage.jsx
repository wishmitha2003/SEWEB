import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MonitorIcon,
  BuildingIcon,
  UsersIcon,
  GamepadIcon,
  BarChart3Icon,
  AwardIcon,
  StarIcon,
  MapPinIcon,
  PhoneIcon,
  ArrowRightIcon,
  PlayCircleIcon,
  CheckCircleIcon,
  GlobeIcon,
  BookOpenIcon,
  SparklesIcon } from
'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200",
      title: "Interactive Collaboration",
      subtitle: "Learn Together"
    },
    {
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200",
      title: "Engage While Learning",
      subtitle: "Smart Education"
    },
    {
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1200",
      title: "Diverse Community",
      subtitle: "Global Reach"
    },
    {
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1200",
      title: "Focused Excellence",
      subtitle: "Personalized Support"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="w-full min-h-screen bg-[#020617] text-white">
      <Navbar transparent />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[120px] animate-pulse decoration-delay-2000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)]" />
        </div>

        {/* Stars/Particles Background */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content Left */}
            <div className="space-y-8 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest animate-fade-in">
                <SparklesIcon className="w-3.5 h-3.5" />
                <span>Sri Lanka's #1 Learning Hub</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight animate-slide-up">
                Master English <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-amber-300">
                  Online & Offline
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-slate-400 max-w-2xl leading-relaxed animate-slide-up animation-delay-500">
                Join 5,000+ students mastering English with Ezy English. 
                Premium courses designed for students, professionals, and future leaders.
              </p>

              <div className="flex flex-row items-center gap-4 pt-4 animate-slide-up animation-delay-1000">
                <Link to="/register">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white border-none shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all duration-300 group whitespace-nowrap">
                    Start Learning Free
                    <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/classes">
                  <Button variant="outline" size="lg" className="border-slate-700 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 whitespace-nowrap">
                    Explore Classes
                  </Button>
                </Link>
              </div>
            </div>

            {/* Visual Right (Mockup Style) */}
            <div className="relative group perspective-1000 block mt-12 lg:mt-0">
              <div className="relative z-10 transition-transform duration-1000 group-hover:rotate-y-[-10deg] group-hover:rotate-x-[4deg]">
                {/* Laptop Display (The Lid) */}
                <div className="relative p-[6px] bg-gradient-to-b from-[#475569] to-[#1e293b] rounded-t-2xl border-x-2 border-t-2 border-white/10 shadow-2xl">
                  {/* Screen Outer Bezel */}
                  <div className="bg-[#020617] p-2 rounded-xl border border-white/5 relative shadow-inner aspect-[16/10] overflow-hidden">
                    {/* Hardware Details: Webcam & Mic */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30 opacity-60">
                      <div className="w-0.5 h-0.5 rounded-full bg-blue-500/40" />
                      <div className="w-2 h-2 rounded-full bg-[#1e293b] border border-white/5 flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-slate-900" />
                      </div>
                      <div className="w-0.5 h-0.5 rounded-full bg-blue-500/40" />
                    </div>
                    
                    {/* Actual Screen Panel */}
                    <div className="w-full h-full rounded-md overflow-hidden relative group/screen">
                      {slides.map((slide, idx) => (
                        <div 
                          key={idx}
                          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                            idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                          }`}
                        >
                          <img 
                            src={slide.image} 
                            alt={slide.title} 
                            className="w-full h-full object-cover"
                          />
                          
                          {/* Premium Screen Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-left z-10">
                            <div className={`space-y-1.5 transition-all duration-700 delay-300 ${
                              idx === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                            }`}>
                              <p className="text-[9px] font-black text-blue-400 uppercase tracking-[0.3em]">{slide.subtitle}</p>
                              <h4 className="text-2xl font-black text-white tracking-tight">{slide.title}.</h4>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Realistic Screen Glare */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-60 pointer-events-none z-10" />
                      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-[-20deg] translate-x-1/2 z-10" />
                      
                      {/* Slide Indicators */}
                      <div className="absolute bottom-4 right-4 flex gap-1.5 z-20">
                        {slides.map((_, i) => (
                          <div 
                            key={i} 
                            className={`h-1 rounded-full transition-all duration-500 ${
                              i === currentSlide ? 'w-4 bg-blue-500' : 'w-1 bg-white/30'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 3D Hinge / Neck */}
                <div className="h-2 bg-[#1e293b] border-x-2 border-slate-700 relative z-20">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
                </div>

                {/* Laptop Base (Hardware) */}
                <div className="relative group/base h-5 bg-gradient-to-b from-[#334155] to-[#0f172a] rounded-b-2xl border-b-[8px] border-[#1e293b] w-[110%] -ml-[5%] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  {/* The opening lip/notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-2 bg-[#1e293b] rounded-b-xl border-x border-b border-white/5" />
                  
                  {/* Subtle keyboard reflection */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-50" />
                  
                  {/* Hardware Edge highlight */}
                  <div className="absolute top-0 inset-x-0 h-px bg-white/10" />
                </div>

                {/* Deep Hardware Shadow */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[90%] h-10 bg-blue-600/10 blur-[40px] rounded-full -z-10" />

                {/* Mobile Mockup Floating (Repositioned precisely) */}
                <div className="absolute -right-4 sm:-right-12 -bottom-6 sm:bottom-0 w-32 sm:w-44 h-[240px] sm:h-[340px] bg-slate-950 rounded-[2rem] sm:rounded-[3rem] p-2 sm:p-3 border-[6px] sm:border-[8px] border-[#1e293b] shadow-2xl z-30 animate-floating">
                  {/* Mobile Hardware Details */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-24 h-4 sm:h-6 bg-[#1e293b] rounded-b-xl sm:rounded-b-2xl z-40">
                    <div className="absolute top-1 sm:top-2 left-1/2 -translate-x-1/2 w-6 sm:w-8 h-0.5 sm:h-1 bg-slate-800 rounded-full" />
                  </div>
                  
                  <div className="w-full h-full rounded-[1.5rem] sm:rounded-[2.2rem] overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1543269664-76bc3997d9ea?auto=format&fit=crop&q=80&w=400" 
                      alt="Mobile Learning" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Background Glow behind mockup */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 rounded-full blur-[120px] -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Bento Feature Section - Ecosystem */}
      <section className="py-12 relative overflow-hidden bg-[#020617]">
        {/* Stars Background specifically for this section */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-blue-400 rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `2px`,
                height: `2px`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Our Ecosystem</h2>
            <p className="text-2xl sm:text-3xl font-black tracking-tight">Designed for Excellence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* 1. Elite Online Learning */}
            <div className="group relative overflow-hidden rounded-[2rem] bg-slate-900/40 border border-blue-500/20 p-8 transition-all duration-500 hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(37,99,235,0.1)] h-full">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] group-hover:bg-blue-600/20 transition-all duration-700" />
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-blue-900/50 border border-blue-500/30 flex items-center justify-center mb-6 shadow-inner ring-1 ring-blue-400/20">
                  <MonitorIcon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-black mb-4 text-white leading-tight">Elite Online Learning</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  Experience university-grade English education from the comfort of your home. 
                  Live sessions, interactive whiteboards, and real-time feedback.
                </p>
              </div>
            </div>

            {/* 2. Gamified XP System */}
            <div className="group relative overflow-hidden rounded-[2rem] bg-slate-900/40 border border-indigo-500/20 p-8 transition-all duration-500 hover:border-indigo-400/30 h-full">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] group-hover:bg-indigo-600/20 transition-all duration-700" />
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-indigo-900/30 border border-indigo-500/20 flex items-center justify-center mb-6 shadow-inner ring-1 ring-indigo-400/20">
                  <SparklesIcon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-black mb-4 text-white leading-tight">Gamified XP System</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  Earn badges, climb leaderboards, and unlock rewards as you master English.
                  Making learning an addictive and fun journey.
                </p>
              </div>
            </div>

            {/* 3. Global Presence */}
            <div className="group relative overflow-hidden rounded-[2rem] bg-slate-900/40 border border-sky-500/10 p-8 transition-all duration-500 hover:border-sky-400/30 h-full">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-600/10 blur-[100px] group-hover:bg-sky-600/20 transition-all duration-700" />
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-sky-900/30 border border-sky-500/20 flex items-center justify-center mb-6 ring-1 ring-sky-400/10">
                  <MapPinIcon className="w-6 h-6 text-sky-400" />
                </div>
                <h3 className="text-2xl font-black mb-4 text-white leading-tight">Global Presence</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  Join us at any of our 10+ island-wide branches. Find the nearest 
                  Ezy English hub to your location and start today.
                </p>
              </div>
            </div>

            {/* 4. Certified Results */}
            <div className="group relative overflow-hidden rounded-[2rem] bg-blue-600 p-8 transition-all duration-500 hover:bg-blue-500 h-full shadow-[0_15px_30px_-5px_rgba(37,99,235,0.4)]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6">
                  <AwardIcon className="w-10 h-10 text-white animate-bounce" />
                </div>
                <h3 className="text-2xl font-black text-white leading-tight mb-2">Certified Results</h3>
                <p className="text-blue-100 text-sm font-medium">
                  University-approved certifications that open doors to global opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mentor/Teachers Section */}
      <section className="py-12 bg-[#020617]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="space-y-2">
              <h2 className="text-sm font-black text-amber-500 uppercase tracking-[0.3em]">Our Faculty</h2>
              <p className="text-2xl sm:text-3xl font-black">Learn from the Best.</p>
            </div>
            <Link to="/classes" className="text-blue-400 font-bold flex items-center gap-2 hover:text-blue-300 transition-colors">
              Meet all mentors <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Dr. Sarah Perera", role: "IELTS Specialist", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" },
              { name: "Mr. Amal Silva", role: "Senior Grammar Instructor", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
              { name: "Ms. Dinithi Jay", role: "Spoken English Coach", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400" },
              { name: "Mr. Rajitha Karu", role: "Business English Expert", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400" }
            ].map((mentor, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden mb-6 border border-slate-800">
                  <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />
                </div>
                <h4 className="text-xl font-bold group-hover:text-blue-400 transition-colors">{mentor.name}</h4>
                <p className="text-slate-500 text-sm font-medium">{mentor.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Compact & Modern */}
      <section className="py-12 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto rounded-[2.5rem] bg-slate-900 border border-white/10 text-center shadow-2xl overflow-hidden relative group p-10 md:p-14">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200" 
                alt="Students" 
                className="w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/60 to-indigo-900/80 mix-blend-multiply" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                Ready to redefine your <br /> English journey?
              </h2>
              <p className="text-base text-blue-100/70 mb-8 max-w-xl mx-auto font-medium">
                Join 5,000+ students and start learning today with our premium platforms.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/register">
                  <Button size="lg" className="!bg-white !text-blue-600 hover:bg-blue-50 border-none shadow-xl font-extrabold px-8">
                    Register Now
                  </Button>
                </Link>
                <Link to="/classes">
                  <Button variant="outline" size="lg" className="!border-white/30 !text-white hover:bg-white/10 px-8">
                    Browse Classes
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}