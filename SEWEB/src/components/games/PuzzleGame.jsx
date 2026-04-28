import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { RotateCcwIcon, VolumeIcon, CheckIcon, XIcon } from 'lucide-react';

export function PuzzleGame({ gameData = [], ageGroup = null, onExit = null }) {
  const navigate = useNavigate();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
  const [userInput, setUserInput] = useState([]);
  const [usedLetters, setUsedLetters] = useState(new Set());
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const currentWord = gameData[currentWordIndex];

  // Get all letters from current word
  const allLetters = useMemo(() => {
    if (!currentWord) return [];
    return currentWord.english
      .toUpperCase()
      .split('')
      .filter(letter => letter !== ' ')
      .sort();
  }, [currentWord]);

  // Get available letters (not used yet)
  const availableLetters = useMemo(() => {
    return allLetters.filter(letter => !usedLetters.has(letter));
  }, [allLetters, usedLetters]);

  // Initialize game
  useEffect(() => {
    if (currentWord && userInput.length === 0) {
      const blanks = currentWord.english.split('').map(letter => 
        letter === ' ' ? ' ' : ''
      );
      setUserInput(blanks);
      setSelectedBoxIndex(null);
      setUsedLetters(new Set());
      setFeedback(null);
      setShowResult(false);
      setGameStarted(true);
    }
  }, [currentWord, currentWordIndex]);

  const handleLetterClick = (letter) => {
    if (selectedBoxIndex === null) {
      setFeedback('Please select a box first');
      setTimeout(() => setFeedback(null), 2000);
      return;
    }

    const newInput = [...userInput];
    const oldLetter = newInput[selectedBoxIndex];
    
    // Remove old letter from used set if it exists
    if (oldLetter && oldLetter !== ' ') {
      const newUsed = new Set(usedLetters);
      newUsed.delete(oldLetter);
      setUsedLetters(newUsed);
    }

    // Add new letter
    newInput[selectedBoxIndex] = letter;
    setUserInput(newInput);
    
    // Mark letter as used
    setUsedLetters(new Set([...usedLetters, letter]));
    
    // Move to next empty box
    const nextEmptyIndex = newInput.findIndex((val, idx) => idx > selectedBoxIndex && val === '');
    if (nextEmptyIndex !== -1) {
      setSelectedBoxIndex(nextEmptyIndex);
    }
  };

  const handleBoxClick = (index) => {
    if (userInput[index] !== ' ') {
      setSelectedBoxIndex(index);
    }
  };

  const handleClearBox = (index) => {
    if (userInput[index] === ' ') return;

    const newInput = [...userInput];
    const letter = newInput[index];
    newInput[index] = '';
    setUserInput(newInput);

    // Remove from used letters
    const newUsed = new Set(usedLetters);
    newUsed.delete(letter);
    setUsedLetters(newUsed);

    setSelectedBoxIndex(index);
  };

  const handleReset = () => {
    const blanks = currentWord.english.split('').map(letter => 
      letter === ' ' ? ' ' : ''
    );
    setUserInput(blanks);
    setSelectedBoxIndex(null);
    setUsedLetters(new Set());
    setFeedback(null);
    setShowResult(false);
  };

  const handleSubmit = () => {
    const answer = userInput.join('').toUpperCase();
    const correct = currentWord.english.toUpperCase();

    if (answer === correct) {
      setFeedback('Correct! 🎉');
      setCorrectCount(correctCount + 1);
      setScore(score + 10);
      setShowResult('correct');
    } else {
      setFeedback(`Incorrect. The answer is: ${correct}`);
      setWrongCount(wrongCount + 1);
      setShowResult('wrong');
    }

    setTimeout(() => {
      if (currentWordIndex < gameData.length - 1) {
        setCurrentWordIndex(currentWordIndex + 1);
        setUserInput([]);
        setSelectedBoxIndex(null);
        setUsedLetters(new Set());
        setFeedback(null);
        setShowResult(false);
      } else {
        // Game ended
        handleGameEnd();
      }
    }, 2000);
  };

  const handleGameEnd = () => {
    // Navigate to results or show end screen
    if (onExit) {
      onExit({
        score,
        correctCount,
        wrongCount,
        total: gameData.length
      });
    }
  };

  const handleExit = () => {
    if (window.confirm('Are you sure you want to exit the game?')) {
      if (onExit) {
        onExit({ score, correctCount, wrongCount, total: gameData.length });
      } else {
        navigate(-1);
      }
    }
  };

  const handlePlayPronunciation = () => {
    if (!currentWord) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentWord.english);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  if (!currentWord) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-600">
        <div className="text-center">
          <div className="text-white text-xl">Loading game...</div>
        </div>
      </div>
    );
  }

  const progress = ((currentWordIndex + 1) / gameData.length) * 100;
  const isAnswerComplete = userInput.every(letter => letter !== '');

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-500 to-blue-600 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="w-full max-w-4xl mb-8">
        <div className="flex justify-between items-center text-white mb-4">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{score}</div>
              <div className="text-sm opacity-80">Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">{correctCount}</div>
              <div className="text-sm opacity-80">Correct</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-300">{wrongCount}</div>
              <div className="text-sm opacity-80">Wrong</div>
            </div>
          </div>
          <button
            onClick={handleExit}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
          >
            Exit
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-white text-sm mt-2 text-center">
          Word {currentWordIndex + 1} of {gameData.length}
        </div>
      </div>

      {/* Main Game Area */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8">
        {/* Clue/Meaning */}
        <div className="mb-8 text-center">
          <div className="text-gray-600 text-lg font-semibold mb-4">Meaning/Hint:</div>
          <div className="text-2xl font-bold text-blue-600 mb-4">{currentWord.sinhala}</div>
          <button
            onClick={handlePlayPronunciation}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            <VolumeIcon className="w-5 h-5" />
            Play Pronunciation
          </button>
        </div>

        <hr className="my-8" />

        {/* Puzzle Boxes */}
        <div className="mb-8 text-center">
          <div className="inline-flex gap-2 flex-wrap justify-center mb-2">
            {userInput.map((letter, idx) => (
              <div key={idx}>
                {letter === ' ' ? (
                  <div className="w-10 h-10" />
                ) : (
                  <div
                    onClick={() => handleBoxClick(idx)}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      handleClearBox(idx);
                    }}
                    className={`w-12 h-12 rounded-lg border-2 font-bold text-lg cursor-pointer transition-all ${
                      selectedBoxIndex === idx
                        ? 'border-blue-600 bg-blue-100 scale-110'
                        : 'border-gray-300 bg-white hover:border-blue-400'
                    } flex items-center justify-center`}
                    title="Right-click to clear"
                  >
                    {letter}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Hint/Help Text */}
        <div className="text-center text-sm text-gray-500 mb-8">
          Click on a box to select it, then click a letter below. Right-click a box to clear it.
        </div>

        {/* Feedback Message */}
        {feedback && (
          <div
            className={`text-center font-semibold text-lg mb-6 p-4 rounded-lg ${
              showResult === 'correct'
                ? 'bg-green-100 text-green-700'
                : showResult === 'wrong'
                ? 'bg-red-100 text-red-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {feedback}
          </div>
        )}

        {/* Available Letters */}
        <div className="mb-8">
          <div className="text-gray-600 font-semibold mb-3">Available Letters:</div>
          <div className="flex flex-wrap gap-2 justify-center">
            {availableLetters.map((letter, idx) => (
              <button
                key={idx}
                onClick={() => handleLetterClick(letter)}
                className="w-10 h-10 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg transition-colors shadow-md"
              >
                {letter}
              </button>
            ))}
          </div>
          {availableLetters.length === 0 && (
            <div className="text-center text-gray-400 text-sm mt-4">All letters used</div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white rounded-lg font-semibold transition-colors"
          >
            <RotateCcwIcon className="w-5 h-5" />
            Reset
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isAnswerComplete}
            className={`inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-colors ${
              isAnswerComplete
                ? 'bg-green-500 hover:bg-green-600 text-white cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <CheckIcon className="w-5 h-5" />
            Submit
          </button>
        </div>
      </div>

      {/* Selected Box Indicator */}
      {selectedBoxIndex !== null && (
        <div className="mt-6 text-white text-center">
          <div className="text-sm opacity-80">Selected Box: Position {selectedBoxIndex + 1}</div>
        </div>
      )}
    </div>
  );
}
