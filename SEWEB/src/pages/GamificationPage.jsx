import React from 'react';
import {
  ZapIcon,
  TrophyIcon,
  StarIcon,
  FlameIcon,
  TargetIcon,
  AwardIcon,
  CheckCircleIcon,
  LockIcon,
  TrendingUpIcon,
  SwordsIcon,
  ChevronRightIcon,
  MedalIcon
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Table } from '../components/ui/Table';
import { studentSidebarItems } from '../config/studentSidebarItems.jsx';

const leaderboardData = [
  { rank: 1, name: 'Kasun Silva', xp: 4200, level: 'Platinum', badges: 12, isCurrentUser: true },
  { rank: 2, name: 'Amaya Perera', xp: 3850, level: 'Platinum', badges: 10, isCurrentUser: false },
  { rank: 3, name: 'Dinesh Kumar', xp: 3600, level: 'Gold', badges: 9, isCurrentUser: false },
  { rank: 4, name: 'Sachini Fernando', xp: 3200, level: 'Gold', badges: 8, isCurrentUser: false },
  { rank: 5, name: 'Ruwan Jayawardena', xp: 2900, level: 'Gold', badges: 7, isCurrentUser: false },
  { rank: 6, name: 'Nimali Dias', xp: 2700, level: 'Silver', badges: 6, isCurrentUser: false },
  { rank: 7, name: 'Tharindu Perera', xp: 2450, level: 'Silver', badges: 5, isCurrentUser: false },
  { rank: 8, name: 'Ishara Silva', xp: 2200, level: 'Silver', badges: 5, isCurrentUser: false },
  { rank: 9, name: 'Chaminda Raj', xp: 2000, level: 'Bronze', badges: 4, isCurrentUser: false },
  { rank: 10, name: 'Malini Fernando', xp: 1800, level: 'Bronze', badges: 3, isCurrentUser: false },
];

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

const avatarColors = [
  'bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-emerald-500', 'bg-amber-500'
];

