import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  RotateCcw,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Trophy,
  Brain,
  Clock,
  Flame,
  Home,
  Plus,
  Trash2,
  Zap,
  Star,
  Sparkles,
  GraduationCap,
  Target,
  BookOpen
} from 'lucide-react'
import { TopBar } from '../components/layout/TopBar'
import { BottomNav } from '../components/layout/BottomNav'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useFlashcards } from '../contexts/FlashcardContext'
import { FadeIn, SlideUp, StaggerContainer, StaggerItem, ScaleIn } from '../components/transitions'
import type { Flashcard, FlashcardSet } from '../types/flashcards'

// Shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// XP Popup Component - Genius Blue Edition
function XpPopup({ xp, onComplete }: { xp: number; onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      <motion.div
        initial={{ y: 50, scale: 0.8 }}
        animate={{ y: 0, scale: 1 }}
        className="text-center relative"
      >
        {/* Animated rings */}
        <motion.div
          className="absolute inset-0 -top-12 -left-12 w-48 h-48 rounded-full border-2 border-[#00E5FF]/30"
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0 -top-12 -left-12 w-48 h-48 rounded-full border-2 border-[#4364F7]/30"
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        />

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, -5, 5, 0]
          }}
          transition={{ duration: 0.6, repeat: 3 }}
          className="w-28 h-28 rounded-full bg-gradient-to-br from-[#0052D4] via-[#4364F7] to-[#6FB1FC] flex items-center justify-center mx-auto mb-6 relative"
          style={{ boxShadow: '0 0 60px rgba(67, 100, 247, 0.6)' }}
        >
          {/* Inner glow */}
          <motion.div
            className="absolute inset-2 rounded-full bg-gradient-to-br from-[#6FB1FC] to-[#00E5FF] opacity-50"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <Zap className="w-14 h-14 text-white relative z-10" />
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-bold text-gradient-blue mb-3"
        >
          +{xp} XP
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[#00E5FF] text-lg font-medium"
        >
          Session terminee !
        </motion.p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="mt-4 text-gray-400 text-sm"
        >
          Continue comme ca !
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// Single Flashcard Component - Genius Blue Edition
function FlashcardComponent({
  card,
  isFlipped,
  onFlip,
  onResult
}: {
  card: Flashcard
  isFlipped: boolean
  onFlip: () => void
  onResult: (correct: boolean) => void
}) {
  const difficultyConfig = {
    easy: { gradient: 'from-[#00C853] via-[#00E676] to-[#69F0AE]', label: 'Facile' },
    medium: { gradient: 'from-[#0052D4] via-[#4364F7] to-[#6FB1FC]', label: 'Moyen' },
    hard: { gradient: 'from-[#FF5252] via-[#FF7B7B] to-[#FFAB91]', label: 'Difficile' }
  }

  const { gradient, label } = difficultyConfig[card.difficulty]

  return (
    <motion.div
      className="w-full h-[380px] perspective-1000"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0, x: -100 }}
    >
      <motion.div
        className="w-full h-full relative cursor-pointer"
        onClick={onFlip}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front - Question */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rounded-3xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div
            className={`h-full bg-gradient-to-br ${gradient} flex flex-col p-6 relative`}
            style={{ boxShadow: '0 20px 60px -15px rgba(0, 82, 212, 0.4)' }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="flex items-center justify-between mb-4 relative z-10">
              <span className="text-white text-sm font-semibold px-4 py-1.5 bg-white/20 rounded-full backdrop-blur-sm">
                Question
              </span>
              <div className="flex items-center gap-2">
                {card.masteryLevel > 0 && (
                  <span className="text-white/80 text-xs flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 fill-white" />
                    {card.masteryLevel}%
                  </span>
                )}
                <span className="text-white/60 text-xs bg-white/10 px-2 py-1 rounded-full">
                  {label}
                </span>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center relative z-10">
              <p className="text-white text-2xl font-bold text-center leading-relaxed drop-shadow-lg">
                {card.question}
              </p>
            </div>

            <div className="text-center relative z-10">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex items-center gap-2 text-white/70 text-sm"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Touche pour retourner</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Back - Answer */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rounded-3xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div
            className="h-full bg-slate-800 flex flex-col p-6 border border-slate-700/50"
            style={{ boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.5)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#00E5FF] text-sm font-semibold px-4 py-1.5 bg-[#00E5FF]/20 rounded-full">
                Reponse
              </span>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="w-5 h-5 text-amber-400" />
              </motion.div>
            </div>

            <div className="flex-1 flex items-center justify-center overflow-y-auto">
              <p className="text-white text-xl text-center leading-relaxed font-medium">
                {card.answer}
              </p>
            </div>

            {/* Result buttons - Genius Blue Edition */}
            <div className="flex items-center justify-center gap-4 mt-4" onClick={(e) => e.stopPropagation()}>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onResult(false)}
                className="flex items-center gap-2 bg-[#FF5252]/20 hover:bg-[#FF5252]/30 text-[#FF5252] px-6 py-3 rounded-2xl font-semibold transition-all border-2 border-[#FF5252]/50"
                style={{ boxShadow: '0 4px 20px -4px rgba(255, 82, 82, 0.3)' }}
              >
                <X className="w-5 h-5" />
                Revoir
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onResult(true)}
                className="flex items-center gap-2 bg-[#00E5FF]/20 hover:bg-[#00E5FF]/30 text-[#00E5FF] px-6 py-3 rounded-2xl font-semibold transition-all border-2 border-[#00E5FF]/50"
                style={{ boxShadow: '0 4px 20px -4px rgba(0, 229, 255, 0.3)' }}
              >
                <Check className="w-5 h-5" />
                Maitrise
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Results Screen - Genius Blue Edition
function ResultsScreen({
  correct,
  incorrect,
  total,
  timeSpent,
  xpEarned,
  streakMaintained,
  onRestart,
  onGoHome,
  onReviewMistakes
}: {
  correct: number
  incorrect: number
  total: number
  timeSpent: number
  xpEarned: number
  streakMaintained: boolean
  onRestart: () => void
  onGoHome: () => void
  onReviewMistakes: () => void
}) {
  const percentage = Math.round((correct / total) * 100)
  const minutes = Math.floor(timeSpent / 60)
  const seconds = timeSpent % 60
  const isPerfect = incorrect === 0

  const getMessage = () => {
    if (percentage >= 90) return { text: 'Excellent !', color: 'from-[#00C853] to-[#69F0AE]' }
    if (percentage >= 70) return { text: 'Bien joue !', color: 'from-[#0052D4] to-[#6FB1FC]' }
    if (percentage >= 50) return { text: 'Pas mal !', color: 'from-[#FF9100] to-[#FFD180]' }
    return { text: 'Continue !', color: 'from-[#FF5252] to-[#FFAB91]' }
  }

  const message = getMessage()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-6"
    >
      {/* Ralph Animation with glow */}
      <motion.div
        className="relative inline-block mb-4"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#0052D4] to-[#6FB1FC] rounded-full blur-2xl opacity-30"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <img
          src="/ralph.png"
          alt="Ralph"
          className="w-28 h-28 object-contain relative z-10"
        />
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold text-gradient-blue mb-2"
      >
        {message.text}
      </motion.h1>

      {/* Perfect badge */}
      {isPerfect && (
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, type: 'spring' }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0052D4] via-[#4364F7] to-[#6FB1FC] text-white px-5 py-2 rounded-full mb-4 font-semibold"
          style={{ boxShadow: '0 4px 20px -4px rgba(67, 100, 247, 0.5)' }}
        >
          <Sparkles className="w-5 h-5" />
          Session Parfaite !
        </motion.div>
      )}

      {/* XP Earned */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-center gap-3 mb-6"
      >
        <motion.div
          className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 px-5 py-2.5 rounded-full flex items-center gap-2 border border-amber-500/30"
          whileHover={{ scale: 1.05 }}
        >
          <Zap className="w-5 h-5" />
          <span className="font-bold text-xl">+{xpEarned} XP</span>
        </motion.div>
        {streakMaintained && (
          <motion.div
            className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 px-5 py-2.5 rounded-full flex items-center gap-2 border border-orange-500/30"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Flame className="w-5 h-5" />
            <span className="font-bold">Streak !</span>
          </motion.div>
        )}
      </motion.div>

      {/* Score Circle - Genius Blue Edition */}
      <div className="relative w-44 h-44 mx-auto mb-6">
        {/* Glow effect */}
        <motion.div
          className={`absolute inset-0 rounded-full bg-gradient-to-r ${message.color} opacity-20 blur-xl`}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <svg className="w-full h-full transform -rotate-90 relative z-10">
          <circle
            cx="88"
            cy="88"
            r="78"
            stroke="#1E293B"
            strokeWidth="10"
            fill="none"
          />
          <motion.circle
            cx="88"
            cy="88"
            r="78"
            stroke="url(#scoreGradient)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDasharray: '0 490' }}
            animate={{ strokeDasharray: `${(percentage / 100) * 490} 490` }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0052D4" />
              <stop offset="50%" stopColor="#4364F7" />
              <stop offset="100%" stopColor="#00E5FF" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-5xl font-bold text-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            {percentage}%
          </motion.span>
          <span className="text-gray-400 text-sm">Score</span>
        </div>
      </div>

      {/* Stats - Genius Blue Edition */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-[#00E5FF]/10 to-[#00B8D4]/10 rounded-2xl p-4 border border-[#00E5FF]/30"
        >
          <div className="w-10 h-10 rounded-full bg-[#00E5FF]/20 flex items-center justify-center mx-auto mb-2">
            <Check className="w-5 h-5 text-[#00E5FF]" />
          </div>
          <p className="text-2xl font-bold text-white">{correct}</p>
          <p className="text-xs text-gray-400">Correct</p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-[#FF5252]/10 to-[#FF7B7B]/10 rounded-2xl p-4 border border-[#FF5252]/30"
        >
          <div className="w-10 h-10 rounded-full bg-[#FF5252]/20 flex items-center justify-center mx-auto mb-2">
            <X className="w-5 h-5 text-[#FF5252]" />
          </div>
          <p className="text-2xl font-bold text-white">{incorrect}</p>
          <p className="text-xs text-gray-400">A revoir</p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-[#4364F7]/10 to-[#6FB1FC]/10 rounded-2xl p-4 border border-[#4364F7]/30"
        >
          <div className="w-10 h-10 rounded-full bg-[#4364F7]/20 flex items-center justify-center mx-auto mb-2">
            <Clock className="w-5 h-5 text-[#6FB1FC]" />
          </div>
          <p className="text-2xl font-bold text-white">{minutes}:{seconds.toString().padStart(2, '0')}</p>
          <p className="text-xs text-gray-400">Temps</p>
        </motion.div>
      </div>

      {/* Actions - Genius Blue Edition */}
      <div className="space-y-3">
        {incorrect > 0 && (
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onReviewMistakes}
            className="w-full py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-[#FF5252] via-[#FF7B7B] to-[#FFAB91] flex items-center justify-center gap-2"
            style={{ boxShadow: '0 10px 40px -10px rgba(255, 82, 82, 0.5)' }}
          >
            <RotateCcw className="w-5 h-5" />
            Revoir les erreurs ({incorrect})
          </motion.button>
        )}

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRestart}
          className="w-full py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-[#0052D4] via-[#4364F7] to-[#6FB1FC] flex items-center justify-center gap-2"
          style={{ boxShadow: '0 10px 40px -10px rgba(67, 100, 247, 0.5)' }}
        >
          <Shuffle className="w-5 h-5" />
          Recommencer
        </motion.button>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onGoHome}
          className="w-full py-4 rounded-2xl font-semibold text-gray-300 bg-slate-800/50 border border-slate-700/50 hover:border-[#4364F7]/30 flex items-center justify-center gap-2 transition-all"
        >
          <Home className="w-5 h-5" />
          Retour a l'accueil
        </motion.button>
      </div>
    </motion.div>
  )
}

export function FlashcardsPlayerPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const {
    sets,
    deleteSet,
    recordSession,
    updateCardMastery,
    gamification,
    isLoaded
  } = useFlashcards()

  const [selectedSet, setSelectedSet] = useState<FlashcardSet | null>(null)
  const [currentCards, setCurrentCards] = useState<Flashcard[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [results, setResults] = useState<{ cardId: string; correct: boolean }[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [startTime, setStartTime] = useState<number>(0)
  const [timeSpent, setTimeSpent] = useState(0)
  const [xpEarned, setXpEarned] = useState(0)
  const [showXpPopup, setShowXpPopup] = useState(false)

  // Load set from navigation state or URL
  useEffect(() => {
    if (!isLoaded) return

    const stateSetId = (location.state as any)?.setId
    if (stateSetId) {
      const set = sets.find(s => s.id === stateSetId)
      if (set) {
        startSession(set)
      }
    }
  }, [location.state, sets, isLoaded])

  const startSession = useCallback((set: FlashcardSet) => {
    setSelectedSet(set)
    setCurrentCards(shuffleArray(set.cards))
    setCurrentIndex(0)
    setIsFlipped(false)
    setResults([])
    setIsComplete(false)
    setStartTime(Date.now())
    setXpEarned(0)
  }, [])

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleResult = (correct: boolean) => {
    const currentCard = currentCards[currentIndex]
    setResults(prev => [...prev, { cardId: currentCard.id, correct }])

    // Update card mastery
    if (selectedSet) {
      updateCardMastery(selectedSet.id, currentCard.id, correct)
    }

    // Next card
    if (currentIndex < currentCards.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setIsFlipped(false)
    } else {
      // Session complete
      const duration = Math.floor((Date.now() - startTime) / 1000)
      setTimeSpent(duration)

      const correctCount = results.filter(r => r.correct).length + (correct ? 1 : 0)
      const incorrectCount = results.filter(r => !r.correct).length + (correct ? 0 : 1)

      // Record session and get XP
      if (selectedSet) {
        const earnedXp = recordSession({
          setId: selectedSet.id,
          setTitle: selectedSet.title,
          startedAt: new Date(startTime).toISOString(),
          completedAt: new Date().toISOString(),
          cardsStudied: currentCards.length,
          cardsCorrect: correctCount,
          cardsIncorrect: incorrectCount,
          duration,
          streakMaintained: gamification.currentStreak > 0
        })
        setXpEarned(earnedXp)
        setShowXpPopup(true)
      }

      setIsComplete(true)
    }
  }

  const handleRestart = () => {
    if (selectedSet) {
      startSession(selectedSet)
    }
  }

  const handleReviewMistakes = () => {
    if (!selectedSet) return

    const incorrectIds = results.filter(r => !r.correct).map(r => r.cardId)
    const mistakeCards = selectedSet.cards.filter(c => incorrectIds.includes(c.id))

    setCurrentCards(shuffleArray(mistakeCards))
    setCurrentIndex(0)
    setIsFlipped(false)
    setResults([])
    setIsComplete(false)
    setStartTime(Date.now())
    setXpEarned(0)
  }

  const handleDeleteSet = (setId: string) => {
    if (confirm('Supprimer ce set de flashcards ?')) {
      deleteSet(setId)
    }
  }

  const correctCount = results.filter(r => r.correct).length
  const incorrectCount = results.filter(r => !r.correct).length

  // Loading state - Genius Blue Edition
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-genius-bg flex items-center justify-center">
        <motion.div className="relative">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#0052D4] to-[#6FB1FC] rounded-full blur-xl opacity-30"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-[#0052D4] to-[#6FB1FC] flex items-center justify-center"
          >
            <Brain className="w-8 h-8 text-white" />
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-genius-bg pb-20 pt-16">
      <TopBar />

      {/* XP Popup */}
      <AnimatePresence>
        {showXpPopup && (
          <XpPopup xp={xpEarned} onComplete={() => setShowXpPopup(false)} />
        )}
      </AnimatePresence>

      <div className="p-4 max-w-lg mx-auto">
        {!selectedSet ? (
          // Set Selection - Genius Blue Edition
          <>
            <FadeIn delay={0}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="relative"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <img src="/ralph.png" alt="Ralph" className="w-14 h-14 object-contain" />
                    <motion.div
                      className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r from-[#0052D4] to-[#6FB1FC] flex items-center justify-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Brain className="w-3 h-3 text-white" />
                    </motion.div>
                  </motion.div>
                  <div>
                    <h1 className="text-2xl font-bold text-gradient-blue">Flashcards</h1>
                    <p className="text-gray-400 text-sm">Choisis un set a reviser</p>
                  </div>
                </div>

                {/* Streak indicator - Genius Blue Edition */}
                {gamification.currentStreak > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 px-4 py-2 rounded-full border border-orange-500/30"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      <Flame className="w-4 h-4" />
                    </motion.div>
                    <span className="font-bold text-sm">{gamification.currentStreak}j</span>
                  </motion.div>
                )}
              </div>
            </FadeIn>

            {/* Daily progress - Genius Blue Edition */}
            {gamification.dailyGoal.cardsToReview > 0 && (
              <SlideUp delay={0.1}>
                <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-[#0052D4]/10 to-[#4364F7]/10 border border-[#4364F7]/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#0052D4] to-[#6FB1FC] flex items-center justify-center">
                        <Target className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-300 text-sm font-medium">Objectif du jour</span>
                    </div>
                    <span className="text-[#6FB1FC] text-sm font-bold">
                      {gamification.dailyGoal.cardsReviewed}/{gamification.dailyGoal.cardsToReview} cartes
                    </span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#0052D4] via-[#4364F7] to-[#6FB1FC] rounded-full relative"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min(100, (gamification.dailyGoal.cardsReviewed / gamification.dailyGoal.cardsToReview) * 100)}%`
                      }}
                      transition={{ duration: 0.8 }}
                    >
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      />
                    </motion.div>
                  </div>
                </div>
              </SlideUp>
            )}

            {sets.length === 0 ? (
              <SlideUp delay={0.2}>
                <div className="text-center py-12">
                  <motion.div
                    className="relative inline-block mb-6"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#0052D4] to-[#6FB1FC] rounded-full blur-2xl opacity-30"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#0052D4]/20 to-[#6FB1FC]/20 border border-[#4364F7]/30 flex items-center justify-center">
                      <BookOpen className="w-10 h-10 text-[#6FB1FC]" />
                    </div>
                  </motion.div>
                  <h2 className="text-xl font-bold text-white mb-2">Aucun set</h2>
                  <p className="text-gray-400 mb-6">
                    Cree ton premier set a partir de tes notes !
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/notes')}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-[#0052D4] via-[#4364F7] to-[#6FB1FC]"
                    style={{ boxShadow: '0 10px 40px -10px rgba(67, 100, 247, 0.5)' }}
                  >
                    <Plus className="w-5 h-5" />
                    Creer des flashcards
                  </motion.button>
                </div>
              </SlideUp>
            ) : (
              <StaggerContainer className="space-y-3">
                {sets.map((set, index) => (
                  <StaggerItem key={set.id}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-slate-800/50 border border-slate-700/50 hover:border-[#4364F7]/50 rounded-2xl p-4 cursor-pointer relative group transition-all duration-300"
                      style={{
                        boxShadow: '0 4px 20px -4px rgba(0, 0, 0, 0.3)'
                      }}
                      onClick={() => startSession(set)}
                    >
                      <div className="flex items-center gap-4">
                        {/* Set icon */}
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0052D4] to-[#6FB1FC] flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                          <GraduationCap className="w-7 h-7 text-white" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white truncate pr-8">
                            {set.title}
                          </h3>
                          <div className="flex items-center gap-3 mt-1.5">
                            <span className="text-sm text-gray-400 flex items-center gap-1">
                              <BookOpen className="w-3 h-3" />
                              {set.cards.length} cartes
                            </span>
                            {set.totalReviews > 0 && (
                              <span className="text-xs text-[#00E5FF] px-2 py-0.5 rounded-full bg-[#00E5FF]/20">
                                {set.totalReviews} revisions
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Cree le {new Date(set.createdAt).toLocaleDateString('fr-FR')}
                          </p>
                        </div>

                        <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-[#6FB1FC] transition-colors" />
                      </div>

                      {/* Delete button */}
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.1 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteSet(set.id)
                        }}
                        className="absolute top-3 right-12 p-2 bg-[#FF5252]/20 hover:bg-[#FF5252]/30 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4 text-[#FF5252]" />
                      </motion.button>
                    </motion.div>
                  </StaggerItem>
                ))}

                <SlideUp delay={0.3 + sets.length * 0.05}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/notes')}
                    className="w-full py-4 rounded-2xl font-medium text-gray-300 bg-slate-800/30 border border-dashed border-slate-700/50 hover:border-[#4364F7]/50 flex items-center justify-center gap-2 transition-all mt-4"
                  >
                    <Plus className="w-5 h-5" />
                    Nouveau set
                  </motion.button>
                </SlideUp>
              </StaggerContainer>
            )}
          </>
        ) : isComplete ? (
          // Results Screen
          <ResultsScreen
            correct={correctCount}
            incorrect={incorrectCount}
            total={currentCards.length}
            timeSpent={timeSpent}
            xpEarned={xpEarned}
            streakMaintained={gamification.currentStreak > 0}
            onRestart={handleRestart}
            onGoHome={() => setSelectedSet(null)}
            onReviewMistakes={handleReviewMistakes}
          />
        ) : (
          // Playing Session - Genius Blue Edition
          <>
            {/* Header - Enhanced */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center justify-between mb-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedSet(null)}
                className="p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-xl transition-colors border border-slate-700/50"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </motion.button>

              <div className="text-center">
                <h2 className="font-semibold text-white truncate max-w-[180px]">
                  {selectedSet.title}
                </h2>
                <p className="text-sm text-[#6FB1FC] font-medium">
                  {currentIndex + 1} / {currentCards.length}
                </p>
              </div>

              {/* Score indicator */}
              <div className="flex items-center gap-1 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50">
                <span className="text-[#00E5FF] text-sm font-bold">{correctCount}</span>
                <span className="text-gray-500 text-xs">|</span>
                <span className="text-[#FF5252] text-sm font-bold">{incorrectCount}</span>
              </div>
            </motion.div>

            {/* Progress Bar - Genius Blue Edition */}
            <div className="w-full bg-slate-800/50 rounded-full h-3 mb-6 overflow-hidden border border-slate-700/30">
              <motion.div
                className="h-full bg-gradient-to-r from-[#0052D4] via-[#4364F7] to-[#6FB1FC] rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / currentCards.length) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Animated glow at end */}
                <motion.div
                  className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-r from-transparent to-white/50"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.div>
            </div>

            {/* Card counter dots */}
            <div className="flex justify-center gap-1 mb-4">
              {currentCards.slice(
                Math.max(0, currentIndex - 3),
                Math.min(currentCards.length, currentIndex + 4)
              ).map((_, idx) => {
                const actualIdx = Math.max(0, currentIndex - 3) + idx
                return (
                  <motion.div
                    key={actualIdx}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      actualIdx === currentIndex
                        ? 'w-6 bg-gradient-to-r from-[#0052D4] to-[#6FB1FC]'
                        : actualIdx < currentIndex
                        ? 'bg-[#00E5FF]/50'
                        : 'bg-slate-700'
                    }`}
                  />
                )
              })}
            </div>

            {/* Flashcard */}
            <AnimatePresence mode="wait">
              <FlashcardComponent
                key={currentCards[currentIndex].id}
                card={currentCards[currentIndex]}
                isFlipped={isFlipped}
                onFlip={handleFlip}
                onResult={handleResult}
              />
            </AnimatePresence>

            {/* Hint - Enhanced */}
            {!isFlipped && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-6"
              >
                <motion.p
                  className="text-gray-400 text-sm flex items-center justify-center gap-2"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <RotateCcw className="w-4 h-4" />
                  Touche la carte pour voir la reponse
                </motion.p>
              </motion.div>
            )}
          </>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
