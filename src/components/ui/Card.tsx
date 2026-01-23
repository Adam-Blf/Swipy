/**
 * Card Component - Genius Blue Edition
 * Versatile card with gradient borders and glow effects
 */

import { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '../../lib/utils'

interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'glass' | 'solid' | 'gradient' | 'glow'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  interactive?: boolean
  glowColor?: 'blue' | 'cyan' | 'coral' | 'green' | 'purple' | 'amber'
}

// Genius Blue Edition color schemes
const glowColors = {
  blue: 'rgba(67, 100, 247, 0.3)',
  cyan: 'rgba(0, 229, 255, 0.3)',
  coral: 'rgba(255, 82, 82, 0.3)',
  green: 'rgba(0, 200, 83, 0.3)',
  purple: 'rgba(170, 0, 255, 0.3)',
  amber: 'rgba(255, 145, 0, 0.3)'
}

const glowBorders = {
  blue: 'border-[#4364F7]/30 hover:border-[#4364F7]/50',
  cyan: 'border-[#00E5FF]/30 hover:border-[#00E5FF]/50',
  coral: 'border-[#FF5252]/30 hover:border-[#FF5252]/50',
  green: 'border-[#00C853]/30 hover:border-[#00C853]/50',
  purple: 'border-[#AA00FF]/30 hover:border-[#AA00FF]/50',
  amber: 'border-[#FF9100]/30 hover:border-[#FF9100]/50'
}

const variantStyles = {
  default: 'bg-slate-800/50 border border-slate-700/50',
  glass: 'bg-white/5 backdrop-blur-xl border border-white/10',
  solid: 'bg-slate-800 border border-slate-700',
  gradient: 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50',
  glow: 'bg-slate-800/50 border'
}

const paddingStyles = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8'
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({
    className,
    variant = 'default',
    padding = 'md',
    interactive = false,
    glowColor = 'blue',
    children,
    style,
    ...props
  }, ref) => {
    const isGlow = variant === 'glow'

    return (
      <motion.div
        ref={ref}
        className={cn(
          'rounded-2xl transition-all duration-300',
          variantStyles[variant],
          isGlow && glowBorders[glowColor],
          paddingStyles[padding],
          interactive && 'cursor-pointer hover:bg-white/5',
          className
        )}
        style={{
          ...style,
          ...(isGlow && {
            boxShadow: `0 4px 20px -4px ${glowColors[glowColor]}`
          }),
          ...(interactive && {
            boxShadow: `0 4px 20px -4px ${glowColors[glowColor]}`
          })
        }}
        whileHover={interactive ? {
          scale: 1.02,
          y: -2,
          boxShadow: `0 8px 30px -8px ${glowColors[glowColor]}`
        } : undefined}
        whileTap={interactive ? { scale: 0.98 } : undefined}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

// Specialized Card Components for Genius Blue Edition

export const GeniusCard = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => (
    <Card
      ref={ref}
      variant="glow"
      glowColor="blue"
      className={cn('bg-gradient-to-br from-slate-800/80 to-slate-900/80', className)}
      {...props}
    >
      {children}
    </Card>
  )
)

GeniusCard.displayName = 'GeniusCard'

export const StatCard = forwardRef<HTMLDivElement, CardProps & {
  gradient?: string
}>(
  ({ className, gradient = 'from-[#0052D4]/20 to-[#4364F7]/20', children, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn(
        'relative overflow-hidden bg-gradient-to-br rounded-2xl p-4 border border-slate-700/30',
        gradient,
        className
      )}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: 'spring', stiffness: 300 }}
      {...props}
    >
      {/* Decorative blur circle */}
      <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl" />
      {children}
    </motion.div>
  )
)

StatCard.displayName = 'StatCard'

export const SwipeCard = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn(
        'relative bg-white rounded-3xl overflow-hidden',
        'aspect-[3/4]', // Genius Blue Edition ratio
        className
      )}
      style={{
        boxShadow: '0 20px 40px -10px rgba(0, 82, 212, 0.15)'
      }}
      whileHover={{
        boxShadow: '0 25px 50px -12px rgba(0, 82, 212, 0.25)'
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
)

SwipeCard.displayName = 'SwipeCard'
