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
  Trash2
} from 'lucide-react'
import { TopBar } from '../components/layout/TopBar'
import { BottomNav } from '../components/layout/BottomNav'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import type { Flashcard, FlashcardSet } from './NotesInput'

// Local storage key
const FLASHCARD_SETS_KEY = 'genius_flashcard_sets'

// Shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// Single Flashcard Component
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
  const difficultyColors = {
    easy: 'from-green-500 to-emerald-600',
    medium: 'from-amber-500 to-orange-600',
    hard: 'from-red-500 to-rose-600'
  }

  return (
    <motion.div
      className="w-full h-[350px] perspective-1000"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
    >
      <motion.div
        className="w-full h-full relative cursor-pointer"
        onClick={onFlip}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front - Question */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <Card
            variant="glass"
            padding="lg"
            className={`h-full bg-gradient-to-br ${difficultyColors[card.difficulty]} flex flex-col`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/80 text-sm font-medium px-3 py-1 bg-white/20 rounded-full">
                Question
              </span>
              <span className="text-white/60 text-xs">
                Touche pour voir la reponse
              </span>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <p className="text-white text-xl font-semibold text-center leading-relaxed">
                {card.question}
              </p>
            </div>

            <div className="text-center">
              <RotateCcw className="w-6 h-6 text-white/50 mx-auto animate-pulse" />
            </div>
          </Card>
        </div>

        {/* Back - Answer */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <Card
            variant="glass"
            padding="lg"
            className="h-full bg-slate-800 flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-primary-400 text-sm font-medium px-3 py-1 bg-primary-500/20 rounded-full">
                Reponse
              </span>
            </div>

            <div className="flex-1 flex items-center justify-center overflow-y-auto">
              <p className="text-white text-lg text-center leading-relaxed">
                {card.answer}
              </p>
            </div>

            {/* Result buttons */}
            <div className="flex items-center justify-center gap-4 mt-4" onClick={(e) => e.stopPropagation()}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => onResult(false)}
                className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-6 py-3 rounded-xl font-medium transition-colors"
              >
                <X className="w-5 h-5" />
                Revoir
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => onResult(true)}
                className="flex items-center gap-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 px-6 py-3 rounded-xl font-medium transition-colors"
              >
                <Check className="w-5 h-5" />
                Maitrise
              </motion.button>
            </div>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Results Screen
function ResultsScreen({
  correct,
  incorrect,
  total,
  timeSpent,
  onRestart,
  onGoHome,
  onReviewMistakes
}: {
  correct: number
  incorrect: number
  total: number
  timeSpent: number
  onRestart: () => void
  onGoHome: () => void
  onReviewMistakes: () => void
}) {
  const percentage = Math.round((correct / total) * 100)
  const minutes = Math.floor(timeSpent / 60)
  const seconds = timeSpent % 60

  const getMessage = () => {
    if (percentage >= 90) return { text: 'Excellent !', emoji: '/ralph.png' }
    if (percentage >= 70) return { text: 'Bien joue !', emoji: '/ralph.png' }
    if (percentage >= 50) return { text: 'Pas mal !', emoji: '/ralph.png' }
    return { text: 'Continue !', emoji: '/ralph.png' }
  }

  const message = getMessage()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      {/* Ralph Animation */}
      <motion.img
        src={message.emoji}
        alt="Ralph"
        className="w-32 h-32 object-contain mx-auto mb-4"
        animate={{ y: [0, -20, 0], rotate: [0, -5, 5, 0] }}
        transition={{ duration: 1.5, repeat: 3 }}
      />

      <h1 className="text-3xl font-bold text-white mb-2">{message.text}</h1>
      <p className="text-gray-400 mb-6">Session terminee</p>

      {/* Score Circle */}
      <div className="relative w-40 h-40 mx-auto mb-6">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            className="text-slate-700"
          />
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            className={percentage >= 70 ? 'text-green-500' : percentage >= 50 ? 'text-amber-500' : 'text-red-500'}
            initial={{ strokeDasharray: '0 440' }}
            animate={{ strokeDasharray: `${(percentage / 100) * 440} 440` }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-white">{percentage}%</span>
          <span className="text-gray-400 text-sm">Score</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card variant="default" padding="md">
          <Check className="w-6 h-6 text-green-400 mx-auto mb-1" />
          <p className="text-2xl font-bold text-white">{correct}</p>
          <p className="text-xs text-gray-500">Correct</p>
        </Card>
        <Card variant="default" padding="md">
          <X className="w-6 h-6 text-red-400 mx-auto mb-1" />
          <p className="text-2xl font-bold text-white">{incorrect}</p>
          <p className="text-xs text-gray-500">A revoir</p>
        </Card>
        <Card variant="default" padding="md">
          <Clock className="w-6 h-6 text-blue-400 mx-auto mb-1" />
          <p className="text-2xl font-bold text-white">{minutes}:{seconds.toString().padStart(2, '0')}</p>
          <p className="text-xs text-gray-500">Temps</p>
        </Card>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        {incorrect > 0 && (
          <Button
            onClick={onReviewMistakes}
            variant="primary"
            size="lg"
            className="w-full"
            leftIcon={<RotateCcw className="w-5 h-5" />}
          >
            Revoir les erreurs ({incorrect})
          </Button>
        )}
        <Button
          onClick={onRestart}
          variant="secondary"
          size="lg"
          className="w-full"
          leftIcon={<Shuffle className="w-5 h-5" />}
        >
          Recommencer
        </Button>
        <Button
          onClick={onGoHome}
          variant="ghost"
          size="lg"
          className="w-full"
          leftIcon={<Home className="w-5 h-5" />}
        >
          Retour a l'accueil
        </Button>
      </div>
    </motion.div>
  )
}

export function FlashcardsPlayerPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const [sets, setSets] = useState<FlashcardSet[]>([])
  const [selectedSet, setSelectedSet] = useState<FlashcardSet | null>(null)
  const [currentCards, setCurrentCards] = useState<Flashcard[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [results, setResults] = useState<{ cardId: string; correct: boolean }[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [startTime, setStartTime] = useState<number>(0)
  const [timeSpent, setTimeSpent] = useState(0)

  // Load sets from localStorage
  useEffect(() => {
    const savedSets = JSON.parse(localStorage.getItem(FLASHCARD_SETS_KEY) || '[]')
    setSets(savedSets)

    // Check if navigated with a specific set
    const stateSetId = (location.state as any)?.setId
    if (stateSetId) {
      const set = savedSets.find((s: FlashcardSet) => s.id === stateSetId)
      if (set) {
        startSession(set)
      }
    }
  }, [location.state])

  const startSession = useCallback((set: FlashcardSet) => {
    setSelectedSet(set)
    setCurrentCards(shuffleArray(set.cards))
    setCurrentIndex(0)
    setIsFlipped(false)
    setResults([])
    setIsComplete(false)
    setStartTime(Date.now())
  }, [])

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleResult = (correct: boolean) => {
    const currentCard = currentCards[currentIndex]
    setResults(prev => [...prev, { cardId: currentCard.id, correct }])

    // Next card
    if (currentIndex < currentCards.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setIsFlipped(false)
    } else {
      // Session complete
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000))
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
  }

  const handleDeleteSet = (setId: string) => {
    if (confirm('Supprimer ce set de flashcards ?')) {
      const newSets = sets.filter(s => s.id !== setId)
      setSets(newSets)
      localStorage.setItem(FLASHCARD_SETS_KEY, JSON.stringify(newSets))
    }
  }

  const correctCount = results.filter(r => r.correct).length
  const incorrectCount = results.filter(r => !r.correct).length

  return (
    <div className="min-h-screen bg-genius-bg pb-20 pt-16">
      <TopBar />

      <div className="p-4 max-w-lg mx-auto">
        {!selectedSet ? (
          // Set Selection
          <>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center gap-3 mb-6"
            >
              <motion.img
                src="/ralph.png"
                alt="Ralph"
                className="w-12 h-12 object-contain"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div>
                <h1 className="text-xl font-bold text-white">Flashcards</h1>
                <p className="text-gray-400 text-sm">Choisis un set a reviser</p>
              </div>
            </motion.div>

            {sets.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <Brain className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-white mb-2">Aucun set</h2>
                <p className="text-gray-400 mb-6">
                  Cree ton premier set a partir de tes notes !
                </p>
                <Button
                  onClick={() => navigate('/notes')}
                  variant="primary"
                  size="lg"
                  leftIcon={<Plus className="w-5 h-5" />}
                >
                  Creer des flashcards
                </Button>
              </motion.div>
            ) : (
              <div className="space-y-3">
                {sets.map((set, index) => (
                  <motion.div
                    key={set.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      variant="default"
                      padding="md"
                      interactive
                      className="relative group"
                    >
                      <div onClick={() => startSession(set)} className="cursor-pointer">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white truncate pr-8">
                              {set.title}
                            </h3>
                            <p className="text-sm text-gray-400 mt-1">
                              {set.cards.length} cartes
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Cree le {new Date(set.createdAt).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-500" />
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteSet(set.id)
                        }}
                        className="absolute top-2 right-10 p-1.5 bg-slate-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </Card>
                  </motion.div>
                ))}

                <Button
                  onClick={() => navigate('/notes')}
                  variant="ghost"
                  size="lg"
                  className="w-full mt-4"
                  leftIcon={<Plus className="w-5 h-5" />}
                >
                  Nouveau set
                </Button>
              </div>
            )}
          </>
        ) : isComplete ? (
          // Results Screen
          <ResultsScreen
            correct={correctCount}
            incorrect={incorrectCount}
            total={currentCards.length}
            timeSpent={timeSpent}
            onRestart={handleRestart}
            onGoHome={() => setSelectedSet(null)}
            onReviewMistakes={handleReviewMistakes}
          />
        ) : (
          // Playing Session
          <>
            {/* Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center justify-between mb-4"
            >
              <button
                onClick={() => setSelectedSet(null)}
                className="p-2 hover:bg-slate-800 rounded-xl transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <div className="text-center">
                <h2 className="font-semibold text-white truncate max-w-[200px]">
                  {selectedSet.title}
                </h2>
                <p className="text-sm text-gray-400">
                  {currentIndex + 1} / {currentCards.length}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-green-400 text-sm font-medium">{correctCount}</span>
                <span className="text-gray-500">/</span>
                <span className="text-red-400 text-sm font-medium">{incorrectCount}</span>
              </div>
            </motion.div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-2 mb-6">
              <motion.div
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / currentCards.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
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

            {/* Hint */}
            {!isFlipped && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-500 text-sm mt-4"
              >
                Touche la carte pour voir la reponse
              </motion.p>
            )}
          </>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
