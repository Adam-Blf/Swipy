import { useNavigate } from 'react-router-dom'
import { Icon } from '@/components/atoms'
import { Card, ConfirmModal } from '@/components/molecules'
import { TabBar } from '@/components/organisms'
import { useStore, useSoundEnabled, useHapticEnabled } from '@/store'
import { useState } from 'react'

export function Settings() {
  const navigate = useNavigate()
  const soundEnabled = useSoundEnabled()
  const hapticEnabled = useHapticEnabled()
  const toggleSound = useStore((s) => s.toggleSound)
  const toggleHaptic = useStore((s) => s.toggleHaptic)
  const resetAllData = useStore((s) => s.resetAllData)

  const [showResetModal, setShowResetModal] = useState(false)

  const handleReset = () => {
    resetAllData()
    navigate('/', { replace: true })
  }

  return (
    <div className="min-h-screen bg-background p-6 pb-24">
      <h1 className="text-2xl font-bold text-text-primary mb-6">Réglages</h1>

      {/* Sound */}
      <Card className="mb-3" onClick={toggleSound}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name={soundEnabled ? 'Volume2' : 'VolumeX'} className="text-text-secondary" />
            <span className="text-text-primary">Sons</span>
          </div>
          <div
            className={`w-12 h-7 rounded-full p-1 transition-colors ${soundEnabled ? 'bg-primary' : 'bg-surface-overlay'}`}
          >
            <div
              className={`size-5 rounded-full bg-white transition-transform ${soundEnabled ? 'translate-x-5' : 'translate-x-0'}`}
            />
          </div>
        </div>
      </Card>

      {/* Haptic */}
      <Card className="mb-3" onClick={toggleHaptic}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Vibrate" className="text-text-secondary" />
            <span className="text-text-primary">Vibrations</span>
          </div>
          <div
            className={`w-12 h-7 rounded-full p-1 transition-colors ${hapticEnabled ? 'bg-primary' : 'bg-surface-overlay'}`}
          >
            <div
              className={`size-5 rounded-full bg-white transition-transform ${hapticEnabled ? 'translate-x-5' : 'translate-x-0'}`}
            />
          </div>
        </div>
      </Card>

      {/* Reset */}
      <Card className="mb-6" onClick={() => setShowResetModal(true)}>
        <div className="flex items-center gap-3 text-error">
          <Icon name="Trash2" />
          <span>Réinitialiser toutes les données</span>
        </div>
      </Card>

      {/* Reset Confirmation Modal */}
      <ConfirmModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={handleReset}
        title="Réinitialiser ?"
        message="Toutes tes données seront supprimées. Cette action est irréversible."
        confirmText="Supprimer"
        variant="danger"
      />

      {/* Tab Bar */}
      <TabBar />
    </div>
  )
}
