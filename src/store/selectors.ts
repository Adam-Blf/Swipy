import { useStore } from './useStore'
import type { Category } from '@/types'
import { getLevel, getXpForNextLevel } from '@/types'
import { questions } from '@/data/questions'

// Preferences Selectors
export const useUserName = () => useStore((state) => state.preferences.name)
export const useSelectedCategories = () => useStore((state) => state.preferences.selectedCategories)
export const useSoundEnabled = () => useStore((state) => state.preferences.soundEnabled)
export const useHapticEnabled = () => useStore((state) => state.preferences.hapticEnabled)
export const useOnboardingCompleted = () => useStore((state) => state.preferences.onboardingCompleted)
export const useTutorialShown = () => useStore((state) => state.preferences.tutorialShown)
export const useDailyGoal = () => useStore((state) => state.preferences.dailyGoal)

// Stats Selectors
export const useTotalXp = () => useStore((state) => state.stats.totalXp)
export const useGlobalLevel = () => useStore((state) => getLevel(state.stats.totalXp))
export const useCurrentStreak = () => useStore((state) => state.stats.currentStreak)
export const useLongestStreak = () => useStore((state) => state.stats.longestStreak)

export const useCategoryProgress = (category: Category) =>
  useStore((state) => state.stats.categoryProgress[category])

export const useCategoryLevel = (category: Category) =>
  useStore((state) => getLevel(state.stats.categoryProgress[category].xp))

export const useXpProgress = () =>
  useStore((state) => {
    const totalXp = state.stats.totalXp
    const level = getLevel(totalXp)
    const xpForNext = getXpForNextLevel(totalXp)
    return { totalXp, level, xpForNext }
  })

// Deck Selectors
export const useCurrentDeck = () => useStore((state) => state.currentDeck)
export const useCurrentIndex = () => useStore((state) => state.currentIndex)
export const useSessionProgress = () =>
  useStore((state) => ({
    current: state.currentIndex,
    total: state.currentDeck.length,
    answered: state.sessionCardsAnswered,
  }))

export const useCurrentQuestion = () =>
  useStore((state) => {
    const questionId = state.currentDeck[state.currentIndex]
    return questions.find((q) => q.id === questionId) ?? null
  })

export const useHasMoreCards = () =>
  useStore((state) => state.currentIndex < state.currentDeck.length)

export const useIsDeckEmpty = () => useStore((state) => state.currentDeck.length === 0)

// Cards State Selectors
export const useLearnedCards = () => useStore((state) => state.learnedCards)
export const useKnownCards = () => useStore((state) => state.knownCards)
export const useReviewQueue = () => useStore((state) => state.reviewQueue)
export const useLastSwipedCard = () => useStore((state) => state.lastSwipedCard)

export const useIsCardLearned = (questionId: string) =>
  useStore((state) => state.learnedCards.includes(questionId))

export const useIsCardKnown = (questionId: string) =>
  useStore((state) => state.knownCards.includes(questionId))

// Computed Selectors
export const useAvailableQuestions = () =>
  useStore((state) => {
    const { selectedCategories } = state.preferences
    if (selectedCategories.length === 0) return questions
    return questions.filter((q) => selectedCategories.includes(q.category))
  })

export const useNewQuestions = () =>
  useStore((state) => {
    const { selectedCategories } = state.preferences
    const seenIds = new Set([...state.learnedCards, ...state.knownCards])

    return questions.filter(
      (q) =>
        !seenIds.has(q.id) &&
        (selectedCategories.length === 0 || selectedCategories.includes(q.category))
    )
  })

export const useReviewQuestions = () =>
  useStore((state) => {
    return questions.filter((q) => state.reviewQueue.includes(q.id))
  })

export const useTotalStats = () =>
  useStore((state) => ({
    totalCards: state.learnedCards.length + state.knownCards.length,
    learned: state.learnedCards.length,
    known: state.knownCards.length,
    toReview: state.reviewQueue.length,
  }))

export const useCategoryStats = () =>
  useStore((state) => {
    const stats: Record<Category, { learned: number; known: number }> = {} as Record<
      Category,
      { learned: number; known: number }
    >

    const categories: Category[] = [
      'science',
      'art',
      'history',
      'geography',
      'sport',
      'music',
      'cinema',
      'literature',
    ]

    categories.forEach((cat) => {
      const catQuestions = questions.filter((q) => q.category === cat)
      stats[cat] = {
        learned: catQuestions.filter((q) => state.learnedCards.includes(q.id)).length,
        known: catQuestions.filter((q) => state.knownCards.includes(q.id)).length,
      }
    })

    return stats
  })

export const useDailyProgress = () =>
  useStore((state) => ({
    goal: state.preferences.dailyGoal,
    current: state.sessionCardsAnswered,
    percentage: Math.min((state.sessionCardsAnswered / state.preferences.dailyGoal) * 100, 100),
  }))
