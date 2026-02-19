import React from 'react';
import { MapPinIcon, PhoneIcon, NavigationIcon, ClockIcon } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
export function MapSection() {
  return (
    <div className="w-full min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
            Our Branches
          </h1>
          <p className="text-slate-500">
            Find the nearest Ezy English branch to you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card">
              <div className="h-[500px] bg-gradient-to-br from-slate-100 to-slate-50 flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <MapPinIcon className="w-10 h-10 text-blue-400" />
                </div>
                <p className="text-lg font-semibold text-slate-400 mb-1">
                  Map Loading...
                </p>
                <p className="text-sm text-slate-300">
                  Interactive map will appear here
                </p>
              </div>
            </div>
          </div>

          {/* Nearest Branch */}
          <div>
            <Card className="mb-6 border-2 border-blue-100 bg-blue-50/30">
              <div className="flex items-center gap-2 mb-4">
                <NavigationIcon className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-bold text-blue-600">
                  Nearest Branch
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                Colombo Main Branch
              </h3>
              <p className="text-sm text-slate-500 mb-1">
                42 Galle Road, Colombo 03
              </p>
              <p className="text-sm text-blue-600 font-semibold mb-4">
                2.3 km away
              </p>
              <div className="space-y-2 mb-5">
                <p className="text-sm text-slate-600 flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4 text-slate-400" /> +94 11 234
                  5678
                </p>
                <p className="text-sm text-slate-600 flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-slate-400" /> Mon-Sat: 8AM
                  - 8PM
                </p>
              </div>
              <Button
                className="w-full"
                icon={<NavigationIcon className="w-4 h-4" />}>

                Get Directions
              </Button>
            </Card>

            <h3 className="text-sm font-bold text-slate-900 mb-3">
              All Branches
            </h3>
            <div className="space-y-3">
              <Card className="!p-4">
                <h4 className="text-sm font-bold text-slate-900 mb-0.5">
                  Colombo Main
                </h4>
                <p className="text-xs text-slate-500 mb-1">
                  42 Galle Road, Colombo 03
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <PhoneIcon className="w-3 h-3" /> +94 11 234 5678
                </p>
              </Card>
              <Card className="!p-4">
                <h4 className="text-sm font-bold text-slate-900 mb-0.5">
                  Kandy Branch
                </h4>
                <p className="text-xs text-slate-500 mb-1">
                  15 Peradeniya Road, Kandy
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <PhoneIcon className="w-3 h-3" /> +94 81 234 5678
                </p>
              </Card>
              <Card className="!p-4">
                <h4 className="text-sm font-bold text-slate-900 mb-0.5">
                  Galle Branch
                </h4>
                <p className="text-xs text-slate-500 mb-1">
                  78 Main Street, Galle Fort
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <PhoneIcon className="w-3 h-3" /> +94 91 234 5678
                </p>
              </Card>
              <Card className="!p-4">
                <h4 className="text-sm font-bold text-slate-900 mb-0.5">
                  Jaffna Branch
                </h4>
                <p className="text-xs text-slate-500 mb-1">
                  12 Hospital Road, Jaffna
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <PhoneIcon className="w-3 h-3" /> +94 21 234 5678
                </p>
              </Card>
              <Card className="!p-4">
                <h4 className="text-sm font-bold text-slate-900 mb-0.5">
                  Matara Branch
                </h4>
                <p className="text-xs text-slate-500 mb-1">
                  56 Beach Road, Matara
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <PhoneIcon className="w-3 h-3" /> +94 41 234 5678
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>);

}