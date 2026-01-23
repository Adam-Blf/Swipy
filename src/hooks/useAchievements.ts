import { useState, useEffect, useCallback } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import { achievements, Achievement, getLevelFromXP, getAchievementById } from '../data/achievements';

type AchievementStatus = 'locked' | 'unlocked' | 'completed';

interface UnlockedAchievement {
  id: string;
  unlockedAt: Date;
  progress?: number;
}

interface AchievementWithStatus extends Achievement {
  status: AchievementStatus;
  progress?: number;
  maxProgress?: number;
  unlockedAt?: Date;
}

interface UserStats {
  totalCards: number;
  savedCards: number;
  currentStreak: number;
  maxStreak: number;
  totalXP: number;
  quizPerfectScores: number;
  categoriesExplored: string[];
}

export function useAchievements() {
  const [unlockedAchievements, setUnlockedAchievements] = useState<UnlockedAchievement[]>([]);
  const [newUnlock, setNewUnlock] = useState<Achievement | null>(null);

  // Get user stats from database
  const stats = useLiveQuery(async () => {
    const userStats = await db.userStats.get(1);
    const savedFacts = await db.savedFacts.count();
    const categoriesViewed = await db.savedFacts.orderBy('category').uniqueKeys();

    return {
      totalCards: userStats?.totalCards || 0,
      savedCards: savedFacts,
      currentStreak: userStats?.currentStreak || 0,
      maxStreak: userStats?.longestStreak || 0,
      totalXP: userStats?.totalXP || 0,
      quizPerfectScores: 0, // TODO: Add quiz tracking
      categoriesExplored: categoriesViewed as string[],
    } as UserStats;
  }, []);

  // Get unlocked achievements from database
  const storedUnlocks = useLiveQuery(async () => {
    const unlocks = await db.achievements?.toArray() || [];
    return unlocks;
  }, []);

  useEffect(() => {
    if (storedUnlocks) {
      setUnlockedAchievements(storedUnlocks.map(u => ({
        id: u.achievementId,
        unlockedAt: u.unlockedAt,
        progress: u.progress,
      })));
    }
  }, [storedUnlocks]);

  // Check if an achievement should be unlocked
  const checkAchievement = useCallback((achievement: Achievement, userStats: UserStats): { shouldUnlock: boolean; progress: number } => {
    const { requirement } = achievement;
    let progress = 0;

    switch (requirement.type) {
      case 'cards_viewed':
        progress = userStats.totalCards;
        break;
      case 'cards_saved':
        progress = userStats.savedCards;
        break;
      case 'streak':
        progress = userStats.currentStreak;
        break;
      case 'xp':
        progress = userStats.totalXP;
        break;
      case 'level':
        const { level } = getLevelFromXP(userStats.totalXP);
        progress = level;
        break;
      case 'categories':
        progress = userStats.categoriesExplored.length;
        break;
      case 'quiz_score':
        progress = userStats.quizPerfectScores > 0 ? 100 : 0;
        break;
      default:
        progress = 0;
    }

    return {
      shouldUnlock: progress >= requirement.value,
      progress,
    };
  }, []);

  // Unlock an achievement
  const unlockAchievement = useCallback(async (achievementId: string) => {
    const achievement = getAchievementById(achievementId);
    if (!achievement) return;

    // Check if already unlocked
    const alreadyUnlocked = unlockedAchievements.some(u => u.id === achievementId);
    if (alreadyUnlocked) return;

    // Save to database
    try {
      await db.achievements?.add({
        achievementId,
        unlockedAt: new Date(),
        progress: achievement.requirement.value,
      });

      // Add XP reward
      await db.userStats.update(1, (stats) => {
        stats.totalXP = (stats.totalXP || 0) + achievement.xpReward;
      });

      // Update local state
      setUnlockedAchievements(prev => [
        ...prev,
        { id: achievementId, unlockedAt: new Date() }
      ]);

      // Show unlock notification
      setNewUnlock(achievement);

      // Clear notification after delay
      setTimeout(() => setNewUnlock(null), 4000);
    } catch (error) {
      console.error('Failed to unlock achievement:', error);
    }
  }, [unlockedAchievements]);

  // Check all achievements and unlock any that should be
  const checkAllAchievements = useCallback(async () => {
    if (!stats) return;

    for (const achievement of achievements) {
      const isUnlocked = unlockedAchievements.some(u => u.id === achievement.id);
      if (isUnlocked) continue;

      const { shouldUnlock } = checkAchievement(achievement, stats);
      if (shouldUnlock) {
        await unlockAchievement(achievement.id);
        break; // Only unlock one at a time for better UX
      }
    }
  }, [stats, unlockedAchievements, checkAchievement, unlockAchievement]);

  // Check achievements whenever stats change
  useEffect(() => {
    if (stats) {
      checkAllAchievements();
    }
  }, [stats, checkAllAchievements]);

  // Get all achievements with their current status
  const getAchievementsWithStatus = useCallback((): AchievementWithStatus[] => {
    if (!stats) return achievements.map(a => ({ ...a, status: 'locked' as AchievementStatus }));

    return achievements.map(achievement => {
      const unlock = unlockedAchievements.find(u => u.id === achievement.id);
      const { progress } = checkAchievement(achievement, stats);

      let status: AchievementStatus = 'locked';
      if (unlock) {
        status = 'completed';
      } else if (progress > 0) {
        status = 'unlocked';
      }

      return {
        ...achievement,
        status,
        progress,
        maxProgress: achievement.requirement.value,
        unlockedAt: unlock?.unlockedAt,
      };
    });
  }, [stats, unlockedAchievements, checkAchievement]);

  // Get progress summary
  const getProgress = useCallback(() => {
    const total = achievements.length;
    const unlocked = unlockedAchievements.length;
    const percentage = total > 0 ? Math.round((unlocked / total) * 100) : 0;

    return {
      total,
      unlocked,
      percentage,
    };
  }, [unlockedAchievements]);

  // Manually trigger special achievements
  const triggerSpecialAchievement = useCallback(async (achievementId: string) => {
    const achievement = getAchievementById(achievementId);
    if (!achievement || achievement.requirement.type !== 'special') return;

    await unlockAchievement(achievementId);
  }, [unlockAchievement]);

  return {
    achievements: getAchievementsWithStatus(),
    unlockedAchievements,
    newUnlock,
    clearNewUnlock: () => setNewUnlock(null),
    progress: getProgress(),
    triggerSpecialAchievement,
    checkAllAchievements,
  };
}

// Add achievements table to database schema
export async function initAchievementsTable() {
  // This should be called during db initialization
  // The table structure is: { achievementId, unlockedAt, progress }
}
