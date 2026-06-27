
import './App.css';
import React, { useState, useEffect } from 'react';
import loge_m from './loge_m.png'
import { Home, Target, Zap, Brain, Trophy, User, Settings, Star, Award, Crown, TrendingUp, Clock, Play, ChevronRight, X, Check, AlertCircle } from 'lucide-react';

const FootballMentalTrainingApp = () => {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [streak, setStreak] = useState(7);
  const [playerLevel, setPlayerLevel] = useState(12);
  const [xp, setXp] = useState(2450);
  const [gameActive, setGameActive] = useState(false);
  const [reactionTime, setReactionTime] = useState(null);
  const [memorySequence, setMemorySequence] = useState([]);
  const [showSequence, setShowSequence] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // Uploaded logo image embedded as base64 data URI
  const logoUrl = loge_m;
  
  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('onboarding');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  // Splash Screen
  const SplashScreen = () => (
    <div className="screen splash-screen">
      <div className="splash-content">
        <div className="logo-container">
          <img src={logoUrl} alt="Logo" className="app-logo" />
          <div className="glow-effect"></div>
        </div>
        <h1 className="app-title-ar">لعبتنا تجمعنا</h1>
        <p className="app-subtitle">التدريب الذهني للاعبين</p>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      </div>
    </div>
  );

  // Onboarding Screen
  const OnboardingScreen = () => {
    const slides = [
      {
        icon: '🎯',
        title: 'طور تركيزك',
        description: 'تمارين ذهنية متقدمة لتحسين التركيز والانتباه في الملعب'
      },
      {
        icon: '⚡',
        title: 'سرعة الاستجابة',
        description: 'ألعاب تفاعلية لتطوير ردود الفعل وسرعة اتخاذ القرار'
      },
      {
        icon: '🧠',
        title: 'الذكاء الكروي',
        description: 'تحديات استراتيجية لتحسين الذكاء التكتيكي الكروي'
      },
      {
        icon: '🏆',
        title: 'كافئ نفسك',
        description: 'اربح جوائز وشارات وصعّد الترتيب العالمي'
      }
    ];

    const handleNext = () => {
      if (onboardingStep < slides.length - 1) {
        setOnboardingStep(onboardingStep + 1);
      } else {
        setCurrentScreen('auth');
      }
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleNext();
      }
    };

    useEffect(() => {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }, [onboardingStep]);

    return (
      <div className="screen onboarding-screen">
        <div className="onboarding-content">
          <div className="onboarding-slide">
            <div className="slide-icon">{slides[onboardingStep].icon}</div>
            <h2>{slides[onboardingStep].title}</h2>
            <p>{slides[onboardingStep].description}</p>
          </div>
          <div className="onboarding-dots">
            {slides.map((_, idx) => (
              <div key={idx} className={`dot ${idx === onboardingStep ? 'active' : ''}`} />
            ))}
          </div>
          <button
            className="btn-primary"
            onClick={handleNext}
          >
            {onboardingStep < slides.length - 1 ? 'التالي' : 'ابدأ التدريب'}
          </button>
        </div>
      </div>
    );
  };

  // Auth Screen
  const AuthScreen = () => (
    <div className="screen auth-screen">
      <div className="auth-content">
        <div className="auth-logo">
          <img src={logoUrl} alt="Logo" className="auth-logo-img" />
          <h2 className="app-title-ar">لعبتنا تجمعنا</h2>
          <p className="auth-tagline">التدريب الذهني للاعبين</p>
        </div>
        
        <div className="auth-form">
          <div className="input-group">
            <input 
              type="email" 
              placeholder="البريد الإلكتروني" 
              className="input-field"
              autoComplete="email"
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              placeholder="كلمة المرور" 
              className="input-field"
              autoComplete="current-password"
            />
          </div>
          <button className="btn-primary" onClick={() => setCurrentScreen('home')}>
            تسجيل الدخول
          </button>
        </div>

        <div className="social-login">
          <p>أو سجل باستخدام</p>
          <div className="social-buttons">
            <button className="social-btn" onClick={() => setCurrentScreen('home')}>
              <span>🔵</span> Facebook
            </button>
            <button className="social-btn" onClick={() => setCurrentScreen('home')}>
              <span>🔴</span> Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Home Dashboard
  const HomeScreen = () => (
    <div className="screen home-screen">
      <div className="home-header">
        <div className="player-info-header">
          <div className="player-avatar">👤</div>
          <div className="player-details">
            <h3>محمد أحمد</h3> 
            <div className="level-badge">
              <Crown size={14} color="#FFD700" />
              <span>Level {playerLevel}</span>
            </div>
          </div>
          <button className="notification-btn" aria-label="إشعارات">🔔</button>
        </div>

        <div className="xp-card">
          <div className="xp-info">
            <span className="xp-label">XP</span>
            <span className="xp-value">{xp} / 3000</span>
          </div>
          <div className="xp-bar">
            <div className="xp-fill" style={{width: '82%'}}></div>
          </div>
          <p className="xp-next">550 XP للمستوى التالي</p>
        </div>

        <div className="streak-card">
          <div className="streak-icon">🔥</div>
          <div className="streak-info">
            <h4>{streak} أيام</h4>
            <p>سلسلة التدريب</p>
          </div>
          <div className="streak-calendar">
            {[1,2,3,4,5,6,7].map(day => (
              <div key={day} className={`day-dot ${day <= streak ? 'active' : ''}`}></div>
            ))}
          </div>
        </div>
      </div>

      <div className="home-content">
        <section className="daily-challenge-section">
          <h4>💪 التحدي اليومي</h4>
          <div className="challenge-banner">
            <div className="challenge-icon-large">⚡</div>
            <div className="challenge-details">
              <h5>تحدي سرعة الاستجابة</h5>
              <p>أكمل 10 تمارين رد فعل</p>
              <div className="challenge-progress-bar">
                <div className="challenge-fill" style={{width: '40%'}}></div>
              </div>
              <span className="challenge-count">4 / 10</span>
            </div>
            <div className="challenge-reward">
              <Zap size={20} color="#FFD700" />
              <span>+500 XP</span>
            </div>
          </div>
        </section>

        <section className="training-modes">
          <h4>🎯 أنماط التدريب</h4>
          <div className="modes-grid">
            <div className="mode-card" onClick={() => setCurrentScreen('reaction')} role="button" tabIndex={0}>
              <div className="mode-icon">⚡</div>
              <h5>سرعة الاستجابة</h5>
              <p>10 تمارين</p>
              <div className="mode-badge new">جديد</div>
            </div>
            <div className="mode-card" onClick={() => setCurrentScreen('focus')} role="button" tabIndex={0}>
              <div className="mode-icon">🎯</div>
              <h5>التركيز</h5>
              <p>8 تمارين</p>
            </div>
            <div className="mode-card" onClick={() => setCurrentScreen('decision')} role="button" tabIndex={0}>
              <div className="mode-icon">🧠</div>
              <h5>اتخاذ القرار</h5>
              <p>12 تمرين</p>
              <div className="mode-badge premium">PRO</div>
            </div>
            <div className="mode-card" onClick={() => setCurrentScreen('memory')} role="button" tabIndex={0}>
              <div className="mode-icon">👁️</div>
              <h5>الذاكرة البصرية</h5>
              <p>15 تمرين</p>
            </div>
          </div>
        </section>

        <section className="today-exercises">
          <h4>📋 تمارين اليوم</h4>
          <div className="exercises-list">
            {[
              { name: 'تمرين الكرة السريعة', duration: '2 دقيقة', completed: true, xp: 50 },
              { name: 'تحدي الذاكرة التكتيكية', duration: '5 دقائق', completed: true, xp: 100 },
              { name: 'لعبة رد الفعل المتقدمة', duration: '3 دقائق', completed: false, xp: 75 }
            ].map((exercise, idx) => (
              <div key={idx} className={`exercise-item ${exercise.completed ? 'completed' : ''}`}>
                <div className="exercise-checkbox">
                  {exercise.completed ? <Check size={18} /> : <div className="checkbox-empty"></div>}
                </div>
                <div className="exercise-info">
                  <h6>{exercise.name}</h6>
                  <p><Clock size={12} /> {exercise.duration}</p>
                </div>
                <div className="exercise-xp">+{exercise.xp} XP</div>
              </div>
            ))}
          </div>
        </section>

        <section className="quick-stats">
          <h4>📊 إحصائياتك</h4>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">⚡</div>
              <h5>0.32s</h5>
              <p>متوسط الاستجابة</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <h5>87%</h5>
              <p>دقة القرارات</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🧠</div>
              <h5>156</h5>
              <p>تمارين مكتملة</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  // Reaction Speed Game
  const ReactionGameScreen = () => {
    const [waitingForClick, setWaitingForClick] = useState(false);
    const [showTarget, setShowTarget] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [attempts, setAttempts] = useState([]);
    const [gameStatus, setGameStatus] = useState('ready');

    const startGame = () => {
      setGameStatus('waiting');
      setShowTarget(false);
      setWaitingForClick(false);
      
      const delay = Math.random() * 3000 + 1000;
      setTimeout(() => {
        setShowTarget(true);
        setStartTime(Date.now());
        setGameStatus('active');
      }, delay);
    };

    const handleClick = () => {
      if (gameStatus === 'active' && showTarget) {
        const reactionTime = Date.now() - startTime;
        const newAttempts = [...attempts, reactionTime];
        setAttempts(newAttempts);
        setShowTarget(false);
        
        if (newAttempts.length >= 5) {
          setGameStatus('complete');
        } else {
          setGameStatus('ready');
        }
      } else if (gameStatus === 'waiting') {
        alert('مبكر جداً! انتظر الهدف الأخضر');
        setGameStatus('ready');
      }
    };

    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (gameStatus === 'ready') {
          startGame();
        } else {
          handleClick();
        }
      }
    };

    useEffect(() => {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }, [gameStatus, showTarget]);

    const averageTime = attempts.length > 0 
      ? (attempts.reduce((a, b) => a + b, 0) / attempts.length).toFixed(0)
      : 0;

    return (
      <div className="screen game-screen">
        <div className="game-header">
          <button className="back-btn" onClick={() => setCurrentScreen('home')}>
            ← رجوع
          </button>
          <h3>⚡ تحدي سرعة الاستجابة</h3>
        </div>

        <div className="game-info-panel">
          <div className="game-stat">
            <span className="stat-label">المحاولات</span>
            <span className="stat-number">{attempts.length} / 5</span>
          </div>
          <div className="game-stat">
            <span className="stat-label">المتوسط</span>
            <span className="stat-number">{averageTime}ms</span>
          </div>
        </div>

        {gameStatus === 'complete' ? (
          <div className="game-complete">
            <div className="complete-icon">🎉</div>
            <h4>أحسنت!</h4>
            <div className="final-score">
              <p>متوسط وقت الاستجابة</p>
              <h2>{averageTime}ms</h2>
            </div>
            <div className="score-rating">
              {averageTime < 300 ? '⚡ ممتاز!' : averageTime < 400 ? '👍 جيد جداً' : '💪 جيد'}
            </div>
            <div className="xp-earned">
              <Zap size={24} color="#FFD700" />
              <span>+75 XP</span>
            </div>
            <button className="btn-primary" onClick={() => {
              setAttempts([]);
              setGameStatus('ready');
            }}>
              العب مرة أخرى
            </button>
            <button className="btn-secondary" onClick={() => setCurrentScreen('home')}>
              العودة للرئيسية
            </button>
          </div>
        ) : (
          <div 
            className={`reaction-game-area ${showTarget ? 'target-active' : ''}`}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.code === 'Space') {
                e.preventDefault();
                handleClick();
              }
            }}
          >
            {gameStatus === 'ready' && (
              <div className="game-instructions">
                <h4>اضغط على الدائرة الخضراء بأسرع وقت ممكن</h4>
                <button className="btn-start" onClick={startGame}>
                  <Play size={20} /> ابدأ
                </button>
              </div>
            )}
            
            {gameStatus === 'waiting' && (
              <div className="waiting-state">
                <div className="pulse-loader"></div>
                <p>انتظر...</p>
              </div>
            )}

            {showTarget && (
              <div className="reaction-target">
                <div className="target-ripple"></div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Focus Training Screen
  const FocusTrainingScreen = () => {
    const [selectedBalls, setSelectedBalls] = useState([]);
    const [targetBalls, setTargetBalls] = useState([0, 2, 5, 7]);
    const balls = Array.from({length: 16}, (_, i) => i);

    const handleBallClick = (index) => {
      if (!selectedBalls.includes(index)) {
        setSelectedBalls([...selectedBalls, index]);
      }
    };

    return (
      <div className="screen game-screen">
        <div className="game-header">
          <button className="back-btn" onClick={() => setCurrentScreen('home')}>
            ← رجوع
          </button>
          <h3>🎯 تمرين التركيز</h3>
        </div>

        <div className="focus-instructions">
          <h4>اضغط على الكرات الصفراء بالترتيب</h4>
          <p>اختبر تركيزك وسرعة ردود أفعالك</p>
        </div>

        <div className="focus-game-area">
          <div className="balls-grid">
            {balls.map((ball) => (
              <div 
                key={ball}
                className={`ball-item ${targetBalls.includes(ball) ? 'target' : ''} ${selectedBalls.includes(ball) ? 'selected' : ''}`}
                onClick={() => handleBallClick(ball)}
                role="button"
                tabIndex={0}
              >
                {ball + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="focus-controls">
          <button className="btn-primary" onClick={() => setSelectedBalls([])}>
            إعادة المحاولة
          </button>
        </div>

        <div className="focus-stats">
          <div className="focus-stat">
            <span>المستوى</span>
            <strong>3</strong>
          </div>
          <div className="focus-stat">
            <span>الدقة</span>
            <strong>85%</strong>
          </div>
        </div>
      </div>
    );
  };

  // Decision Making Screen
  const DecisionMakingScreen = () => {
    const [score, setScore] = useState(0);

    return (
      <div className="screen game-screen">
        <div className="game-header">
          <button className="back-btn" onClick={() => setCurrentScreen('home')}>
            ← رجوع
          </button>
          <h3>🧠 اتخاذ القرار</h3>
        </div>

        <div className="decision-timer">
          <div className="timer-circle">
            <span className="timer-value">10</span>
          </div>
          <p>اختر القرار الأفضل</p>
        </div>

        <div className="decision-scenario">
          <div className="field-view">
            <div className="field-overlay">
              <div className="player-position p1">👤</div>
              <div className="player-position p2">👤</div>
              <div className="player-position p3">👤</div>
              <div className="ball-position">⚽</div>
            </div>
          </div>
          <h4>ما هو القرار الأفضل في هذا الموقف؟</h4>
          <p>أنت تمتلك الكرة وأمامك 3 خيارات</p>
        </div>

        <div className="decision-options">
          <button className="decision-btn">
            <span className="decision-icon">⬅️</span>
            <span>تمرير للجناح الأيسر</span>
          </button>
          <button className="decision-btn">
            <span className="decision-icon">➡️</span>
            <span>تمرير للجناح الأيمن</span>
          </button>
          <button className="decision-btn">
            <span className="decision-icon">⬆️</span>
            <span>تمرير طويلة للأمام</span>
          </button>
          <button className="decision-btn">
            <span className="decision-icon">↗️</span>
            <span>مراوغة والتقدم</span>
          </button>
          <button className="decision-btn">
            <span className="decision-icon">⬅️</span>
            <span>تمرير خلفية للحارس</span>
          </button>
        </div>

        <div className="decision-score">
          <span>النقاط: {score}</span>
        </div>
      </div>
    );
  };

  // Memory & Vision Exercise
  const MemoryExerciseScreen = () => {
    const [pattern, setPattern] = useState([1, 3, 5, 7]);
    const [userPattern, setUserPattern] = useState([]);
    const [showPattern, setShowPattern] = useState(false);

    const squares = Array.from({length: 16}, (_, i) => i);

    return (
      <div className="screen game-screen">
        <div className="game-header">
          <button className="back-btn" onClick={() => setCurrentScreen('home')}>
            ← رجوع
          </button>
          <h3>👁️ الذاكرة البصرية</h3>
        </div>

        <div className="memory-instructions">
          <h4>احفظ النمط</h4>
          <p>شاهد المربعات المضيئة ثم أعد النمط</p>
        </div>

        <div className="memory-grid">
          {squares.map((sq) => (
            <div 
              key={sq}
              className={`memory-square ${pattern.includes(sq) && showPattern ? 'highlight' : ''} ${userPattern.includes(sq) ? 'selected' : ''}`}
              onClick={() => {
                if (!showPattern && !userPattern.includes(sq)) {
                  setUserPattern([...userPattern, sq]);
                }
              }}
              role="button"
              tabIndex={0}
            ></div>
          ))}
        </div>

        <div className="memory-controls">
          <button 
            className="btn-primary"
            onClick={() => {
              setShowPattern(true);
              setTimeout(() => setShowPattern(false), 2000);
            }}
          >
            عرض النمط
          </button>
          <button 
            className="btn-secondary"
            onClick={() => setUserPattern([])}
          >
            إعادة المحاولة
          </button>
        </div>

        <div className="memory-progress">
          <span>المستوى: 3</span>
          <span>الدقة: 85%</span>
        </div>
      </div>
    );
  };

  // Rewards Screen
  const RewardsScreen = () => (
    <div className="screen rewards-screen">
      <div className="screen-header">
        <h3>🏆 المكافآت والجوائز</h3>
      </div>

      <div className="rewards-hero">
        <div className="trophy-showcase">
          <div className="rotating-trophy">🏆</div>
        </div>
        <h4>الجوائز الموسمية</h4>
        <p>أكمل التحديات واربح جوائز حصرية</p>
      </div>

      <section className="seasonal-rewards">
        <h4>🎁 جوائز الموسم الحالي</h4>
        <div className="rewards-list">
          {[
            { name: 'كرة احترافية Nike', progress: 80, locked: false },
            { name: 'قميص تدريب مميز', progress: 60, locked: false },
            { name: 'حذاء كرة قدم', progress: 40, locked: false },
            { name: 'جائزة نقدية 100$', progress: 20, locked: true }
          ].map((reward, idx) => (
            <div key={idx} className={`reward-card ${reward.locked ? 'locked' : ''}`}>
              <div className="reward-icon-large">
                {reward.locked ? '🔒' : '🎁'}
              </div>
              <div className="reward-info">
                <h5>{reward.name}</h5>
                <div className="reward-progress-bar">
                  <div className="reward-fill" style={{width: `${reward.progress}%`}}></div>
                </div>
                <span>{reward.progress}% مكتمل</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="unlocked-badges">
        <h4>⭐ الشارات المفتوحة</h4>
        <div className="badges-grid">
          {['🥇', '⚡', '🎯', '🧠', '🔥', '💎', '👑', '🏅'].map((badge, idx) => (
            <div key={idx} className="badge-item">
              <div className="badge-circle">{badge}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="premium-rewards">
        <div className="premium-banner">
          <div className="premium-icon">👑</div>
          <div>
            <h5>اشتراك Premium</h5>
            <p>احصل على مكافآت حصرية ضعف XP</p>
          </div>
          <button className="btn-premium">ترقية</button>
        </div>
      </section>
    </div>
  );

  // Leaderboard Screen
  const LeaderboardScreen = () => (
    <div className="screen leaderboard-screen">
      <div className="screen-header">
        <h3>🏆 لوحة المتصدرين</h3>
      </div>

      <div className="leaderboard-tabs">
        <button className="tab active">عالمي</button>
        <button className="tab">أصدقاء</button>
        <button className="tab">محلي</button>
      </div>

      <div className="podium">
        <div className="podium-player rank-2">
          <div className="podium-avatar">👤</div>
          <span className="podium-rank">2</span>
          <h5>سارة</h5>
          <p>8,450 XP</p>
        </div>
        <div className="podium-player rank-1">
          <div className="crown-icon">👑</div>
          <div className="podium-avatar gold">👤</div>
          <span className="podium-rank">1</span>
          <h5>أحمد</h5>
          <p>12,340 XP</p>
        </div>
        <div className="podium-player rank-3">
          <div className="podium-avatar">👤</div>
          <span className="podium-rank">3</span>
          <h5>علي</h5>
          <p>7,890 XP</p>
        </div>
      </div>

      <div className="rankings-list">
        {[4, 5, 6, 7, 8, 9, 10].map((rank) => (
          <div key={rank} className={`ranking-item ${rank === 7 ? 'current-user' : ''}`}>
            <span className="rank-number">{rank}</span>
            <div className="player-info">
              <div className="player-avatar-small">👤</div>
              <div>
                <h6>{rank === 7 ? 'محمد (أنت)' : `لاعب ${rank}`}</h6>
                <p>Level {15 - rank}</p>
              </div>
            </div>
            <span className="player-xp">{(10000 - rank * 500)} XP</span>
          </div>
        ))}
      </div>
    </div>
  );

  // Profile Screen
  const ProfileScreen = () => (
    <div className="screen profile-screen">
      <div className="profile-header">
        <div className="profile-cover"></div>
        <div className="profile-avatar">👤</div>
        <h3>محمد أحمد</h3> 
        
        <div className="profile-level">
          <Crown size={16} color="#FFD700" />
          <span>Level {playerLevel}</span>
        </div>
      </div>

      <div className="profile-stats-grid">
        <div className="profile-stat">
          <h4>{xp}</h4>
          <p>XP الكلي</p>
        </div>
        <div className="profile-stat">
          <h4>{streak}</h4>
          <p>أيام متتالية</p>
        </div>
        <div className="profile-stat">
          <h4>156</h4>
          <p>تمارين</p>
        </div>
        <div className="profile-stat">
          <h4>87%</h4>
          <p>متوسط الدقة</p>
        </div>
      </div>

      <section className="performance-section">
        <h4>📈 الأداء</h4>
        <div className="performance-cards">
          <div className="perf-card">
            <span className="perf-label">سرعة الاستجابة</span>
            <div className="perf-bar">
              <div className="perf-fill" style={{width: '85%'}}></div>
            </div>
            <span className="perf-value">0.32s</span>
          </div>
          <div className="perf-card">
            <span className="perf-label">التركيز</span>
            <div className="perf-bar">
              <div className="perf-fill" style={{width: '92%'}}></div>
            </div>
            <span className="perf-value">92%</span>
          </div>
          <div className="perf-card">
            <span className="perf-label">الذكاء التكتيكي</span>
            <div className="perf-bar">
              <div className="perf-fill" style={{width: '78%'}}></div>
            </div>
            <span className="perf-value">78%</span>
          </div>
        </div>
      </section>

      <section className="achievements-section">
        <h4>🏆 الإنجازات الأخيرة</h4>
        <div className="achievements-list">
          {[
            { icon: '⚡', name: 'سرعة البرق', date: 'منذ يومين' },
            { icon: '🎯', name: 'تركيز مثالي', date: 'منذ 5 أيام' },
            { icon: '🔥', name: 'سلسلة 7 أيام', date: 'اليوم' }
          ].map((achievement, idx) => (
            <div key={idx} className="achievement-item">
              <div className="achievement-icon">{achievement.icon}</div>
              <div>
                <h6>{achievement.name}</h6>
                <p>{achievement.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  // Settings Screen
  const SettingsScreen = () => (
    <div className="screen settings-screen">
      <div className="screen-header">
        <h3>⚙️ الإعدادات</h3>
      </div>

      <div className="settings-sections">
        <div className="settings-section">
          <h4>الحساب</h4>
          <div className="setting-item">
            <span>تعديل الملف الشخصي</span>
            <ChevronRight size={20} />
          </div>
          <div className="setting-item">
            <span>تغيير كلمة المرور</span>
            <ChevronRight size={20} />
          </div>
        </div>

        <div className="settings-section">
          <h4>التطبيق</h4>
          <div className="setting-item">
            <span>الإشعارات</span>
            <div className="toggle active"></div>
          </div>
          <div className="setting-item">
            <span>تذكيرات التدريب اليومي</span>
            <div className="toggle active"></div>
          </div>
          <div className="setting-item">
            <span>الأصوات</span>
            <div className="toggle active"></div>
          </div>
        </div>

        <div className="settings-section">
          <h4>الدعم</h4>
          <div className="setting-item">
            <span>مركز المساعدة</span>
            <ChevronRight size={20} />
          </div>
          <div className="setting-item">
            <span>تواصل معنا</span>
            <ChevronRight size={20} />
          </div>
        </div>
      </div>
    </div>
  );

  // Bottom Navigation
  const BottomNav = () => (
    <div className="bottom-nav">
      <button 
        className={`nav-item ${currentScreen === 'home' ? 'active' : ''}`}
        onClick={() => setCurrentScreen('home')}
        aria-label="الرئيسية"
      >
        <Home size={24} />
        <span>الرئيسية</span>
      </button>
      <button 
        className={`nav-item ${['reaction', 'focus', 'decision', 'memory'].includes(currentScreen) ? 'active' : ''}`}
        onClick={() => setCurrentScreen('reaction')}
        aria-label="التدريب"
      >
        <Brain size={24} />
        <span>التدريب</span>
      </button>
      <button 
        className={`nav-item ${currentScreen === 'rewards' ? 'active' : ''}`}
        onClick={() => setCurrentScreen('rewards')}
        aria-label="المكافآت"
      >
        <Trophy size={24} />
        <span>المكافآت</span>
      </button>
      <button 
        className={`nav-item ${currentScreen === 'leaderboard' ? 'active' : ''}`}
        onClick={() => setCurrentScreen('leaderboard')}
        aria-label="الترتيب"
      >
        <TrendingUp size={24} />
        <span>الترتيب</span>
      </button>
      <button 
        className={`nav-item ${currentScreen === 'profile' ? 'active' : ''}`}
        onClick={() => setCurrentScreen('profile')}
        aria-label="الملف الشخصي"
      >
        <User size={24} />
        <span>الملف</span>
      </button>
    </div>
  );

  // Render Current Screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash': return <SplashScreen />;
      case 'onboarding': return <OnboardingScreen />;
      case 'auth': return <AuthScreen />;
      case 'home': return <HomeScreen />;
      case 'reaction': return <ReactionGameScreen />;
      case 'focus': return <FocusTrainingScreen />;
      case 'decision': return <DecisionMakingScreen />;
      case 'memory': return <MemoryExerciseScreen />;
      case 'rewards': return <RewardsScreen />;
      case 'leaderboard': return <LeaderboardScreen />;
      case 'profile': return <ProfileScreen />;
      case 'settings': return <SettingsScreen />;
      default: return <HomeScreen />;
    }
  };

  const showBottomNav = !['splash', 'onboarding', 'auth'].includes(currentScreen);
  
  return (
    <div className="app-container" dir="rtl">
      <div className="phone-frame">
        {renderScreen()}
        {showBottomNav && <BottomNav />} 
      </div>
    </div>
  );
};

export default FootballMentalTrainingApp;