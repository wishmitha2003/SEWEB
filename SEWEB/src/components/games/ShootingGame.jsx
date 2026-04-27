import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

export function ShootingGame() {
  const gameContainerRef = useRef(null);
  const gameRef = useRef(null);
  const sceneRef = useRef(null);

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
            // Fetch game data from backend API
            const response = await fetch('http://localhost:8082/api/games/play/1');
            const data = await response.json();
            this.allGameData = Array.isArray(data) ? data : (data.data || []);
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

        startRound() {
          // Clear previous targets
          this.targets.forEach((target) => {
            if (target.graphics) target.graphics.destroy();
            if (target.text) target.text.destroy();
          });
          this.targets = [];

          if (!this.allGameData || this.allGameData.length === 0) {
            console.error('No game data available');
            return;
          }

          // Select random word from game data
          const randomData = this.allGameData[Math.floor(Math.random() * this.allGameData.length)];
          
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

            // Create cat-like target (using circle with glow effect)
            const targetColor = target.isCorrect ? 0xffc107 : 0xff6b9d;
            
            // Outer glow
            const glow = this.add.circle(target.x, target.y, target.radius + 8, targetColor, 0.3);
            glow.setDepth(1);

            // Main circle
            target.graphics = this.add.circle(target.x, target.y, target.radius, targetColor);
            target.graphics.setInteractive(
              new Phaser.Geom.Circle(target.radius, target.radius, target.radius),
              Phaser.Geom.Circle.Contains
            );
            target.graphics.setDepth(2);
            target.glowGraphic = glow;

            // Create text for target (Sinhala meaning above)
            target.text = this.add.text(target.x, target.y, target.meaning, {
              fontSize: '13px',
              fill: '#ffffff',
              fontFamily: 'Arial',
              align: 'center',
              origin: [0.5, 0.5],
              wordWrap: { width: target.radius * 2 - 10 },
              boundsAlignH: 'center',
              boundsAlignV: 'middle',
            });
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
              } else {
                this.wrongCount += 1;
              }

              // Update display
              this.scoreText.setText(`Score: ${this.score}`);
              this.correctText.setText(`Correct: ${this.correctCount}`);
              this.wrongText.setText(`Wrong: ${this.wrongCount}`);

              // Destroy bullet and glow
              bullet.destroy();
              bulletGlow.destroy();

              // Remove target with fade effect
              this.tweens.add({
                targets: [target.graphics, target.glowGraphic, target.text],
                alpha: 0,
                duration: 300,
                ease: 'Power2.easeOut',
                onComplete: () => {
                  if (target.graphics) target.graphics.destroy();
                  if (target.glowGraphic) target.glowGraphic.destroy();
                  if (target.text) target.text.destroy();
                }
              });

              const targetIndex = this.targets.indexOf(target);
              if (targetIndex > -1) {
                this.targets.splice(targetIndex, 1);
              }

              // Start new round if all targets destroyed
              if (this.targets.length === 0) {
                this.time.delayedCall(800, () => {
                  this.startRound();
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
            if (target.glowGraphic) {
              target.glowGraphic.setPosition(target.x, target.y);
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
  }, []);

  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-col">
      <div className="absolute top-4 left-4 right-4 z-20">
        <h1 className="text-3xl font-bold text-white">Shooting Game</h1>
        <p className="text-sm text-gray-300 mt-1">Click on the target that matches the English word!</p>
      </div>
      <div
        ref={gameContainerRef}
        className="flex-1 w-full h-full"
        style={{
          width: '100vw',
          height: '100vh',
        }}
      ></div>
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-sm text-gray-400">
          🎯 Select the correct Sinhala translation • ⭐ Each correct answer = 10 points
        </p>
      </div>
    </div>
  );
}
