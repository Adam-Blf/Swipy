import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore, useOnboardingCompleted, useAvailableQuestions } from '@/store'
import { Button } from '@/components/atoms'

export function Swipe() {
  const navigate = useNavigate()
  const onboardingCompleted = useOnboardingCompleted()
  const availableQuestions = useAvailableQuestions()
  const setDeck = useStore((s) => s.setDeck)

  // Redirect if not onboarded
  useEffect(() => {
    if (!onboardingCompleted) {
      navigate('/welcome', { replace: true })
    }
  }, [onboardingCompleted, navigate])

  // Set up deck
  useEffect(() => {
    if (availableQuestions.length > 0) {
      const shuffled = [...availableQuestions].sort(() => Math.random() - 0.5)
      setDeck(shuffled.slice(0, 20).map((q) => q.id))
    }
  }, [availableQuestions, setDeck])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6">
      <h1 className="text-2xl font-bold text-text-primary mb-4">Swipe</h1>
      <p className="text-text-secondary mb-8 text-center">
        {availableQuestions.length} questions disponibles
        <br />
        (Swipe Engine en Phase 41-50)
      </p>

      <Button onClick={() => navigate('/stats')}>Voir mes stats</Button>
    </div>
  )
}
