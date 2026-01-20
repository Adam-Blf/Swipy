import type { Badge, Category } from '@/types'

// All available badges in the game
export const BADGES: Badge[] = [
  // XP Milestones
  {
    id: 'first_steps',
    name: 'Premiers Pas',
    description: 'Gagne tes 100 premiers XP',
    icon: '👣',
    requirement: { type: 'xp', value: 100 },
  },
  {
    id: 'rising_star',
    name: 'Étoile Montante',
    description: 'Atteins 500 XP',
    icon: '⭐',
    requirement: { type: 'xp', value: 500 },
  },
  {
    id: 'knowledge_seeker',
    name: 'Chercheur de Savoir',
    description: 'Atteins 1000 XP',
    icon: '🔍',
    requirement: { type: 'xp', value: 1000 },
  },
  {
    id: 'brain_master',
    name: 'Maître du Savoir',
    description: 'Atteins 5000 XP',
    icon: '🧠',
    requirement: { type: 'xp', value: 5000 },
  },

  // Streak Badges
  {
    id: 'streak_3',
    name: 'En Feu',
    description: 'Maintiens une série de 3 jours',
    icon: '🔥',
    requirement: { type: 'streak', value: 3 },
  },
  {
    id: 'streak_7',
    name: 'Semaine Parfaite',
    description: 'Maintiens une série de 7 jours',
    icon: '📅',
    requirement: { type: 'streak', value: 7 },
  },
  {
    id: 'streak_30',
    name: 'Marathonien',
    description: 'Maintiens une série de 30 jours',
    icon: '🏃',
    requirement: { type: 'streak', value: 30 },
  },
  {
    id: 'streak_100',
    name: 'Légende',
    description: 'Maintiens une série de 100 jours',
    icon: '👑',
    requirement: { type: 'streak', value: 100 },
  },

  // Total Cards
  {
    id: 'cards_10',
    name: 'Curieux',
    description: 'Swipe 10 cartes',
    icon: '🃏',
    requirement: { type: 'total_cards', value: 10 },
  },
  {
    id: 'cards_50',
    name: 'Collectionneur',
    description: 'Swipe 50 cartes',
    icon: '📚',
    requirement: { type: 'total_cards', value: 50 },
  },
  {
    id: 'cards_100',
    name: 'Encyclopédie',
    description: 'Swipe 100 cartes',
    icon: '📖',
    requirement: { type: 'total_cards', value: 100 },
  },
  {
    id: 'cards_500',
    name: 'Bibliothèque Vivante',
    description: 'Swipe 500 cartes',
    icon: '🏛️',
    requirement: { type: 'total_cards', value: 500 },
  },

  // Category Masters
  {
    id: 'science_master',
    name: 'Scientifique',
    description: 'Atteins niveau 5 en Science',
    icon: '🔬',
    requirement: { type: 'category_level', value: 5, category: 'science' as Category },
  },
  {
    id: 'art_master',
    name: 'Artiste',
    description: 'Atteins niveau 5 en Art',
    icon: '🎨',
    requirement: { type: 'category_level', value: 5, category: 'art' as Category },
  },
  {
    id: 'history_master',
    name: 'Historien',
    description: 'Atteins niveau 5 en Histoire',
    icon: '🏺',
    requirement: { type: 'category_level', value: 5, category: 'history' as Category },
  },
  {
    id: 'geography_master',
    name: 'Explorateur',
    description: 'Atteins niveau 5 en Géographie',
    icon: '🌍',
    requirement: { type: 'category_level', value: 5, category: 'geography' as Category },
  },
  {
    id: 'sport_master',
    name: 'Athlète',
    description: 'Atteins niveau 5 en Sport',
    icon: '⚽',
    requirement: { type: 'category_level', value: 5, category: 'sport' as Category },
  },
  {
    id: 'music_master',
    name: 'Mélomane',
    description: 'Atteins niveau 5 en Musique',
    icon: '🎵',
    requirement: { type: 'category_level', value: 5, category: 'music' as Category },
  },
  {
    id: 'cinema_master',
    name: 'Cinéphile',
    description: 'Atteins niveau 5 en Cinéma',
    icon: '🎬',
    requirement: { type: 'category_level', value: 5, category: 'cinema' as Category },
  },
  {
    id: 'literature_master',
    name: 'Lettré',
    description: 'Atteins niveau 5 en Littérature',
    icon: '📜',
    requirement: { type: 'category_level', value: 5, category: 'literature' as Category },
  },
]

// Get a badge by ID
export function getBadgeById(id: string): Badge | undefined {
  return BADGES.find((b) => b.id === id)
}

// Check if a badge is unlocked based on user stats
export function isBadgeUnlocked(
  badge: Badge,
  stats: {
    totalXp: number
    currentStreak: number
    longestStreak: number
    totalCards: number
    categoryLevels: Record<Category, number>
  }
): boolean {
  const { type, value, category } = badge.requirement

  switch (type) {
    case 'xp':
      return stats.totalXp >= value
    case 'streak':
      return stats.longestStreak >= value
    case 'total_cards':
      return stats.totalCards >= value
    case 'category_level':
      return category ? stats.categoryLevels[category] >= value : false
    default:
      return false
  }
}

// Get all unlocked badges
export function getUnlockedBadges(stats: {
  totalXp: number
  currentStreak: number
  longestStreak: number
  totalCards: number
  categoryLevels: Record<Category, number>
}): Badge[] {
  return BADGES.filter((badge) => isBadgeUnlocked(badge, stats))
}

// Get progress towards a badge (0-100)
export function getBadgeProgress(
  badge: Badge,
  stats: {
    totalXp: number
    currentStreak: number
    longestStreak: number
    totalCards: number
    categoryLevels: Record<Category, number>
  }
): number {
  const { type, value, category } = badge.requirement

  let current = 0
  switch (type) {
    case 'xp':
      current = stats.totalXp
      break
    case 'streak':
      current = stats.longestStreak
      break
    case 'total_cards':
      current = stats.totalCards
      break
    case 'category_level':
      current = category ? stats.categoryLevels[category] : 0
      break
  }

  return Math.min((current / value) * 100, 100)
}
