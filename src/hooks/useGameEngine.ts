import { useCallback, useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useGame } from '../contexts/GameContext'
import {
  getStoredHeartsData,
  calculateRegeneratedHearts,
  getTimeUntilNextHeart,
  saveHeartsData,
  formatTimeRemaining
} from '../services/heartService'

export function useGameEngine() {
  const { profile, updateProfile } = useAuth()
  const game = useGame()

  const [heartsData, setHeartsData] = useState(getStoredHeartsData())
  const [timeUntilNextHeart, setTimeUntilNextHeart] = useState<string | null>(null)

  // Regenerate hearts on mount and periodically
  useEffect(() => {
    const updateHearts = () => {
      const data = getStoredHeartsData()
      const regeneratedHearts = calculateRegeneratedHearts(data)

      if (regeneratedHearts !== data.hearts) {
        const newData = { ...data, hearts: regeneratedHearts }
        saveHeartsData(newData)
        setHeartsData(newData)

        // Update profile if logged in
        if (profile) {
          updateProfile({ hearts: regeneratedHearts })
        }
      }

      // Update countdown
      const timeRemaining = getTimeUntilNextHeart(data)
      setTimeUntilNextHeart(timeRemaining ? formatTimeRemaining(timeRemaining) : null)
    }

    updateHearts()
    const interval = setInterval(updateHearts, 1000)

    return () => clearInterval(interval)
  }, [profile, updateProfile])

  const useHeart = useCallback(() => {
    const newHearts = Math.max(0, heartsData.hearts - 1)
    const newData = {
      ...heartsData,
      hearts: newHearts,
      lastLostAt: Date.now()
    }
    saveHeartsData(newData)
    setHeartsData(newData)

    if (profile) {
      updateProfile({ hearts: newHearts })
    }

    return newHearts
  }, [heartsData, profile, updateProfile])

  const refillHearts = useCallback(() => {
    const newData = {
      ...heartsData,
      hearts: 5,
      lastLostAt: null
    }
    saveHeartsData(newData)
    setHeartsData(newData)

    if (profile) {
      updateProfile({ hearts: 5 })
    }
  }, [heartsData, profile, updateProfile])

  return {
    ...game,
    hearts: heartsData.hearts,
    maxHearts: 5,
    isPremium: heartsData.isPremium,
    timeUntilNextHeart,
    useHeart,
    refillHearts
  }
}
