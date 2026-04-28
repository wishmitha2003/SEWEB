import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { ShootingGame } from '../components/games/ShootingGame';
import { CrosswordPuzzle } from '../components/games/CrosswordPuzzle';
import { MatchingGame } from '../components/games/MatchingGame';

import { studentSidebarItems } from '../config/studentSidebarItems';
import { getVocabulariesByAgeSection } from '../services/vocabularyService';
import { Gamepad2Icon, ArrowLeftIcon } from 'lucide-react';

const AGE_SECTIONS = ['1-5', '6-10', '11-15', '16-20', '20+'];

export function GamesHubPage() {
  const [selectedGame, setSelectedGame] = useState(null); // 'shooting'
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGameSelect = (gameType) => {
    setSelectedGame(gameType);
  };

  const handleAgeGroupSelect = async (ageGroup) => {
    setSelectedAgeGroup(ageGroup);
    setLoading(true);
    setError(null);
    
    try {
      // Fetch vocabularies for the selected age group
      const vocabularies = await getVocabulariesByAgeSection(ageGroup);
      
      if (!vocabularies || vocabularies.length === 0) {
        setError('No words available for this age group');
        setGameData(null);
        setLoading(false);
        setSelectedAgeGroup(null);
        return;
      }

      // Different minimum word requirements for different games
      const minWords = selectedGame === 'crossword' ? 5 : selectedGame === 'matching' ? 8 : 4;

      if (vocabularies.length < minWords) {
        setError(`Not enough words for this age group (${vocabularies.length} words). Minimum ${minWords} required.`);
        setGameData(null);
        setLoading(false);
        setSelectedAgeGroup(null);
        return;
      }

      // For crossword game, pass raw vocabularies
      if (selectedGame === 'crossword') {
        setGameData(vocabularies);
      } else if (selectedGame === 'matching') {
        // For matching game, pass raw vocabularies
        setGameData(vocabularies);
      } else {
        // Transform vocabulary data to game format for shooting game
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
      }
    } catch (err) {
      console.error('Error fetching vocabulary data:', err);
      setError('Failed to load words. Please try again.');
      setGameData(null);
      setSelectedAgeGroup(null);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToGameSelect = () => {
    setSelectedGame(null);
    setSelectedAgeGroup(null);
    setGameData(null);
    setError(null);
  };

  const handleBackToGames = () => {
    setSelectedAgeGroup(null);
    setGameData(null);
    setError(null);
  };

  const handleGameExit = (results) => {
    handleBackToGames();
    // You can show a results screen here if needed
    alert(`Game Over!\nScore: ${results.score}\nCorrect: ${results.correctCount}\nWrong: ${results.wrongCount}`);
  };

  // Game is ready - show the selected game
  if (selectedAgeGroup && gameData) {
    if (selectedGame === 'shooting') {
      return (
        <div className="w-full">
          <ShootingGame 
            gameData={gameData} 
            ageGroup={selectedAgeGroup}
            onExit={handleGameExit}
          />
        </div>
      );
    }
    if (selectedGame === 'crossword') {
      return (
        <div className="w-full">
          <CrosswordPuzzle 
            vocabularies={gameData} 
            ageGroup={selectedAgeGroup}
            onExit={handleGameExit}
          />
        </div>
      );
    }
    if (selectedGame === 'matching') {
      return (
        <div className="w-full">
          <MatchingGame 
            gameData={gameData} 
            ageGroup={selectedAgeGroup}
            onExit={handleGameExit}
          />
        </div>
      );
    }
  }

  // Age group selection for a specific game
  if (selectedGame) {
    const gameTitle = selectedGame === 'shooting' ? '🎯 Shooting Game' : selectedGame === 'crossword' ? '🧩 Crossword Puzzle' : '🎴 Matching Game';
    return (
      <DashboardLayout sidebarItems={studentSidebarItems}>
        <div className="w-full p-6">
          <button
            onClick={handleBackToGameSelect}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Games
          </button>

          <div className="text-center py-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {gameTitle}
            </h1>
            <p className="text-lg text-gray-600 mb-12">Select your age group to get started</p>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-8">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
              {AGE_SECTIONS.map((section) => (
                <button
                  key={section}
                  onClick={() => handleAgeGroupSelect(section)}
                  disabled={loading}
                  className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 text-white rounded-lg font-bold text-xl transition-all transform hover:scale-105 shadow-lg"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Game selection
  return (
    <DashboardLayout sidebarItems={studentSidebarItems}>
      <div className="w-full p-6">
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🎮 Games Hub</h1>
          <p className="text-lg text-gray-600 mb-12">Choose a game and improve your English!</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Shooting Game Card */}
            <div
              onClick={() => handleGameSelect('shooting')}
              className="p-8 bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-2xl cursor-pointer transition-all transform hover:scale-105 shadow-lg"
            >
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-3xl font-bold mb-3">Shooting Game</h2>
              <p className="text-sm opacity-90 mb-4">
                Match English words with their meanings by shooting the correct answer. Fast-paced and exciting!
              </p>
              <div className="text-sm font-semibold">Click to play →</div>
            </div>

            {/* Crossword Puzzle Card */}
            <div
              onClick={() => handleGameSelect('crossword')}
              className="p-8 bg-gradient-to-br from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-2xl cursor-pointer transition-all transform hover:scale-105 shadow-lg"
            >
              <div className="text-6xl mb-4">🧩</div>
              <h2 className="text-3xl font-bold mb-3">Crossword Puzzle</h2>
              <p className="text-sm opacity-90 mb-4">
                Solve crossword puzzles using vocabulary words from your age group. Use clues to find the right words!
              </p>
              <div className="text-sm font-semibold">Click to play →</div>
            </div>

            {/* Matching Game Card */}
            <div
              onClick={() => handleGameSelect('matching')}
              className="p-8 bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-2xl cursor-pointer transition-all transform hover:scale-105 shadow-lg"
            >
              <div className="text-6xl mb-4">🎴</div>
              <h2 className="text-3xl font-bold mb-3">Matching Game</h2>
              <p className="text-sm opacity-90 mb-4">
                Match English words with their meanings by flipping cards. Test your memory and vocabulary!
              </p>
              <div className="text-sm font-semibold">Click to play →</div>
            </div>
          </div>

          {/* How it works section */}
          <div className="mt-16 max-w-4xl mx-auto text-left">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">How it works:</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Shooting Game Instructions */}
              <div className="p-6 bg-orange-50 rounded-lg border-2 border-orange-200">
                <h4 className="text-xl font-bold text-orange-600 mb-4">🎯 Shooting Game</h4>
                <ol className="text-gray-700 space-y-3">
                  <li className="flex gap-3">
                    <span className="font-bold text-orange-600 flex-shrink-0">1.</span>
                    <span>Select your age group</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-orange-600 flex-shrink-0">2.</span>
                    <span>See an English word and its meaning</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-orange-600 flex-shrink-0">3.</span>
                    <span>Click on the correct meaning option</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-orange-600 flex-shrink-0">4.</span>
                    <span>Earn points for correct answers</span>
                  </li>
                </ol>
              </div>

              {/* Crossword Puzzle Instructions */}
              <div className="p-6 bg-purple-50 rounded-lg border-2 border-purple-200">
                <h4 className="text-xl font-bold text-purple-600 mb-4">🧩 Crossword Puzzle</h4>
                <ol className="text-gray-700 space-y-3">
                  <li className="flex gap-3">
                    <span className="font-bold text-purple-600 flex-shrink-0">1.</span>
                    <span>Select your age group</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-purple-600 flex-shrink-0">2.</span>
                    <span>Read the clues (meanings of words)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-purple-600 flex-shrink-0">3.</span>
                    <span>Click grid cells and select letters from the alphabet</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-purple-600 flex-shrink-0">4.</span>
                    <span>Complete the horizontal (→) and vertical (↓) words</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-purple-600 flex-shrink-0">5.</span>
                    <span>Click "Check Answers" to see your score</span>
                  </li>
                </ol>
              </div>

              {/* Matching Game Instructions */}
              <div className="p-6 bg-cyan-50 rounded-lg border-2 border-cyan-200">
                <h4 className="text-xl font-bold text-cyan-600 mb-4">🎴 Matching Game</h4>
                <ol className="text-gray-700 space-y-3">
                  <li className="flex gap-3">
                    <span className="font-bold text-cyan-600 flex-shrink-0">1.</span>
                    <span>Select your age group</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-cyan-600 flex-shrink-0">2.</span>
                    <span>Click cards to flip and reveal words</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-cyan-600 flex-shrink-0">3.</span>
                    <span>Find matching pairs of English words and meanings</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-cyan-600 flex-shrink-0">4.</span>
                    <span>Complete all pairs to finish the game</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
