import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { useNavigate } from 'react-router-dom';

export function ShootingGame({ gameData = null, ageGroup = null, onExit = null }) {
  const gameContainerRef = useRef(null);
  const gameRef = useRef(null);
  const sceneRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeGame = () => {
      if (!gameContainerRef.current) return;

      // Get viewport dimensions
      const gameWidth = window.innerWidth;
      const gameHeight = window.innerHeight;

      // Create Phaser Scene
      class GameScene extends Phaser.Scene {
        constructor() {
          super({ key: 'GameScene' });
          this.score = 0;
          this.correctCount = 0;
          this.wrongCount = 0;
          this.word = null;
          this.correctAnswer = null;
          this.options = [];
          this.targets = [];
          this.gameWidth = gameWidth;
          this.gameHeight = gameHeight;
          this.allGameData = [];
          this.elapsedTime = 0;
          this.usedWordIndices = []; // Track which words have been shown
          this.currentGameDataPool = []; // Pool of unused words
        }

        preload() {
          // Assets loading - attempt to load cat sprite if available
          this.load.setBaseURL('/');
        }

        createStars() {
          // Create random stars in the background
          const starCount = 80;
          for (let i = 0; i < starCount; i++) {
            const x = Math.random() * this.gameWidth;
            const y = Math.random() * this.gameHeight;
            const size = Math.random() * 2 + 0.5;
            const opacity = Math.random() * 0.6 + 0.4;
            
            this.add.circle(x, y, size, 0xffffff, opacity);
          }
        }

        createLauncher() {
          // Create semi-circle launcher at bottom center
          const launcherX = this.gameWidth / 2;
          const launcherY = this.gameHeight - 60;
          const launcherRadius = Math.min(60, this.gameWidth * 0.05);

          // Semi-circle using arc graphics
          const launcherGraphics = this.make.graphics({ x: 0, y: 0, add: false });
          launcherGraphics.fillStyle(0x3b82f6, 1);
          launcherGraphics.beginPath();
          launcherGraphics.arc(launcherX, launcherY, launcherRadius, Math.PI, 0, false);
          launcherGraphics.lineTo(launcherX - launcherRadius, launcherY);
          launcherGraphics.fillPath();
          launcherGraphics.generateTexture('launcher', launcherX * 2, launcherY * 2);
          launcherGraphics.destroy();

          // Add launcher image
          this.launcher = this.add.image(launcherX, launcherY, 'launcher');
          this.launcher.setOrigin(0.5, 0.5);
          this.launcher.setDepth(5);

          // Store launcher position for bullet origin
          this.launcherCenter = { x: launcherX, y: launcherY - 25 };
        }

        async create() {
          try {
            // Use provided gameData if available, otherwise fetch from API
            if (gameData && gameData.length > 0) {
              this.allGameData = gameData;
              console.log('Using provided game data:', this.allGameData);
            } else {
              // Fetch game data from backend API
              const response = await fetch('https://ezyenglishweb.onrender.com/api/games/play/1');
              const data = await response.json();
              this.allGameData = Array.isArray(data) ? data : (data.data || []);
            }
          } catch (error) {
            console.warn('Failed to fetch game data from API, using mock data:', error);
            // Mock data for testing
            this.allGameData = [
              {
                english: 'Hello',
                sinhala: 'ආයුබෝවන්',
                options: ['ස්තූතියි', 'කරුණාකරලා', 'ඔබ හොද ද']
              },
              {
                english: 'Thank you',
                sinhala: 'ස්තූතියි',
                options: ['ආයුබෝවන්', 'කරුණාකරලා', 'ඔබ හොද ද']
              },
              {
                english: 'Please',
                sinhala: 'කරුණාකරලා',
                options: ['ස්තූතියි', 'ආයුබෝවන්', 'ඔබ හොද ද']
              },
              {
                english: 'How are you?',
                sinhala: 'ඔබ හොද ද',
                options: ['ස්තූතියි', 'කරුණාකරලා', 'ආයුබෝවන්']
              },
              {
                english: 'Good morning',
                sinhala: 'ශුභ උදෑසනක්',
                options: ['ස්තූතියි', 'කරුණාකරලා', 'ඔබ හොද ද']
              }
            ];
          }

          if (this.allGameData.length === 0) {
            console.error('No game data received from API');
            return;
          }

          // Initialize the game data pool with all available words
          this.initializeGameDataPool();

          // Set dark space background
          this.cameras.main.setBackgroundColor('#0a0a23');

          // Create starfield
          this.createStars();

          // Create score text - top left
          const fontSize = Math.max(18, Math.min(32, this.gameWidth * 0.025));
          this.scoreText = this.add.text(30, 30, 'Score: 0', {
            fontSize: `${fontSize}px`,
            fill: '#ffffff',
            fontFamily: 'Arial Black',
            fontStyle: 'bold',
          });
          this.scoreText.setDepth(10);

          // Create correct text - top right
          this.correctText = this.add.text(this.gameWidth - 30, 30, 'Correct: 0', {
            fontSize: `${fontSize}px`,
            fill: '#22c55e',
            fontFamily: 'Arial Black',
            fontStyle: 'bold',
            align: 'right',
          });
          this.correctText.setOrigin(1, 0);
          this.correctText.setDepth(10);

          // Create wrong text - top right, below correct
          this.wrongText = this.add.text(this.gameWidth - 30, 30 + fontSize + 10, 'Wrong: 0', {
            fontSize: `${fontSize}px`,
            fill: '#ef4444',
            fontFamily: 'Arial Black',
            fontStyle: 'bold',
            align: 'right',
          });
          this.wrongText.setOrigin(1, 0);
          this.wrongText.setDepth(10);

          // Create launcher with English word
          this.createLauncher();
          this.wordText = this.add.text(this.gameWidth / 2, this.gameHeight - 60, '', {
            fontSize: `${Math.max(16, fontSize - 8)}px`,
            fill: '#ffffff',
            fontFamily: 'Arial Black',
            fontStyle: 'bold',
            align: 'center',
            origin: [0.5, 0.5],
          });
          this.wordText.setDepth(10);

          // Initialize game
          this.startRound();

          // Input handling
          this.input.on('pointerdown', (pointer) => {
            this.handleClick(pointer);
          });
        }

        initializeGameDataPool() {
          // Create indices array for all game data
          this.currentGameDataPool = Array.from({ length: this.allGameData.length }, (_, i) => i);
          this.usedWordIndices = [];
          console.log('Initialized game data pool with', this.currentGameDataPool.length, 'words');
        }

        getNextUnusedWord() {
          // If all words have been used, reset the pool
          if (this.currentGameDataPool.length === 0) {
            console.log('All words used! Resetting pool...');
            this.initializeGameDataPool();
          }

          // Pick a random index from the remaining pool
          const randomPoolIndex = Math.floor(Math.random() * this.currentGameDataPool.length);
          const dataIndex = this.currentGameDataPool[randomPoolIndex];

          // Remove this index from the pool
          this.currentGameDataPool.splice(randomPoolIndex, 1);
          this.usedWordIndices.push(dataIndex);

          console.log(`Selected word index: ${dataIndex}, Remaining: ${this.currentGameDataPool.length}`);
          return this.allGameData[dataIndex];
        }

        startRound() {
          // Clear previous targets
          this.targets.forEach((target) => {
            if (target.graphics) target.graphics.destroy();
            if (target.text) target.text.destroy();
            if (target.bottomShadeGraphic) target.bottomShadeGraphic.destroy();
            if (target.highlightGraphic) target.highlightGraphic.destroy();
          });
          this.targets = [];

          if (!this.allGameData || this.allGameData.length === 0) {
            console.error('No game data available');
            return;
          }

          // Select next unused word from the pool
          const randomData = this.getNextUnusedWord();
          
          // Store data in scene properties
          this.word = randomData.english;
          this.correctAnswer = randomData.sinhala;
          this.options = randomData.options || [];

          // Update English word in launcher
          this.wordText.setText(this.word);

          // Create targets from options array dynamically
          const allOptions = [this.correctAnswer, ...this.options];
          const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);

          const targetCount = Math.min(4, shuffledOptions.length);
          const spacing = this.gameWidth / (targetCount + 1);

          for (let i = 0; i < targetCount; i++) {
            const x = spacing * (i + 1);
            const y = Math.random() * (this.gameHeight * 0.45) + 60;

            const target = {
              x,
              y,
              baseX: x,
              baseY: y,
              angle: Math.random() * Math.PI * 2,
              floatSpeed: Math.random() * 2 + 1,
              meaning: shuffledOptions[i],
              isCorrect: shuffledOptions[i] === this.correctAnswer,
              radius: 40,
              graphics: null,
              text: null,
            };

            // Create 3D sphere-like target
            const targetColor = 0xffc107;
            
            // Dark shade at bottom for 3D effect
            const bottomShade = this.add.circle(target.x, target.y + target.radius * 0.3, target.radius, 0x8b6914, 0.4);
            bottomShade.setDepth(1.5);

            // Main circle (main sphere body)
            target.graphics = this.add.circle(target.x, target.y, target.radius, targetColor);
            target.graphics.setInteractive(
              new Phaser.Geom.Circle(target.radius, target.radius, target.radius),
              Phaser.Geom.Circle.Contains
            );
            target.graphics.setDepth(2);

            // Bright highlight for 3D sphere effect
            const highlight = this.add.circle(target.x - target.radius * 0.3, target.y - target.radius * 0.3, target.radius * 0.35, 0xffffff, 0.5);
            highlight.setDepth(2.5);

            // Store all graphics elements
            target.bottomShadeGraphic = bottomShade;
            target.highlightGraphic = highlight;

            // Create text for target (Sinhala meaning above)
            target.text = this.add.text(target.x, target.y, target.meaning, {
              fontSize: '17px',
              fill: '#000000',
              fontFamily: 'Arial',
              align: 'center',
              origin: [0.5, 0.5],
              wordWrap: { width: target.radius * 2 * 0.9 },
            });
            target.text.setOrigin(0.5, 0.5);
            target.text.setDepth(3);

            this.targets.push(target);
          }
        }

        handleClick(pointer) {
          // Log click for debugging
          console.log('Click detected at:', pointer.x, pointer.y);
          
          // Find clicked target - improved detection
          const clickedTarget = this.targets.find((target) => {
            const distance = Phaser.Math.Distance.Between(
              pointer.x,
              pointer.y,
              target.x,
              target.y
            );
            console.log(`Target at (${target.x}, ${target.y}), distance: ${distance}, radius: ${target.radius}`);
            return distance < target.radius;
          });

          if (clickedTarget) {
            console.log('Target clicked:', clickedTarget.meaning);
            this.shootBullet(clickedTarget);
          } else {
            console.log('No target hit');
          }
        }

        shootBullet(target) {
          // Create bullet at launcher center
          const bullet = this.add.circle(
            this.launcherCenter.x,
            this.launcherCenter.y,
            6,
            0xfbbf24
          );
          bullet.setDepth(4);

          // Add glow effect to bullet
          const bulletGlow = this.add.circle(
            this.launcherCenter.x,
            this.launcherCenter.y,
            10,
            0xfbbf24,
            0.4
          );
          bulletGlow.setDepth(3);

          // Calculate distance and duration for tween
          const distance = Phaser.Math.Distance.Between(
            this.launcherCenter.x,
            this.launcherCenter.y,
            target.x,
            target.y
          );
          const duration = distance * 1.5;

          // Animate bullet to target using tween
          this.tweens.add({
            targets: [bullet, bulletGlow],
            x: target.x,
            y: target.y,
            duration: duration,
            ease: 'Linear',
            onComplete: () => {
              // Hit detected - compare meaning with correctAnswer
              const isCorrect = target.meaning === this.correctAnswer;

              if (isCorrect) {
                this.score += 10;
                this.correctCount += 1;

                // Update display
                this.scoreText.setText(`Score: ${this.score}`);
                this.correctText.setText(`Correct: ${this.correctCount}`);
                this.wrongText.setText(`Wrong: ${this.wrongCount}`);

                // Destroy bullet and glow
                bullet.destroy();
                bulletGlow.destroy();

                // Remove all targets with fade effect and start new round
                const remainingTargets = [...this.targets];
                this.targets = [];

                remainingTargets.forEach((t) => {
                  this.tweens.add({
                    targets: [t.graphics, t.bottomShadeGraphic, t.highlightGraphic, t.text],
                    alpha: 0,
                    duration: 300,
                    ease: 'Power2.easeOut',
                    onComplete: () => {
                      if (t.graphics) t.graphics.destroy();
                      if (t.bottomShadeGraphic) t.bottomShadeGraphic.destroy();
                      if (t.highlightGraphic) t.highlightGraphic.destroy();
                      if (t.text) t.text.destroy();
                    }
                  });
                });

                // Start new round after all targets fade out
                this.time.delayedCall(500, () => {
                  this.startRound();
                });
              } else {
                // Wrong answer - show feedback
                this.wrongCount += 1;
                this.wrongText.setText(`Wrong: ${this.wrongCount}`);

                // Destroy bullet and glow
                bullet.destroy();
                bulletGlow.destroy();

                // Flash the wrong target in red
                this.tweens.add({
                  targets: target.graphics,
                  fillColor: 0xff0000,
                  duration: 300,
                  yoyo: true,
                  onComplete: () => {
                    target.graphics.setFillStyle(0xffc107);
                  }
                });

                // Display "WRONG" text in the middle
                const wrongMessageText = this.add.text(
                  this.gameWidth / 2,
                  this.gameHeight / 2 - 40,
                  'WRONG',
                  {
                    fontSize: '80px',
                    fill: '#ff0000',
                    fontFamily: 'Arial Black',
                    fontStyle: 'bold',
                    align: 'center',
                    stroke: '#ffffff',
                    strokeThickness: 4,
                  }
                );
                wrongMessageText.setOrigin(0.5, 0.5);
                wrongMessageText.setDepth(20);

                // Display "TRY AGAIN" text below
                const tryAgainText = this.add.text(
                  this.gameWidth / 2,
                  this.gameHeight / 2 + 40,
                  'TRY AGAIN',
                  {
                    fontSize: '48px',
                    fill: '#ffeb3b',
                    fontFamily: 'Arial Black',
                    fontStyle: 'bold',
                    align: 'center',
                    stroke: '#ffffff',
                    strokeThickness: 2,
                  }
                );
                tryAgainText.setOrigin(0.5, 0.5);
                tryAgainText.setDepth(20);

                // Fade out the feedback messages after 2 seconds
                this.time.delayedCall(2000, () => {
                  this.tweens.add({
                    targets: [wrongMessageText, tryAgainText],
                    alpha: 0,
                    duration: 500,
                    ease: 'Power2.easeOut',
                    onComplete: () => {
                      wrongMessageText.destroy();
                      tryAgainText.destroy();
                    }
                  });
                });
              }
            },
          });
        }

        update(time) {
          // Update targets with smooth floating motion
          this.elapsedTime = time / 1000; // Convert to seconds
          
          this.targets.forEach((target) => {
            // Wave motion using sin/cos for smooth floating
            const floatX = Math.sin(this.elapsedTime * target.floatSpeed) * 30;
            const floatY = Math.cos(this.elapsedTime * target.floatSpeed * 0.7) * 20;

            target.x = target.baseX + floatX;
            target.y = target.baseY + floatY;

            // Update position on screen
            if (target.graphics) {
              target.graphics.setPosition(target.x, target.y);
            }
            if (target.bottomShadeGraphic) {
              target.bottomShadeGraphic.setPosition(target.x, target.y + target.radius * 0.3);
            }
            if (target.highlightGraphic) {
              target.highlightGraphic.setPosition(target.x - target.radius * 0.3, target.y - target.radius * 0.3);
            }
            if (target.text) {
              target.text.setPosition(target.x, target.y);
            }
          });
        }
      }

      // Create Phaser game instance
      const config = {
        type: Phaser.AUTO,
        width: gameWidth,
        height: gameHeight,
        parent: gameContainerRef.current,
        scene: new GameScene(),
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 0 },
            debug: false,
          },
        },
        render: {
          antialias: true,
          pixelArt: false,
        },
      };

      gameRef.current = new Phaser.Game(config);
      sceneRef.current = gameRef.current.scene.getScene('GameScene');
    };

    initializeGame();

    // Cleanup function
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [gameData, ageGroup, onExit]);

  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-col overflow-hidden fixed inset-0">
      {/* Back Button - Top Right */}
      {onExit && (
        <button
          onClick={onExit}
          className="absolute top-1 right-4 z-30 bg-red-600 hover:bg-red-700 text-white text-xs py-0.5 px-2 rounded shadow-lg transition-colors"
        >
          ← Back
        </button>
      )}

      {/* Age Group Badge - Top Center */}
      {ageGroup && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 bg-purple-600 text-white px-4 py-2 rounded-full font-bold">
          Age Group: {ageGroup} years
        </div>
      )}

      {/* Title and Instructions - Left Middle */}
      <div className="absolute top-24 left-4 z-20 max-w-xs">
        <h1 className="text-xl font-bold text-white leading-tight">Shooting Game</h1>
        <p className="text-xs text-gray-300 mt-2">Click the target matching the English word</p>
      </div>

      {/* Game Canvas */}
      <div
        ref={gameContainerRef}
        className="flex-1 w-full h-full"
        style={{
          width: '100vw',
          height: '100vh',
        }}
      ></div>

      {/* Instructions at Bottom */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-xs text-gray-400">
          🎯 Select the correct Sinhala translation • ⭐ Each correct answer = 10 points
        </p>
      </div>
    </div>
  );
}
