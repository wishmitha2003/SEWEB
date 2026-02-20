import React, { useState } from 'react'
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  SendIcon,
  MessageSquareIcon,
  HelpCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon,
  CheckIcon,
} from 'lucide-react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { FormInput } from '../components/ui/FormInput'
const faqs = [
  {
    question: 'How do I enroll in a class?',
    answer:
      'You can enroll by creating an account, browsing our Classes page, and clicking the "Enroll" button on any class. Payment can be made online or at any of our branches.',
  },
  {
    question: 'Do you offer free trial classes?',
    answer:
      'Yes! All new students get a free 7-day trial with access to select online classes. No credit card required to start.',
  },
  {
    question: 'Can I switch between online and physical classes?',
    answer:
      'Absolutely. Our flexible system allows you to attend online sessions or visit any branch. Speak with your teacher or contact support to arrange a switch.',
  },
  {
    question: 'What are the payment options?',
    answer:
      'We accept bank transfers, credit/debit cards, and cash payments at our branches. Monthly and term-based payment plans are available.',
  },
  {
    question: "How do I track my child's progress as a parent?",
    answer:
      "Register as a Parent on our platform. You'll get a dedicated dashboard showing your child's attendance, grades, upcoming classes, and payment status.",
  },
]
export function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const update = (field, value) =>
    setForm({
      ...form,
      [field]: value,
    })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const branches = [
    { name: 'Colombo Main', address: '42 Galle Road, Colombo 03', flag: '🇱🇰' },
    { name: 'Kandy', address: '1/5 Peradeniya Road, Kandy', flag: '🇱🇰' },
    { name: 'Galle', address: '78 Main Street, Galle Fort', flag: '🇱🇰' },
    { name: 'Galle', flag: '🇱🇰' }
  ]

  return (
    <div className="w-full min-h-screen bg-[#f8fbff]">
      <Navbar transparent={false} />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-white rounded-[40px] shadow-2xl shadow-blue-100 overflow-hidden border border-slate-100/50 p-8 sm:p-12 relative">
          {/* Subtle Background Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -mr-32 -mt-32" />
          
          <div className="relative">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between gap-12 mb-12">
              <div className="max-w-xl">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1e293b] mb-4">
                  Get in Touch
                </h1>
                <p className="text-lg font-semibold text-slate-800 mb-4">
                  We'd love to hear from you!
                </p>
                <p className="text-slate-500 leading-relaxed text-sm lg:text-base">
                  If you have any questions or just want to say hi,
                  please use the contact form to reach out to us.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                    <MailIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Contact Information</h4>
                    <a href="mailto:info@ezyenglish.lk" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">info@ezyenglish.lk</a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                    <PhoneIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <a href="tel:+94112345678" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">+94 11 234 5678</a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                    <MapPinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">42 Gale Road, Colombo 03</h4>
                    <p className="text-xs text-slate-400">Colombo Main Branch</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Content Grid */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              
              {/* Left Column: Form */}
              <div className="bg-[#fcfdff] rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">Full Name</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <UserIcon className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        placeholder="Full name"
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2">Email Address</label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                          <MailIcon className="w-5 h-5" />
                        </div>
                        <input
                          type="email"
                          placeholder="Email address"
                          value={form.email}
                          onChange={(e) => update('email', e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2">Phone Number</label>
                      <div className="relative">
                        <input
                          type="tel"
                          placeholder="+94 77 XXX XXXX"
                          value={form.phone}
                          onChange={(e) => update('phone', e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <ChevronDownIcon className="w-4 h-4 text-slate-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">Message</label>
                    <textarea
                      rows={4}
                      placeholder="How can we help you?"
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400 resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
                  >
                    <SendIcon className="w-5 h-5 rotate-45" />
                    Send Message
                  </button>
                </form>
              </div>

              {/* Right Column: Hours, Map, Branches */}
              <div className="bg-[#fcfdff] rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="text-base font-bold text-slate-900 mb-4">Office Hours</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3 text-slate-600">
                        <ClockIcon className="w-4 h-4 text-blue-500" />
                        Monday - Friday
                      </div>
                      <span className="font-bold text-slate-800">8:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3 text-slate-600">
                        <ClockIcon className="w-4 h-4 text-blue-500" />
                        Saturday
                      </div>
                      <span className="font-bold text-slate-800">9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3 text-slate-600">
                        <ClockIcon className="w-4 h-4 text-blue-500" />
                        Sunday
                      </div>
                      <span className="font-bold text-slate-400 underline decoration-slate-200 underline-offset-4 decoration-2">Closed</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-h-[180px] rounded-2xl overflow-hidden mb-6 shadow-card border border-slate-100">
                  <iframe
                    title="Colombo Main Branch Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.8988647713437!2d79.8517243!3d6.9027002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259410940428d%3A0x6b77209930fca683!2s42%20Galle%20Rd%2C%20Colombo%2003!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
                    className="w-full h-full grayscale-[0.2] contrast-[1.1]"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Our Branches</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                    <div className="flex items-start gap-2">
                       <span className="text-lg">🇱🇰</span>
                       <div>
                         <p className="text-xs font-bold text-slate-800">Colombo Main</p>
                         <p className="text-[10px] text-slate-500">42 Galle Road, Colombo 03</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-2">
                       <span className="text-lg">🇱🇰</span>
                       <div>
                         <p className="text-xs font-bold text-slate-800">Kandy</p>
                         <p className="text-[10px] text-slate-500">1/5 Peradeniya Road, Kandy</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-2">
                       <span className="text-lg">🇱🇰</span>
                       <div>
                         <p className="text-xs font-bold text-slate-800">Galle Branch A</p>
                         <p className="text-[10px] text-slate-500">78 Main Street, Galle Fort</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-2">
                       <span className="text-lg">🇱🇰</span>
                       <div>
                         <p className="text-xs font-bold text-slate-800">Galle Branch B</p>
                         <p className="text-[10px] text-slate-500">Matara Road, Galle</p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {submitted && (
        <div className="fixed bottom-8 right-8 bg-emerald-500 text-white px-6 py-4 rounded-2xl shadow-2xl animate-bounce-in flex items-center gap-3 z-50">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <CheckIcon className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold">Message Sent!</p>
            <p className="text-xs opacity-90">We'll get back to you soon.</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

