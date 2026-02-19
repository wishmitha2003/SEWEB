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
    subject: 'general',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const update = (field, value) =>
    setForm({
      ...form,
      [field]: value,
    })
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }
  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-blue-700 pt-28 pb-20">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-sky-400/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm text-blue-200 mb-6">
            <MessageSquareIcon className="w-4 h-4" />
            We'd love to hear from you
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
            Get in Touch
          </h1>
          <p className="text-lg text-blue-100/80 max-w-2xl mx-auto">
            Have a question about our classes, need help with enrollment, or
            want to visit a branch? Reach out and we'll get back to you within
            24 hours.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 mb-16">
        <div className="grid sm:grid-cols-3 gap-5">
          <Card className="text-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <MailIcon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Email Us
            </h3>
            <p className="text-sm text-slate-500 mb-2">
              We reply within 24 hours
            </p>
            <a
              href="mailto:info@ezyenglish.lk"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              info@ezyenglish.lk
            </a>
          </Card>

          <Card className="text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <PhoneIcon className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Call Us</h3>
            <p className="text-sm text-slate-500 mb-2">Mon–Sat, 8 AM – 8 PM</p>
            <a
              href="tel:+94112345678"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              +94 11 234 5678
            </a>
          </Card>

          <Card className="text-center">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
              <MapPinIcon className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Visit Us
            </h3>
            <p className="text-sm text-slate-500 mb-2">Main branch, Colombo</p>
            <p className="text-sm font-semibold text-blue-600">
              42 Galle Road, Colombo 03
            </p>
          </Card>
        </div>
      </section>

      {/* Contact Form + Map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <Card>
              <h2 className="text-xl font-extrabold text-slate-900 mb-1">
                Send Us a Message
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Fill in the form below and we'll get back to you as soon as
                possible.
              </p>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <SendIcon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">
                    Thank you for reaching out. Our team will review your
                    message and respond within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSubmitted(false)
                      setForm({
                        name: '',
                        email: '',
                        phone: '',
                        subject: 'general',
                        message: '',
                      })
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormInput
                      label="Full Name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      required
                    />
                    <FormInput
                      label="Email Address"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormInput
                      label="Phone Number"
                      type="tel"
                      placeholder="+94 7X XXX XXXX"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                    />
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Subject
                      </label>
                      <select
                        value={form.subject}
                        onChange={(e) => update('subject', e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="enrollment">Class Enrollment</option>
                        <option value="payment">Payment & Billing</option>
                        <option value="technical">Technical Support</option>
                        <option value="partnership">Partnership</option>
                        <option value="feedback">Feedback</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      placeholder="How can we help you?"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full sm:w-auto"
                    icon={<SendIcon className="w-4 h-4" />}
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-2 space-y-5">
            <Card>
              <h3 className="text-base font-bold text-slate-900 mb-4">
                Office Hours
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 flex items-center gap-2">
                    <ClockIcon className="w-4 h-4 text-slate-400" /> Monday –
                    Friday
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    8:00 AM – 8:00 PM
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 flex items-center gap-2">
                    <ClockIcon className="w-4 h-4 text-slate-400" /> Saturday
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    9:00 AM – 5:00 PM
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 flex items-center gap-2">
                    <ClockIcon className="w-4 h-4 text-slate-400" /> Sunday
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    Closed
                  </span>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-base font-bold text-slate-900 mb-4">
                Our Branches
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPinIcon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Colombo Main
                    </p>
                    <p className="text-xs text-slate-500">
                      42 Galle Road, Colombo 03
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPinIcon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Kandy
                    </p>
                    <p className="text-xs text-slate-500">
                      15 Peradeniya Road, Kandy
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPinIcon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Galle
                    </p>
                    <p className="text-xs text-slate-500">
                      78 Main Street, Galle Fort
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Map placeholder */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card">
              <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-50 flex flex-col items-center justify-center">
                <MapPinIcon className="w-8 h-8 text-blue-300 mb-2" />
                <p className="text-sm font-medium text-slate-400">
                  Map Preview
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-xs font-bold text-blue-600 uppercase tracking-wider mb-4">
              <HelpCircleIcon className="w-3.5 h-3.5" /> FAQ
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500">
              Can't find what you're looking for? Send us a message above.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden transition-shadow duration-200"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-slate-900 pr-4">
                    {faq.question}
                  </span>
                  {openFaq === idx ? (
                    <ChevronUpIcon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-4 animate-fade-in">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
