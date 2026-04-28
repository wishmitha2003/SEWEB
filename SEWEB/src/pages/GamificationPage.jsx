import React, { useState, useEffect } from 'react';
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
  MedalIcon,
  Loader2Icon,
  XIcon,
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Table } from '../components/ui/Table';
import { ShootingGame } from '../components/games/ShootingGame';
import { CrosswordPuzzle } from '../components/games/CrosswordPuzzle';
import { studentSidebarItems } from '../config/studentSidebarItems.jsx';
import missionService from '../services/missionService';
import userService from '../services/userService';
import { getVocabulariesByAgeSection } from '../services/vocabularyService';



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
  const [userData, setUserData] = useState(null);
  const [missions, setMissions] = useState([]);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(null);
  const [activeGame, setActiveGame] = useState(null);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [gameLoading, setGameLoading] = useState(false);
  const [gameError, setGameError] = useState(null);

  const AGE_SECTIONS = ['1-5', '6-10', '11-15', '16-20', '20+'];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [user, dailyMissions, leaderboardUsers] = await Promise.all([
        userService.getCurrentUser(),
        missionService.getDailyMissions(),
        userService.getLeaderboard()
      ]);
      setUserData(user);
      setMissions(dailyMissions);
      
      const formattedLeaderboard = (leaderboardUsers || []).map((lbUser, index) => {
        const xp = lbUser.xp || 0;
        return {
          rank: index + 1,
          name: lbUser.fullName || lbUser.username,
          xp: xp,
          level: xp >= 3000 ? 'Platinum' : xp >= 2000 ? 'Gold' : xp >= 1000 ? 'Silver' : 'Bronze',
          badges: Math.floor(xp / 500) + 1,
          isCurrentUser: lbUser.username === user?.username
        };
      });
      setLeaderboardData(formattedLeaderboard);
    } catch (error) {
      console.error('Error fetching gamification data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = async (missionId) => {
    try {
      setClaiming(missionId);
      await missionService.claimReward(missionId);
      await fetchData();
    } catch (error) {
      console.error('Error claiming reward:', error);
    } finally {
      setClaiming(null);
    }
  };

  const handleAgeGroupSelect = async (ageGroup) => {
    setSelectedAgeGroup(ageGroup);
    setGameLoading(true);
    setGameError(null);
    
    try {
      // Fetch vocabularies for the selected age group
      const vocabularies = await getVocabulariesByAgeSection(ageGroup);
      
      if (!vocabularies || vocabularies.length === 0) {
        setGameError('No words available for this age group');
        setGameData(null);
        setGameLoading(false);
        setSelectedAgeGroup(null);
        return;
      }

      // Ensure we have at least 4 words for the game
      if (vocabularies.length < 4) {
        setGameError(`Not enough words for this age group (${vocabularies.length} words). Minimum 4 required.`);
        setGameData(null);
        setGameLoading(false);
        setSelectedAgeGroup(null);
        return;
      }

      // Transform vocabulary data to game format
      const transformedData = vocabularies.map((vocab) => ({
        english: vocab.word,
        sinhala: vocab.meaning,
        options: [] // Will be populated with random other meanings
      }));

      // For each word, add random other words as options
      const finalGameData = transformedData.map((item, index) => {
        // Get other vocabularies to use as wrong options
        const otherVocabs = vocabularies
          .filter((_, i) => i !== index)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);

        return {
          english: item.english,
          sinhala: item.sinhala,
          options: otherVocabs.map(v => v.meaning)
        };
      });

      setGameData(finalGameData);
    } catch (err) {
      console.error('Error fetching vocabulary data:', err);
      setGameError('Failed to load words. Please try again.');
      setGameData(null);
      setSelectedAgeGroup(null);
    } finally {
      setGameLoading(false);
    }
  };

  const handleBackToAgeSelection = () => {
    setSelectedAgeGroup(null);
    setGameData(null);
    setGameError(null);
  };

  const handleCloseGame = () => {
    setActiveGame(null);
    setSelectedAgeGroup(null);
    setGameData(null);
    setGameError(null);
  };

  if (loading) {
    return (
      <DashboardLayout sidebarItems={studentSidebarItems}>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2Icon className="w-12 h-12 text-blue-500 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  const missionColors = {
    VOCAB: 'bg-blue-500',
    STREAK: 'bg-emerald-500',
    QUIZ: 'bg-purple-500',
    GENERAL: 'bg-slate-500'
  };

  const missionIcons = {
    VOCAB: <StarIcon className="w-6 h-6" />,
    STREAK: <FlameIcon className="w-6 h-6" />,
    QUIZ: <TargetIcon className="w-6 h-6" />,
    GENERAL: <ZapIcon className="w-6 h-6" />
  };

  // Logic to determine level and progress
  const totalXp = userData?.xp || 0;
  const currentTier = totalXp >= 3000 ? 'PLATINUM' : totalXp >= 2000 ? 'GOLD' : totalXp >= 1000 ? 'SILVER' : 'BRONZE';
  const nextTierXp = totalXp >= 3000 ? 5000 : totalXp >= 2000 ? 3000 : totalXp >= 1000 ? 2000 : 1000;
  const tierMinXp = totalXp >= 3000 ? 3000 : totalXp >= 2000 ? 2000 : totalXp >= 1000 ? 1000 : 0;
  const progressValue = totalXp - tierMinXp;
  const progressMax = nextTierXp - tierMinXp;

  return (
    <DashboardLayout sidebarItems={studentSidebarItems}>
      {activeGame ? (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          {selectedAgeGroup && gameData ? (
            // Show the game
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-auto relative">
              <button
                onClick={handleCloseGame}
                className="absolute top-4 right-4 z-10 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
              >
                <XIcon className="w-6 h-6" />
              </button>
              {activeGame === 'shooting' ? (
                <ShootingGame 
                  gameData={gameData} 
                  ageGroup={selectedAgeGroup}
                  onExit={handleCloseGame}
                />
              ) : (
                <CrosswordPuzzle 
                  gameData={gameData} 
                  ageGroup={selectedAgeGroup}
                  onExit={handleCloseGame}
                />
              )}
            </div>
          ) : (
            // Show age group selection
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8 relative">
              <button
                onClick={handleCloseGame}
                className="absolute top-4 right-4 z-10 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
              >
                <XIcon className="w-6 h-6" />
              </button>
              
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-2">🎯 Shooting Game</h2>
                <p className="text-lg text-gray-600 mb-8">Select your age group to get started</p>

                {gameError && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-3 rounded-lg mb-8">
                    {gameError}
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {AGE_SECTIONS.map((ageGroup) => (
                    <button
                      key={ageGroup}
                      onClick={() => handleAgeGroupSelect(ageGroup)}
                      disabled={gameLoading}
                      className={`py-4 px-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 ${
                        gameLoading
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-br from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg'
                      }`}
                    >
                      {gameLoading ? '⏳' : `${ageGroup}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : null}

      <div className="relative overflow-hidden mb-8 p-8 rounded-3xl bg-slate-900 text-white shadow-2xl">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-600 opacity-20 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-purple-600 opacity-20 blur-[80px] rounded-full"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Challenge Zone</h1>
            <p className="text-slate-400 max-w-md text-base md:text-lg font-medium leading-tight">
              Fuel your competitive spirit. Level up, earn badges, and dominate the leaderboard!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-4 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <FlameIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-black">{userData?.streak || 0} Days</p>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Current Streak</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-4 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <ZapIcon className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <p className="text-2xl font-black">{totalXp.toLocaleString()}</p>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Current XP</p>
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-1">XP Mastery</h2>
                <div className="flex items-center gap-2">
                  <Badge variant={currentTier === 'PLATINUM' ? 'info' : currentTier === 'GOLD' ? 'warning' : 'success'} className="font-bold">{currentTier} TIER</Badge>
                  {totalXp < 5000 && (
                    <span className="text-sm font-bold text-slate-400 italic">{nextTierXp - totalXp} XP to Next Tier</span>
                  )}
                </div>
              </div>
              <div className="sm:text-right">
                <div className="flex items-center sm:justify-end gap-2 mb-1">
                  <ZapIcon className="w-6 h-6 text-amber-500 fill-amber-500" />
                  <span className="text-4xl font-black text-slate-900">{totalXp.toLocaleString()}</span>
                </div>
                <p className="text-sm font-bold text-slate-400">TOTAL LIFETIME POINTS</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-black text-slate-400 uppercase tracking-widest">
                <span>{currentTier} ({tierMinXp.toLocaleString()} XP)</span>
                <span>NEXT ({nextTierXp.toLocaleString()} XP)</span>
              </div>
              <ProgressBar value={progressValue} max={progressMax} size="lg" color="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
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

          {/* Play Games Section */}
          <Card className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-slate-900">Available Games</h2>
              <Badge className="bg-blue-100 text-blue-600 font-bold">NEW</Badge>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Shooting Game Card */}
              <div className="group p-6 rounded-2xl border border-slate-100 bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer" onClick={() => setActiveGame('shooting')}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <TargetIcon className="w-6 h-6" />
                  </div>
                  <Badge variant="success" className="text-[10px]">PLAY</Badge>
                </div>
                <h4 className="font-extrabold text-slate-900 mb-2">Shooting Game</h4>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">Test your English vocabulary by shooting targets with correct translations. Earn points and improve your language skills!</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">+50 XP per round</span>
                  <ChevronRightIcon className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                </div>
              </div>

              {/* Crossword Puzzle Game Card */}
              <div className="group p-6 rounded-2xl border border-slate-100 bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg hover:border-purple-300 transition-all duration-300 cursor-pointer" onClick={() => setActiveGame('puzzle')}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <StarIcon className="w-6 h-6" />
                  </div>
                  <Badge variant="success" className="text-[10px]">PLAY</Badge>
                </div>
                <h4 className="font-extrabold text-slate-900 mb-2">Crossword Puzzle</h4>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">Solve a crossword puzzle with horizontal and vertical words! Match clues with vocabulary meanings.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">+50 XP per round</span>
                  <ChevronRightIcon className="w-5 h-5 text-slate-400 group-hover:text-purple-500 transition-colors" />
                </div>
              </div>
            </div>
          </Card>
          <Card className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-slate-900">Daily Missions</h2>
              <span className="text-sm font-bold text-blue-600 cursor-pointer flex items-center gap-1 hover:underline">
                View All <ChevronRightIcon className="w-4 h-4" />
              </span>
            </div>
            <div className="space-y-4">
              {missions.length === 0 && (
                <div className="text-center py-10 text-slate-400 font-bold">No missions available for today.</div>
              )}
              {missions.map((m, i) => {
                const color = missionColors[m.type] || missionColors.GENERAL;
                const icon = missionIcons[m.type] || missionIcons.GENERAL;
                const progressPercent = Math.min(100, Math.round((m.progress / m.goal) * 100));

                return (
                  <div key={m.id} className="group p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-lg hover:border-blue-100 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110`}>
                          {icon}
                        </div>
                        <div>
                          <h4 className="font-extrabold text-slate-900 leading-tight">{m.title}</h4>
                          <p className="text-xs font-bold text-slate-400">{m.task}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-black text-blue-600 uppercase mb-1">+{m.rewardXp} XP</p>
                        {m.rewardClaimed ? (
                          <Badge variant="success" className="rounded-full px-3 text-[10px]">CLAIMED</Badge>
                        ) : m.completed ? (
                          <button 
                            onClick={() => handleClaim(m.id)}
                            disabled={claiming === m.id}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-black py-1 px-3 rounded-full transition-colors flex items-center gap-1"
                          >
                            {claiming === m.id ? <Loader2Icon className="w-3 h-3 animate-spin" /> : 'CLAIM'}
                          </button>
                        ) : (
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{progressPercent}% DONE</span>
                        )}
                      </div>
                    </div>
                    {!m.completed && (
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-2">
                        <div 
                          className={`h-full ${color} transition-all duration-700`} 
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                );
              })}
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
              <h3 className="text-4xl font-black mb-2">{currentTier}</h3>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/20 rounded-full backdrop-blur-sm mt-4">
                <TrendingUpIcon className="w-4 h-4" />
                <span className="text-sm font-black">KEEP IT UP!</span>
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
            <button 
              onClick={() => setActiveGame('shooting')}
              className="w-full mt-10 py-4 bg-slate-900 text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-slate-800 transition-colors shadow-xl">
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