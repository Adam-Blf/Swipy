import { motion } from 'framer-motion'
import type { Badge, Category } from '@/types'
import { BADGES, isBadgeUnlocked, getBadgeProgress } from '@/data/badges'
import { cn } from '@/lib/utils'

interface BadgeGridProps {
  stats: {
    totalXp: number
    currentStreak: number
    longestStreak: number
    totalCards: number
    categoryLevels: Record<Category, number>
  }
  className?: string
  showLocked?: boolean
}

export function BadgeGrid({ stats, className, showLocked = true }: BadgeGridProps) {
  const badgesToShow = showLocked
    ? BADGES
    : BADGES.filter((badge) => isBadgeUnlocked(badge, stats))

  return (
    <div className={cn('grid grid-cols-4 gap-3', className)}>
      {badgesToShow.map((badge, index) => {
        const unlocked = isBadgeUnlocked(badge, stats)
        const progress = getBadgeProgress(badge, stats)

        return (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              'relative flex flex-col items-center p-2 rounded-xl transition-all',
              unlocked
                ? 'bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30'
                : 'bg-surface-elevated/50 border border-transparent'
            )}
          >
            {/* Badge icon */}
            <div
              className={cn(
                'text-2xl transition-all',
                !unlocked && 'grayscale opacity-40'
              )}
            >
              {badge.icon}
            </div>

            {/* Badge name */}
            <span
              className={cn(
                'text-[10px] font-medium text-center mt-1 leading-tight',
                unlocked ? 'text-text-primary' : 'text-text-muted'
              )}
            >
              {badge.name}
            </span>

            {/* Progress indicator for locked badges */}
            {!unlocked && progress > 0 && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-surface-overlay rounded-b-xl overflow-hidden">
                <div
                  className="h-full bg-primary/50 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {/* Unlocked indicator */}
            {unlocked && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 size-4 rounded-full bg-success flex items-center justify-center"
              >
                <span className="text-[8px] text-white">✓</span>
              </motion.div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

// Single badge component for showcase
interface BadgeItemProps {
  badge: Badge
  unlocked: boolean
  size?: 'sm' | 'md' | 'lg'
  showName?: boolean
  onClick?: () => void
}

export function BadgeItem({ badge, unlocked, size = 'md', showName = true, onClick }: BadgeItemProps) {
  const sizeClasses = {
    sm: 'text-xl p-1.5',
    md: 'text-3xl p-2',
    lg: 'text-4xl p-3',
  }

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'flex flex-col items-center rounded-xl transition-all',
        unlocked
          ? 'bg-gradient-to-br from-primary/20 to-primary/5'
          : 'bg-surface-elevated/50 opacity-50',
        sizeClasses[size]
      )}
    >
      <span className={cn(!unlocked && 'grayscale')}>{badge.icon}</span>
      {showName && (
        <span className="text-xs font-medium text-text-secondary mt-1">{badge.name}</span>
      )}
    </motion.button>
  )
}

// Recently unlocked badge showcase
interface NewBadgeProps {
  badge: Badge
  onClose: () => void
}

export function NewBadgeToast({ badge, onClose }: NewBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed bottom-24 left-4 right-4 z-50 flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-primary/20 to-success/20 border border-primary/30 backdrop-blur-md shadow-elevated"
    >
      <motion.div
        animate={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl"
      >
        {badge.icon}
      </motion.div>
      <div className="flex-1">
        <p className="text-xs text-primary font-medium uppercase tracking-wide">
          Nouveau Badge !
        </p>
        <p className="text-lg font-bold text-text-primary">{badge.name}</p>
        <p className="text-xs text-text-secondary">{badge.description}</p>
      </div>
      <button
        onClick={onClose}
        className="p-2 rounded-lg hover:bg-surface-overlay transition-colors"
      >
        ✕
      </button>
    </motion.div>
  )
}
