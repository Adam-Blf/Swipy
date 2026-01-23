// Achievements data for Genius Blue Edition
// Gamification system with progressive unlocks

export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type AchievementCategory = 'learning' | 'streak' | 'collection' | 'social' | 'mastery' | 'special';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: AchievementRarity;
  category: AchievementCategory;
  requirement: {
    type: 'cards_viewed' | 'cards_saved' | 'streak' | 'xp' | 'level' | 'quiz_score' | 'categories' | 'special';
    value: number;
  };
  xpReward: number;
}

export const achievements: Achievement[] = [
  // Learning Achievements
  {
    id: 'first_fact',
    title: 'Premier Pas',
    description: 'Decouvre ton premier fait',
    icon: '👣',
    rarity: 'common',
    category: 'learning',
    requirement: { type: 'cards_viewed', value: 1 },
    xpReward: 10,
  },
  {
    id: 'curious_mind',
    title: 'Esprit Curieux',
    description: 'Decouvre 10 faits',
    icon: '🧐',
    rarity: 'common',
    category: 'learning',
    requirement: { type: 'cards_viewed', value: 10 },
    xpReward: 25,
  },
  {
    id: 'knowledge_seeker',
    title: 'Chercheur de Savoir',
    description: 'Decouvre 50 faits',
    icon: '🔍',
    rarity: 'rare',
    category: 'learning',
    requirement: { type: 'cards_viewed', value: 50 },
    xpReward: 100,
  },
  {
    id: 'fact_enthusiast',
    title: 'Passione de Faits',
    description: 'Decouvre 100 faits',
    icon: '📚',
    rarity: 'rare',
    category: 'learning',
    requirement: { type: 'cards_viewed', value: 100 },
    xpReward: 200,
  },
  {
    id: 'walking_encyclopedia',
    title: 'Encyclopedie Ambulante',
    description: 'Decouvre 500 faits',
    icon: '🎓',
    rarity: 'epic',
    category: 'learning',
    requirement: { type: 'cards_viewed', value: 500 },
    xpReward: 500,
  },
  {
    id: 'genius_mind',
    title: 'Esprit de Genie',
    description: 'Decouvre 1000 faits',
    icon: '🧠',
    rarity: 'legendary',
    category: 'learning',
    requirement: { type: 'cards_viewed', value: 1000 },
    xpReward: 1000,
  },

  // Collection Achievements
  {
    id: 'collector_starter',
    title: 'Debut de Collection',
    description: 'Sauvegarde 5 faits favoris',
    icon: '⭐',
    rarity: 'common',
    category: 'collection',
    requirement: { type: 'cards_saved', value: 5 },
    xpReward: 15,
  },
  {
    id: 'avid_collector',
    title: 'Collectionneur Avide',
    description: 'Sauvegarde 25 faits favoris',
    icon: '💎',
    rarity: 'rare',
    category: 'collection',
    requirement: { type: 'cards_saved', value: 25 },
    xpReward: 75,
  },
  {
    id: 'treasure_hunter',
    title: 'Chasseur de Tresors',
    description: 'Sauvegarde 100 faits favoris',
    icon: '🏆',
    rarity: 'epic',
    category: 'collection',
    requirement: { type: 'cards_saved', value: 100 },
    xpReward: 300,
  },
  {
    id: 'master_curator',
    title: 'Maitre Curateur',
    description: 'Sauvegarde 250 faits favoris',
    icon: '👑',
    rarity: 'legendary',
    category: 'collection',
    requirement: { type: 'cards_saved', value: 250 },
    xpReward: 750,
  },

  // Streak Achievements
  {
    id: 'streak_3',
    title: 'Bon Debut',
    description: 'Maintiens une serie de 3 jours',
    icon: '🔥',
    rarity: 'common',
    category: 'streak',
    requirement: { type: 'streak', value: 3 },
    xpReward: 30,
  },
  {
    id: 'streak_7',
    title: 'Une Semaine de Feu',
    description: 'Maintiens une serie de 7 jours',
    icon: '🔥',
    rarity: 'rare',
    category: 'streak',
    requirement: { type: 'streak', value: 7 },
    xpReward: 100,
  },
  {
    id: 'streak_30',
    title: 'Mois Parfait',
    description: 'Maintiens une serie de 30 jours',
    icon: '💪',
    rarity: 'epic',
    category: 'streak',
    requirement: { type: 'streak', value: 30 },
    xpReward: 500,
  },
  {
    id: 'streak_100',
    title: 'Centenaire',
    description: 'Maintiens une serie de 100 jours',
    icon: '⚡',
    rarity: 'legendary',
    category: 'streak',
    requirement: { type: 'streak', value: 100 },
    xpReward: 2000,
  },

  // XP Achievements
  {
    id: 'xp_100',
    title: 'Apprenti',
    description: 'Accumule 100 XP',
    icon: '✨',
    rarity: 'common',
    category: 'mastery',
    requirement: { type: 'xp', value: 100 },
    xpReward: 20,
  },
  {
    id: 'xp_1000',
    title: 'Adepte',
    description: 'Accumule 1000 XP',
    icon: '💫',
    rarity: 'rare',
    category: 'mastery',
    requirement: { type: 'xp', value: 1000 },
    xpReward: 100,
  },
  {
    id: 'xp_5000',
    title: 'Expert',
    description: 'Accumule 5000 XP',
    icon: '🌟',
    rarity: 'epic',
    category: 'mastery',
    requirement: { type: 'xp', value: 5000 },
    xpReward: 300,
  },
  {
    id: 'xp_10000',
    title: 'Maitre',
    description: 'Accumule 10000 XP',
    icon: '⭐',
    rarity: 'legendary',
    category: 'mastery',
    requirement: { type: 'xp', value: 10000 },
    xpReward: 1000,
  },

  // Level Achievements
  {
    id: 'level_5',
    title: 'Niveau 5',
    description: 'Atteins le niveau 5',
    icon: '5⃣',
    rarity: 'common',
    category: 'mastery',
    requirement: { type: 'level', value: 5 },
    xpReward: 50,
  },
  {
    id: 'level_10',
    title: 'Niveau 10',
    description: 'Atteins le niveau 10',
    icon: '🔟',
    rarity: 'rare',
    category: 'mastery',
    requirement: { type: 'level', value: 10 },
    xpReward: 150,
  },
  {
    id: 'level_25',
    title: 'Niveau 25',
    description: 'Atteins le niveau 25',
    icon: '🎯',
    rarity: 'epic',
    category: 'mastery',
    requirement: { type: 'level', value: 25 },
    xpReward: 400,
  },
  {
    id: 'level_50',
    title: 'Niveau 50',
    description: 'Atteins le niveau 50',
    icon: '🏅',
    rarity: 'legendary',
    category: 'mastery',
    requirement: { type: 'level', value: 50 },
    xpReward: 1000,
  },

  // Quiz Achievements
  {
    id: 'quiz_perfect',
    title: 'Sans Faute',
    description: 'Obtiens un score parfait a un quiz',
    icon: '💯',
    rarity: 'rare',
    category: 'mastery',
    requirement: { type: 'quiz_score', value: 100 },
    xpReward: 150,
  },

  // Category Achievements
  {
    id: 'polymath',
    title: 'Polymathe',
    description: 'Explore toutes les categories',
    icon: '🌈',
    rarity: 'epic',
    category: 'learning',
    requirement: { type: 'categories', value: 6 },
    xpReward: 250,
  },

  // Special Achievements
  {
    id: 'night_owl',
    title: 'Oiseau de Nuit',
    description: 'Apprends apres minuit',
    icon: '🦉',
    rarity: 'rare',
    category: 'special',
    requirement: { type: 'special', value: 1 },
    xpReward: 50,
  },
  {
    id: 'early_bird',
    title: 'Leve-tot',
    description: 'Apprends avant 7h du matin',
    icon: '🐦',
    rarity: 'rare',
    category: 'special',
    requirement: { type: 'special', value: 1 },
    xpReward: 50,
  },
  {
    id: 'weekend_warrior',
    title: 'Guerrier du Weekend',
    description: 'Apprends chaque jour du weekend',
    icon: '⚔️',
    rarity: 'rare',
    category: 'special',
    requirement: { type: 'special', value: 1 },
    xpReward: 75,
  },
  {
    id: 'ralph_friend',
    title: 'Ami de Ralph',
    description: 'Completer l\'onboarding',
    icon: '🐘',
    rarity: 'common',
    category: 'special',
    requirement: { type: 'special', value: 1 },
    xpReward: 25,
  },
];

// Helper function to get achievements by category
export function getAchievementsByCategory(category: AchievementCategory): Achievement[] {
  return achievements.filter((a) => a.category === category);
}

// Helper function to get achievement by ID
export function getAchievementById(id: string): Achievement | undefined {
  return achievements.find((a) => a.id === id);
}

// XP required for each level
export function getXPForLevel(level: number): number {
  // Progressive XP requirement: 100 * level^1.5
  return Math.floor(100 * Math.pow(level, 1.5));
}

// Calculate level from total XP
export function getLevelFromXP(totalXP: number): { level: number; currentXP: number; xpToNext: number } {
  let level = 1;
  let xpUsed = 0;

  while (xpUsed + getXPForLevel(level) <= totalXP) {
    xpUsed += getXPForLevel(level);
    level++;
  }

  const currentXP = totalXP - xpUsed;
  const xpToNext = getXPForLevel(level);

  return { level, currentXP, xpToNext };
}
