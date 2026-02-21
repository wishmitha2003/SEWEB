import React from 'react';
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
  return (
    <div className="w-full min-h-screen bg-[#020617] text-white">
      <Navbar transparent />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
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

              <p className="text-lg sm:text-xl text-slate-400 max-w-xl leading-relaxed animate-slide-up animation-delay-500">
                Join 5,000+ students mastering English with Ezy English. 
                Premium courses designed for students, professionals, and future leaders.
              </p>

              <div className="flex flex-wrap gap-4 pt-4 animate-slide-up animation-delay-1000">
                <Link to="/register">
                  <Button size="xl" className="bg-blue-600 hover:bg-blue-500 text-white border-none shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all duration-300 group">
                    Start Learning Free
                    <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/classes">
                  <Button variant="outline" size="xl" className="border-slate-700 bg-white/5 backdrop-blur-md text-white hover:bg-white/10">
                    Explore Classes
                  </Button>
                </Link>
              </div>

              {/* Stats Bar (Like the badges in the image) */}
              <div className="flex flex-wrap gap-3 pt-8 animate-fade-in animation-delay-1500">
                <div className="px-6 py-2 rounded-full bg-slate-900 border border-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  Free Trial
                </div>
                <div className="px-6 py-2 rounded-full bg-slate-900 border border-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  Desktop & Mobile
                </div>
                <div className="px-6 py-2 rounded-full bg-slate-900 border border-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  Certified
                </div>
                <div className="px-6 py-2 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 text-[10px] font-black uppercase tracking-widest">
                  Premium UI
                </div>
              </div>
            </div>

            {/* Visual Right (Mockup Style) */}
            <div className="relative group perspective-1000 lg:block hidden">
              <div className="relative z-10 transition-transform duration-700 group-hover:rotate-y-[-5deg] group-hover:rotate-x-[5deg]">
                {/* Desktop Mockup */}
                <div className="bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden aspect-video relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
                  <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-slate-700" />
                      <div className="w-3 h-3 rounded-full bg-slate-700" />
                      <div className="w-3 h-3 rounded-full bg-slate-700" />
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 w-3/4 bg-slate-800 rounded animate-pulse" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-32 bg-slate-800 rounded-xl relative overflow-hidden group/card">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent group-hover/card:scale-110 transition-transform" />
                      </div>
                      <div className="h-32 bg-slate-800 rounded-xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-transparent" />
                      </div>
                    </div>
                    <div className="h-4 w-1/2 bg-slate-800 rounded animate-pulse animation-delay-1000" />
                  </div>
                  {/* Glowing Effect inside mockup */}
                  <div className="absolute bottom-[-20%] left-[-20%] w-full h-full bg-blue-500/10 blur-[100px]" />
                </div>

                {/* Mobile Mockup Floating */}
                <div className="absolute -right-10 bottom-[-40px] w-48 h-96 bg-slate-900 rounded-[2.5rem] border-[6px] border-slate-800 shadow-2xl z-20 overflow-hidden hidden xl:block animate-floating">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-slate-800 rounded-b-2xl" />
                  <div className="p-6 pt-10 space-y-4">
                    <div className="h-32 bg-slate-800 rounded-xl" />
                    <div className="h-4 w-full bg-slate-800 rounded" />
                    <div className="h-4 w-2/3 bg-slate-800 rounded" />
                    <div className="h-10 w-full bg-blue-600 rounded-lg mt-auto opacity-50" />
                  </div>
                </div>
              </div>

              {/* Background Glow behind mockup */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 rounded-full blur-[120px] -z-10" />
            </div>
          </div>

          {/* Quick Stats at bottom of Hero */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 mt-20 border-t border-slate-800/50">
            <div>
              <div className="text-3xl font-black text-white">5,000+</div>
              <div className="text-sm text-slate-500 uppercase tracking-widest font-bold">Active Students</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white">50+</div>
              <div className="text-sm text-slate-500 uppercase tracking-widest font-bold">Expert Teachers</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white">10+</div>
              <div className="text-sm text-slate-500 uppercase tracking-widest font-bold">Island Branches</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white">98%</div>
              <div className="text-sm text-slate-500 uppercase tracking-widest font-bold">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Feature Section - Ecosystem */}
      <section className="py-24 relative overflow-hidden bg-[#020617]">
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
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Our Ecosystem</h2>
            <p className="text-4xl sm:text-5xl font-black tracking-tight">Designed for Excellence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Left Card: Elite Online Learning */}
            <div className="group relative overflow-hidden rounded-[2.5rem] bg-slate-900/40 border border-blue-500/20 p-10 flex flex-col justify-between min-h-[580px] transition-all duration-500 hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(37,99,235,0.1)]">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-[100px] group-hover:bg-blue-600/20 transition-all duration-700" />
              
              <div>
                <div className="w-14 h-14 rounded-2xl bg-blue-900/50 border border-blue-500/30 flex items-center justify-center mb-8 shadow-inner ring-1 ring-blue-400/20">
                  <MonitorIcon className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-3xl font-black mb-6 text-white leading-[1.1]">Elite Online <br /> Learning</h3>
                <p className="text-slate-400 leading-relaxed font-medium">
                  Experience university-grade English education from the comfort of your home. 
                  Live sessions, interactive whiteboards, and real-time feedback.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-white/5">
                <div className="flex -space-x-2.5 mb-5">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-11 h-11 rounded-full border-[3px] border-[#020617] bg-slate-800 overflow-hidden ring-1 ring-white/10">
                      <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900" />
                    </div>
                  ))}
                  <div className="w-11 h-11 rounded-full border-[3px] border-[#020617] bg-blue-600 flex items-center justify-center text-[10px] font-black ring-1 ring-white/10 text-white">
                    +5k
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Trusted by 5k+ students island-wide</p>
              </div>
            </div>

            {/* Right Column Stack */}
            <div className="flex flex-col gap-8">
              {/* Top: Gamified XP System */}
              <div className="flex-1 group relative overflow-hidden rounded-[2.5rem] bg-slate-900/40 border border-indigo-500/10 p-10 transition-all duration-500 hover:border-indigo-400/30">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex items-start justify-between relative z-10 h-full">
                  <div className="space-y-6">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-900/30 border border-indigo-500/20 flex items-center justify-center shadow-inner ring-1 ring-indigo-400/20">
                      <SparklesIcon className="w-7 h-7 text-indigo-400" />
                    </div>
                    <h3 className="text-2xl font-black text-white">Gamified XP System</h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium max-w-xs">
                      Earn badges, climb leaderboards, and unlock rewards as you master English.
                    </p>
                  </div>
                  
                  <div className="relative pt-4 hidden sm:block">
                    <div className="w-28 h-28 rounded-full border border-indigo-500/10 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-indigo-500/5 blur-2xl animate-pulse" />
                      <AwardIcon className="w-10 h-10 text-indigo-400 opacity-20 group-hover:opacity-60 transition-all duration-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="flex gap-8 h-48">
                {/* Global Presence */}
                <div className="flex-1 group relative overflow-hidden rounded-[2.5rem] bg-slate-900/40 border border-sky-500/10 p-8 transition-all duration-500 hover:border-sky-400/30">
                  <div className="w-11 h-11 rounded-xl bg-sky-900/30 border border-sky-500/20 flex items-center justify-center mb-5 ring-1 ring-sky-400/10">
                    <MapPinIcon className="w-5 h-5 text-sky-400" />
                  </div>
                  <h3 className="text-lg font-black text-white mb-2">Global Presence</h3>
                  <p className="text-slate-500 text-xs font-semibold leading-relaxed">Join us at any of our 10+ island-wide branches.</p>
                </div>

                {/* Certified Results */}
                <div className="w-48 group relative overflow-hidden rounded-[2.5rem] bg-blue-600 p-8 flex flex-col justify-center items-center text-center shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_25px_50px_-5px_rgba(37,99,235,0.6)] transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  <div className="relative z-10">
                    <AwardIcon className="w-9 h-9 text-white mb-5 animate-bounce" />
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white leading-tight">Certified <br /> Results</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mentor/Teachers Section */}
      <section className="py-24 bg-[#020617]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <h2 className="text-sm font-black text-amber-500 uppercase tracking-[0.3em]">Our Faculty</h2>
              <p className="text-4xl sm:text-5xl font-black">Learn from the Best.</p>
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

      {/* Branch Locations - Dark Theme */}
      <section className="py-24 bg-slate-950/30 border-y border-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
             <h2 className="text-sm font-black text-blue-500 uppercase tracking-[0.3em]">Island Wide</h2>
            <p className="text-4xl font-black">Find us anywhere.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Colombo Main", addr: "42 Galle Road, Colombo 03", phone: "+94 11 234 5678" },
              { name: "Kandy Center", addr: "15 Peradeniya Road, Kandy", phone: "+94 81 234 5678" },
              { name: "Galle Branch", addr: "78 Main Street, Galle Fort", phone: "+94 91 234 5678" }
            ].map((branch, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-all group">
                <MapPinIcon className="w-8 h-8 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">{branch.name}</h3>
                <p className="text-slate-500 text-sm mb-4">{branch.addr}</p>
                <div className="flex items-center gap-2 text-slate-400 text-sm font-medium mb-6">
                  <PhoneIcon className="w-4 h-4" /> {branch.phone}
                </div>
                <Link to="/map" className="inline-flex items-center gap-2 text-blue-400 font-bold text-sm hover:underline">
                  View Direction <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Matching Style */}
      <section className="py-24 bg-[#020617]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-sm font-black text-purple-500 uppercase tracking-[0.3em]">Testimonials</h2>
            <p className="text-4xl font-black">Success Stories.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Saman Kumara", role: "University Student", text: "Ezy English transformed my confidence in speaking English. The online classes fit perfectly with my university schedule." },
              { name: "Nisha Fernando", role: "Parent", text: "The gamification features keep my daughter motivated. She actually looks forward to her English lessons now!" },
              { name: "Ravindu Perera", role: "Software Engineer", text: "I needed English for my career in IT. The professional English course helped me ace my interviews." }
            ].map((t, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-slate-900 border border-slate-800 relative">
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map(s => <StarIcon key={s} className="w-4 h-4 fill-amber-500 text-amber-500" />)}
                </div>
                <p className="text-slate-400 leading-relaxed mb-8 italic">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center font-black text-blue-400">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold">{t.name}</h4>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Ultra Modern */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-700 p-12 md:p-20 text-center shadow-2xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[60px] group-hover:scale-150 transition-transform duration-1000" />
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Ready to redefine your <br /> English journey?
            </h2>
            <p className="text-xl text-blue-100/80 mb-12 max-w-2xl mx-auto">
              Join 5,000+ students and start learning today with our premium online and physical platforms.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/register">
                <Button size="xl" className="bg-white text-blue-600 hover:bg-blue-50 border-none shadow-xl font-black px-10">
                  Register Now
                </Button>
              </Link>
              <Link to="/classes">
                <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10 px-10">
                  Browse Classes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}