import React, { useState } from 'react';
import { MapPinIcon, PhoneIcon, NavigationIcon, ClockIcon, ChevronDownIcon } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { FooterBar } from '../components/layout/FooterBar';

import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

// Branch data with real coordinates
const BRANCHES = [
  {
    id: 1,
    name: 'Colombo Main Branch',
    address: '42 Galle Road, Colombo 03',
    phone: '+94 11 234 5678',
    hours: 'Mon-Sat: 8AM - 8PM',
    lat: 6.9271,
    lng: 79.8612,
    isMain: true,
  },
  {
    id: 2,
    name: 'Kandy Branch',
    address: '15 Peradeniya Road, Kandy',
    phone: '+94 81 234 5678',
    hours: 'Mon-Sat: 9AM - 7PM',
    lat: 7.2906,
    lng: 80.6337,
  },
  {
    id: 3,
    name: 'Galle Branch',
    address: '78 Main Street, Galle Fort',
    phone: '+94 91 234 5678',
    hours: 'Mon-Sat: 9AM - 6PM',
    lat: 6.0535,
    lng: 80.2210,
  },
  {
    id: 4,
    name: 'Jaffna Branch',
    address: '12 Hospital Road, Jaffna',
    phone: '+94 21 234 5678',
    hours: 'Mon-Fri: 9AM - 5PM',
    lat: 9.6615,
    lng: 80.0255,
  },
  {
    id: 5,
    name: 'Matara Branch',
    address: '56 Beach Road, Matara',
    phone: '+94 41 234 5678',
    hours: 'Mon-Sat: 9AM - 6PM',
    lat: 5.9549,
    lng: 80.5550,
  },
  {
    id: 6,
    name: 'Kurunegala Branch',
    address: '23 Colombo Road, Kurunegala',
    phone: '+94 37 234 5678',
    hours: 'Mon-Sat: 9AM - 7PM',
    lat: 7.4863,
    lng: 80.3623,
  },
  {
    id: 7,
    name: 'Negombo Branch',
    address: '88 Lewis Place, Negombo',
    phone: '+94 31 234 5678',
    hours: 'Mon-Sat: 8AM - 7PM',
    lat: 7.2008,
    lng: 79.8737,
  },
];

function getMapUrl(branch) {
  return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15000!2d${branch.lng}!3d${branch.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk`;
}

function getDirectionsUrl(branch) {
  return `https://www.google.com/maps/dir/?api=1&destination=${branch.lat},${branch.lng}`;
}

export function MapSection() {
  const [activeBranch, setActiveBranch] = useState(BRANCHES[0]);

  return (
    <div className="w-full min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
            Our Branches
          </h1>
          <p className="text-slate-500">
            Find the nearest Ezy English branch across Sri Lanka.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Google Maps Embed */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card">
              <div className="h-[500px] relative">
                <iframe
                  key={activeBranch.id}
                  title={`Map - ${activeBranch.name}`}
                  src={getMapUrl(activeBranch)}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>

            {/* Branch pills under map */}
            <div className="flex flex-wrap gap-2 mt-4">
              {BRANCHES.map((branch) => (
                <button
                  key={branch.id}
                  onClick={() => setActiveBranch(branch)}
                  className={`
                    flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
                    transition-all duration-200 border
                    ${activeBranch.id === branch.id
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'
                    }
                  `}
                >
                  <MapPinIcon className="w-3 h-3" />
                  {branch.name.replace(' Branch', '')}
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar - branch list */}
          <div>
            {/* Active branch detail */}
            <Card className="mb-6 border-2 border-blue-100 bg-blue-50/30">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <NavigationIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-bold text-blue-600">
                  {activeBranch.isMain ? 'Main Branch' : 'Selected Branch'}
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                {activeBranch.name}
              </h3>
              <p className="text-sm text-slate-500 mb-1">
                {activeBranch.address}
              </p>
              <div className="space-y-2 mb-5 mt-3">
                <p className="text-sm text-slate-600 flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4 text-slate-400" /> {activeBranch.phone}
                </p>
                <p className="text-sm text-slate-600 flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-slate-400" /> {activeBranch.hours}
                </p>
              </div>
              <a
                href={getDirectionsUrl(activeBranch)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md"
              >
                <NavigationIcon className="w-4 h-4" />
                Get Directions
              </a>
            </Card>

            <div className="relative">
              <label className="text-sm font-bold text-slate-900 mb-2 block">
                All Branches ({BRANCHES.length})
              </label>
              <div className="relative">
                <select
                  value={activeBranch.id}
                  onChange={(e) => {
                    const branch = BRANCHES.find((b) => b.id === Number(e.target.value));
                    if (branch) setActiveBranch(branch);
                  }}
                  className="w-full appearance-none px-4 py-3 pl-10 pr-10 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800 cursor-pointer hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                >
                  {[...BRANCHES]
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((branch) => (
                      <option key={branch.id} value={branch.id}>
                        {branch.name} — {branch.address}
                      </option>
                    ))}
                </select>
                <MapPinIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 pointer-events-none" />
                <ChevronDownIcon className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterBar />
    </div>
  );
}