import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, RotateCcwIcon, CheckIcon } from 'lucide-react';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const GRID_SIZE = 15;

export function CrosswordPuzzle({ vocabularies = [], ageGroup = null, onExit = null }) {
  const [puzzle, setPuzzle] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (vocabularies && vocabularies.length > 0) {
      generateCrossword();
    }
  }, [vocabularies]);

  const generateCrossword = () => {
    try {
      // Initialize empty grid
      const grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
      const words = [];
      const placedWords = [];

      // Filter vocabularies for crossword (prefer words 4-8 letters)
      let filteredVocabs = vocabularies.filter(v => v.word && v.word.length >= 4 && v.word.length <= 10);
      
      if (filteredVocabs.length < 5) {
        filteredVocabs = vocabularies.filter(v => v.word && v.word.length >= 3).slice(0, 15);
      }

      if (filteredVocabs.length < 3) {
        setMessage('Not enough words to generate a crossword puzzle.');
        setLoading(false);
        return;
      }

      // Shuffle vocabularies
      const shuffled = [...filteredVocabs].sort(() => Math.random() - 0.5);

      // Place first word horizontally in middle
      if (shuffled.length > 0) {
        const firstWord = shuffled[0].word.toUpperCase();
        const startCol = Math.max(0, Math.floor((GRID_SIZE - firstWord.length) / 2));
        const startRow = Math.floor(GRID_SIZE / 2);

        placeWord(grid, firstWord, startRow, startCol, 'horizontal', shuffled[0], placedWords);
      }

      // Place remaining words
      for (let i = 1; i < shuffled.length && placedWords.length < 12; i++) {
        const word = shuffled[i].word.toUpperCase();
        
        // Try to place vertically intersecting with existing words
        for (let attempt = 0; attempt < 20; attempt++) {
          const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
          const pos = findIntersectionPosition(grid, word, placedWords, direction);
          
          if (pos) {
            placeWord(grid, word, pos.row, pos.col, direction, shuffled[i], placedWords);
            break;
          }
        }
      }

      // Generate clues
      const across = placedWords.filter(w => w.direction === 'horizontal').sort((a, b) => {
        if (a.row !== b.row) return a.row - b.row;
        return a.col - b.col;
      });

      const down = placedWords.filter(w => w.direction === 'vertical').sort((a, b) => {
        if (a.col !== b.col) return a.col - b.col;
        return a.row - b.row;
      });

      // Assign clue numbers
      let clueNum = 1;
      across.forEach(w => w.clueNum = clueNum++);
      down.forEach(w => w.clueNum = clueNum++);

      setPuzzle({
        grid: grid.map(row => [...row]),
        words: placedWords,
        across,
        down
      });

      setUserAnswers({});
      setLoading(false);
    } catch (error) {
      console.error('Error generating crossword:', error);
      setMessage('Error generating crossword puzzle.');
      setLoading(false);
    }
  };

  const placeWord = (grid, word, row, col, direction, vocabData, placedWords) => {
    const positions = [];

    for (let i = 0; i < word.length; i++) {
      const r = direction === 'horizontal' ? row : row + i;
      const c = direction === 'horizontal' ? col + i : col;

      if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) return false;
      if (grid[r][c] && grid[r][c].letter !== word[i]) return false;

      positions.push({ row: r, col: c });
    }

    // Place the word
    positions.forEach((pos, i) => {
      grid[pos.row][pos.col] = {
        letter: word[i],
        words: grid[pos.row][pos.col]?.words || []
      };
    });

    placedWords.push({
      word,
      row,
      col,
      direction,
      length: word.length,
      meaning: vocabData.meaning,
      example: vocabData.example || '',
      positions: [...positions]
    });

    return true;
  };

  const findIntersectionPosition = (grid, word, placedWords, direction) => {
    for (let i = 0; i < word.length; i++) {
      for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
          if (grid[r][c] && grid[r][c].letter === word[i]) {
            const newRow = direction === 'horizontal' ? r : r - i;
            const newCol = direction === 'horizontal' ? c - i : c;

            if (newRow >= 0 && newRow < GRID_SIZE && newCol >= 0 && newCol < GRID_SIZE) {
              if (canPlaceWord(grid, word, newRow, newCol, direction)) {
                return { row: newRow, col: newCol };
              }
            }
          }
        }
      }
    }
    return null;
  };

  const canPlaceWord = (grid, word, row, col, direction) => {
    for (let i = 0; i < word.length; i++) {
      const r = direction === 'horizontal' ? row : row + i;
      const c = direction === 'horizontal' ? col + i : col;

      if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) return false;
      if (grid[r][c] && grid[r][c].letter !== word[i]) return false;
    }

    // Check for adjacent conflicts
    if (direction === 'horizontal') {
      if (col > 0 && grid[row][col - 1]) return false;
      if (col + word.length < GRID_SIZE && grid[row][col + word.length]) return false;
    } else {
      if (row > 0 && grid[row - 1][col]) return false;
      if (row + word.length < GRID_SIZE && grid[row + word.length][col]) return false;
    }

    return true;
  };

  const handleCellClick = (row, col) => {
    if (puzzle.grid[row][col]) {
      setSelectedCell({ row, col });
    }
  };

  const handleLetterClick = (letter) => {
    if (selectedCell && puzzle.grid[selectedCell.row][selectedCell.col]) {
      const key = `${selectedCell.row}-${selectedCell.col}`;
      setUserAnswers(prev => ({
        ...prev,
        [key]: letter
      }));

      // Move to next cell
      moveToNextCell(selectedCell.row, selectedCell.col);
    }
  };

  const moveToNextCell = (row, col) => {
    let nextRow = row;
    let nextCol = col + 1;

    // Find next valid cell
    while (nextRow < GRID_SIZE) {
      while (nextCol < GRID_SIZE) {
        if (puzzle.grid[nextRow][nextCol]) {
          setSelectedCell({ row: nextRow, col: nextCol });
          return;
        }
        nextCol++;
      }
      nextRow++;
      nextCol = 0;
    }
  };

  const handleDeleteLetter = () => {
    if (selectedCell) {
      const key = `${selectedCell.row}-${selectedCell.col}`;
      setUserAnswers(prev => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
    }
  };

  const handleCheckAnswers = () => {
    let correct = 0;
    let wrong = 0;
    const totalCells = puzzle.words.reduce((sum, w) => sum + w.length, 0);

    puzzle.words.forEach(word => {
      let isCorrect = true;
      word.positions.forEach((pos, i) => {
        const key = `${pos.row}-${pos.col}`;
        if (userAnswers[key] !== word.word[i]) {
          isCorrect = false;
        }
      });

      if (isCorrect) {
        correct += word.length;
      } else {
        wrong += word.length;
      }
    });

    const points = Math.round((correct / totalCells) * 100);
    setCorrectCount(correct);
    setWrongCount(wrong);
    setScore(points);
    setGameCompleted(true);
  };

  const handleReset = () => {
    setUserAnswers({});
    setGameCompleted(false);
    setSelectedCell(null);
    generateCrossword();
  };

  const handleExit = () => {
    if (onExit) {
      onExit({
        score,
        correctCount,
        wrongCount
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-xl">Generating Crossword Puzzle...</p>
        </div>
      </div>
    );
  }

  if (!puzzle) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-center">
          <p className="text-white text-xl mb-6">{message}</p>
          <button
            onClick={handleExit}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            <ArrowLeftIcon className="w-5 h-5 inline mr-2" />
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-3 bg-black/30 backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-white">Crossword Puzzle Challenge</h1>
        <button
          onClick={handleExit}
          className="px-4 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2 font-semibold text-base"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Exit
        </button>
      </div>

      {gameCompleted && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-12 max-w-2xl border-4 border-green-500 shadow-2xl">
            <h2 className="text-5xl font-bold text-green-600 mb-8 text-center">Results</h2>
            <div className="grid grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <p className="text-gray-600 text-lg mb-3">Score</p>
                <p className="text-6xl font-bold text-blue-600">{score}%</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-lg mb-3">Correct</p>
                <p className="text-6xl font-bold text-green-600">{correctCount}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-lg mb-3">Wrong</p>
                <p className="text-6xl font-bold text-red-600">{wrongCount}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleReset}
                className="flex-1 px-6 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2 font-bold text-xl"
              >
                <RotateCcwIcon className="w-6 h-6" />
                Try Again
              </button>
              <button
                onClick={handleExit}
                className="flex-1 px-6 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2 font-bold text-xl"
              >
                <CheckIcon className="w-6 h-6" />
                Finish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden p-4 gap-4">
        {/* Left Side - Crossword Grid */}
        <div className="flex flex-col flex-1 min-w-0">
          <div className="bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-2xl flex-1 flex flex-col justify-center items-center overflow-hidden">
            <div className="bg-gray-100 p-2 rounded-lg">
              <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 40px)` }}>
                {puzzle.grid.map((row, r) =>
                  row.map((cell, c) => {
                    // Find if this cell is a word start
                    let wordNum = null;
                    if (cell) {
                      const wordsStartingHere = puzzle.words.filter(
                        w => w.positions[0].row === r && w.positions[0].col === c
                      );
                      if (wordsStartingHere.length > 0) {
                        wordNum = wordsStartingHere[0].clueNum;
                      }
                    }

                    return (
                      <div
                        key={`${r}-${c}`}
                        onClick={() => handleCellClick(r, c)}
                        className={`relative w-10 h-10 border-2 border-gray-400 text-xs font-bold cursor-pointer transition-all ${
                          cell
                            ? `bg-white ${
                                selectedCell?.row === r && selectedCell?.col === c
                                  ? 'ring-4 ring-yellow-400 bg-yellow-100 shadow-lg'
                                  : 'hover:bg-gray-50'
                              }`
                            : 'bg-black'
                        }`}
                      >
                        {wordNum && (
                          <span className="absolute top-1 left-1 text-xs font-bold text-blue-600 pointer-events-none">
                            {wordNum}
                          </span>
                        )}
                        <div className="flex items-center justify-center w-full h-full pt-1">
                          {cell && userAnswers[`${r}-${c}`] ? userAnswers[`${r}-${c}`] : ''}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Clues and Controls */}
        <div className="flex flex-col w-80 gap-3 overflow-hidden">
          {/* Clues Container */}
          <div className="flex-1 grid grid-cols-2 gap-3 overflow-hidden">
            {/* Across */}
            <div className="bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg overflow-hidden flex flex-col">
              <h3 className="text-base font-bold text-blue-600 mb-2">Across →</h3>
              <div className="space-y-2 text-xs overflow-hidden flex-1">
                {puzzle.across.map((word) => (
                  <div key={`across-${word.clueNum}`} className="text-xs">
                    <p className="font-bold text-blue-600">{word.clueNum}. ({word.length})</p>
                    <p className="text-gray-700 line-clamp-2">{word.meaning}</p>
                    {word.example && <p className="text-gray-500 italic text-[10px] mt-0.5 line-clamp-1">E.g., {word.example}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Down */}
            <div className="bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg overflow-hidden flex flex-col">
              <h3 className="text-base font-bold text-green-600 mb-2">Down ↓</h3>
              <div className="space-y-2 text-xs overflow-hidden flex-1">
                {puzzle.down.map((word) => (
                  <div key={`down-${word.clueNum}`} className="text-xs">
                    <p className="font-bold text-green-600">{word.clueNum}. ({word.length})</p>
                    <p className="text-gray-700 line-clamp-2">{word.meaning}</p>
                    {word.example && <p className="text-gray-500 italic text-[10px] mt-0.5 line-clamp-1">E.g., {word.example}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alphabet and Controls */}
          <div className="bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg">
            <h3 className="text-base font-bold text-gray-800 mb-2">Letters</h3>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {ALPHABET.map((letter) => (
                <button
                  key={letter}
                  onClick={() => handleLetterClick(letter)}
                  className="w-full h-8 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition-all text-xs"
                >
                  {letter}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleDeleteLetter}
                className="flex-1 px-2 py-2 bg-red-500 text-white rounded hover:bg-red-600 font-semibold text-xs"
              >
                Delete
              </button>
              {!gameCompleted && (
                <button
                  onClick={handleCheckAnswers}
                  className="flex-1 px-2 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600 flex items-center justify-center gap-1 text-xs"
                >
                  <CheckIcon className="w-4 h-4" />
                  Check
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
