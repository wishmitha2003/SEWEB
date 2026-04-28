import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { RotateCcwIcon, VolumeIcon, CheckIcon, XIcon, HelpCircleIcon } from 'lucide-react';

export function CrosswordPuzzle({ gameData = [], ageGroup = null, onExit = null }) {
  const navigate = useNavigate();
  const [grid, setGrid] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [selectedCell, setSelectedCell] = useState(null);
  const [selectedDirection, setSelectedDirection] = useState('across');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Generate crossword grid from vocabulary
  const { gridData, words, clues } = useMemo(() => {
    if (!gameData || gameData.length === 0) return { gridData: [], words: [], clues: { across: {}, down: {} } };

    const generateCrossword = () => {
      const maxGridSize = 15;
      const grid = Array(maxGridSize).fill(null).map(() => Array(maxGridSize).fill(null));
      const placedWords = [];
      const acrossClues = {};
      const downClues = {};
      let wordNumber = 1;

      // Select only 5-8 random words from vocabulary (not all)
      const wordCount = Math.min(8, Math.max(5, gameData.length));
      const selectedWords = gameData
        .sort(() => Math.random() - 0.5)
        .slice(0, wordCount)
        .sort((a, b) => b.english.length - a.english.length); // Sort by length (longer first)

      // Place first word horizontally in the middle
      if (selectedWords.length > 0) {
        const word = selectedWords[0].english.toUpperCase();
        const startRow = Math.floor(maxGridSize / 2);
        const startCol = Math.floor((maxGridSize - word.length) / 2);

        for (let i = 0; i < word.length; i++) {
          grid[startRow][startCol + i] = {
            letter: word[i],
            number: i === 0 ? wordNumber : null,
            across: wordNumber,
            down: null,
            id: `${wordNumber}-a`
          };
        }

        acrossClues[wordNumber] = selectedWords[0].sinhala;
        placedWords.push({
          word,
          row: startRow,
          col: startCol,
          direction: 'across',
          number: wordNumber,
          clue: selectedWords[0].sinhala
        });
        wordNumber++;
      }

      // Place remaining words trying to intersect with existing words
      for (let w = 1; w < selectedWords.length; w++) {
        const word = selectedWords[w].english.toUpperCase();
        let placed = false;

        // Try to find intersections with already placed words
        for (let r = 0; r < maxGridSize && !placed; r++) {
          for (let c = 0; c < maxGridSize && !placed; c++) {
            if (!grid[r][c]) continue;

            const existingLetter = grid[r][c].letter;
            const letterIndex = word.indexOf(existingLetter);

            if (letterIndex === -1) continue;

            // Try placing vertically
            if (r - letterIndex >= 0 && r - letterIndex + word.length <= maxGridSize) {
              let canPlace = true;
              for (let i = 0; i < word.length; i++) {
                const newRow = r - letterIndex + i;
                const newCell = grid[newRow][c];
                if (newCell && newCell.letter !== word[i]) {
                  canPlace = false;
                  break;
                }
                // Check adjacent cells aren't occupied
                if (i !== letterIndex && newCell) {
                  canPlace = false;
                  break;
                }
              }

              if (canPlace) {
                for (let i = 0; i < word.length; i++) {
                  const newRow = r - letterIndex + i;
                  if (!grid[newRow][c]) {
                    grid[newRow][c] = {
                      letter: word[i],
                      number: null,
                      across: null,
                      down: null,
                      id: `${wordNumber}-d`
                    };
                  }
                }
                grid[r - letterIndex][c].number = wordNumber;
                grid[r - letterIndex][c].down = wordNumber;
                downClues[wordNumber] = selectedWords[w].sinhala;
                placedWords.push({
                  word,
                  row: r - letterIndex,
                  col: c,
                  direction: 'down',
                  number: wordNumber,
                  clue: selectedWords[w].sinhala
                });
                placed = true;
                wordNumber++;
              }
            }

            // Try placing horizontally
            if (!placed && c - letterIndex >= 0 && c - letterIndex + word.length <= maxGridSize) {
              let canPlace = true;
              for (let i = 0; i < word.length; i++) {
                const newCol = c - letterIndex + i;
                const newCell = grid[r][newCol];
                if (newCell && newCell.letter !== word[i]) {
                  canPlace = false;
                  break;
                }
                // Check adjacent cells aren't occupied
                if (i !== letterIndex && newCell) {
                  canPlace = false;
                  break;
                }
              }

              if (canPlace) {
                for (let i = 0; i < word.length; i++) {
                  const newCol = c - letterIndex + i;
                  if (!grid[r][newCol]) {
                    grid[r][newCol] = {
                      letter: word[i],
                      number: null,
                      across: null,
                      down: null,
                      id: `${wordNumber}-a`
                    };
                  }
                }
                grid[r][c - letterIndex].number = wordNumber;
                grid[r][c - letterIndex].across = wordNumber;
                acrossClues[wordNumber] = selectedWords[w].sinhala;
                placedWords.push({
                  word,
                  row: r,
                  col: c - letterIndex,
                  direction: 'across',
                  number: wordNumber,
                  clue: selectedWords[w].sinhala
                });
                placed = true;
                wordNumber++;
              }
            }
          }
        }
      }

      return { grid, placedWords, acrossClues, downClues };
    };

    const { grid: generatedGrid, placedWords, acrossClues, downClues } = generateCrossword();
    return {
      gridData: generatedGrid,
      words: placedWords,
      clues: { across: acrossClues, down: downClues }
    };
  }, [gameData]);

  useEffect(() => {
    if (gridData.length > 0) {
      setGrid(gridData);
      setGameStarted(true);
      setUserAnswers({});
    }
  }, [gridData]);

  const handleCellClick = (row, col, direction = 'across') => {
    if (grid[row] && grid[row][col]) {
      setSelectedCell({ row, col });
      setSelectedDirection(direction);
    }
  };

  const handleLetterInput = (row, col, letter) => {
    if (!grid[row] || !grid[row][col]) return;

    const key = `${row}-${col}`;
    const newAnswers = { ...userAnswers };
    newAnswers[key] = letter.toUpperCase();
    setUserAnswers(newAnswers);

    // Move to next cell in selected direction
    const nextCell = getNextCell(row, col, selectedDirection);
    if (nextCell) {
      handleCellClick(nextCell.row, nextCell.col, selectedDirection);
    }
  };

  const getNextCell = (row, col, direction) => {
    const maxRows = grid.length;
    const maxCols = grid[0]?.length || 0;

    if (direction === 'across') {
      for (let c = col + 1; c < maxCols; c++) {
        if (grid[row] && grid[row][c]) return { row, col: c };
      }
    } else {
      for (let r = row + 1; r < maxRows; r++) {
        if (grid[r] && grid[r][col]) return { row: r, col };
      }
    }
    return null;
  };

  const handleReset = () => {
    setUserAnswers({});
    setSelectedCell(null);
    setFeedback(null);
    setShowHint(false);
  };

  const handleSubmit = () => {
    let correct = 0;
    let total = 0;

    words.forEach((word) => {
      for (let i = 0; i < word.word.length; i++) {
        const row = word.direction === 'across' ? word.row : word.row + i;
        const col = word.direction === 'across' ? word.col + i : word.col;
        const key = `${row}-${col}`;
        const userLetter = userAnswers[key] || '';

        total++;
        if (userLetter === word.word[i]) {
          correct++;
        }
      }
    });

    const percentage = Math.round((correct / total) * 100);
    setScore(percentage);

    if (percentage === 100) {
      setFeedback('Perfect! You completed the crossword! 🎉');
      setShowResults(true);
    } else if (percentage >= 80) {
      setFeedback(`Great job! ${percentage}% correct!`);
      setShowResults(true);
    } else {
      setFeedback(`${percentage}% correct. Keep trying!`);
    }
  };

  const handleExit = () => {
    if (window.confirm('Are you sure you want to exit the game?')) {
      if (onExit) {
        onExit({ score, total: words.length });
      } else {
        navigate(-1);
      }
    }
  };

  const handlePlayPronunciation = (word) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const handleKeyDown = (e) => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;
    const key = e.key.toUpperCase();

    if (/^[A-Z]$/.test(key)) {
      handleLetterInput(row, col, selectedDirection);
    } else if (e.key === 'Backspace') {
      const cellKey = `${row}-${col}`;
      const newAnswers = { ...userAnswers };
      delete newAnswers[cellKey];
      setUserAnswers(newAnswers);

      // Move to previous cell
      if (selectedDirection === 'across' && col > 0) {
        for (let c = col - 1; c >= 0; c--) {
          if (grid[row] && grid[row][c]) {
            handleCellClick(row, c, selectedDirection);
            break;
          }
        }
      } else if (selectedDirection === 'down' && row > 0) {
        for (let r = row - 1; r >= 0; r--) {
          if (grid[r] && grid[r][col]) {
            handleCellClick(r, col, selectedDirection);
            break;
          }
        }
      }
    }
  };

  if (!gameStarted) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-600">
        <div className="text-white text-xl">Loading crossword puzzle...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-500 to-blue-600 flex flex-col items-center justify-center p-4" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Main Game Area */}
      <div className="grid lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Crossword Grid */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Crossword Puzzle</h2>
            <button
              onClick={handleExit}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors text-sm"
            >
              Exit
            </button>
          </div>
          <div className="inline-block bg-gray-100 p-4 rounded-xl mb-6">
            <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${grid[0]?.length || 15}, minmax(35px, 1fr))` }}>
              {grid.map((row, r) =>
                row.map((cell, c) => (
                  cell && (
                    <div
                      key={`${r}-${c}`}
                      onClick={() => cell && handleCellClick(r, c, 'across')}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        if (cell) handleCellClick(r, c, 'down');
                      }}
                      className={`relative w-9 h-9 sm:w-10 sm:h-10 border-2 flex items-center justify-center font-bold text-sm cursor-pointer transition-all ${
                        selectedCell?.row === r && selectedCell?.col === c
                        ? 'bg-yellow-300 border-yellow-600'
                        : 'bg-white border-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      {cell.number && (
                        <span className="absolute top-0.5 left-0.5 text-xs font-bold text-gray-600">
                          {cell.number}
                        </span>
                      )}
                      <span className="text-gray-800">
                        {userAnswers[`${r}-${c}`] || ''}
                      </span>
                    </div>
                  )
                ))
              )}
            </div>
          </div>

          {/* Available Letters Section */}
          <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <h4 className="font-bold text-blue-600 mb-3">Available Letters:</h4>
            <div className="flex flex-wrap gap-2">
              {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((letter) => (
                <button
                  key={letter}
                  onClick={() => {
                    if (selectedCell) {
                      handleLetterInput(selectedCell.row, selectedCell.col, letter);
                    } else {
                      setFeedback('Please select a cell first');
                      setTimeout(() => setFeedback(null), 2000);
                    }
                  }}
                  className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded text-sm transition-colors shadow-md hover:shadow-lg"
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback */}
          {feedback && (
            <div className={`mt-6 p-4 rounded-lg text-center font-semibold ${
              score === 100 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
            }`}>
              {feedback}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center mt-6">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white rounded-lg font-semibold transition-colors"
            >
              <RotateCcwIcon className="w-5 h-5" />
              Reset
            </button>
            <button
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
            >
              <CheckIcon className="w-5 h-5" />
              Check Answers
            </button>
          </div>
        </div>

        {/* Clues */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 h-fit max-h-[70vh] overflow-y-auto">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Clues</h3>

          {/* Across Clues */}
          {Object.keys(clues.across).length > 0 && (
            <div className="mb-8">
              <h4 className="text-lg font-bold text-blue-600 mb-4 border-b-2 border-blue-200 pb-2">
                ACROSS →
              </h4>
              <div className="space-y-3">
                {Object.entries(clues.across).map(([num, clue]) => (
                  <div
                    key={`across-${num}`}
                    className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500 cursor-pointer hover:bg-blue-100 transition-colors"
                  >
                    <p className="font-bold text-blue-600 text-sm">{num}.</p>
                    <p className="text-sm text-gray-700 mt-1">{clue}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Down Clues */}
          {Object.keys(clues.down).length > 0 && (
            <div>
              <h4 className="text-lg font-bold text-purple-600 mb-4 border-b-2 border-purple-200 pb-2">
                DOWN ↓
              </h4>
              <div className="space-y-3">
                {Object.entries(clues.down).map(([num, clue]) => (
                  <div
                    key={`down-${num}`}
                    className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500 cursor-pointer hover:bg-purple-100 transition-colors"
                  >
                    <p className="font-bold text-purple-600 text-sm">{num}.</p>
                    <p className="text-sm text-gray-700 mt-1">{clue}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
