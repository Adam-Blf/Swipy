import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SwipeCard } from './components/SwipeCard'
import { facts, categories, type Fact } from './data/facts'
import { Bookmark, RotateCcw, Sparkles, ChevronDown, X } from 'lucide-react'

// Shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// Local storage keys
const SAVED_FACTS_KEY = 'genius_saved_facts'
const SEEN_FACTS_KEY = 'genius_seen_facts'

export default function App() {
  const [deck, setDeck] = useState<Fact[]>([])
  const [savedFacts, setSavedFacts] = useState<Fact[]>([])
  const [seenIds, setSeenIds] = useState<Set<number>>(new Set())
  const [showSaved, setShowSaved] = useState(false)
  const [stats, setStats] = useState({ seen: 0, saved: 0 })

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(SAVED_FACTS_KEY)
    const seenData = localStorage.getItem(SEEN_FACTS_KEY)

    if (savedData) {
      const saved = JSON.parse(savedData) as Fact[]
      setSavedFacts(saved)
    }

    if (seenData) {
      const seen = JSON.parse(seenData) as number[]
      setSeenIds(new Set(seen))
    }
  }, [])

  // Initialize deck
  useEffect(() => {
    const unseenFacts = facts.filter(f => !seenIds.has(f.id))
    if (unseenFacts.length > 0) {
      setDeck(shuffleArray(unseenFacts).slice(0, 10))
    } else {
      // All facts seen, reset
      setDeck(shuffleArray(facts).slice(0, 10))
    }
  }, [seenIds.size === 0])

  // Update stats
  useEffect(() => {
    setStats({
      seen: seenIds.size,
      saved: savedFacts.length
    })
  }, [seenIds, savedFacts])

  const handleSwipe = (direction: 'left' | 'right') => {
    const currentFact = deck[0]
    if (!currentFact) return

    // Mark as seen
    const newSeenIds = new Set(seenIds)
    newSeenIds.add(currentFact.id)
    setSeenIds(newSeenIds)
    localStorage.setItem(SEEN_FACTS_KEY, JSON.stringify([...newSeenIds]))

    // If swiped right, save the fact
    if (direction === 'right') {
      const newSaved = [...savedFacts, currentFact]
      setSavedFacts(newSaved)
      localStorage.setItem(SAVED_FACTS_KEY, JSON.stringify(newSaved))
    }

    // Remove from deck and add new card
    setDeck(prev => {
      const newDeck = prev.slice(1)
      // Add a new fact if available
      const unseenFacts = facts.filter(f => !newSeenIds.has(f.id) && !newDeck.find(d => d.id === f.id))
      if (unseenFacts.length > 0) {
        const randomFact = unseenFacts[Math.floor(Math.random() * unseenFacts.length)]
        return [...newDeck, randomFact]
      }
      return newDeck
    })
  }

  const resetProgress = () => {
    if (confirm('Réinitialiser toute la progression ?')) {
      localStorage.removeItem(SAVED_FACTS_KEY)
      localStorage.removeItem(SEEN_FACTS_KEY)
      setSavedFacts([])
      setSeenIds(new Set())
      setDeck(shuffleArray(facts).slice(0, 10))
    }
  }

  const removeSavedFact = (id: number) => {
    const newSaved = savedFacts.filter(f => f.id !== id)
    setSavedFacts(newSaved)
    localStorage.setItem(SAVED_FACTS_KEY, JSON.stringify(newSaved))
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 pt-12 safe-area-top">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🐘</span>
          <span className="text-xl font-bold text-gradient">Genius</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSaved(true)}
            className="relative flex items-center gap-1.5 bg-slate-800 px-3 py-2 rounded-xl"
          >
            <Bookmark size={18} className="text-amber-400" />
            <span className="text-sm font-medium">{stats.saved}</span>
          </button>
          <button
            onClick={resetProgress}
            className="p-2 bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="px-4 pb-2">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Sparkles size={14} className="text-indigo-400" />
          <span>{stats.seen} / {facts.length} découverts</span>
          <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden ml-2">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${(stats.seen / facts.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Swipe Area */}
      <main className="flex-1 px-4 py-2 relative">
        <div className="relative w-full h-full max-w-md mx-auto" style={{ minHeight: '500px' }}>
          <AnimatePresence>
            {deck.length > 0 ? (
              deck.slice(0, 3).map((fact, index) => (
                <SwipeCard
                  key={fact.id}
                  fact={fact}
                  onSwipe={handleSwipe}
                  isTop={index === 0}
                />
              )).reverse()
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center"
              >
                <span className="text-6xl mb-4">🎉</span>
                <h2 className="text-2xl font-bold mb-2">Bravo !</h2>
                <p className="text-slate-400 mb-6">Tu as découvert tous les faits !</p>
                <button
                  onClick={resetProgress}
                  className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  Recommencer
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom Instructions */}
      <div className="px-4 pb-6 safe-area-bottom">
        <div className="flex justify-center items-center gap-8 text-slate-500">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-1">
              <span className="text-xl">👈</span>
            </div>
            <span className="text-xs">Suivant</span>
          </div>
          <ChevronDown size={24} className="text-slate-600 animate-bounce" />
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-1">
              <span className="text-xl">👉</span>
            </div>
            <span className="text-xs">Sauvegarder</span>
          </div>
        </div>
      </div>

      {/* Saved Facts Modal */}
      <AnimatePresence>
        {showSaved && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-end"
            onClick={() => setShowSaved(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="w-full max-h-[85vh] bg-slate-900 rounded-t-3xl p-4 overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Bookmark className="text-amber-400" />
                  Mes favoris ({savedFacts.length})
                </h2>
                <button
                  onClick={() => setShowSaved(false)}
                  className="p-2 bg-slate-800 rounded-xl"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="overflow-y-auto max-h-[70vh] space-y-3 pb-8">
                {savedFacts.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    <Bookmark size={48} className="mx-auto mb-4 opacity-30" />
                    <p>Aucun fait sauvegardé</p>
                    <p className="text-sm mt-1">Swipe vers la droite pour sauvegarder</p>
                  </div>
                ) : (
                  savedFacts.map(fact => {
                    const cat = categories[fact.category]
                    return (
                      <motion.div
                        key={fact.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="bg-slate-800 rounded-2xl p-4 relative group"
                      >
                        <button
                          onClick={() => removeSavedFact(fact.id)}
                          className="absolute top-2 right-2 p-1.5 bg-slate-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} />
                        </button>
                        <div className="flex items-start gap-3">
                          <span className="text-3xl">{fact.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-gradient-to-r ${cat.color} text-white`}>
                                {cat.name}
                              </span>
                            </div>
                            <h3 className="font-semibold text-white">{fact.title}</h3>
                            <p className="text-sm text-slate-400 mt-1">{fact.content}</p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
