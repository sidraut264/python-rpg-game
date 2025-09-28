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
  const [gameState, setGameState] = useState('welcome');
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
  const [showFeedback, setShowFeedback] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [screenShake, setScreenShake] = useState(false);
  const [showFloatingPoints, setShowFloatingPoints] = useState([]);

  const levels = [
    // 1-5: Printing & Variables
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
      title: "Store Hero Name",
      world: "🏝️ Beginner Island",
      difficulty: "⭐",
      type: "fill_blank",
      question: "Create a variable called 'name' to store your hero’s title.",
      template: "___ = 'Wizard'\\nprint(___)",
      answer: "name",
      expectedOutput: "Wizard",
      hint: "Use the word 'name' as your variable to keep it simple.",
      points: 120,
      xpReward: 30,
      coins: 20,
      timeLimit: 50
    },
    {
      id: 3,
      title: "Print Number",
      world: "🏝️ Beginner Island",
      difficulty: "⭐",
      type: "fill_blank",
      question: "Print the number 42.",
      template: "print(___)",
      answer: "42",
      expectedOutput: "42",
      hint: "Numbers do not need quotes.",
      points: 100,
      xpReward: 20,
      coins: 10,
      timeLimit: 40
    },
    {
      id: 4,
      title: "Input Name",
      world: "🏝️ Beginner Island",
      difficulty: "⭐",
      type: "fill_blank",
      question: "Take input from the user and print it.",
      template: "name = ___('Enter your name: ')\\nprint(name)",
      answer: "input",
      expectedOutput: "Whatever the user types",
      hint: "Use input() to read user input.",
      points: 140,
      xpReward: 36,
      coins: 24,
      timeLimit: 55
    },
    {
      id: 5,
      title: "Variable Reassign",
      world: "🏝️ Beginner Island",
      difficulty: "⭐",
      type: "fill_blank",
      question: "Change x from 5 to 10.",
      template: "x = 5\\nx = ___\\nprint(x)",
      answer: "10",
      expectedOutput: "10",
      hint: "Just assign a new value.",
      points: 120,
      xpReward: 28,
      coins: 18,
      timeLimit: 50
    },

    // 6-10: Arithmetic Operators
    {
      id: 6,
      title: "Add Numbers",
      world: "🏝️ Beginner Island",
      difficulty: "⭐",
      type: "fill_blank",
      question: "Add 7 and 3.",
      template: "result = 7 ___ 3\\nprint(result)",
      answer: "+",
      expectedOutput: "10",
      hint: "Use + for addition.",
      points: 110,
      xpReward: 25,
      coins: 15,
      timeLimit: 40
    },
    {
      id: 7,
      title: "Subtract Numbers",
      world: "🏝️ Beginner Island",
      difficulty: "⭐",
      type: "fill_blank",
      question: "Subtract 5 from 12.",
      template: "result = 12 ___ 5\\nprint(result)",
      answer: "-",
      expectedOutput: "7",
      hint: "Use - for subtraction.",
      points: 110,
      xpReward: 25,
      coins: 15,
      timeLimit: 40
    },
    {
      id: 8,
      title: "Multiply Numbers",
      world: "🏝️ Beginner Island",
      difficulty: "⭐",
      type: "fill_blank",
      question: "Multiply 6 by 4.",
      template: "result = 6 ___ 4\\nprint(result)",
      answer: "*",
      expectedOutput: "24",
      hint: "Use * for multiplication.",
      points: 115,
      xpReward: 26,
      coins: 16,
      timeLimit: 45
    },
    {
      id: 9,
      title: "Divide Numbers",
      world: "🏝️ Beginner Island",
      difficulty: "⭐",
      type: "fill_blank",
      question: "Divide 20 by 4.",
      template: "result = 20 ___ 4\\nprint(result)",
      answer: "/",
      expectedOutput: "5.0",
      hint: "Use / for division.",
      points: 120,
      xpReward: 28,
      coins: 18,
      timeLimit: 45
    },
    {
      id: 10,
      title: "Modulus",
      world: "🏝️ Beginner Island",
      difficulty: "⭐",
      type: "fill_blank",
      question: "Get the remainder of 10 divided by 3.",
      template: "result = 10 ___ 3\\nprint(result)",
      answer: "%",
      expectedOutput: "1",
      hint: "Use % to find the remainder.",
      points: 125,
      xpReward: 30,
      coins: 20,
      timeLimit: 45
    },

    // 11-15: Strings and concatenation
    {
      id: 11,
      title: "String Join",
      world: "💎 Crystal Caves",
      difficulty: "⭐⭐",
      type: "fill_blank",
      question: "Join 'Hello' and 'World'.",
      template: "result = 'Hello' ___ 'World'\\nprint(result)",
      answer: "+",
      expectedOutput: "HelloWorld",
      hint: "Use + to join strings.",
      points: 145,
      xpReward: 38,
      coins: 25,
      timeLimit: 55
    },
    {
      id: 12,
      title: "MCQ: String Uppercase",
      world: "💎 Crystal Caves",
      difficulty: "⭐⭐",
      type: "multiple_choice",
      question: "Which method converts 'python' to uppercase?",
      options: [
        "word.upper()",
        "word.upcase()",
        "word.toUpper()",
        "word.capitalize()"
      ],
      correctIndex: 0,
      expectedOutput: "PYTHON",
      hint: "In Python, the method to convert letters to uppercase is short and simple.",
      points: 150,
      xpReward: 40,
      coins: 26,
      timeLimit: 60
    },
    {
      id: 13,
      title: "MCQ: String Slice",
      world: "💎 Crystal Caves",
      difficulty: "⭐⭐",
      type: "multiple_choice",
      question: "How do you get the first 3 letters of 'Python'?",
      options: [
        "word[0:3]",
        "word[:3]",
        "word[0-3]",
        "word[1:4]"
      ],
      correctIndex: 0,
      expectedOutput: "Pyt",
      hint: "Use slicing with start:end format, indexing starts at 0.",
      points: 155,
      xpReward: 42,
      coins: 27,
      timeLimit: 60
    },
    {
      id: 14,
      title: "MCQ: List Creation",
      world: "💎 Crystal Caves",
      difficulty: "⭐⭐",
      type: "multiple_choice",
      question: "Which creates a list of numbers 1, 2, 3?",
      options: [
        "nums = [1, 2, 3]",
        "nums = (1, 2, 3)",
        "nums = 1, 2, 3",
        "nums = {1:2:3}"
      ],
      correctIndex: 0,
      expectedOutput: "[1, 2, 3]",
      hint: "Lists use square brackets.",
      points: 160,
      xpReward: 44,
      coins: 28,
      timeLimit: 60
    },
    {
      id: 15,
      title: "MCQ: Access List",
      world: "💎 Crystal Caves",
      difficulty: "⭐⭐",
      type: "multiple_choice",
      question: "Print second item of [5,10,15]:",
      options: [
        "nums[0]",
        "nums[1]",
        "nums[2]",
        "nums[3]"
      ],
      correctIndex: 1,
      expectedOutput: "10",
      hint: "Indexing starts at 0.",
      points: 165,
      xpReward: 46,
      coins: 29,
      timeLimit: 60
    },

    // 16-20: Loops
    {
      id: 16,
      title: "List Append",
      world: "💎 Crystal Caves",
      difficulty: "⭐⭐",
      type: "fill_blank",
      question: "Add 4 to list [1,2,3].",
      template: "nums = [1, 2, 3]\\nnums.___(4)\\nprint(nums)",
      answer: "append",
      expectedOutput: "[1, 2, 3, 4]",
      hint: "Use append() to add items.",
      points: 170,
      xpReward: 48,
      coins: 30,
      timeLimit: 65
    },
    {
      id: 17,
      title: "MCQ: For Loop",
      world: "🐉 Dragon's Lair",
      difficulty: "⭐⭐⭐",
      type: "multiple_choice",
      question: "Print numbers 0-4?",
      options: [
        "for i in range(5): print(i)",
        "for i in 5: print(i)",
        "for i to 5: print(i)",
        "loop i in range(5): print(i)"
      ],
      correctIndex: 0,
      expectedOutput: "0 1 2 3 4",
      hint: "Use range() for sequences.",
      points: 175,
      xpReward: 50,
      coins: 32,
      timeLimit: 70
    },
    {
      id: 18,
      title: "While Loop",
      world: "🐉 Dragon's Lair",
      difficulty: "⭐⭐⭐",
      type: "fill_blank",
      question: "Repeat until count reaches 3.",
      template: "count = 0\\n___ count < 3:\\n    print(count)\\n    count += 1",
      answer: "while",
      expectedOutput: "0\\n1\\n2",
      hint: "Use while for repeating until a condition is false.",
      points: 180,
      xpReward: 52,
      coins: 34,
      timeLimit: 70
    },
    {
      id: 19,
      title: "MCQ: If Statement",
      world: "🐉 Dragon's Lair",
      difficulty: "⭐⭐⭐",
      type: "multiple_choice",
      question: "Print 'Big' if x>5. Which is correct?",
      options: [
        "if x > 5 print('Big')",
        "if x > 5: print('Big')",
        "if x > 5 then print('Big')",
        "if x > 5 -> print('Big')"
      ],
      correctIndex: 1,
      expectedOutput: "Big",
      hint: "Use colon after the condition.",
      points: 185,
      xpReward: 54,
      coins: 35,
      timeLimit: 75
    },
    {
      id: 20,
      title: "MCQ: If Else",
      world: "🐉 Dragon's Lair",
      difficulty: "⭐⭐⭐",
      type: "multiple_choice",
      question: "Which code correctly prints 'Even' if number % 2 == 0, else prints 'Odd'?",
      options: [
        "if number % 2 == 0:\n    print('Even')\nelse:\n    print('Odd')",
        "if number % 2 == 0: print('Even') else: print('Odd')",
        "if number % 2 == 0 then: print('Even') else: print('Odd')",
        "if number % 2 == 0: print('Even') otherwise: print('Odd')"
      ],
      correctIndex: 0,
      expectedOutput: "Even  // if number is divisible by 2\nOdd   // if number is not divisible by 2",
      hint: "In Python, else must be on a new line after the if block.",
      points: 190,
      xpReward: 56,
      coins: 36,
      timeLimit: 75
    },


    // 21-25: Logic & Functions
    {
      id: 21,
      title: "Logical AND",
      world: "🌲 Magic Forest",
      difficulty: "⭐⭐⭐⭐",
      type: "fill_blank",
      question: "Check if age >=18 AND has_id is True.",
      template: "if age >= 18 ___ has_id:\\n    print('Access granted')",
      answer: "and",
      expectedOutput: "Access granted",
      hint: "Use 'and' to combine conditions.",
      points: 195,
      xpReward: 58,
      coins: 37,
      timeLimit: 80
    },
    {
      id: 22,
      title: "Logical OR",
      world: "🌲 Magic Forest",
      difficulty: "⭐⭐⭐⭐",
      type: "fill_blank",
      question: "Check if x==0 OR y==0.",
      template: "if x == 0 ___ y == 0:\\n    print('Zero found')",
      answer: "or",
      expectedOutput: "Zero found",
      hint: "Use 'or' if any condition can be True.",
      points: 200,
      xpReward: 60,
      coins: 38,
      timeLimit: 80
    },
    {
      id: 23,
      title: "Not Operator",
      world: "🌲 Magic Forest",
      difficulty: "⭐⭐⭐⭐",
      type: "fill_blank",
      question: "Check if is_raining is False.",
      template: "if ___ is_raining:\\n    print('No rain')",
      answer: "not",
      expectedOutput: "No rain",
      hint: "Use not to flip True/False.",
      points: 205,
      xpReward: 62,
      coins: 39,
      timeLimit: 80
    },
    {
      id: 24,
      title: "Define Function",
      world: "🌲 Magic Forest",
      difficulty: "⭐⭐⭐⭐",
      type: "fill_blank",
      question: "Define a function greet with parameter name.",
      template: "___ greet(name):\\n    print('Hello', name)",
      answer: "def",
      expectedOutput: "Hello <name>",
      hint: "Functions start with def.",
      points: 210,
      xpReward: 64,
      coins: 40,
      timeLimit: 85
    },
    {
      id: 25,
      title: "MCQ: Function Call",
      world: "☁️ Sky Temple",
      difficulty: "⭐⭐⭐⭐⭐",
      type: "multiple_choice",
      question: "Which calls greet('Alice') correctly?",
      options: [
        "greet('Alice')",
        "call greet('Alice')",
        "greet = 'Alice'",
        "def greet('Alice')"
      ],
      correctIndex: 0,
      expectedOutput: "Hello Alice",
      hint: "Use the function name followed by parentheses to call it.",
      points: 215,
      xpReward: 66,
      coins: 41,
      timeLimit: 85
    },
    // 26-30: Modules, Comments, Misc Basics
    {
      id: 26,
      title: "Import Module",
      world: "☁️ Sky Temple",
      difficulty: "⭐⭐⭐⭐⭐",
      type: "fill_blank",
      question: "Import the math module.",
      template: "___ math",
      answer: "import",
      expectedOutput: "Module imported",
      hint: "Use import followed by module name.",
      points: 220,
      xpReward: 68,
      coins: 42,
      timeLimit: 85
    },
    {
      id: 27,
      title: "Use Math Function",
      world: "☁️ Sky Temple",
      difficulty: "⭐⭐⭐⭐⭐",
      type: "fill_blank",
      question: "Print square root of 16 using math module.",
      template: "import math\\nprint(math.___(16))",
      answer: "sqrt",
      expectedOutput: "4.0",
      hint: "The square root function in math is sqrt().",
      points: 225,
      xpReward: 70,
      coins: 44,
      timeLimit: 85
    },
    {
      id: 28,
      title: "MCQ: Comment",
      world: "☁️ Sky Temple",
      difficulty: "⭐⭐⭐⭐⭐",
      type: "multiple_choice",
      question: "Which is a correct comment in Python?",
      options: [
        "// This is a comment",
        "# This is a comment",
        "<!-- Comment -->",
        "/* Comment */"
      ],
      correctIndex: 1,
      expectedOutput: "No output, just comment",
      hint: "Python uses # for single-line comments.",
      points: 230,
      xpReward: 72,
      coins: 45,
      timeLimit: 90
    },
    {
      id: 29,
      title: "MCQ: Random Number",
      world: "☁️ Sky Temple",
      difficulty: "⭐⭐⭐⭐⭐",
      type: "multiple_choice",
      question: "Generate a random number between 1 and 10:",
      options: [
        "random.randint(1,10)",
        "random(1,10)",
        "randint.random(1,10)",
        "rand(1,10)"
      ],
      correctIndex: 0,
      expectedOutput: "Random number between 1 and 10",
      hint: "Use randint from random module.",
      points: 235,
      xpReward: 74,
      coins: 46,
      timeLimit: 90
    },
    {
      id: 30,
      title: "MCQ: Correct Syntax",
      world: "☁️ Sky Temple",
      difficulty: "⭐⭐⭐⭐⭐",
      type: "multiple_choice",
      question: "Which is the correct Python syntax?",
      options: [
        "for i in range(5) print(i)",
        "for i in range(5): print(i)",
        "for i to range(5): print(i)",
        "for i = 0; i<5; i++: print(i)"
      ],
      correctIndex: 1,
      expectedOutput: "0 1 2 3 4",
      hint: "Python uses colons to start code blocks.",
      points: 240,
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
    triggerFeedback(false, "⏰ Time's up! You need to be faster!");
    setOutput("Time's up! ⏰");

    if (lives <= 1) {
      setTimeout(() => setGameState('lost'), 1500);
    } else {
      resetTimer();
    }
  };

  const showFloatingPoint = (points, type = 'points') => {
    const id = Date.now() + Math.random();
    const newFloatingPoint = {
      id,
      points,
      type,
      x: Math.random() * 200 - 100,
      y: 0
    };

    setShowFloatingPoints(prev => [...prev, newFloatingPoint]);

    setTimeout(() => {
      setShowFloatingPoints(prev => prev.filter(fp => fp.id !== id));
    }, 2000);
  };

  const triggerFeedback = (isCorrect, message = '') => {
    if (isCorrect) {
      setShowFeedback('success');
      setFeedbackMessage(message || '🎉 Correct! Well done!');
      if (soundEnabled) {
        console.log('🔊 Success sound effect');
      }
    } else {
      setShowFeedback('wrong');
      setFeedbackMessage(message || '❌ Wrong answer! Try again!');
      setScreenShake(true);
      if (soundEnabled) {
        console.log('🔊 Error sound effect');
      }
      setTimeout(() => setScreenShake(false), 600);
    }

    setTimeout(() => {
      setShowFeedback(null);
      setFeedbackMessage('');
    }, isCorrect ? 2000 : 3000);
  };

  const resetTimer = () => {
    const currentChallenge = levels[currentLevel] || levels[0];
    setTimeLeft(currentChallenge.timeLimit || 60);
  };

  const activatePowerUp = (type) => {
    if (powerUps[type] > 0) {
      setPowerUps(prev => ({ ...prev, [type]: prev[type] - 1 }));

      switch (type) {
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
      const xpEarned = currentChallenge.xpReward * (powerUps.doubleXP > 0 ? 2 : 1);

      // showFloatingPoint(`+${earnedPoints}`, 'points');
      // showFloatingPoint(`+${earnedCoins}`, 'coins');
      // showFloatingPoint(`+${xpEarned}`, 'xp');
      // if (combo > 0) {
      //   showFloatingPoint(`${combo + 1}x COMBO!`, 'combo');
      // }

      setScore(prev => prev + earnedPoints);
      setXp(prev => prev + xpEarned);
      setCoins(prev => prev + earnedCoins);
      setCombo(prev => prev + 1);
      setStreak(prev => {
        const newStreak = prev + 1;
        setBestStreak(current => Math.max(current, newStreak));
        return newStreak;
      });

      const successMessages = [
        '🎉 Excellent! You\'re a coding wizard!',
        '✨ Perfect! Your Python skills are growing!',
        '🔥 Amazing! Keep up the great work!',
        '🌟 Fantastic! You nailed it!',
        '⚡ Brilliant! Python mastery in progress!',
        '🎯 Bull\'s eye! Coding like a pro!'
      ];
      const randomMessage = successMessages[Math.floor(Math.random() * successMessages.length)];

      setOutput(currentChallenge.expectedOutput + ' ✨');
      triggerFeedback(true, randomMessage);

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
      }, 2500);
    } else {
      setLives(prev => prev - 1);
      setCombo(0);
      setStreak(0);

      const wrongMessages = [
        '❌ Not quite right! Think it through again!',
        '🤔 Close, but not correct! Give it another try!',
        '💭 Hmm, that\'s not it! Check your logic!',
        '🎯 Almost there! Review the hint and try again!',
        '📚 Keep learning! You\'ll get it next time!',
        '⚠️ Oops! Double-check your answer!'
      ];
      const randomMessage = wrongMessages[Math.floor(Math.random() * wrongMessages.length)];

      setOutput('Try again! ❌');
      triggerFeedback(false, randomMessage);

      if (lives <= 1) {
        setTimeout(() => setGameState('lost'), 1500);
      }
    }
  };

  const startGame = () => {
    setGameState('playing');
    resetTimer();
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
    setGameState('welcome');
    setSelectedAnswer('');
    setOutput('');
    setHintsRemaining(3);
    resetTimer();
  };

  const currentChallenge = levels[currentLevel] || levels[0];
  const xpProgress = (xp / (playerLevel * 100)) * 100;

  // Welcome Screen
  if (gameState === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-10 text-center text-white max-w-md w-full relative overflow-hidden">

          {/* Animated background elements */}
          <div className="absolute -top-8 -left-8 w-16 h-16 bg-yellow-400/20 rounded-full animate-bounce"></div>
          <div className="absolute -top-4 -right-6 w-12 h-12 bg-purple-400/20 rounded-full animate-bounce delay-300"></div>
          <div className="absolute -bottom-8 -left-6 w-10 h-10 bg-green-400/20 rounded-full animate-bounce delay-500"></div>
          <div className="absolute -bottom-6 -right-8 w-20 h-20 bg-pink-400/20 rounded-full animate-bounce delay-700"></div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full">

            <div className="flex items-center justify-center mb-6">
              <Zap className="w-16 h-16 md:w-20 md:h-20 mr-3 text-yellow-400 animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                PyQuest
              </h1>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-300">
              🐍 RPG Adventure 🎮
            </h2>

            <p className="text-base md:text-lg mb-6 text-gray-300 leading-relaxed">
              Embark on an epic coding journey! Master Python magic through
              <span className="text-yellow-400 font-bold"> 10 challenging quests</span>. Level up your hero, collect coins, and unlock achievements!
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 w-full">
              <div className="bg-purple-500/20 p-3 rounded-lg border border-purple-500/30 flex flex-col items-center">
                <div className="text-3xl mb-1">🏝️</div>
                <h3 className="font-bold text-yellow-300 text-sm md:text-base">Epic Worlds</h3>
                <p className="text-xs md:text-sm text-gray-300 text-center">From Beginner Island to Sky Temple</p>
              </div>
              <div className="bg-blue-500/20 p-3 rounded-lg border border-blue-500/30 flex flex-col items-center">
                <div className="text-3xl mb-1">⚡</div>
                <h3 className="font-bold text-yellow-300 text-sm md:text-base">Power-ups</h3>
                <p className="text-xs md:text-sm text-gray-300 text-center">Extra lives, time freeze & more!</p>
              </div>
              <div className="bg-green-500/20 p-3 rounded-lg border border-green-500/30 flex flex-col items-center">
                <div className="text-3xl mb-1">🏆</div>
                <h3 className="font-bold text-yellow-300 text-sm md:text-base">Achievements</h3>
                <p className="text-xs md:text-sm text-gray-300 text-center">Unlock legendary rewards</p>
              </div>
            </div>

            {/* Start button */}
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold text-lg md:text-xl transition-transform duration-200 transform hover:scale-105 active:scale-95 shadow-lg flex items-center"
            >
              <Play className="w-6 h-6 md:w-7 md:h-7 mr-2" />
              🚀 Start Your Quest!
            </button>

            {/* Subtitle */}
            <p className="text-sm md:text-base text-gray-400 mt-4">
              Ready to become a Python wizard? Click above to begin your adventure!
            </p>

            {/* Minimal animated sparkles */}
            <div className="absolute top-1/4 left-1/4 text-yellow-400 text-xl animate-ping">✨</div>
            <div className="absolute top-1/3 right-1/4 text-purple-400 text-lg animate-ping delay-500">⭐</div>
            <div className="absolute bottom-1/4 left-1/3 text-pink-400 text-2xl animate-ping delay-1000">🌟</div>
            <div className="absolute bottom-1/3 right-1/3 text-green-400 text-lg animate-ping delay-700">✨</div>
          </div>
        </div>
      </div>
    );
  }

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
    <div className={`min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white ${screenShake ? 'animate-pulse' : ''}`}>
      {showFloatingPoints.map((fp) => (
        <div
          key={fp.id}
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50 font-bold text-2xl animate-bounce
            ${fp.type === 'points' ? 'text-yellow-400' :
              fp.type === 'coins' ? 'text-green-400' :
                fp.type === 'xp' ? 'text-purple-400' :
                  'text-orange-400'
            }`}
          style={{
            transform: `translate(${fp.x}px, ${fp.y - 50}px)`,
            animation: 'floatUp 2s ease-out forwards'
          }}
        >
          {fp.points}
        </div>
      ))}

      {showFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 pointer-events-none">
          <div className={`text-center p-8 rounded-3xl max-w-lg mx-4 animate-bounce relative
            ${showFeedback === 'success'
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-green-500/50'
              : 'bg-gradient-to-r from-red-500 to-rose-500 shadow-red-500/50'
            } shadow-2xl`}>
            <div className={`text-6xl md:text-8xl mb-4 
              ${showFeedback === 'success' ? 'animate-spin' : 'animate-pulse'}`}>
              {showFeedback === 'success' ? '🎉' : '❌'}
            </div>
            <h2 className={`text-2xl md:text-4xl font-bold mb-4 text-white
              ${showFeedback === 'success' ? '' : 'animate-pulse'}`}>
              {showFeedback === 'success' ? 'CORRECT!' : 'WRONG ANSWER!'}
            </h2>
            <p className="text-lg md:text-xl text-white/90">
              {feedbackMessage}
            </p>

            {showFeedback === 'success' && (
              <>
                <div className="absolute -top-4 -left-4 text-yellow-400 text-3xl animate-bounce">⭐</div>
                <div className="absolute -top-2 -right-6 text-yellow-400 text-2xl animate-bounce">✨</div>
                <div className="absolute -bottom-4 -left-2 text-yellow-400 text-4xl animate-bounce">🌟</div>
                <div className="absolute -bottom-2 -right-4 text-yellow-400 text-2xl animate-bounce">⚡</div>
              </>
            )}

            {showFeedback === 'wrong' && (
              <div className="absolute inset-0 border-4 border-red-400 rounded-3xl animate-pulse"></div>
            )}
          </div>
        </div>
      )}

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

          <div className="hidden md:flex items-center space-x-6">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 rounded-full">
              <span className="text-lg font-bold">Hero Level {playerLevel}</span>
              <div className="w-24 bg-gray-700 rounded-full h-2 mt-1">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${xpProgress}%` }}
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
              {Array.from({ length: 5 }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-8 h-8 ${i < lives ? 'text-red-400 fill-current' : 'text-gray-600'}`}
                />
              ))}
            </div>
          </div>

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

        <div className="md:hidden mt-3 flex justify-between text-sm">
          <div className="flex items-center">
            <span className="mr-2">Level {playerLevel}</span>
            <div className="w-16 bg-gray-700 rounded-full h-1">
              <div
                className="bg-yellow-400 h-1 rounded-full transition-all duration-500"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span>💰 {coins}</span>
            <span>🔥 {streak}</span>
          </div>
        </div>
      </div>

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
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-lg rounded-2xl md:rounded-3xl p-4 md:p-8">
            <p className="text-base md:text-xl mb-4 md:mb-8">{currentChallenge.question}</p>

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
                  className="w-full bg-green-600 hover:bg-green-700 px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-xl transition-all duration-200 flex items-center justify-center transform hover:scale-105 active:scale-95"
                >
                  <Play className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                  Cast Spell ✨
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
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                  <p className="text-yellow-200 flex items-start">
                    <span className="mr-2 mt-1">💡</span>
                    <span>{currentChallenge.hint}</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
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

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 md:p-6">
              <h3 className="text-lg md:text-2xl font-bold mb-4">🗺️ Quest Progress</h3>
              <div className="space-y-2 md:space-y-3 max-h-64 overflow-y-auto">
                {levels.map((level, index) => {
                  const isCompleted = index < currentLevel;
                  const isCurrent = index === currentLevel;
                  const isLocked = index > currentLevel;

                  return (
                    <div key={level.id} className={`flex items-center p-2 md:p-3 rounded-xl transition-colors ${isCompleted ? 'bg-green-500/20 border border-green-500/50' :
                      isCurrent ? 'bg-yellow-500/20 border border-yellow-500/50' :
                        'bg-gray-500/20'
                      }`}>
                      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mr-3 md:mr-4 font-bold text-sm ${isCompleted ? 'bg-green-500 text-white' :
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

      {combo > 1 && (
        <div className="fixed top-1/2 right-4 md:right-8 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500 px-4 md:px-8 py-3 md:py-4 rounded-full animate-bounce z-10">
          <div className="flex items-center text-white font-bold text-lg md:text-2xl">
            <Flame className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3" />
            {combo}x
          </div>
        </div>
      )}

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