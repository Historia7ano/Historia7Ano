/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { THEMES, BADGES } from './data';
import { UserProgress, Theme, Chapter } from './types';
import { Games } from './components/Games';
import { Timeline } from './components/Timeline';
import { Quiz } from './components/Quiz';
import { Gallery } from './components/Gallery';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Award,
  Trophy,
  Calendar,
  Image,
  Compass,
  HelpCircle,
  Activity,
  User,
  CheckCircle,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Flame,
  ArrowRight,
  BookOpenText,
  BadgeAlert,
  GraduationCap,
  Sparkles,
  Search,
  CheckCheck,
  Type
} from 'lucide-react';

const AVATARS = [
  { id: 'recoletor', label: '🛡️ Recoletor do Paleolítico' },
  { id: 'gladiador', label: '🏛️ Romano/Patrício' },
  { id: 'cavaleiro', label: '⚔️ Cavaleiro de Guimarães' },
  { id: 'burgues', label: '⛵ Burguês Medieval' }
];

export default function App() {
  // Authentication & Profile States
  const [username, setUsername] = useState<string>('');
  const [tempName, setTempName] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('recoletor');
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

  // Settings / Accessibility States
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  const [fontScale, setFontScale] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [voiceSynthesisActive, setVoiceSynthesisActive] = useState(false);
  const [currentlyReadingText, setCurrentlyReadingText] = useState<string | null>(null);

  // Core App Navigation
  const [activeSection, setActiveSection] = useState<'inicio' | 'conteudos' | 'jogos' | 'timeline' | 'galeria' | 'quiz' | 'progresso'>('inicio');
  const [activeThemeId, setActiveThemeId] = useState<number>(1);
  const [activeSubtopicId, setActiveSubtopicId] = useState<string>('t1_c1');

  // Interactive Chapter Content states (e.g. flashcards flipped, exercises answered)
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [completedSubtopics, setCompletedSubtopics] = useState<string[]>([]);
  const [exerciseFeedback, setExerciseFeedback] = useState<{[key: string]: {selected: number, correct: boolean}}>({});

  // Gamer stats
  const [score, setScore] = useState(0);
  const [ownedBadges, setOwnedBadges] = useState<string[]>([]);
  const [quizResults, setQuizResults] = useState<{[key: string]: number}>({});
  const [latestBadgeUnlocked, setLatestBadgeUnlocked] = useState<string | null>(null);

  // Load state on startup
  useEffect(() => {
    const storedUser = localStorage.getItem('historia_7_username');
    const storedAvatar = localStorage.getItem('historia_7_avatar') || 'recoletor';
    const storedScore = localStorage.getItem('historia_7_score');
    const storedBadges = localStorage.getItem('historia_7_badges');
    const storedCompleted = localStorage.getItem('historia_7_completed_subtopics');
    const storedQuiz = localStorage.getItem('historia_7_quiz_results');
    const storedTheme = localStorage.getItem('historia_7_theme');

    if (storedUser) {
      setUsername(storedUser);
      setTempName(storedUser);
      setShowWelcomeMessage(true);
    }
    if (storedAvatar) setAvatar(storedAvatar);
    if (storedScore) setScore(parseInt(storedScore, 10));
    if (storedBadges) setOwnedBadges(JSON.parse(storedBadges));
    if (storedCompleted) setCompletedSubtopics(JSON.parse(storedCompleted));
    if (storedQuiz) setQuizResults(JSON.parse(storedQuiz));
    if (storedTheme) setThemeMode(storedTheme as 'light' | 'dark');
  }, []);

  // Sync theme with document class
  useEffect(() => {
    const root = window.document.documentElement;
    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('historia_7_theme', themeMode);
  }, [themeMode]);

  // Sync typography fontScale with document font-size configuration
  useEffect(() => {
    const root = window.document.documentElement;
    if (fontScale === 'sm') {
      root.style.fontSize = '87.5%';
    } else if (fontScale === 'md') {
      root.style.fontSize = '100%';
    } else if (fontScale === 'lg') {
      root.style.fontSize = '115%';
    } else if (fontScale === 'xl') {
      root.style.fontSize = '130%';
    }
  }, [fontScale]);

  // Gamification functions
  const handleAwardPoints = (points: number) => {
    setScore(prev => {
      const newScore = prev + points;
      localStorage.setItem('historia_7_score', newScore.toString());
      return newScore;
    });
  };

  const handleUnlockBadge = (badgeId: string) => {
    setOwnedBadges(prev => {
      if (prev.includes(badgeId)) return prev;
      const updated = [...prev, badgeId];
      localStorage.setItem('historia_7_badges', JSON.stringify(updated));
      setLatestBadgeUnlocked(badgeId);
      // Auto award points on new badge
      handleAwardPoints(100);
      return updated;
    });
  };

  const handleCompleteSubtopic = (subtopicId: string) => {
    setCompletedSubtopics(prev => {
      if (prev.includes(subtopicId)) return prev;
      const updated = [...prev, subtopicId];
      localStorage.setItem('historia_7_completed_subtopics', JSON.stringify(updated));
      handleAwardPoints(50);

      // Check badge milestones
      // Milestones per theme
      const completedIds = updated;
      if (completedIds.includes('t1_c1') && completedIds.includes('t1_c2')) {
        setTimeout(() => handleUnlockBadge('explorer_t1'), 500);
      }
      if (completedIds.includes('t2_c1') && completedIds.includes('t2_c2') && completedIds.includes('t2_c3')) {
        setTimeout(() => handleUnlockBadge('roma_vicit_t2'), 500);
      }
      if (completedIds.includes('t3_c1') && completedIds.includes('t3_c2') && completedIds.includes('t3_c3') && completedIds.includes('t3_c4')) {
        setTimeout(() => handleUnlockBadge('reconquistador_t3'), 500);
      }
      if (completedIds.includes('t4_c1') && completedIds.includes('t4_c2') && completedIds.includes('t4_c3')) {
        setTimeout(() => handleUnlockBadge('mestre_medieval_t4'), 500);
      }

      return updated;
    });
  };

  // Sign in submit
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempName.trim()) return;
    const finalName = tempName.trim();
    setUsername(finalName);
    localStorage.setItem('historia_7_username', finalName);
    localStorage.setItem('historia_7_avatar', avatar);
    setShowWelcomeMessage(true);

    // Bootstrap first badge
    setTimeout(() => {
      handleUnlockBadge('primeiros_passos');
    }, 1000);
  };

  // Text-To-Speech Reader core function
  const handleReadTextAloud = (textToRead: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (currentlyReadingText === textToRead) {
        // Toggle off
        window.speechSynthesis.cancel();
        setCurrentlyReadingText(null);
        setVoiceSynthesisActive(false);
        return;
      }

      window.speechSynthesis.cancel(); // Stop anything running
      const cleanText = textToRead.replace(/[*#]/g, ''); // Strip markdown tokens
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'pt-PT'; // Portuguese from Portugal as requested
      utterance.rate = 1.0;

      utterance.onend = () => {
        setCurrentlyReadingText(null);
        setVoiceSynthesisActive(false);
      };

      utterance.onerror = () => {
        setCurrentlyReadingText(null);
        setVoiceSynthesisActive(false);
      };

      setCurrentlyReadingText(textToRead);
      setVoiceSynthesisActive(true);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("A síntese de voz (leitura automática) não é suportada neste navegador.");
    }
  };

  // Stop reading
  const handleStopReading = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setCurrentlyReadingText(null);
      setVoiceSynthesisActive(false);
    }
  };

  // Level classification map based on score
  const getLevelInfo = () => {
    if (score >= 800) return { title: "Doutor das Cortes Régias", desc: "Nível 4 - Suserano Supremo dos Manuscritos", icon: "👑" };
    if (score >= 500) return { title: "Cavaleiro do Condado", desc: "Nível 3 - Cruzado de D. Afonso Henriques", icon: "⚔️" };
    if (score >= 200) return { title: "Cidadão da Eclésia", desc: "Nível 2 - Filósofo Ateniense", icon: "🏛️" };
    return { title: "Recolector", desc: "Nível 1 - Caçador das Cavernas", icon: "🔥" };
  };

  const levelInfo = getLevelInfo();

  // Active theme calculation
  const curTheme = THEMES.find(t => t.id === activeThemeId) || THEMES[0];
  const curChapter = curTheme.chapters.find(c => c.id === activeSubtopicId) || curTheme.chapters[0];

  return (
    <div className={`min-h-screen bg-[#FAF9F6] dark:bg-slate-950 font-size-${fontScale} text-slate-800 dark:text-slate-200 transition-colors duration-300`}>
      
      {/* 1. INITIAL PERSONALIZATION POPUP / REGISTER MODAL */}
      {!username && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in" id="welcome_register_modal">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg bg-[#FDFCFB] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden"
          >
            {/* Soft decorative background glow */}
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

            <div className="text-center space-y-3">
              <span className="inline-block bg-amber-500/10 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-bold font-mono text-[11px] uppercase px-4 py-1.5 rounded-full tracking-wider border border-amber-500/15">
                Portal de História do 7.º Ano
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold font-display text-gray-900 dark:text-white leading-tight">
                Olá! Bem-vindo(a) à disciplina de História do 7.º ano.
              </h2>
              <p className="text-slate-500 dark:text-gray-400 text-sm font-sans">
                Antes de iniciarmos a viagem pelo túnel do tempo, como te chamas?
              </p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  O Teu Nome:
                </label>
                <input
                  type="text"
                  required
                  maxLength={25}
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Introduzir o teu nome de historiador..."
                  className="w-full px-4 py-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 font-semibold focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
                  id="user_register_name_input"
                />
              </div>

              {/* Avatar Picker for Playfulness */}
              <div className="space-y-3">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Escolhe o Teu Avatar Histórico:
                </label>
                <div className="grid grid-cols-2 gap-3" id="avatar_picker_box">
                  {AVATARS.map((av) => (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => setAvatar(av.id)}
                      className={`p-3.5 rounded-xl border text-xs text-left font-semibold transition cursor-pointer ${
                        avatar === av.id
                          ? 'border-amber-500 bg-amber-500/10 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 font-bold'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300'
                      }`}
                    >
                      {av.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-amber-600 dark:hover:bg-amber-700 py-4 rounded-2xl text-white dark:text-slate-950 font-bold transition shadow-lg hover:shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer"
                id="welcome_signin_button"
              >
                Começar a Viagem Histórica <ArrowRight className="w-5 h-5 shrink-0 animate-pulse" />
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* 2. PERSISTENT GREETING AND NOTIFICATION FOR UNLOCKED BADGES */}
      <AnimatePresence>
        {latestBadgeUnlocked && (
          <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm" id="badge_alert_popup">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              className="bg-slate-950 text-slate-105 border-2 border-amber-400 p-5 rounded-2xl shadow-2xl space-y-3 relative overflow-hidden"
            >
              {/* Star-burst effect */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center text-2xl shrink-0 font-bold">
                  🎖️
                </div>
                <div>
                  <span className="font-mono text-[9px] font-extrabold uppercase tracking-widest text-amber-400">Medalha Desbloqueada!</span>
                  <h4 className="font-bold text-base font-display text-white mt-0.5">
                    {BADGES.find(b => b.id === latestBadgeUnlocked)?.title}
                  </h4>
                  <p className="text-xs text-slate-350 leading-relaxed mt-1 font-sans">
                    {BADGES.find(b => b.id === latestBadgeUnlocked)?.description}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-900 text-[10px] font-mono leading-none">
                <span className="text-green-400 font-bold">+100 PE &bull; +100 Pontos</span>
                <button
                  onClick={() => setLatestBadgeUnlocked(null)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-2.5 py-1 rounded-lg uppercase tracking-wide cursor-pointer"
                >
                  OK
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. APP HEADER & ACCESSIBILITY HUD */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 backdrop-blur" id="primary_app_header">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-955 rounded-xl flex items-center justify-center border-2 border-amber-400 text-amber-600 font-black font-display text-lg shadow-sm font-bold">
              7º
            </div>
            <div>
              <h1 className="text-xl font-bold font-display text-gray-900 dark:text-white leading-tight">Canal História 7.º Ano</h1>
              <span className="text-[10px] font-mono font-medium text-slate-500 uppercase tracking-widest">Profª Carla Oliveira</span>
            </div>
          </div>

          {/* Gamification stats HUD in header */}
          {username && (
            <div className="flex items-center gap-4 flex-wrap bg-[#FDFCFB] dark:bg-slate-950 p-2 rounded-2xl border border-slate-200 dark:border-slate-900" id="hud_stats_header">
              <div className="flex items-center gap-2 px-3 border-r border-slate-200 dark:border-slate-800">
                <span className="text-xl leading-none">{levelInfo.icon}</span>
                <div className="text-left">
                  <div className="text-[11px] font-bold font-display text-amber-600 dark:text-amber-400 leading-none">{levelInfo.title}</div>
                  <div className="text-[9px] font-mono text-slate-400 mt-1 leading-none">Nível Atual</div>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 border-r border-slate-200 dark:border-slate-800">
                <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
                <div className="text-left">
                  <div className="text-[13px] font-black italic text-amber-600 dark:text-amber-450 leading-none">{score} PE</div>
                  <div className="text-[9px] font-mono text-slate-400 mt-1 leading-none">Pontos</div>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3">
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
                <div className="text-left">
                  <div className="text-[11px] font-bold font-mono text-gray-900 dark:text-white leading-none">{ownedBadges.length} Medalhas</div>
                  <div className="text-[9px] font-mono text-slate-400 mt-1 leading-none">Bagdes</div>
                </div>
              </div>
            </div>
          )}

          {/* Accessibility tools */}
          <div className="flex items-center gap-3">
            {/* Tone reader controls */}
            {voiceSynthesisActive && (
              <button
                onClick={handleStopReading}
                className="bg-red-50 dark:bg-red-950/20 border border-red-200 text-red-600 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 animate-pulse cursor-pointer"
              >
                <VolumeX className="w-4 h-4" /> Parar Voz
              </button>
            )}

            {/* Font Sizer scale tool */}
            <div className="flex items-center bg-white dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700" id="font_sizer_bubble">
              <button
                onClick={() => setFontScale('md')}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition cursor-pointer ${fontScale === 'md' ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 shadow-xs' : 'text-slate-500 hover:text-slate-700'}`}
                title="Letra Normal"
              >
                A
              </button>
              <button
                onClick={() => setFontScale('lg')}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition cursor-pointer ${fontScale === 'lg' ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 shadow-xs' : 'text-slate-500 hover:text-slate-700'}`}
                title="Letra Grande"
              >
                A+
              </button>
              <button
                onClick={() => setFontScale('xl')}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-base font-bold transition cursor-pointer ${fontScale === 'xl' ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 shadow-xs' : 'text-slate-500 hover:text-slate-700'}`}
                title="Letra Muito Grande"
              >
                A++
              </button>
            </div>

            {/* Clear Mode/Dark Mode selector */}
            <button
              onClick={() => setThemeMode(prev => prev === 'light' ? 'dark' : 'light')}
              className="p-2.5 bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-gray-300 rounded-xl border border-slate-200 dark:border-slate-700 transition cursor-pointer"
              title="Alternar Tema"
            >
              {themeMode === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* 4. MAIN NAVIGATION TABS */}
      <nav className="bg-slate-900 border-b border-slate-950 text-slate-400 no-printme shadow-inner" id="primary_nav_bar">
        <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto gap-2 py-2">
          {[
            { id: 'inicio', label: 'Início', icon: Compass },
            { id: 'conteudos', label: 'Conteúdos Escolares', icon: BookOpenText },
            { id: 'jogos', label: 'Jogos e Desafios', icon: Flame },
            { id: 'timeline', label: 'Linha do Tempo', icon: Calendar },
            { id: 'galeria', label: 'História e Fontes', icon: Image },
            { id: 'quiz', label: 'Quiz Final', icon: Trophy },
            { id: 'progresso', label: 'O Meu Progresso', icon: Activity }
          ].map((tab) => {
            const Icon = tab.icon;
            const isAct = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSection(tab.id as any);
                  handleStopReading();
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs leading-none transition shrink-0 uppercase tracking-wider font-display cursor-pointer ${
                  isAct
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-xs font-bold'
                    : 'border border-transparent text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
 
      {/* 5. GREETING BOX AND CLASS MESSAGE */}
      {username && showWelcomeMessage && (
        <div className="bg-amber-500/5 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 py-3.5 px-4 text-center text-xs md:text-sm text-slate-800 dark:text-slate-300 no-printme">
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
            <p className="font-display">
              👋 Olá, <span className="font-extrabold text-amber-600">{username}</span>! Bem-vindo(a) às aulas de História da professora <span className="font-bold text-slate-800 dark:text-slate-200">Carla Oliveira</span>.
            </p>
            <button
              onClick={() => {
                localStorage.removeItem('historia_7_username');
                localStorage.removeItem('historia_7_score');
                localStorage.removeItem('historia_7_badges');
                localStorage.removeItem('historia_7_completed_subtopics');
                localStorage.removeItem('historia_7_quiz_results');
                window.location.reload();
              }}
              className="text-[10px] font-mono underline hover:text-amber-600 font-semibold cursor-pointer text-slate-400"
            >
              (Entrar como outro aluno)
            </button>
          </div>
        </div>
      )}
 
      {/* 6. MAIN CONTENT RENDER (BY NAVIGATION TAB) */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          
          {/* A. DASHBOARD HOME PORTAL */}
          {activeSection === 'inicio' && (
            <motion.div
              key="inicio"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
              id="inicio_page_layout"
            >
              {/* Profile Greeting banner */}
              <div className="bg-slate-900 rounded-3xl p-6 md:p-10 text-white relative overflow-hidden shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Decorative mesh rings */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_120%_at_120%_0%,rgba(245,158,11,0.15),transparent)] pointer-events-none" />
 
                <div className="space-y-4 relative z-10 text-center md:text-left max-w-2xl">
                  <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                    Aulas Digitais de História
                  </span>
                  <h2 className="text-3xl md:text-5xl font-extrabold font-display leading-tight">
                    Desvenda os Mistérios do Passado, <span className="text-amber-500">{username}</span>!
                  </h2>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                    Nesta disciplina virtual, vais explorar desde a pré-história das sociedades recoletoras do Paleolítico até ao heroísmo do Mestre de Avis na independência de Portugal no século XIV. Completa lições, ganha medalhas e descarrega o teu diploma sumativo.
                  </p>
                  <button
                    onClick={() => setActiveSection('conteudos')}
                    className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-md transition text-sm cursor-pointer border border-amber-400/20"
                  >
                    Estudar Conteúdos <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
 
                {/* Vector classroom avatar representation */}
                <div className="w-40 h-40 rounded-full bg-slate-800 border-4 border-amber-500/30 flex items-center justify-center text-6xl shadow-xl shrink-0 animate-bounce-slow">
                  ☕
                </div>
              </div>
 
              {/* Bento grid panels */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Professor message */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-950 flex items-center justify-center text-rose-600 text-xl font-bold font-display">
                      🎨
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-950 dark:text-white font-display">Professora Carla Oliveira</h4>
                      <span className="text-[10px] font-mono text-gray-400">Turma do 7.º Ano</span>
                    </div>
                  </div>
                  <blockquote className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed italic border-l-2 border-rose-450 pl-3">
                    &ldquo;Olá, queridos alunos! Preparei esta plataforma para tornar o estudo das Aprendizagens Essenciais numa verdadeira aventura lúdica. Diverte-te nos enigmas, analisa as fotos reais dos monumentos portugueses e sê o cientista da nossa própria história!&rdquo;
                  </blockquote>
                  <div className="pt-2">
                    <button
                      onClick={() => setActiveSection('galeria')}
                      className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
                    >
                      Analisar Fontes Arqueológicas →
                    </button>
                  </div>
                </div>
 
                {/* Suggested Activity card */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-955 flex items-center justify-center text-amber-600 border border-amber-300">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-950 dark:text-white font-display">Objetivo do Dia</h4>
                      <span className="text-[10px] font-mono text-gray-400">Progresso Curricular</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
                    Recomendamos ler o <span className="font-semibold text-gray-900 dark:text-white">Tema 3 (A herança de D. Afonso Henriques)</span> e depois jogar o enigma do Escape Room do Castelo de Guimarães para ganhares medalha oficial!
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setActiveSection('jogos')}
                      className="text-xs font-bold text-amber-600 hover:underline cursor-pointer"
                    >
                      Jogar os Desafios Lúdicos →
                    </button>
                  </div>
                </div>
 
                {/* Active progress summary */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-950 dark:text-white font-display flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500" /> A Tua Jornada
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 uppercase font-mono font-bold">
                      Subtópicos Concluídos:
                    </p>
                    {/* Tiny simple progress bar */}
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${(completedSubtopics.length / 12) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono font-semibold text-slate-600 dark:text-gray-400 mt-1 block">
                      {completedSubtopics.length} de 12 Lições Escolares
                    </span>
                  </div>
 
                  <button
                    onClick={() => setActiveSection('progresso')}
                    className="mt-4 w-full text-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-white text-xs font-bold py-2.5 rounded-xl transition cursor-pointer border border-slate-200 dark:border-slate-700"
                  >
                    Ver o Meu Progresso
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'conteudos' && (
            <motion.div
              key="conteudos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-4 gap-6"
              id="conteudos_page_layout"
            >
              {/* LHS - Sidebar selectors for Themes & Subtopics */}
              <div className="lg:col-span-1 space-y-4 no-printme">
                
                {/* Theme Selector List */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider px-2 block">Temas do Programa:</span>
                  {THEMES.map((theme) => {
                    const isThemeSelected = theme.id === activeThemeId;
                    return (
                      <button
                        key={theme.id}
                        onClick={() => {
                          setActiveThemeId(theme.id);
                          // Auto focus first subtopic of this theme
                          const firstChapterId = theme.chapters[0].id;
                          setActiveSubtopicId(firstChapterId);
                          handleStopReading();
                        }}
                        className={`w-full text-left p-3.5 rounded-2xl border text-xs leading-tight transition-all duration-300 cursor-pointer ${
                          isThemeSelected
                            ? 'border-l-4 border-l-amber-500 bg-white dark:bg-slate-900 border-slate-205 dark:border-slate-800 shadow-md font-bold text-slate-850 dark:text-white scale-[1.02]'
                            : 'bg-white/60 dark:bg-slate-900/60 border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-350 hover:bg-white'
                        }`}
                      >
                        <div className="font-mono text-[9px] uppercase tracking-widest opacity-70 mb-0.5">Tema {theme.id}</div>
                        <span className="font-display line-clamp-2">{theme.title}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Subtopics of Selected Theme */}
                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider px-2 block">Subtópicos / Lições:</span>
                  <div className="space-y-1 max-h-[300px] overflow-y-auto pr-1">
                    {curTheme.chapters.map((chapter) => {
                      const isSubSelected = chapter.id === activeSubtopicId;
                      const hasCompleted = completedSubtopics.includes(chapter.id);
                      return (
                        <button
                          key={chapter.id}
                          onClick={() => {
                            setActiveSubtopicId(chapter.id);
                            handleStopReading();
                          }}
                          className={`w-full text-left p-3 rounded-xl border text-xs leading-tight transition flex items-center justify-between gap-2 cursor-pointer ${
                            isSubSelected
                              ? 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400 font-bold'
                              : 'bg-transparent border-transparent text-slate-650 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <span className="truncate">{chapter.title}</span>
                          {hasCompleted && <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* RHS - Curriculum Reader, Flashcards, and Exercises */}
              <div className="lg:col-span-3 space-y-8" id="chapter_reader_box">
                <div className="bg-[#FDFCFB] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                  
                  {/* Chapter Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-150 dark:border-slate-800 pb-4">
                    <div>
                      <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase font-bold tracking-widest">{curTheme.subtitle}</span>
                      <h3 className="text-2xl md:text-3xl font-extrabold font-display text-gray-900 dark:text-white mt-1">{curChapter.title}</h3>
                    </div>
                    
                    {/* TTS Reader Trigger */}
                    <button
                      onClick={() => handleReadTextAloud(`${curChapter.title}. ${curChapter.text}`)}
                      className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-xs ${
                        currentlyReadingText === `${curChapter.title}. ${curChapter.text}`
                          ? 'bg-red-500 border-red-500 text-white animate-pulse'
                          : 'bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/20 text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      <Volume2 className="w-4 h-4 shrink-0" />
                      <span>{currentlyReadingText === `${curChapter.title}. ${curChapter.text}` ? 'Ouvindo... Pausar voz' : 'Ouvir esta Lição'}</span>
                    </button>
                  </div>

                  {/* Chapter Pedagogical Narrative Body */}
                  <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed whitespace-pre-line font-size-inherit font-sans">
                    {curChapter.text}
                  </div>

                  {/* Curiosidades Real Banner */}
                  <div className="bg-amber-500/10 border border-amber-300/35 p-5 rounded-2xl relative overflow-hidden" id="curiosity_curriculum_banner">
                    {/* Soft lamp light icon background representation */}
                    <div className="absolute top-0 right-0 p-4 text-3xl opacity-20 select-none">💡</div>
                    <h5 className="font-display font-black text-sm text-amber-800 dark:text-amber-400 flex items-center gap-2">
                       Sabias Que? (Curiosidade da Professora Carla)
                    </h5>
                    <p className="text-xs text-slate-705 dark:text-slate-300 mt-2 leading-relaxed italic">
                      &ldquo;{curChapter.curiosity}&rdquo;
                    </p>
                  </div>

                  {/* Chapter Key Vocabulary Terms */}
                  <div className="space-y-3 pt-4 border-t border-slate-150 dark:border-slate-800">
                    <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-bold tracking-wider">VOCABULÁRIO ESSENCIAL DO TEMA:</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {curChapter.keyConcepts.map((concept, cIdx) => (
                        <div key={cIdx} className="bg-[#FAF9F6] dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 p-4 rounded-xl space-y-1">
                          <h6 className="font-bold font-display text-xs text-gray-900 dark:text-white uppercase tracking-wider">{concept.term}</h6>
                          <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed font-sans mt-1">{concept.definition}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reflexive self question */}
                  <div className="bg-rose-50/60 dark:bg-rose-950/15 border border-rose-250 dark:border-rose-950/40 p-5 rounded-2xl">
                    <h4 className="font-display font-bold text-sm text-rose-800 dark:text-rose-400 flex items-center gap-2">
                       Pergunta de Reflexão (Voz dos Historiadores)
                    </h4>
                    <p className="text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed font-medium">
                      {curChapter.reflectionQuestion}
                    </p>
                  </div>

                  {/* Vetting completion button */}
                  <div className="pt-4 border-t border-slate-150 dark:border-slate-800 flex justify-between items-center flex-wrap gap-4 no-printme">
                    <span className="text-xs text-slate-500 font-sans">Ao concluires a leitura atenta desta lição curricular, regista o avanço!</span>
                    {!completedSubtopics.includes(curChapter.id) ? (
                      <button
                        onClick={() => handleCompleteSubtopic(curChapter.id)}
                        className="bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-600 text-white dark:text-slate-950 font-bold py-3 px-8 rounded-xl text-xs transition duration-200 shadow cursor-pointer border border-transparent dark:border-amber-400/20 animate-pulse"
                      >
                        Marcar Lição como Concluída (+50 PE)
                      </button>
                    ) : (
                      <span className="bg-[#FAF9F6] dark:bg-slate-800/60 border border-emerald-250 text-emerald-600 font-bold text-xs py-2 px-6 rounded-xl flex items-center gap-1.5 font-mono">
                        <CheckCheck className="w-4 h-4 shrink-0" /> Lição Concluída e Validada!
                      </span>
                    )}
                  </div>

                </div>

                {/* INTERACTIVE FLASHCARDS SUBSECTION */}
                <div className="bg-[#FDFCFB] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                  <div className="text-center md:text-left">
                    <h4 className="text-xl font-bold font-display text-gray-900 dark:text-white">Flashcards de Auto-Revisão</h4>
                    <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 font-sans">Clica no card para o virares de pernas para o ar e reveres definições importantes.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {curTheme.flashcards.map((fc) => {
                      const isFlipped = flippedCards.includes(fc.id);
                      return (
                        <div
                          key={fc.id}
                          className="h-44 [perspective:1000px] cursor-pointer"
                          onClick={() => {
                            setFlippedCards(prev =>
                              prev.includes(fc.id) ? prev.filter(id => id !== fc.id) : [...prev, fc.id]
                            );
                            handleAwardPoints(5); // Small points just for trying flashcards
                          }}
                        >
                          <div
                            className={`relative w-full h-full text-center transition-transform duration-500 [transform-style:preserve-3d] ${
                              isFlipped ? '[transform:rotateY(180deg)]' : ''
                            }`}
                          >
                            {/* Front Side */}
                            <div className="absolute inset-0 w-full h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#FAF9F6] dark:bg-slate-900 p-5 flex flex-col justify-between items-center [backface-visibility:hidden] text-center shadow-xs">
                              <span className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-widest">Flashcard</span>
                              <p className="text-sm font-semibold font-display text-gray-800 dark:text-gray-100 max-w-xs">{fc.front}</p>
                              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wide">Clica para ver a resposta</span>
                            </div>

                            {/* Back Side */}
                            <div className="absolute inset-0 w-full h-full rounded-2xl border border-amber-200/50 bg-amber-50 dark:bg-slate-900/60 p-5 flex flex-col justify-between items-center [backface-visibility:hidden] [transform:rotateY(180deg)] text-center shadow-inner">
                              <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-widest">Resposta Correta</span>
                              <p className="text-xs text-slate-800 dark:text-slate-250 mt-2 font-sans italic leading-relaxed">{fc.back}</p>
                              <span className="text-[9px] font-mono font-bold text-amber-600 uppercase tracking-wide">Clica para voltar</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* DRILLS AND EXERCISES SUBSECTION */}
                <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                  <div>
                    <h4 className="text-xl font-bold font-display text-gray-900 dark:text-white">Exercícios de Consolidação</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-sans">Resolve perguntas rápidas de revisão focadas nas Competências Essenciais destes capítulos.</p>
                  </div>

                  <div className="space-y-6">
                    {curTheme.exercises.map((exercise) => {
                      const ansState = exerciseFeedback[exercise.id];
                      return (
                        <div key={exercise.id} className="border border-gray-200/50 dark:border-slate-800 rounded-2xl p-5 md:p-6 space-y-4">
                          <h5 className="font-bold text-sm leading-snug text-gray-950 dark:text-white font-display">
                            💡 {exercise.question}
                          </h5>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3" id="exercise_options_box">
                            {exercise.options.map((opt, oIdx) => {
                              const isChecked = ansState?.selected === oIdx;
                              let btnBorder = "border-gray-200 dark:border-gray-700 bg-gray-50/50 hover:bg-gray-50";
                              if (ansState) {
                                if (exercise.correctOptionIndex === oIdx) {
                                  btnBorder = "border-green-500 bg-green-50/30 text-green-700 font-bold";
                                } else if (isChecked) {
                                  btnBorder = "border-red-400 bg-red-50/30 text-red-700 line-through";
                                } else {
                                  btnBorder = "opacity-40 border-gray-100 bg-gray-50 cursor-not-allowed";
                                }
                              }

                              return (
                                <button
                                  key={oIdx}
                                  disabled={ansState !== undefined}
                                  onClick={() => {
                                    const correct = oIdx === exercise.correctOptionIndex;
                                    setExerciseFeedback(prev => ({
                                      ...prev,
                                      [exercise.id]: { selected: oIdx, correct }
                                    }));
                                    if (correct) {
                                      handleAwardPoints(40);
                                    }
                                  }}
                                  className={`p-3 text-left rounded-xl border text-xs leading-tight transition cursor-pointer ${btnBorder}`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>

                          {ansState && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                                ansState.correct
                                  ? 'bg-green-50 border-green-200 text-green-800'
                                  : 'bg-red-50 border-red-200 text-red-800'
                              }`}
                            >
                              <div className="font-bold flex items-center gap-1.5 mb-1 text-sm">
                                {ansState.correct ? '✅ Superb, resposta absolutamente correta!' : '❌ Erraste o alvo! Lê a explicação do docente:'}
                              </div>
                              <p className="text-gray-700 dark:text-gray-300 italic font-sans">
                                {exercise.explanation}
                              </p>
                              {ansState.correct && (
                                <span className="font-mono text-[10px] font-bold text-green-600 mt-2 block">
                                  🎉 Ganhaste +40 PE de Pontuação virtual!
                                </span>
                              )}
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* C. INTERACTIVE EDUCATIONAL GAMES PAGE */}
          {activeSection === 'jogos' && (
            <motion.div
              key="jogos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              id="jogos_tab_container"
            >
              <Games
                username={username}
                onAwardPoints={handleAwardPoints}
                onUnlockBadge={handleUnlockBadge}
              />
            </motion.div>
          )}

          {/* D. INTERACTIVE CHROMATIC TIMELINE PAGE */}
          {activeSection === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              id="timeline_tab_container"
            >
              <Timeline
                onAwardPoints={handleAwardPoints}
                username={username}
              />
            </motion.div>
          )}

          {/* E. HISTORICAL GALLERY & DISCOVERY SOURCES */}
          {activeSection === 'galeria' && (
            <motion.div
              key="galeria"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              id="galeria_tab_container"
            >
              <Gallery
                onAwardPoints={handleAwardPoints}
                onUnlockBadge={handleUnlockBadge}
                username={username}
              />
            </motion.div>
          )}

          {/* F. FINAL VALUATION EXAM (QUIZ) */}
          {activeSection === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              id="quiz_tab_container"
            >
              <Quiz
                username={username}
                onAwardPoints={handleAwardPoints}
                onUnlockBadge={handleUnlockBadge}
                onSaveQuizResult={(percentage) => {
                  setQuizResults(prev => {
                    const updated = { ...prev, exam_final: percentage };
                    localStorage.setItem('historia_7_quiz_results', JSON.stringify(updated));
                    return updated;
                  });
                }}
              />
            </motion.div>
          )}

          {/* G. LEADERBOARD PROGRESS PANEL */}
          {activeSection === 'progresso' && (
            <motion.div
              key="progresso"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
              id="progress_tab_container"
            >
              <div className="border-b p-4 border-gray-150 dark:border-slate-800 pb-4">
                <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white">O Meu Progresso Escolar</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Acompanha aqui o teu progresso de PE, lições validadas pelas ordens e a tua galeria de insígnias e diplomas obtidos.
                </p>
              </div>

              {/* Grid with overview statistics summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                
                {/* Score widget */}
                <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-2xl p-6 text-center space-y-2 shadow-xs">
                  <span className="text-4xl">💎</span>
                  <h4 className="font-mono text-3xl font-extrabold text-gray-950 dark:text-white">{score} PE</h4>
                  <p className="text-xs text-gray-400">Pontuação de Experiência Acumulada</p>
                </div>

                {/* Level widget */}
                <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-2xl p-6 text-center space-y-2 shadow-xs">
                  <span className="text-4xl">{levelInfo.icon}</span>
                  <h4 className="font-display text-lg font-bold text-indigo-700 dark:text-indigo-400">{levelInfo.title}</h4>
                  <p className="text-xs text-gray-400 leading-tight">{levelInfo.desc}</p>
                </div>

                {/* Completed subtopics widget */}
                <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-2xl p-6 text-center space-y-2 shadow-xs">
                  <span className="text-4xl">📚</span>
                  <h4 className="font-mono text-3xl font-bold text-gray-950 dark:text-white">{completedSubtopics.length} / 12</h4>
                  <p className="text-xs text-gray-400">Lições do Currículo Concluídas</p>
                </div>

                {/* Quizzes widget */}
                <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-2xl p-6 text-center space-y-2 shadow-xs">
                  <span className="text-4xl">🎓</span>
                  <h4 className="font-mono text-2xl font-bold text-gray-950 dark:text-white">
                    {quizResults.exam_final !== undefined ? `${Math.round(quizResults.exam_final)}%` : "Por Fazer"}
                  </h4>
                  <p className="text-xs text-gray-400">Classificação no Exame Final</p>
                </div>

              </div>

              {/* Badges Collection Showcase */}
              <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-150 dark:border-gray-800 space-y-6 shadow-xs">
                <div>
                  <h4 className="text-xl font-bold font-display text-gray-900 dark:text-white">A Minha Vitrine de Medalhas ({ownedBadges.length} de {BADGES.length})</h4>
                  <p className="text-xs text-gray-400 mt-1">Completa tarefas curriculares e jogos lúdicos para obteres insígnias do reino!</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {BADGES.map((badge) => {
                    const isUnlocked = ownedBadges.includes(badge.id);
                    return (
                      <div
                        key={badge.id}
                        className={`p-5 rounded-2xl border transition duration-300 text-center space-y-3 relative overflow-hidden ${
                          isUnlocked
                            ? 'bg-gradient-to-br from-indigo-50/40 to-white dark:from-indigo-950/20 dark:to-gray-900 border-indigo-200'
                            : 'border-gray-150 dark:border-gray-850 opacity-40 bg-gray-50/20'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center text-2xl font-bold shadow-xs ${
                          isUnlocked ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {badge.id === 'primeiros_passos' ? '🗺️' :
                           badge.id === 'explorer_t1' ? '🔥' :
                           badge.id === 'roma_vicit_t2' ? '🏛️' :
                           badge.id === 'reconquistador_t3' ? '⚔️' :
                           badge.id === 'mestre_medieval_t4' ? '⛵' :
                           badge.id === 'mente_brilhante' ? '🧠' :
                           badge.id === 'arqueologo' ? '🔍' : '🏆'}
                        </div>

                        <div>
                          <h5 className={`font-bold font-display text-xs uppercase tracking-wide ${isUnlocked ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                            {badge.title}
                          </h5>
                          <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1.5 leading-relaxed font-sans">
                            {badge.description}
                          </p>
                        </div>

                        {/* Lock indicator */}
                        {!isUnlocked && (
                          <div className="text-[10px] font-mono text-red-500 uppercase font-bold tracking-wider pt-1">
                            &bull; Bloqueada &bull;
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Diploma reference */}
              {quizResults.exam_final !== undefined && quizResults.exam_final >= 50 && (
                <div className="bg-emerald-500/10 border border-emerald-300 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-emerald-800 dark:text-emerald-400 font-display">Aceder ao Teu Diploma Digital</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Parabéns! Podes ver, descarregar ou imprimir o teu Diploma Certificado Sumativo na aba do Quiz Final.</p>
                  </div>
                  <button
                    onClick={() => setActiveSection('quiz')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl text-xs transition cursor-pointer shrink-0 shadow-md"
                  >
                    Abrir Certificado de Honra →
                  </button>
                </div>
              )}

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* 7. CLASS FOOTER */}
      <footer className="bg-white dark:bg-slate-900 border-t border-gray-150 dark:border-slate-800 py-10 mt-16 no-printme text-center" id="primary_app_footer">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="text-xs text-gray-400 font-mono">
            &copy; {new Date().getFullYear()} &bull; 7.º Ano - História &bull; Professora Carla Oliveira &bull; Portugal de Portugal.
          </div>
          <p className="text-[11px] text-gray-400 max-w-lg mx-auto leading-relaxed">
            Desenvolvido em conformidade pedagógica rigorosa com os Critérios Gerais de Sucesso do Ministério da Educação. Todos os direitos de aprendizagem assegurados.
          </p>
        </div>
      </footer>

    </div>
  );
}
