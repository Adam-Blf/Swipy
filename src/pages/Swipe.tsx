import { useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore, useOnboardingCompleted, useAvailableQuestions, useUserName } from '@/store'
import { SwipeDeck, TabBar } from '@/components/organisms'
import { useToast } from '@/components/molecules'

export function Swipe() {
  const navigate = useNavigate()
  const toast = useToast()
  const onboardingCompleted = useOnboardingCompleted()
  const availableQuestions = useAvailableQuestions()
  const userName = useUserName()
  const setDeck = useStore((s) => s.setDeck)

  // Redirect if not onboarded
  useEffect(() => {
    if (!onboardingCompleted) {
      navigate('/welcome', { replace: true })
    }
  }, [onboardingCompleted, navigate])

  // Set up initial deck
  useEffect(() => {
    if (availableQuestions.length > 0) {
      const shuffled = [...availableQuestions].sort(() => Math.random() - 0.5)
      setDeck(shuffled.slice(0, 20).map((q) => q.id))
    }
  }, []) // Only on mount

  // Session complete handler
  const handleSessionComplete = useCallback(() => {
    toast.success('Session terminée ! Bravo 🎉')
  }, [toast])

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 pt-safe-top">
        <div>
          <h1 className="text-lg font-semibold text-text-primary">
            {userName ? `Salut ${userName} 👋` : 'Swipy'}
          </h1>
          <p className="text-sm text-text-muted">
            {availableQuestions.length} questions disponibles
          </p>
        </div>
      </header>

      {/* Swipe Area */}
      <main className="flex-1 px-2">
        <SwipeDeck onSessionComplete={handleSessionComplete} />
      </main>

      {/* Tab Bar */}
      <TabBar />
    </div>
  )
}
