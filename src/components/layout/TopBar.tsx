/**
 * TopBar Component - Genius Blue Edition
 * Header with stats and navigation
 */

import { motion } from 'framer-motion'
import { Heart, Flame, Zap, ChevronLeft, Sparkles } from 'lucide-react'
import { formatNumber } from '../../lib/utils'

interface TopBarProps {
  showBack?: boolean
  onBack?: () => void
  title?: string
}

// Stat Badge Component - Genius Blue Edition
function StatBadge({
  icon: Icon,
  value,
  gradient,
  glowColor
}: {
  icon: typeof Heart
  value: number | string
  gradient: string
  glowColor: string
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-gradient-to-r ${gradient} relative overflow-hidden`}
      style={{
        boxShadow: `0 2px 10px -2px ${glowColor}`
      }}
    >
      {/* Subtle shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      />

      <Icon className="w-3.5 h-3.5 text-white fill-white relative z-10" />
      <motion.span
        key={value}
        initial={{ scale: 1.3, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 500 }}
        className="text-xs font-bold text-white relative z-10"
      >
        {typeof value === 'number' ? formatNumber(value) : value}
      </motion.span>
    </motion.div>
  )
}

export function TopBar({ showBack, onBack, title }: TopBarProps) {
  // Mock profile data - will be connected to context
  const hearts = 5
  const streak = 3
  const xp = 1250

  return (
    <header className="fixed top-0 left-0 right-0 bg-genius-bg/90 backdrop-blur-xl border-b border-[#4364F7]/20 safe-area-top z-40">
      <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
        {/* Left side */}
        <div className="flex items-center gap-3">
          {showBack ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="p-2 -ml-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-xl transition-colors border border-slate-700/50"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </motion.button>
          ) : (
            <div className="flex items-center gap-2">
              {/* Genius Logo with gradient */}
              <motion.div
                className="relative"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-xl font-bold text-gradient-blue">Genius</span>
                <motion.div
                  className="absolute -top-1 -right-2"
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-3 h-3 text-[#00E5FF]" />
                </motion.div>
              </motion.div>
            </div>
          )}

          {title && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-lg font-semibold text-white"
            >
              {title}
            </motion.span>
          )}
        </div>

        {/* Right side - Stats with Genius Blue Edition colors */}
        <div className="flex items-center gap-2">
          {/* Hearts - Coral */}
          <StatBadge
            icon={Heart}
            value={hearts}
            gradient="from-[#FF5252] to-[#FF7B7B]"
            glowColor="rgba(255, 82, 82, 0.4)"
          />

          {/* Streak - Orange/Amber */}
          <StatBadge
            icon={Flame}
            value={streak}
            gradient="from-[#FF9100] to-[#FFD180]"
            glowColor="rgba(255, 145, 0, 0.4)"
          />

          {/* XP - Cyan */}
          <StatBadge
            icon={Zap}
            value={xp}
            gradient="from-[#00E5FF] to-[#84FFFF]"
            glowColor="rgba(0, 229, 255, 0.4)"
          />
        </div>
      </div>
    </header>
  )
}
