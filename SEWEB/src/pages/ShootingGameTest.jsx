import React, { useState, useEffect } from 'react';
import { ShootingGame } from '../components/games/ShootingGame';
import { getVocabulariesByAgeSection } from '../services/vocabularyService';

const AGE_SECTIONS = ['1-5', '6-10', '11-15', '16-20', '20+'];

export function ShootingGameTest() {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

      // Ensure we have at least 4 words for the game
      if (vocabularies.length < 4) {
        setError(`Not enough words for this age group (${vocabularies.length} words). Minimum 4 required.`);
        setGameData(null);
        setLoading(false);
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
      setError('Failed to load words. Please try again.');
      setGameData(null);
      setSelectedAgeGroup(null);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToSelection = () => {
    setSelectedAgeGroup(null);
    setGameData(null);
    setError(null);
  };

  // If game is ready, show the game
  if (selectedAgeGroup && gameData) {
    return (
      <ShootingGame 
        gameData={gameData} 
        ageGroup={selectedAgeGroup}
        onExit={handleBackToSelection}
      />
    );
  }

  // Show age group selection screen
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex flex-col items-center justify-center fixed inset-0">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">🎯 Shooting Game</h1>
        <p className="text-xl text-gray-200 mb-12">Select your age group to get started</p>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-6 py-3 rounded-lg mb-8 max-w-md mx-auto">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {AGE_SECTIONS.map((ageGroup) => (
            <button
              key={ageGroup}
              onClick={() => handleAgeGroupSelect(ageGroup)}
              disabled={loading}
              className={`py-4 px-6 rounded-lg font-bold text-lg transition-all transform hover:scale-105 ${
                loading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-br from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg'
              }`}
            >
              {loading ? '⏳ Loading...' : `${ageGroup} years`}
            </button>
          ))}
        </div>

        <div className="text-gray-300 text-sm max-w-md">
          <p>🎮 Click on your age group to start playing with words from your vocabulary level!</p>
        </div>
      </div>
    </div>
  );
}
