import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useCallback, createContext, useContext, type ReactNode } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  rotation: number
  color: string
  size: number
  velocity: { x: number; y: number }
}

const COLORS = [
  '#FFD700', // Gold
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#A78BFA', // Purple
  '#34D399', // Green
  '#F59E0B', // Orange
  '#EC4899', // Pink
  '#3B82F6', // Blue
]

interface ConfettiContextType {
  trigger: (options?: { count?: number; spread?: number; origin?: { x: number; y: number } }) => void
  celebrate: () => void
  levelUp: () => void
  achievement: () => void
}

const ConfettiContext = createContext<ConfettiContextType | null>(null)

function ParticleComponent({ particle }: { particle: Particle }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: particle.x,
        top: particle.y,
        width: particle.size,
        height: particle.size,
        backgroundColor: particle.color,
        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      }}
      initial={{
        opacity: 1,
        scale: 1,
        rotate: 0,
      }}
      animate={{
        opacity: [1, 1, 0],
        scale: [1, 1.2, 0.5],
        rotate: particle.rotation,
        x: particle.velocity.x * 100,
        y: particle.velocity.y * 200 + 200, // Gravity effect
      }}
      transition={{
        duration: 2,
        ease: 'easeOut',
      }}
    />
  )
}

export function ConfettiProvider({ children }: { children: ReactNode }) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [idCounter, setIdCounter] = useState(0)

  const createParticle = useCallback((originX: number, originY: number): Particle => {
    const angle = Math.random() * Math.PI * 2
    const velocity = 2 + Math.random() * 4

    return {
      id: idCounter + Math.random(),
      x: originX + (Math.random() - 0.5) * 50,
      y: originY + (Math.random() - 0.5) * 50,
      rotation: Math.random() * 720 - 360,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 6 + Math.random() * 8,
      velocity: {
        x: Math.cos(angle) * velocity,
        y: Math.sin(angle) * velocity - 2, // Upward bias
      },
    }
  }, [idCounter])

  const trigger = useCallback((options?: {
    count?: number
    spread?: number
    origin?: { x: number; y: number }
  }) => {
    const count = options?.count ?? 30
    const origin = options?.origin ?? {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    }

    const newParticles: Particle[] = []
    for (let i = 0; i < count; i++) {
      newParticles.push(createParticle(origin.x, origin.y))
    }

    setParticles(prev => [...prev, ...newParticles])
    setIdCounter(prev => prev + count)

    // Clean up particles after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)))
    }, 2500)
  }, [createParticle])

  const celebrate = useCallback(() => {
    trigger({ count: 50, origin: { x: window.innerWidth / 2, y: window.innerHeight / 3 } })
  }, [trigger])

  const levelUp = useCallback(() => {
    // Multiple bursts for level up
    trigger({ count: 30, origin: { x: window.innerWidth * 0.3, y: window.innerHeight * 0.4 } })
    setTimeout(() => {
      trigger({ count: 30, origin: { x: window.innerWidth * 0.7, y: window.innerHeight * 0.4 } })
    }, 200)
    setTimeout(() => {
      trigger({ count: 40, origin: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.3 } })
    }, 400)
  }, [trigger])

  const achievement = useCallback(() => {
    // Golden confetti for achievements
    trigger({ count: 40, origin: { x: window.innerWidth / 2, y: window.innerHeight * 0.35 } })
  }, [trigger])

  const value: ConfettiContextType = {
    trigger,
    celebrate,
    levelUp,
    achievement
  }

  return (
    <ConfettiContext.Provider value={value}>
      {children}

      {/* Particle Container */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[200]">
        <AnimatePresence>
          {particles.map((particle) => (
            <ParticleComponent key={particle.id} particle={particle} />
          ))}
        </AnimatePresence>
      </div>
    </ConfettiContext.Provider>
  )
}

export function useConfetti() {
  const context = useContext(ConfettiContext)
  if (!context) {
    throw new Error('useConfetti must be used within a ConfettiProvider')
  }
  return context
}
