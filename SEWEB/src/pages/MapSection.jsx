import React, { useState, useEffect } from 'react';
import { MapPinIcon, PhoneIcon, NavigationIcon, ClockIcon, ChevronDownIcon } from 'lucide-react';
import { FooterBar } from '../components/layout/FooterBar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { getBranches } from '../services/branchService';

/**
 * Converts a standard Google Maps URL into an embeddable format.
 * This handles URLs like /place/..., /@lat,lng..., and search queries.
 */
function getMapUrl(branch) {
  if (!branch) return '';

  const url = branch.locationUrl || '';
  
  // 1. If it's already an embed URL (contains /embed), use it directly
  if (url.includes('/embed')) {
      return url;
  }

  // 2. Try to extract coordinates from the URL (look for @lat,lng or q=lat,lng)
  // Format: ...@6.9271,79.8612...
  const coordMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (coordMatch) {
    const [_, lat, lng] = coordMatch;
    return `https://maps.google.com/maps?q=${lat},${lng}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  }

  // 3. Try to extract from place path
  // Format: .../place/Name+Of+Place/...
  const placeMatch = url.match(/\/place\/([^\/]+)/);
  if (placeMatch) {
    const placeName = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
    return `https://maps.google.com/maps?q=${encodeURIComponent(placeName)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  }

  // 4. If we have explicit lat/lng fields from the dashboard, use them
  if (branch.lat && branch.lng) {
    return `https://maps.google.com/maps?q=${branch.lat},${branch.lng}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  }

  // 5. Final fallback: Use the branch address
  return `https://maps.google.com/maps?q=${encodeURIComponent(branch.address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
}

function getDirectionsUrl(branch) {
  if (!branch) return '#';
  // Use the specific locationUrl if provided
  if (branch.locationUrl && branch.locationUrl.startsWith('http')) {
    return branch.locationUrl;
  }
  // Fallback to coordinates
  if (branch.lat && branch.lng) {
      return `https://www.google.com/maps/dir/?api=1&destination=${branch.lat},${branch.lng}`;
  }
  // Ultimate fallback to address
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(branch.address)}`;
}

export function MapSection() {
  const [branches, setBranches] = useState([]);
  const [activeBranch, setActiveBranch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBranches() {
      try {
        setLoading(true);
        const data = await getBranches();
        const branchList = Array.isArray(data) ? data : (data?.data || []);
        setBranches(branchList);
        if (branchList.length > 0) {
          setActiveBranch(branchList[0]);
        }
      } catch (err) {
        console.error('Failed to fetch branches:', err);
        setError('Could not load branch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchBranches();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-medium">Loading map locations...</p>
        </div>
      </div>
    );
  }

  if (error || !activeBranch) {
    return (
      <div className="w-full min-h-[calc(100vh-64px)] bg-slate-50 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <Card className="max-w-md text-center p-8">
            <MapPinIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">No Branches Found</h2>
            <p className="text-slate-500 mb-6">
              {error || "We haven't added any branch locations yet. Please check back later!"}
            </p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </Card>
        </div>
        <FooterBar />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col">
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
            Our Branches
          </h1>
          <p className="text-slate-500">
            Find the nearest Ezy English branch across Sri Lanka.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map View */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-card h-[500px] relative bg-slate-100">
              <iframe
                key={activeBranch.id || activeBranch._id}
                title={`Map - ${activeBranch.name}`}
                src={getMapUrl(activeBranch)}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Quick Select Tabs */}
            <div className="flex flex-wrap gap-2 mt-4">
              {branches.map((branch) => (
                <button
                  key={branch.id || branch._id}
                  onClick={() => setActiveBranch(branch)}
                  className={`
                    flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
                    transition-all duration-200 border
                    ${(activeBranch.id || activeBranch._id) === (branch.id || branch._id)
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'
                    }
                  `}
                >
                  <MapPinIcon className="w-3 h-3" />
                  {branch.name}
                </button>
              ))}
            </div>
          </div>

          {/* Branch Details */}
          <div className="space-y-6">
            <Card className="border-2 border-blue-100 bg-blue-50/30">
              <div className="flex items-center gap-3 mb-4">
                {activeBranch.logoUrl ? (
                   <img 
                    src={`http://localhost:8082${activeBranch.logoUrl}`} 
                    alt={activeBranch.name} 
                    className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-sm"
                   />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center border-2 border-white shadow-sm">
                    <NavigationIcon className="w-6 h-6 text-white" />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">
                    {activeBranch.name}
                  </h3>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    {activeBranch.isMain ? 'Main Branch' : 'Active Location'}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Address</p>
                  <p className="text-sm text-slate-700 font-medium">{activeBranch.address}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Phone</p>
                    <p className="text-sm text-slate-700 font-medium flex items-center gap-1.5">
                      <PhoneIcon className="w-3.5 h-3.5 text-blue-500" /> {activeBranch.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Hours</p>
                    <p className="text-sm text-slate-700 font-medium flex items-center gap-1.5">
                      <ClockIcon className="w-3.5 h-3.5 text-blue-500" /> {activeBranch.hours || '8AM - 8PM'}
                    </p>
                  </div>
                </div>

                {activeBranch.managerName && (
                  <div className="pt-2 border-t border-blue-100">
                    <p className="text-[11px] text-slate-500 italic">
                      Managed by {activeBranch.managerName}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 mt-6">
                <a
                  href={getDirectionsUrl(activeBranch)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                >
                  <NavigationIcon className="w-4 h-4" />
                  Open in Google Maps
                </a>
                {activeBranch.locationUrl && (
                  <p className="text-[10px] text-center text-slate-400">
                    Using custom location from dashboard
                  </p>
                )}
              </div>
            </Card>

            <div className="relative">
              <label className="text-sm font-bold text-slate-900 mb-2 block">
                Quick Jump
              </label>
              <div className="relative">
                <select
                  value={activeBranch.id || activeBranch._id}
                  onChange={(e) => {
                    const branch = branches.find((b) => (b.id || b._id).toString() === e.target.value);
                    if (branch) setActiveBranch(branch);
                  }}
                  className="w-full appearance-none px-4 py-3.5 pl-10 pr-10 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-800 cursor-pointer hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                >
                  {branches.map((branch) => (
                    <option key={branch.id || branch._id} value={branch.id || branch._id}>
                      {branch.name}
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