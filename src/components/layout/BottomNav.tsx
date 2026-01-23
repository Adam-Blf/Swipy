/**
 * BottomNav Component - Genius Blue Edition
 * Navigation bar with animated icons and gradient indicators
 */

import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Sparkles, FileText, GraduationCap, User } from 'lucide-react'
import { cn } from '../../lib/utils'

interface NavItem {
  path: string
  label: string
  icon: typeof Home
  gradient: string
}

// Genius Blue Edition navigation items with gradients
const navItems: NavItem[] = [
  {
    path: '/',
    label: 'Accueil',
    icon: Home,
    gradient: 'from-[#0052D4] to-[#6FB1FC]'
  },
  {
    path: '/funfacts',
    label: 'Fun Facts',
    icon: Sparkles,
    gradient: 'from-[#FF9100] to-[#FFD180]'
  },
  {
    path: '/notes',
    label: 'Revision',
    icon: FileText,
    gradient: 'from-[#00E5FF] to-[#84FFFF]'
  },
  {
    path: '/flashcards',
    label: 'Flashcards',
    icon: GraduationCap,
    gradient: 'from-[#AA00FF] to-[#EA80FC]'
  },
  {
    path: '/profile',
    label: 'Profil',
    icon: User,
    gradient: 'from-[#00C853] to-[#69F0AE]'
  }
]

export function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-[#4364F7]/20 safe-area-bottom z-40">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon

          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              whileTap={{ scale: 0.9 }}
              className={cn(
                'relative flex flex-col items-center justify-center flex-1 h-full',
                'transition-all duration-300 py-1'
              )}
            >
              {/* Active indicator - gradient line at top */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className={`absolute -top-0.5 w-8 h-1 rounded-full bg-gradient-to-r ${item.gradient}`}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    style={{
                      boxShadow: isActive ? `0 0 10px rgba(67, 100, 247, 0.5)` : 'none'
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Active background glow */}
              {isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`absolute inset-x-2 top-2 bottom-2 rounded-xl bg-gradient-to-b ${item.gradient} opacity-10`}
                />
              )}

              {/* Icon container */}
              <motion.div
                animate={isActive ? { scale: 1.15, y: -2 } : { scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className={cn(
                  'relative z-10 p-1.5 rounded-xl transition-all duration-300',
                  isActive && `bg-gradient-to-br ${item.gradient}`
                )}
              >
                <Icon
                  className={cn(
                    'w-5 h-5 transition-colors duration-300',
                    isActive ? 'text-white' : 'text-gray-500'
                  )}
                />

                {/* Pulsing dot for active state */}
                {isActive && (
                  <motion.div
                    className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-white"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>

              {/* Label */}
              <motion.span
                animate={isActive ? { y: 0, opacity: 1 } : { y: 2, opacity: 0.7 }}
                className={cn(
                  'text-[10px] mt-1 font-medium relative z-10 transition-colors duration-300',
                  isActive ? 'text-white' : 'text-gray-500'
                )}
              >
                {item.label}
              </motion.span>
            </motion.button>
          )
        })}
      </div>

      {/* Decorative gradient line at very bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4364F7]/30 to-transparent" />
    </nav>
  )
}
