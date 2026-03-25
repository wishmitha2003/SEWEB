import React from 'react';
import {
  ZapIcon,
  TrophyIcon,
  StarIcon,
  FlameIcon,
  TargetIcon,
  AwardIcon,
  CheckCircleIcon,
  LockIcon } from
'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Table } from '../components/ui/Table';
import { studentSidebarItems } from '../config/studentSidebarItems.jsx';

const leaderboardData = [
{
  rank: 1,
  name: 'Kasun Silva',
  xp: 4200,
  level: 'Platinum',
  badges: 12
},
{
  rank: 2,
  name: 'Amaya Perera',
  xp: 3850,
  level: 'Platinum',
  badges: 10
},
{
  rank: 3,
  name: 'Dinesh Kumar',
  xp: 3600,
  level: 'Gold',
  badges: 9
},
{
  rank: 4,
  name: 'Sachini Fernando',
  xp: 3200,
  level: 'Gold',
  badges: 8
},
{
  rank: 5,
  name: 'Ruwan Jayawardena',
  xp: 2900,
  level: 'Gold',
  badges: 7
},
{
  rank: 6,
  name: 'Nimali Dias',
  xp: 2700,
  level: 'Silver',
  badges: 6
},
{
  rank: 7,
  name: 'Tharindu Perera',
  xp: 2450,
  level: 'Silver',
  badges: 5
},
{
  rank: 8,
  name: 'Ishara Silva',
  xp: 2200,
  level: 'Silver',
  badges: 5
},
{
  rank: 9,
  name: 'Chaminda Raj',
  xp: 2000,
  level: 'Bronze',
  badges: 4
},
{
  rank: 10,
  name: 'Malini Fernando',
  xp: 1800,
  level: 'Bronze',
  badges: 3
}];

const leaderboardColumns = [
{
  key: 'rank',
  header: 'Rank',
  render: (val) => {
    if (val === 1)
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-100 text-amber-600 font-bold text-xs">
            🥇
          </span>);

    if (val === 2)
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-600 font-bold text-xs">
            🥈
          </span>);

    if (val === 3)
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-50 text-amber-700 font-bold text-xs">
            🥉
          </span>);

    return (
      <span className="text-sm font-semibold text-slate-500 pl-2">
          #{val}
        </span>);

  }
},
{
  key: 'name',
  header: 'Student',
  render: (val, row) =>
  <span
    className={`font-semibold ${row.rank <= 3 ? 'text-slate-900' : 'text-slate-700'}`}>

        {val}
      </span>

},
{
  key: 'xp',
  header: 'XP Points',
  render: (val) =>
  <span className="font-bold text-blue-600">{val.toLocaleString()}</span>

},
{
  key: 'level',
  header: 'Level',
  render: (val) => {
    const v =
    val === 'Platinum' ?
    'info' :
    val === 'Gold' ?
    'warning' :
    val === 'Silver' ?
    'info' :
    'success';
    return <Badge variant={v}>{val}</Badge>;
  }
},
{
  key: 'badges',
  header: 'Badges',
  render: (val) =>
  <span className="flex items-center gap-1">
        <AwardIcon className="w-3.5 h-3.5 text-amber-500" /> {val}
      </span>

}];

export function GamificationPage() {
  return (
    <DashboardLayout
      sidebarItems={studentSidebarItems}
      userName="Kasun Silva"
      userRole="Student">

      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Gamification</h1>
        <p className="text-slate-500 mt-1">
          Track your XP, level up, and compete with other learners!
        </p>
      </div>

      {/* XP Progress */}
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">XP Progress</h2>
            <p className="text-sm text-slate-500">
              550 XP more to reach Platinum level
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ZapIcon className="w-5 h-5 text-amber-500" />
            <span className="text-2xl font-extrabold text-slate-900">
              2,450
            </span>
            <span className="text-sm text-slate-500">/ 3,000 XP</span>
          </div>
        </div>
        <ProgressBar
          value={2450}
          max={3000}
          size="lg"
          color="bg-gradient-to-r from-blue-500 to-blue-600"
          showPercentage />

      </Card>

      {/* Level Badge + Achievements */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Current Level */}
        <Card className="text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-200">
            <TrophyIcon className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 mb-1">
            Gold Level
          </h3>
          <p className="text-sm text-slate-500 mb-4">
            Current Achievement Level
          </p>
          <div className="p-3 rounded-xl bg-slate-50 text-center">
            <p className="text-xs text-slate-500">Next Level</p>
            <p className="text-sm font-bold text-blue-600">
              Platinum — 3,000 XP
            </p>
          </div>
        </Card>

        {/* Achievements */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            Achievements
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-center">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-2">
                <CheckCircleIcon className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-xs font-bold text-slate-900">First Login</p>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Welcome aboard!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 text-center">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-2">
                <FlameIcon className="w-5 h-5 text-amber-600" />
              </div>
              <p className="text-xs font-bold text-slate-900">7-Day Streak</p>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Consistent learner
              </p>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                <TargetIcon className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-xs font-bold text-slate-900">Quiz Master</p>
              <p className="text-[10px] text-slate-500 mt-0.5">
                10 quizzes aced
              </p>
            </div>

            <div className="p-4 rounded-xl bg-purple-50 border border-purple-100 text-center">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-2">
                <TrophyIcon className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-xs font-bold text-slate-900">Top 10</p>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Leaderboard rank
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center opacity-50">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-2">
                <LockIcon className="w-5 h-5 text-slate-400" />
              </div>
              <p className="text-xs font-bold text-slate-500">Perfect Score</p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Score 100% on a test
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center opacity-50">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-2">
                <LockIcon className="w-5 h-5 text-slate-400" />
              </div>
              <p className="text-xs font-bold text-slate-500">
                Course Complete
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Finish a full course
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <Card>
        <h2 className="text-lg font-bold text-slate-900 mb-5">Leaderboard</h2>
        <Table columns={leaderboardColumns} data={leaderboardData} />
      </Card>
    </DashboardLayout>);

}