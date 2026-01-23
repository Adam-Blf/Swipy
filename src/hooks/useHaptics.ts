import { useCallback, useRef } from 'react'

type HapticPattern = 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'warning' | 'selection'

// Vibration patterns in milliseconds
const HAPTIC_PATTERNS: Record<HapticPattern, number | number[]> = {
  light: 10,
  medium: 25,
  heavy: 50,
  success: [10, 50, 30], // Short-pause-medium
  error: [50, 30, 50, 30, 50], // Three heavy pulses
  warning: [30, 50, 30], // Two medium pulses
  selection: 5 // Ultra-light
}

export function useHaptics() {
  const isEnabled = useRef(true)

  // Check if vibration is supported
  const isSupported = useCallback(() => {
    return 'vibrate' in navigator
  }, [])

  // Generic haptic feedback
  const vibrate = useCallback((pattern: HapticPattern | number | number[]) => {
    if (!isEnabled.current || !isSupported()) return false

    try {
      const vibrationPattern = typeof pattern === 'string'
        ? HAPTIC_PATTERNS[pattern]
        : pattern

      navigator.vibrate(vibrationPattern)
      return true
    } catch (error) {
      console.warn('Haptic feedback failed:', error)
      return false
    }
  }, [isSupported])

  // Pre-defined haptic effects
  const lightTap = useCallback(() => vibrate('light'), [vibrate])
  const mediumTap = useCallback(() => vibrate('medium'), [vibrate])
  const heavyTap = useCallback(() => vibrate('heavy'), [vibrate])
  const successHaptic = useCallback(() => vibrate('success'), [vibrate])
  const errorHaptic = useCallback(() => vibrate('error'), [vibrate])
  const warningHaptic = useCallback(() => vibrate('warning'), [vibrate])
  const selectionHaptic = useCallback(() => vibrate('selection'), [vibrate])

  // Swipe feedback - intensity based on velocity
  const swipeHaptic = useCallback((velocity: number) => {
    const intensity = Math.min(Math.abs(velocity) / 10, 50)
    vibrate(Math.max(10, intensity))
  }, [vibrate])

  // Card flip feedback
  const flipHaptic = useCallback(() => {
    vibrate([10, 30, 20])
  }, [vibrate])

  // Level up feedback
  const levelUpHaptic = useCallback(() => {
    vibrate([20, 50, 20, 50, 20, 50, 40])
  }, [vibrate])

  // Combo feedback - increases with combo count
  const comboHaptic = useCallback((comboCount: number) => {
    const baseIntensity = Math.min(10 + comboCount * 5, 50)
    const pattern = Array(Math.min(comboCount, 5)).fill(baseIntensity).flatMap((v) => [v, 30])
    pattern.pop() // Remove last pause
    vibrate(pattern)
  }, [vibrate])

  // Toggle haptics
  const setEnabled = useCallback((enabled: boolean) => {
    isEnabled.current = enabled
  }, [])

  const toggleEnabled = useCallback(() => {
    isEnabled.current = !isEnabled.current
    return isEnabled.current
  }, [])

  return {
    isSupported,
    vibrate,
    lightTap,
    mediumTap,
    heavyTap,
    successHaptic,
    errorHaptic,
    warningHaptic,
    selectionHaptic,
    swipeHaptic,
    flipHaptic,
    levelUpHaptic,
    comboHaptic,
    setEnabled,
    toggleEnabled,
    isEnabled: () => isEnabled.current
  }
}
