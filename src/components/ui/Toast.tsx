import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, createContext, useContext, useCallback, type ReactNode } from 'react'
import { CheckCircle, XCircle, AlertCircle, Info, X, Zap, Trophy, Flame } from 'lucide-react'

type ToastType = 'success' | 'error' | 'warning' | 'info' | 'xp' | 'achievement' | 'streak'

interface Toast {
  id: string
  type: ToastType
  message: string
  description?: string
  duration?: number
  icon?: ReactNode
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  success: (message: string, description?: string) => void
  error: (message: string, description?: string) => void
  warning: (message: string, description?: string) => void
  info: (message: string, description?: string) => void
  xp: (amount: number, reason?: string) => void
  achievement: (title: string, description?: string) => void
  streak: (days: number) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

const typeConfig: Record<ToastType, { icon: ReactNode; colors: string }> = {
  success: {
    icon: <CheckCircle className="w-5 h-5" />,
    colors: 'bg-green-500/20 border-green-500/50 text-green-400'
  },
  error: {
    icon: <XCircle className="w-5 h-5" />,
    colors: 'bg-red-500/20 border-red-500/50 text-red-400'
  },
  warning: {
    icon: <AlertCircle className="w-5 h-5" />,
    colors: 'bg-amber-500/20 border-amber-500/50 text-amber-400'
  },
  info: {
    icon: <Info className="w-5 h-5" />,
    colors: 'bg-blue-500/20 border-blue-500/50 text-blue-400'
  },
  xp: {
    icon: <Zap className="w-5 h-5" />,
    colors: 'bg-amber-500/20 border-amber-500/50 text-amber-400'
  },
  achievement: {
    icon: <Trophy className="w-5 h-5" />,
    colors: 'bg-purple-500/20 border-purple-500/50 text-purple-400'
  },
  streak: {
    icon: <Flame className="w-5 h-5" />,
    colors: 'bg-orange-500/20 border-orange-500/50 text-orange-400'
  }
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
  const config = typeConfig[toast.type]

  useEffect(() => {
    const duration = toast.duration ?? 3000
    const timer = setTimeout(onRemove, duration)
    return () => clearTimeout(timer)
  }, [toast.duration, onRemove])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`flex items-start gap-3 p-4 rounded-2xl border backdrop-blur-md shadow-lg ${config.colors}`}
    >
      <div className="flex-shrink-0 mt-0.5">
        {toast.icon || config.icon}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-white">{toast.message}</p>
        {toast.description && (
          <p className="text-sm opacity-80 mt-0.5">{toast.description}</p>
        )}
      </div>

      <button
        onClick={onRemove}
        className="flex-shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors"
      >
        <X className="w-4 h-4 text-white/60" />
      </button>
    </motion.div>
  )
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { ...toast, id }])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const success = useCallback((message: string, description?: string) => {
    addToast({ type: 'success', message, description })
  }, [addToast])

  const error = useCallback((message: string, description?: string) => {
    addToast({ type: 'error', message, description })
  }, [addToast])

  const warning = useCallback((message: string, description?: string) => {
    addToast({ type: 'warning', message, description })
  }, [addToast])

  const info = useCallback((message: string, description?: string) => {
    addToast({ type: 'info', message, description })
  }, [addToast])

  const xp = useCallback((amount: number, reason?: string) => {
    addToast({
      type: 'xp',
      message: `+${amount} XP`,
      description: reason,
      duration: 2000
    })
  }, [addToast])

  const achievement = useCallback((title: string, description?: string) => {
    addToast({
      type: 'achievement',
      message: title,
      description,
      duration: 4000
    })
  }, [addToast])

  const streak = useCallback((days: number) => {
    addToast({
      type: 'streak',
      message: `${days} jours de suite !`,
      description: 'Continue comme ca !',
      duration: 3000
    })
  }, [addToast])

  const value: ToastContextType = {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
    xp,
    achievement,
    streak
  }

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* Toast Container */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4 space-y-2 pointer-events-none">
        <AnimatePresence mode="sync">
          {toasts.map((toast) => (
            <div key={toast.id} className="pointer-events-auto">
              <ToastItem
                toast={toast}
                onRemove={() => removeToast(toast.id)}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