const leaderboardColumns = [
  {
    key: 'rank',
    header: 'Rank',
    render: (val) => {
      const rankStyles = {
        1: 'bg-amber-400 text-white border-amber-500 shadow-amber-200',
        2: 'bg-slate-400 text-white border-slate-500 shadow-slate-200',
        3: 'bg-amber-700 text-white border-amber-800 shadow-amber-300'
      };
      
      if (val <= 3) {
        return (
          <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${rankStyles[val]} font-black text-xs shadow-md`}>
            {val === 1 ? '🥇' : val === 2 ? '🥈' : '🥉'}
          </div>
        );
      }

      return <span className="text-sm font-bold text-slate-400 pl-2">#{val}</span>;
    }
  },
  {
    key: 'name',
    header: 'Student',
    render: (val, row) => (
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full ${avatarColors[row.rank % avatarColors.length]} flex items-center justify-center text-[10px] font-bold text-white shadow-sm ring-2 ring-white`}>
          {getInitials(val)}
        </div>
        <div className="flex flex-col">
          <span className={`text-sm font-bold ${row.isCurrentUser ? 'text-blue-600' : 'text-slate-900'}`}>{val}</span>
          {row.isCurrentUser && <span className="text-[10px] font-bold text-blue-400 uppercase tracking-tighter">You</span>}
        </div>
      </div>
    )
  },
  {
    key: 'xp',
    header: 'Experience',
    render: (val) => (
      <div className="flex items-center gap-1.5">
        <ZapIcon className="w-3 h-3 text-amber-500 fill-amber-500" />
        <span className="font-extrabold text-slate-900 text-sm">{val.toLocaleString()}</span>
      </div>
    )
  },
  {
    key: 'level',
    header: 'Status',
    render: (val) => {
      const type = val === 'Platinum' ? 'info' : val === 'Gold' ? 'warning' : 'success';
      return <Badge variant={type} className="font-bold text-[10px] uppercase tracking-wider">{val}</Badge>;
    }
  },
  {
    key: 'badges',
    header: 'Awards',
    render: (val) => (
      <div className="flex items-center gap-1 text-slate-600 font-bold text-sm">
        <AwardIcon className="w-3.5 h-3.5 text-amber-500" /> {val}
      </div>
    )
  }
];

export function GamificationPage() {
  return (
    <DashboardLayout sidebarItems={studentSidebarItems}>
      <div className="relative overflow-hidden mb-8 p-8 rounded-3xl bg-slate-900 text-white shadow-2xl">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-600 opacity-20 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-purple-600 opacity-20 blur-[80px] rounded-full"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2">Challenge Zone</h1>
            <p className="text-slate-400 max-w-md text-lg font-medium leading-tight">
              Fuel your competitive spirit. Level up, earn badges, and dominate the leaderboard!
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-4 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <FlameIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-black">7 Days</p>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Current Streak</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-4 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <MedalIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-black">#1</p>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">World Rank</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Main Stats Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* XP Progress Card */}
          <Card className="p-8 border-none shadow-xl bg-gradient-to-br from-white to-blue-50">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-1">XP Mastery</h2>
                <div className="flex items-center gap-2">
                  <Badge variant="info" className="bg-blue-100 text-blue-700 font-bold border-blue-200">GOLD TIER</Badge>
                  <span className="text-sm font-bold text-slate-400 italic">550 XP to Platinum</span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-2 mb-1">
                  <ZapIcon className="w-6 h-6 text-amber-500 fill-amber-500" />
                  <span className="text-4xl font-black text-slate-900">2,450</span>
                </div>
                <p className="text-sm font-bold text-slate-400">TOTAL LIFETIME POINTS</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-black text-slate-400 uppercase tracking-widest">
                <span>Gold (2,000 XP)</span>
                <span>Platinum (3,000 XP)</span>
              </div>
              <ProgressBar value={2450 - 2000} max={1000} size="lg" color="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
              <div className="flex justify-between items-center bg-slate-100/50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <TrendingUpIcon className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">Earnings this week</span>
                </div>
                <span className="font-black text-emerald-600">+320 XP</span>
              </div>
            </div>
          </Card>

          {/* Daily Missions */}
          <Card className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-slate-900">Daily Missions</h2>
              <span className="text-sm font-bold text-blue-600 cursor-pointer flex items-center gap-1 hover:underline">
                View All <ChevronRightIcon className="w-4 h-4" />
              </span>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Vocab Master', task: 'Learn 10 new words today', reward: '50 XP', progress: 80, color: 'bg-blue-500' },
                { title: 'Streak Keeper', task: 'Complete one lesson', reward: '30 XP', progress: 100, color: 'bg-emerald-500' },
                { title: 'Grammar Guru', task: 'Pass a Grammar quiz with 90%+', reward: '100 XP', progress: 0, color: 'bg-purple-500' },
              ].map((m, i) => (
                <div key={i} className="group p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-lg hover:border-blue-100 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl ${m.color} flex items-center justify-center text-white shadow-lg shadow-${m.color.split('-')[1]}-500/20 group-hover:scale-110 transition-transform`}>
                        {i === 0 ? <StarIcon className="w-6 h-6" /> : i === 1 ? <FlameIcon className="w-6 h-6" /> : <TargetIcon className="w-6 h-6" />}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 leading-tight">{m.title}</h4>
                        <p className="text-xs font-bold text-slate-400">{m.task}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-blue-600 uppercase mb-1">+{m.reward}</p>
                      {m.progress === 100 ? (
                        <Badge variant="success" className="rounded-full px-3 text-[10px]">CLAIMED</Badge>
                      ) : (
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m.progress}% DONE</span>
                      )}
                    </div>
                  </div>
                  {m.progress < 100 && (
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-2">
                      <div className={`h-full ${m.color} transition-all duration-700`} style={{ width: `${m.progress}%` }}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Level & Achievements Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Level Visualizer */}
          <Card className="p-8 text-center bg-gradient-to-b from-amber-400 to-amber-600 text-white border-none shadow-2xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/20 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center mx-auto mb-6 shadow-2xl transform group-hover:rotate-12 transition-transform">
                <TrophyIcon className="w-12 h-12 text-white fill-white/20" />
              </div>
              <p className="text-xs font-black text-amber-100 uppercase tracking-[0.2em] mb-1">Current Level</p>
              <h3 className="text-4xl font-black mb-2">GOLD</h3>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/20 rounded-full backdrop-blur-sm mt-4">
                <TrendingUpIcon className="w-4 h-4" />
                <span className="text-sm font-black">TOP 3% WORLDWIDE</span>
              </div>
            </div>
          </Card>

          {/* Achievement Badges */}
          <Card className="p-8">
            <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-2">
              Badges <Badge className="rounded-full px-2 bg-slate-100 text-slate-600 font-black">12</Badge>
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: <CheckCircleIcon />, color: 'bg-emerald-500', name: 'Elite' },
                { icon: <FlameIcon />, color: 'bg-amber-500', name: 'Streak' },
                { icon: <TargetIcon />, color: 'bg-blue-500', name: 'Sniper' },
                { icon: <MedalIcon />, color: 'bg-indigo-500', name: 'MVP' },
                { icon: <TrophyIcon />, color: 'bg-purple-500', name: 'King' },
                { icon: <StarIcon />, color: 'bg-pink-500', name: 'Star' },
                { icon: <LockIcon />, color: 'bg-slate-300', name: 'Locked', locked: true },
                { icon: <LockIcon />, color: 'bg-slate-300', name: 'Locked', locked: true },
                { icon: <LockIcon />, color: 'bg-slate-300', name: 'Locked', locked: true },
              ].map((b, i) => (
                <div key={i} className="group relative flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-2xl ${b.color} flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer ${b.locked ? 'opacity-40 grayscale shadow-none' : 'shadow-indigo-500/20'}`}>
                    {React.cloneElement(b.icon, { className: "w-7 h-7" })}
                  </div>
                  <span className={`text-[9px] font-black uppercase mt-2 tracking-tighter ${b.locked ? 'text-slate-300' : 'text-slate-400 group-hover:text-slate-900'} transition-colors`}>{b.name}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-4 bg-slate-900 text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-slate-800 transition-colors shadow-xl">
              <SwordsIcon className="w-5 h-5" /> START ENGLISH BATTLE
            </button>
          </Card>
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="mt-8">
        <Card className="p-0 overflow-hidden border-none shadow-2xl">
          <div className="p-8 bg-white border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-1">Weekly Champions</h2>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <TrophyIcon className="w-4 h-4 text-amber-500" /> Season ends in 2d 14h
              </p>
            </div>
            <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl">
              <button className="px-5 py-2.5 bg-white text-slate-900 font-black rounded-xl shadow-sm text-sm">GLOBAL</button>
              <button className="px-5 py-2.5 text-slate-400 font-bold rounded-xl text-sm hover:text-slate-600 transition-colors">FRIENDS</button>
            </div>
          </div>
          <div className="p-4 sm:p-8">
            <Table columns={leaderboardColumns} data={leaderboardData} />
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}