import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

type RalphMood = 'idle' | 'happy' | 'sad' | 'thinking' | 'celebrating' | 'sleeping'
type RalphSize = 'sm' | 'md' | 'lg' | 'xl'

interface RalphMascotProps {
  mood?: RalphMood
  size?: RalphSize
  className?: string
  showSpeechBubble?: boolean
  speechText?: string
}

const sizeStyles: Record<RalphSize, { width: number; height: number }> = {
  sm: { width: 80, height: 80 },
  md: { width: 120, height: 120 },
  lg: { width: 180, height: 180 },
  xl: { width: 240, height: 240 }
}

function getMoodAnimation(mood: RalphMood) {
  switch (mood) {
    case 'idle':
      return { y: [0, -5, 0] }
    case 'happy':
      return { y: [0, -20, 0], rotate: [0, -5, 5, -5, 0], scale: [1, 1.1, 1] }
    case 'sad':
      return { y: [0, 5, 0], rotate: [0, -2, 2, 0] }
    case 'thinking':
      return { rotate: [0, 5, 0] }
    case 'celebrating':
      return { y: [0, -30, 0], rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }
    case 'sleeping':
      return { y: [0, 3, 0] }
    default:
      return {}
  }
}

function getMoodTransition(mood: RalphMood) {
  switch (mood) {
    case 'idle':
      return { duration: 2, repeat: Infinity, ease: 'easeInOut' as const }
    case 'happy':
      return { duration: 0.6, repeat: Infinity, repeatDelay: 1 }
    case 'sad':
      return { duration: 1.5, repeat: Infinity, ease: 'easeInOut' as const }
    case 'thinking':
      return { duration: 1, repeat: Infinity, ease: 'easeInOut' as const }
    case 'celebrating':
      return { duration: 0.8, repeat: 3 }
    case 'sleeping':
      return { duration: 3, repeat: Infinity, ease: 'easeInOut' as const }
    default:
      return {}
  }
}

export function RalphMascot({
  mood = 'idle',
  size = 'md',
  className,
  showSpeechBubble = false,
  speechText
}: RalphMascotProps) {
  const dimensions = sizeStyles[size]

  return (
    <div className={cn('relative inline-flex flex-col items-center', className)}>
      {/* Speech Bubble */}
      {showSpeechBubble && speechText && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white text-gray-900 px-4 py-2 rounded-2xl text-sm font-medium whitespace-nowrap shadow-lg"
        >
          {speechText}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-white rotate-45" />
        </motion.div>
      )}

      {/* Ralph SVG */}
      <motion.div
        animate={getMoodAnimation(mood)}
        transition={getMoodTransition(mood)}
        style={{ width: dimensions.width, height: dimensions.height }}
      >
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Body */}
          <ellipse cx="100" cy="130" rx="60" ry="50" fill="#4F9BE8" />

          {/* Head */}
          <circle cx="100" cy="80" r="55" fill="#5BA3EC" />

          {/* Ears */}
          <ellipse cx="45" cy="50" rx="25" ry="30" fill="#4F9BE8" />
          <ellipse cx="45" cy="50" rx="15" ry="18" fill="#FFB6C1" />
          <ellipse cx="155" cy="50" rx="25" ry="30" fill="#4F9BE8" />
          <ellipse cx="155" cy="50" rx="15" ry="18" fill="#FFB6C1" />

          {/* Trunk */}
          <path
            d="M100 95 Q100 140 85 160"
            stroke="#4F9BE8"
            strokeWidth="20"
            strokeLinecap="round"
            fill="none"
          />

          {/* Eyes */}
          <g>
            {mood === 'sleeping' ? (
              <>
                <path d="M70 70 Q80 75 90 70" stroke="#1e3a5f" strokeWidth="3" fill="none" />
                <path d="M110 70 Q120 75 130 70" stroke="#1e3a5f" strokeWidth="3" fill="none" />
              </>
            ) : (
              <>
                <circle cx="80" cy="70" r="12" fill="white" />
                <circle cx="120" cy="70" r="12" fill="white" />
                <motion.circle
                  cx="80"
                  cy="70"
                  r="6"
                  fill="#1e3a5f"
                  animate={mood === 'thinking' ? { x: [0, 3, 0] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <motion.circle
                  cx="120"
                  cy="70"
                  r="6"
                  fill="#1e3a5f"
                  animate={mood === 'thinking' ? { x: [0, 3, 0] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                {/* Eye sparkles for happy mood */}
                {(mood === 'happy' || mood === 'celebrating') && (
                  <>
                    <circle cx="75" cy="65" r="2" fill="white" />
                    <circle cx="115" cy="65" r="2" fill="white" />
                  </>
                )}
              </>
            )}
          </g>

          {/* Eyebrows */}
          {mood === 'sad' && (
            <>
              <path d="M68 58 L92 62" stroke="#1e3a5f" strokeWidth="3" strokeLinecap="round" />
              <path d="M108 62 L132 58" stroke="#1e3a5f" strokeWidth="3" strokeLinecap="round" />
            </>
          )}

          {/* Cheeks (blush for happy) */}
          {(mood === 'happy' || mood === 'celebrating') && (
            <>
              <ellipse cx="60" cy="85" rx="10" ry="6" fill="#FFB6C1" opacity="0.6" />
              <ellipse cx="140" cy="85" rx="10" ry="6" fill="#FFB6C1" opacity="0.6" />
            </>
          )}

          {/* Feet */}
          <ellipse cx="70" cy="175" rx="20" ry="10" fill="#4F9BE8" />
          <ellipse cx="130" cy="175" rx="20" ry="10" fill="#4F9BE8" />

          {/* Thinking bubble */}
          {mood === 'thinking' && (
            <g>
              <circle cx="160" cy="40" r="5" fill="white" opacity="0.8" />
              <circle cx="170" cy="25" r="8" fill="white" opacity="0.8" />
              <circle cx="185" cy="10" r="12" fill="white" opacity="0.8" />
            </g>
          )}

          {/* Tears for sad */}
          {mood === 'sad' && (
            <>
              <motion.ellipse
                cx="75"
                cy="85"
                rx="4"
                ry="6"
                fill="#87CEEB"
                animate={{ y: [0, 20], opacity: [1, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
              />
              <motion.ellipse
                cx="125"
                cy="85"
                rx="4"
                ry="6"
                fill="#87CEEB"
                animate={{ y: [0, 20], opacity: [1, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.7 }}
              />
            </>
          )}

          {/* Z's for sleeping */}
          {mood === 'sleeping' && (
            <motion.g
              animate={{ y: [-5, -15], opacity: [1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <text x="140" y="40" fill="white" fontSize="20" fontWeight="bold">Z</text>
              <text x="155" y="25" fill="white" fontSize="16" fontWeight="bold">z</text>
              <text x="165" y="15" fill="white" fontSize="12" fontWeight="bold">z</text>
            </motion.g>
          )}
        </svg>
      </motion.div>

      {/* Confetti for celebrating */}
      {mood === 'celebrating' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'][i % 5]
              }}
              initial={{ y: 0, opacity: 1 }}
              animate={{
                y: [0, -100, 200],
                x: [0, (Math.random() - 0.5) * 100],
                rotate: [0, 360],
                opacity: [1, 1, 0]
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                ease: 'easeOut'
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
