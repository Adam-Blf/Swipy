import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon, Button } from '@/components/atoms'
import { cn } from '@/lib/utils'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

interface InstallPromptProps {
  className?: string
}

export function InstallPrompt({ className }: InstallPromptProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    // Listen for install prompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)

      // Show prompt after a delay (don't be too aggressive)
      setTimeout(() => {
        setIsVisible(true)
      }, 3000)
    }

    // Listen for successful install
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setIsVisible(false)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()

    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      setIsInstalled(true)
    }

    setDeferredPrompt(null)
    setIsVisible(false)
  }

  const handleDismiss = () => {
    setIsVisible(false)
    // Don't show again for this session
    sessionStorage.setItem('pwa-prompt-dismissed', 'true')
  }

  // Don't show if dismissed this session
  useEffect(() => {
    if (sessionStorage.getItem('pwa-prompt-dismissed')) {
      setIsVisible(false)
    }
  }, [])

  if (isInstalled || !deferredPrompt) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className={cn(
            'fixed bottom-24 left-4 right-4 z-40',
            'bg-surface/95 backdrop-blur-md border border-surface-overlay rounded-2xl p-4 shadow-elevated',
            className
          )}
        >
          <div className="flex items-start gap-4">
            {/* App Icon */}
            <div className="size-12 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center flex-shrink-0">
              <Icon name="Layers" className="size-6 text-white" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-text-primary">Installer Swipy</h3>
              <p className="text-sm text-text-secondary mt-0.5">
                Ajoute Swipy sur ton écran d'accueil pour une expérience optimale !
              </p>

              {/* Actions */}
              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={handleInstall}
                  className="flex-1"
                >
                  <Icon name="Download" className="size-4 mr-1" />
                  Installer
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleDismiss}
                >
                  Plus tard
                </Button>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="p-1 rounded-lg hover:bg-surface-overlay transition-colors"
              aria-label="Fermer"
            >
              <Icon name="X" className="size-4 text-text-muted" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Hook to check if app is installed
export function useIsInstalled(): boolean {
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    setIsInstalled(window.matchMedia('(display-mode: standalone)').matches)
  }, [])

  return isInstalled
}
