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
    <div className="w-full min-h-screen bg-white">
      <Navbar transparent />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-blue-700 min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-400/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm text-blue-200 mb-6">
                <SparklesIcon className="w-4 h-4" />
                Sri Lanka's #1 English Learning Platform
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                Master English
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-300">
                  with Ezy English
                </span>
              </h1>
              <p className="text-lg text-blue-100/80 max-w-lg mb-8 leading-relaxed">
                Join thousands of students across Sri Lanka learning English
                through our interactive online and physical classes. From school
                students to working professionals.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register">
                  <Button
                    size="lg"
                    className="bg-white !text-blue-700 hover:bg-blue-50 shadow-lg shadow-blue-900/30">

                    Get Started Free
                    <ArrowRightIcon className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
                <Link to="/classes">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10">

                    <PlayCircleIcon className="w-4 h-4" />
                    Explore Classes
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-10 pt-8 border-t border-white/10">
                <div>
                  <p className="text-2xl font-bold text-white">5,000+</p>
                  <p className="text-sm text-blue-200/70">Active Students</p>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div>
                  <p className="text-2xl font-bold text-white">50+</p>
                  <p className="text-sm text-blue-200/70">Expert Teachers</p>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div>
                  <p className="text-2xl font-bold text-white">98%</p>
                  <p className="text-sm text-blue-200/70">Satisfaction</p>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex justify-center animate-slide-up">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-sky-400/30 rounded-3xl blur-2xl" />
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 bg-white/10 rounded-2xl p-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                        <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          Grammar Basics
                        </p>
                        <p className="text-xs text-blue-200/70">
                          Completed • 100%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 rounded-2xl p-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                        <BookOpenIcon className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          Speaking Practice
                        </p>
                        <p className="text-xs text-blue-200/70">
                          In Progress • 65%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 rounded-2xl p-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                        <AwardIcon className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          Gold Level Achieved!
                        </p>
                        <p className="text-xs text-blue-200/70">
                          2,450 XP earned
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 rounded-2xl p-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                        <GlobeIcon className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          IELTS Preparation
                        </p>
                        <p className="text-xs text-blue-200/70">
                          Starting Soon
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">
                About Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-6 leading-tight">
                Empowering Sri Lanka Through English Education
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Founded in 2018, Ezy English has grown to become one of Sri
                Lanka's most trusted English learning platforms. We combine the
                best of online and physical learning to deliver results that
                matter.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Our expert teachers use proven methodologies to help school
                students, university students, and working professionals achieve
                their English language goals — from basic communication to IELTS
                preparation.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-2xl p-5 text-center">
                  <p className="text-3xl font-extrabold text-blue-600">
                    5,000+
                  </p>
                  <p className="text-sm text-slate-600 mt-1">Students</p>
                </div>
                <div className="bg-blue-50 rounded-2xl p-5 text-center">
                  <p className="text-3xl font-extrabold text-blue-600">50+</p>
                  <p className="text-sm text-slate-600 mt-1">Teachers</p>
                </div>
                <div className="bg-blue-50 rounded-2xl p-5 text-center">
                  <p className="text-3xl font-extrabold text-blue-600">10+</p>
                  <p className="text-sm text-slate-600 mt-1">Branches</p>
                </div>
                <div className="bg-blue-50 rounded-2xl p-5 text-center">
                  <p className="text-3xl font-extrabold text-blue-600">98%</p>
                  <p className="text-sm text-slate-600 mt-1">Satisfaction</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-sky-50 rounded-3xl aspect-[4/3] flex items-center justify-center">
                <div className="text-center">
                  <BookOpenIcon className="w-16 h-16 text-blue-300 mx-auto mb-3" />
                  <p className="text-sm text-blue-400 font-medium">
                    Institute Image
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Certified</p>
                  <p className="text-xs text-slate-500">Ministry Approved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4">
              Everything You Need to Learn English
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and resources
              for effective English learning.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card hover className="group">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-5 group-hover:bg-blue-600 transition-colors duration-300">
                <MonitorIcon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Online Classes
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Live interactive sessions from anywhere. Join classes on your
                schedule with our flexible online platform.
              </p>
            </Card>

            <Card hover className="group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mb-5 group-hover:bg-emerald-600 transition-colors duration-300">
                <BuildingIcon className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Physical Classes
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Visit any of our 10+ branches across Sri Lanka for in-person
                learning with expert instructors.
              </p>
            </Card>

            <Card hover className="group">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center mb-5 group-hover:bg-purple-600 transition-colors duration-300">
                <UsersIcon className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Expert Teachers
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Learn from 50+ qualified and experienced English language
                teachers with proven track records.
              </p>
            </Card>

            <Card hover className="group">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center mb-5 group-hover:bg-amber-600 transition-colors duration-300">
                <GamepadIcon className="w-6 h-6 text-amber-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Gamified Learning
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Earn XP points, unlock achievements, and compete on leaderboards
                while mastering English.
              </p>
            </Card>

            <Card hover className="group">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center mb-5 group-hover:bg-sky-600 transition-colors duration-300">
                <BarChart3Icon className="w-6 h-6 text-sky-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Progress Tracking
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Monitor your learning journey with detailed analytics, charts,
                and performance insights.
              </p>
            </Card>

            <Card hover className="group">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center mb-5 group-hover:bg-rose-600 transition-colors duration-300">
                <AwardIcon className="w-6 h-6 text-rose-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Certificate Programs
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Earn recognized certificates upon completing courses to boost
                your career prospects.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Branch Locations */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">
              Locations
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4">
              Our Branches Across Sri Lanka
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Visit any of our conveniently located branches for in-person
              classes and support.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card hover>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <MapPinIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    Colombo Main Branch
                  </h3>
                  <p className="text-sm text-slate-500 mb-2">
                    42 Galle Road, Colombo 03
                  </p>
                  <p className="text-sm text-slate-500 flex items-center gap-1.5 mb-3">
                    <PhoneIcon className="w-3.5 h-3.5" /> +94 11 234 5678
                  </p>
                  <Link
                    to="/map"
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-1">

                    View on Map <ArrowRightIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </Card>

            <Card hover>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <MapPinIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    Kandy Branch
                  </h3>
                  <p className="text-sm text-slate-500 mb-2">
                    15 Peradeniya Road, Kandy
                  </p>
                  <p className="text-sm text-slate-500 flex items-center gap-1.5 mb-3">
                    <PhoneIcon className="w-3.5 h-3.5" /> +94 81 234 5678
                  </p>
                  <Link
                    to="/map"
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-1">

                    View on Map <ArrowRightIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </Card>

            <Card hover>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <MapPinIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    Galle Branch
                  </h3>
                  <p className="text-sm text-slate-500 mb-2">
                    78 Main Street, Galle Fort
                  </p>
                  <p className="text-sm text-slate-500 flex items-center gap-1.5 mb-3">
                    <PhoneIcon className="w-3.5 h-3.5" /> +94 91 234 5678
                  </p>
                  <Link
                    to="/map"
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-1">

                    View on Map <ArrowRightIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4">
              What Our Students Say
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <div className="flex gap-1 mb-4">
                <StarIcon className="w-4 h-4 fill-amber-400 text-amber-400" />
                <StarIcon className="w-4 h-4 fill-amber-400 text-amber-400" />
                <StarIcon className="w-4 h-4 fill-amber-400 text-amber-400" />
                <StarIcon className="w-4 h-4 fill-amber-400 text-amber-400" />
                <StarIcon className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">
                "Ezy English transformed my confidence in speaking English. The
                online classes fit perfectly with my university schedule. I went
                from barely speaking to presenting in English!"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">SK</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Saman Kumara
                  </p>
                  <p className="text-xs text-slate-500">
                    University Student, Colombo
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex gap-1 mb-4">
                <StarIcon className="w-4 h-4 fill-amber-400 text-amber-400" />
                <StarIcon className="w-4 h-4 fill-amber-400 text-amber-400" />
                <StarIcon className="w-4 h-4 fill-amber-400 text-amber-400" />
                <StarIcon className="w-4 h-4 fill-amber-400 text-amber-400" />
                <StarIcon className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">
                "The gamification features keep my daughter motivated. She
                actually looks forward to her English lessons now! The XP system
                and badges make learning fun for kids."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-sm font-bold text-emerald-600">NF</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Nisha Fernando
                  </p>
                  <p className="text-xs text-slate-500">Parent, Kandy</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex gap-1 mb-4">
                <StarIcon className="w-4 h-4 fill-amber-400 text-amber-400" />
                <StarIcon className="w-4 h-4 fill-amber-400 text-amber-400" />
                <StarIcon className="w-4 h-4 fill-amber-400 text-amber-400" />
                <StarIcon className="w-4 h-4 fill-amber-400 text-amber-400" />
                <StarIcon className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">
                "I needed English for my career in IT. The professional English
                course at Ezy English helped me ace my interviews and
                communicate confidently with international clients."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-sm font-bold text-purple-600">RP</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Ravindu Perera
                  </p>
                  <p className="text-xs text-slate-500">
                    Software Engineer, Galle
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500 py-20 lg:py-28">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            Ready to Start Your English Journey?
          </h2>
          <p className="text-lg text-blue-100/80 max-w-2xl mx-auto mb-10">
            Join 5,000+ students who are already improving their English with
            Ezy English. Start your free trial today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg shadow-blue-900/30">

                Register Now
                <ArrowRightIcon className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to="/classes">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10">

                Browse Classes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>);

}