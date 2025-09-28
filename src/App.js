import React, { useState, useEffect } from 'react';
import { Play, Trophy, Star, Heart, Gift, Zap, Flame, Crown, Menu, X, BookOpen, Settings, Volume2, VolumeX, RefreshCw, Target, Award, Sparkles } from 'lucide-react';

const PythonLearningGame = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [coins, setCoins] = useState(100);
  const [playerLevel, setPlayerLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [combo, setCombo] = useState(0);
  const [gameState, setGameState] = useState('playing');
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [output, setOutput] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [showAchievement, setShowAchievement] = useState(null);
  const [dailyStreak, setDailyStreak] = useState(1);
  const [showHint, setShowHint] = useState(false);
  const [hintsRemaining, setHintsRemaining] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60);
  const [powerUps, setPowerUps] = useState({
    doubleXP: 0,
    extraLife: 0,
    timeFreeze: 0,
    hintBoost: 0
  });

  const levels = [
    {
      id: 1,
      title: "Magic Print Spell",
      world: "🏝️ Beginner Island",
      difficulty: "⭐",
      type: "fill_blank",
      question: "Complete the magic spell to print 'Hello World'",
      template: "___('Hello World')",
      answer: "print",
      expectedOutput: "Hello World",
      hint: "The magic word starts with 'p' and makes text appear!",
      points: 100,
      xpReward: 25,
      coins: 15,
      timeLimit: 45
    },
    {
      id: 2,
      title: "Hero Name Storage",
      world: "🏝️ Beginner Island",
      difficulty: "⭐",
      type: "fill_blank",
      question: "Store your hero name in a variable",
      template: "___ = 'Wizard'\\nprint(___)",
      answer: "name",
      expectedOutput: "Wizard",
      hint: "Variables store information. What would you call a hero's identifier?",
      points: 120,
      xpReward: 30,
      coins: 20,
      timeLimit: 50
    },
    {
      id: 3,
      title: "Potion Numbers",
      world: "🏝️ Beginner Island",
      difficulty: "⭐",
      type: "fill_blank",
      question: "Add two magic numbers together",
      template: "result = 10 ___ 5\\nprint(result)",
      answer: "+",
      expectedOutput: "15",
      hint: "What symbol do you use to add numbers together?",
      points: 110,
      xpReward: 28,
      coins: 18,
      timeLimit: 40
    },
    {
      id: 4,
      title: "Crystal List Quest",
      world: "💎 Crystal Caves",
      difficulty: "⭐⭐",
      type: "multiple_choice",
      question: "Which is the correct way to create a list of crystals?",
      options: [
        "crystals = ['red', 'blue', 'green']",
        "crystals = ('red', 'blue', 'green')",
        "crystals = red, blue, green",
        "crystals = {red: blue: green}"
      ],
      correctIndex: 0,
      expectedOutput: "['red', 'blue', 'green']",
      hint: "Lists use square brackets [ ] to hold multiple items",
      points: 150,
      xpReward: 40,
      coins: 25,
      timeLimit: 60
    },
    {
      id: 5,
      title: "Cave Counter",
      world: "💎 Crystal Caves",
      difficulty: "⭐⭐",
      type: "multiple_choice",
      question: "How do you count from 0 to 2?",
      options: [
        "for i in range(3):",
        "for i in count(3):",
        "for i in list(3):",
        "for i in numbers(3):"
      ],
      correctIndex: 0,
      expectedOutput: "0, 1, 2",
      hint: "The range() function creates a sequence of numbers",
      points: 140,
      xpReward: 35,
      coins: 22,
      timeLimit: 55
    },
    {
      id: 6,
      title: "Dragon Condition",
      world: "🐉 Dragon's Lair",
      difficulty: "⭐⭐⭐",
      type: "fill_blank",
      question: "Check if the dragon is defeated",
      template: "___ dragon_hp == 0:\\n    print('Victory!')",
      answer: "if",
      expectedOutput: "Victory!",
      hint: "What keyword do you use to check a condition?",
      points: 180,
      xpReward: 45,
      coins: 30,
      timeLimit: 65
    },
    {
      id: 7,
      title: "Treasure Key",
      world: "🐉 Dragon's Lair",
      difficulty: "⭐⭐⭐",
      type: "multiple_choice",
      question: "What unlocks the treasure chest?",
      options: [
        "if key == 'golden':",
        "if key = 'golden':",
        "if key === 'golden':",
        "if key is 'golden':"
      ],
      correctIndex: 0,
      expectedOutput: "Treasure unlocked!",
      hint: "Use == to compare values, not = (which assigns)",
      points: 170,
      xpReward: 42,
      coins: 28,
      timeLimit: 70
    },
    {
      id: 8,
      title: "Forest Function",
      world: "🌲 Magic Forest",
      difficulty: "⭐⭐⭐⭐",
      type: "fill_blank",
      question: "Create a function to cast spells",
      template: "___ cast_spell():\\n    return 'Abracadabra!'",
      answer: "def",
      expectedOutput: "Abracadabra!",
      hint: "What keyword defines a function in Python?",
      points: 200,
      xpReward: 50,
      coins: 35,
      timeLimit: 80
    },
    {
      id: 9,
      title: "Spell Length",
      world: "🌲 Magic Forest",
      difficulty: "⭐⭐⭐⭐",
      type: "multiple_choice",
      question: "How do you find the length of a spell list?",
      options: [
        "len(spells)",
        "length(spells)",
        "size(spells)",
        "count(spells)"
      ],
      correctIndex: 0,
      expectedOutput: "3",
      hint: "It's a short, 3-letter function name",
      points: 160,
      xpReward: 38,
      coins: 26,
      timeLimit: 75
    },
    {
      id: 10,
      title: "Final Boss Battle",
      world: "☁️ Sky Temple",
      difficulty: "⭐⭐⭐⭐⭐",
      type: "multiple_choice",
      question: "Complete the ultimate spell to defeat the boss:",
      options: [
        "def ultimate_spell(power): return power * 2",
        "function ultimate_spell(power) { return power * 2 }",
        "ultimate_spell(power) = power * 2",
        "create ultimate_spell with power return power * 2"
      ],
      correctIndex: 0,
      expectedOutput: "Boss defeated with ultimate power!",
      hint: "Functions in Python start with 'def' and use colons",
      points: 300,
      xpReward: 75,
      coins: 50,
      timeLimit: 90
    }
  ];

  const achievementList = [
    { id: 'first_spell', name: 'First Spell', desc: 'Complete your first challenge', icon: '🎯', requirement: 1 },
    { id: 'combo_master', name: 'Combo Master', desc: 'Get a 5x combo', icon: '🔥', requirement: 5 },
    { id: 'speed_demon', name: 'Speed Demon', desc: 'Complete a level in under 10 seconds', icon: '⚡', requirement: 1 },
    { id: 'perfectionist', name: 'Perfectionist', desc: 'Complete 5 levels without mistakes', icon: '💎', requirement: 5 },
    { id: 'coin_collector', name: 'Coin Collector', desc: 'Collect 500 coins', icon: '💰', requirement: 500 },
    { id: 'python_master', name: 'Python Master', desc: 'Complete all levels', icon: '👑', requirement: 10 }
  ];

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      handleTimeUp();
    }
  }, [timeLeft, gameState]);

  // Level progression effect
  useEffect(() => {
    const xpToNextLevel = playerLevel * 100;
    if (xp >= xpToNextLevel) {
      setPlayerLevel(prev => prev + 1);
      setXp(prev => prev - xpToNextLevel);
      setCoins(prev => prev + 50);
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
    }
  }, [xp, playerLevel]);

  // Achievement checking
  const checkAchievements = () => {
    const newAchievements = [];
    
    if (currentLevel >= 1 && !achievements.includes('first_spell')) {
      newAchievements.push('first_spell');
    }
    if (combo >= 5 && !achievements.includes('combo_master')) {
      newAchievements.push('combo_master');
    }
    if (coins >= 500 && !achievements.includes('coin_collector')) {
      newAchievements.push('coin_collector');
    }
    if (currentLevel >= levels.length && !achievements.includes('python_master')) {
      newAchievements.push('python_master');
    }

    newAchievements.forEach(id => {
      if (!achievements.includes(id)) {
        setAchievements(prev => [...prev, id]);
        const achievement = achievementList.find(a => a.id === id);
        setShowAchievement(achievement);
        setTimeout(() => setShowAchievement(null), 4000);
      }
    });
  };

  const handleTimeUp = () => {
    setLives(prev => prev - 1);
    setCombo(0);
    setStreak(0);
    setOutput("Time's up! ⏰");
    
    if (lives <= 1) {
      setGameState('lost');
    } else {
      resetTimer();
    }
  };

  const resetTimer = () => {
    const currentChallenge = levels[currentLevel] || levels[0];
    setTimeLeft(currentChallenge.timeLimit || 60);
  };

  const activatePowerUp = (type) => {
    if (powerUps[type] > 0) {
      setPowerUps(prev => ({ ...prev, [type]: prev[type] - 1 }));
      
      switch(type) {
        case 'extraLife':
          setLives(prev => Math.min(prev + 1, 5));
          break;
        case 'timeFreeze':
          setTimeLeft(prev => prev + 30);
          break;
        case 'hintBoost':
          setHintsRemaining(prev => prev + 2);
          break;
        default:
          break;
      }
    }
  };

  const buyPowerUp = (type, cost) => {
    if (coins >= cost) {
      setCoins(prev => prev - cost);
      setPowerUps(prev => ({ ...prev, [type]: prev[type] + 1 }));
    }
  };

  const handleAnswer = (userAnswer) => {
    const currentChallenge = levels[currentLevel];
    let isCorrect = false;

    if (currentChallenge.type === 'fill_blank') {
      isCorrect = userAnswer.toLowerCase().trim() === currentChallenge.answer.toLowerCase();
    } else if (currentChallenge.type === 'multiple_choice') {
      isCorrect = userAnswer === currentChallenge.correctIndex;
    }

    if (isCorrect) {
      const bonusMultiplier = 1 + (combo * 0.1) + (powerUps.doubleXP > 0 ? 1 : 0);
      const timeBonus = Math.max(0, timeLeft * 2);
      const earnedPoints = Math.floor((currentChallenge.points + timeBonus) * bonusMultiplier);
      const earnedCoins = currentChallenge.coins + (combo * 2);
      
      setScore(prev => prev + earnedPoints);
      setXp(prev => prev + currentChallenge.xpReward * (powerUps.doubleXP > 0 ? 2 : 1));
      setCoins(prev => prev + earnedCoins);
      setCombo(prev => prev + 1);
      setStreak(prev => {
        const newStreak = prev + 1;
        setBestStreak(current => Math.max(current, newStreak));
        return newStreak;
      });
      setOutput(currentChallenge.expectedOutput + ' ✨');
      
      if (powerUps.doubleXP > 0) {
        setPowerUps(prev => ({ ...prev, doubleXP: prev.doubleXP - 1 }));
      }

      checkAchievements();

      setTimeout(() => {
        if (currentLevel + 1 < levels.length) {
          setCurrentLevel(prev => prev + 1);
          setSelectedAnswer('');
          setOutput('');
          resetTimer();
        } else {
          setGameState('won');
        }
      }, 2000);
    } else {
      setLives(prev => prev - 1);
      setCombo(0);
      setStreak(0);
      setOutput('Try again! ❌');
      
      if (lives <= 1) {
        setGameState('lost');
      }
    }
  };

  const resetGame = () => {
    setCurrentLevel(0);
    setScore(0);
    setLives(3);
    setCoins(100);
    setPlayerLevel(1);
    setXp(0);
    setCombo(0);
    setStreak(0);
    setGameState('playing');
    setSelectedAnswer('');
    setOutput('');
    setHintsRemaining(3);
    resetTimer();
  };

  const currentChallenge = levels[currentLevel] || levels[0];
  const xpProgress = (xp / (playerLevel * 100)) * 100;

  // Achievement Modal
  if (showAchievement) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 md:p-8 rounded-3xl text-center text-white max-w-sm mx-auto animate-bounce">
          <div className="text-6xl mb-4">{showAchievement.icon}</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Achievement Unlocked!</h2>
          <h3 className="text-xl md:text-2xl font-bold mb-2">{showAchievement.name}</h3>
          <p className="text-sm md:text-base">{showAchievement.desc}</p>
        </div>
      </div>
    );
  }

  // Level Up Modal
  if (showLevelUp) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-6 md:p-8 rounded-3xl text-center text-black animate-pulse max-w-sm mx-auto">
          <Crown className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-2">LEVEL UP!</h2>
          <p className="text-xl md:text-2xl mb-2">Hero Level {playerLevel}!</p>
          <p className="text-base md:text-lg">+50 coins bonus! 💰</p>
        </div>
      </div>
    );
  }

  // Victory Screen
  if (gameState === 'won') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-yellow-600 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-12 text-center text-white max-w-lg mx-auto">
          <Trophy className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 text-yellow-400 animate-bounce" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4">🎉 LEGENDARY! 🎉</h1>
          <p className="text-2xl md:text-3xl mb-6">Python Master Achieved!</p>
          <div className="grid grid-cols-2 gap-4 mb-6 md:mb-8">
            <div className="bg-white/20 rounded-xl p-3 md:p-4">
              <p className="text-2xl md:text-4xl font-bold">{score}</p>
              <p className="text-xs md:text-sm">Final Score</p>
            </div>
            <div className="bg-white/20 rounded-xl p-3 md:p-4">
              <p className="text-2xl md:text-4xl font-bold">{bestStreak}</p>
              <p className="text-xs md:text-sm">Best Streak</p>
            </div>
          </div>
          <button 
            onClick={resetGame}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 md:px-10 py-3 md:py-4 rounded-xl font-bold text-lg md:text-xl transition-colors"
          >
            🚀 New Adventure
          </button>
        </div>
      </div>
    );
  }

  // Game Over Screen
  if (gameState === 'lost') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-800 to-black flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-12 text-center text-white max-w-md mx-auto">
          <div className="text-6xl md:text-8xl mb-6">💀</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Quest Failed!</h1>
          <p className="text-lg md:text-xl mb-6">Even heroes need practice!</p>
          <div className="bg-white/20 rounded-xl p-4 md:p-6 mb-6">
            <p className="text-2xl md:text-3xl font-bold mb-2">Score: {score}</p>
            <p className="text-base md:text-lg">Best Streak: {bestStreak}</p>
          </div>
          <button 
            onClick={resetGame}
            className="bg-red-500 hover:bg-red-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg transition-colors"
          >
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      {/* Mobile Header */}
      <div className="bg-black/20 backdrop-blur-sm p-3 md:p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden mr-3 p-2 rounded-lg bg-white/10"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl md:text-4xl font-bold flex items-center">
              <Zap className="w-6 h-6 md:w-12 md:h-12 mr-2 md:mr-3 text-yellow-400" />
              <span className="hidden sm:inline">PyQuest RPG</span>
              <span className="sm:hidden">PyQuest</span>
            </h1>
          </div>
          
          {/* Desktop Stats */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 rounded-full">
              <span className="text-lg font-bold">Hero Level {playerLevel}</span>
              <div className="w-24 bg-gray-700 rounded-full h-2 mt-1">
                <div 
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-500" 
                  style={{width: `${xpProgress}%`}} 
                />
              </div>
            </div>
            <div className="flex items-center bg-yellow-500/20 px-4 py-2 rounded-full">
              <Star className="w-6 h-6 mr-2" />
              <span className="text-2xl font-bold">{score}</span>
            </div>
            <div className="flex items-center bg-green-500/20 px-4 py-2 rounded-full">
              <span className="text-2xl mr-2">💰</span>
              <span className="text-2xl font-bold">{coins}</span>
            </div>
            <div className="flex items-center">
              {Array.from({length: 5}).map((_, i) => (
                <Heart 
                  key={i} 
                  className={`w-8 h-8 ${i < lives ? 'text-red-400 fill-current' : 'text-gray-600'}`} 
                />
              ))}
            </div>
          </div>

          {/* Mobile Stats */}
          <div className="flex md:hidden items-center space-x-2">
            <div className="text-center">
              <div className="text-xs text-gray-300">Score</div>
              <div className="text-lg font-bold">{score}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-300">Lives</div>
              <div className="text-lg">{lives} ❤️</div>
            </div>
          </div>
        </div>

        {/* Mobile Stats Bar */}
        <div className="md:hidden mt-3 flex justify-between text-sm">
          <div className="flex items-center">
            <span className="mr-2">Level {playerLevel}</span>
            <div className="w-16 bg-gray-700 rounded-full h-1">
              <div 
                className="bg-yellow-400 h-1 rounded-full transition-all duration-500" 
                style={{width: `${xpProgress}%`}} 
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span>💰 {coins}</span>
            <span>🔥 {streak}</span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 bg-black/80 z-40 flex">
          <div className="bg-gray-900 w-80 p-6 space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Menu</h2>
              <button onClick={() => setShowMobileMenu(false)} className="p-2">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-purple-500/20 p-4 rounded-xl">
                <h3 className="font-bold mb-2">🏆 Achievements</h3>
                <p className="text-sm text-gray-300">{achievements.length}/{achievementList.length} unlocked</p>
              </div>
              
              <div className="bg-blue-500/20 p-4 rounded-xl">
                <h3 className="font-bold mb-2">⚡ Power-ups</h3>
                <div className="space-y-2 text-sm">
                  <div>Extra Life: {powerUps.extraLife}</div>
                  <div>Time Freeze: {powerUps.timeFreeze}</div>
                  <div>Hint Boost: {powerUps.hintBoost}</div>
                </div>
              </div>
              
              <button 
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="w-full bg-gray-700 p-4 rounded-xl flex items-center justify-between"
              >
                <span>Sound Effects</span>
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setShowMobileMenu(false)} />
        </div>
      )}

      <div className="max-w-7xl mx-auto p-3 md:p-8">
        {/* Timer and Level Info */}
        <div className="mb-4 md:mb-6 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="text-center md:text-left">
            <h2 className="text-lg md:text-2xl font-bold">{currentChallenge.title}</h2>
            <p className="text-sm md:text-base text-gray-300">{currentChallenge.world} • {currentChallenge.difficulty}</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className={`px-4 py-2 rounded-full font-bold ${timeLeft <= 10 ? 'bg-red-500/20 text-red-300 animate-pulse' : 'bg-blue-500/20'}`}>
              ⏱️ {timeLeft}s
            </div>
            <div className="text-right">
              <div className="flex items-center text-yellow-400">
                <Star className="w-4 h-4 md:w-6 md:h-6 mr-1" />
                <span className="font-bold">{currentChallenge.points} pts</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Challenge Panel */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-lg rounded-2xl md:rounded-3xl p-4 md:p-8">
            <p className="text-base md:text-xl mb-4 md:mb-8">{currentChallenge.question}</p>

            {/* Challenge Input */}
            {currentChallenge.type === 'fill_blank' ? (
              <div className="space-y-4 md:space-y-6">
                <div className="bg-gray-900/50 p-3 md:p-6 rounded-xl md:rounded-2xl font-mono text-green-300 text-sm md:text-lg overflow-x-auto">
                  <pre>{currentChallenge.template.replace(/\\n/g, '\n')}</pre>
                </div>
                <input
                  type="text"
                  value={selectedAnswer}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full p-3 md:p-4 bg-gray-800/50 rounded-xl text-base md:text-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onKeyPress={(e) => e.key === 'Enter' && handleAnswer(selectedAnswer)}
                />
                <button
                  onClick={() => handleAnswer(selectedAnswer)}
                  className="w-full bg-green-600 hover:bg-green-700 px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-xl transition-colors flex items-center justify-center"
                >
                  <Play className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                  Cast Spell
                </button>
              </div>
            ) : (
              <div className="space-y-3 md:space-y-4">
                {currentChallenge.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full p-3 md:p-4 bg-purple-500/20 hover:bg-purple-500/40 rounded-xl text-left text-sm md:text-lg transition-colors border border-purple-500/30 hover:border-purple-400"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {/* Hint Section */}
            <div className="mt-4 md:mt-6 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex-1 bg-yellow-500/20 hover:bg-yellow-500/30 px-4 py-3 rounded-xl font-bold transition-colors flex items-center justify-center"
                >
                  💡 {showHint ? 'Hide Hint' : `Show Hint (${hintsRemaining} left)`}
                </button>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => activatePowerUp('timeFreeze')}
                    disabled={powerUps.timeFreeze === 0}
                    className="px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 disabled:bg-gray-500/20 rounded-xl font-bold transition-colors"
                  >
                    ⏰ {powerUps.timeFreeze}
                  </button>
                  <button
                    onClick={() => activatePowerUp('extraLife')}
                    disabled={powerUps.extraLife === 0}
                    className="px-4 py-3 bg-red-500/20 hover:bg-red-500/30 disabled:bg-gray-500/20 rounded-xl font-bold transition-colors"
                  >
                    ❤️ {powerUps.extraLife}
                  </button>
                </div>
              </div>

              {showHint && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 animate-slideDown">
                  <p className="text-yellow-200 flex items-start">
                    <span className="mr-2 mt-1">💡</span>
                    <span>{currentChallenge.hint}</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-4 md:space-y-6">
            {/* Output */}
            <div className="bg-black/40 backdrop-blur-lg rounded-2xl overflow-hidden">
              <div className="bg-gray-800/50 px-4 md:px-6 py-3">
                <span className="text-base md:text-lg font-bold">✨ Magic Output</span>
              </div>
              <div className="p-4 md:p-6 h-24 md:h-32 flex items-center justify-center">
                <pre className="text-green-300 font-mono text-sm md:text-xl text-center">
                  {output || '🔮 Cast your spell to see the magic...'}
                </pre>
              </div>
            </div>

            {/* Power-up Shop */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold mb-4">🏪 Power-up Shop</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-500/20 rounded-xl">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">❤️</span>
                    <div>
                      <div className="font-bold text-sm">Extra Life</div>
                      <div className="text-xs text-gray-300">50 coins</div>
                    </div>
                  </div>
                  <button
                    onClick={() => buyPowerUp('extraLife', 50)}
                    disabled={coins < 50}
                    className="px-3 py-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-500 rounded-lg text-sm font-bold transition-colors"
                  >
                    Buy
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-500/20 rounded-xl">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">⏰</span>
                    <div>
                      <div className="font-bold text-sm">Time Freeze</div>
                      <div className="text-xs text-gray-300">30 coins</div>
                    </div>
                  </div>
                  <button
                    onClick={() => buyPowerUp('timeFreeze', 30)}
                    disabled={coins < 30}
                    className="px-3 py-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-500 rounded-lg text-sm font-bold transition-colors"
                  >
                    Buy
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-500/20 rounded-xl">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">⚡</span>
                    <div>
                      <div className="font-bold text-sm">Double XP</div>
                      <div className="text-xs text-gray-300">40 coins</div>
                    </div>
                  </div>
                  <button
                    onClick={() => buyPowerUp('doubleXP', 40)}
                    disabled={coins < 40}
                    className="px-3 py-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-500 rounded-lg text-sm font-bold transition-colors"
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 md:p-6">
              <h3 className="text-lg md:text-2xl font-bold mb-4">🗺️ Quest Progress</h3>
              <div className="space-y-2 md:space-y-3 max-h-64 overflow-y-auto">
                {levels.map((level, index) => {
                  const isCompleted = index < currentLevel;
                  const isCurrent = index === currentLevel;
                  const isLocked = index > currentLevel;
                  
                  return (
                    <div key={level.id} className={`flex items-center p-2 md:p-3 rounded-xl transition-colors ${
                      isCompleted ? 'bg-green-500/20 border border-green-500/50' :
                      isCurrent ? 'bg-yellow-500/20 border border-yellow-500/50' :
                      'bg-gray-500/20'
                    }`}>
                      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mr-3 md:mr-4 font-bold text-sm ${
                        isCompleted ? 'bg-green-500 text-white' :
                        isCurrent ? 'bg-yellow-500 text-black' :
                        'bg-gray-600 text-gray-400'
                      }`}>
                        {isCompleted ? '✓' : 
                         isCurrent ? '🎯' : 
                         isLocked ? '🔒' : index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-bold text-sm md:text-base truncate ${isLocked ? 'text-gray-400' : 'text-white'}`}>
                          {level.title}
                        </p>
                        <p className={`text-xs md:text-sm truncate ${isLocked ? 'text-gray-500' : 'text-gray-300'}`}>
                          {level.world} • {level.difficulty}
                        </p>
                      </div>
                      {isCompleted && <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold mb-4">📊 Stats</h3>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-orange-500/20 p-3 rounded-xl">
                  <div className="text-xl md:text-2xl font-bold">{streak}</div>
                  <div className="text-xs md:text-sm text-gray-300">Current Streak</div>
                </div>
                <div className="bg-red-500/20 p-3 rounded-xl">
                  <div className="text-xl md:text-2xl font-bold">{bestStreak}</div>
                  <div className="text-xs md:text-sm text-gray-300">Best Streak</div>
                </div>
                <div className="bg-purple-500/20 p-3 rounded-xl">
                  <div className="text-xl md:text-2xl font-bold">{achievements.length}</div>
                  <div className="text-xs md:text-sm text-gray-300">Achievements</div>
                </div>
                <div className="bg-green-500/20 p-3 rounded-xl">
                  <div className="text-xl md:text-2xl font-bold">{dailyStreak}</div>
                  <div className="text-xs md:text-sm text-gray-300">Daily Streak</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Combo Display */}
      {combo > 1 && (
        <div className="fixed top-1/2 right-4 md:right-8 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500 px-4 md:px-8 py-3 md:py-4 rounded-full animate-bounce z-10">
          <div className="flex items-center text-white font-bold text-lg md:text-2xl">
            <Flame className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3" />
            {combo}x COMBO! 🔥
          </div>
        </div>
      )}

      {/* Time Warning */}
      {timeLeft <= 10 && timeLeft > 0 && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 px-6 py-3 rounded-full animate-pulse z-10">
          <div className="text-white font-bold text-xl">
            ⏰ {timeLeft} seconds left!
          </div>
        </div>
      )}
    </div>
  );
};

export default PythonLearningGame;