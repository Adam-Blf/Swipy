import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/atoms'

export function Welcome() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-background p-6 pb-safe-bottom pt-safe-top">
      {/* Top spacer */}
      <div />

      {/* Center content */}
      <div className="flex flex-col items-center text-center">
        {/* Logo */}
        <div className="relative mb-8">
          <div className="size-24 rounded-3xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-elevated">
            <span className="text-5xl font-bold text-white">S</span>
          </div>
          <div className="absolute -bottom-1 -right-1 size-6 rounded-full bg-success flex items-center justify-center">
            <span className="text-xs">✓</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-text-primary mb-3">
          Bienvenue sur Swipy
        </h1>

        {/* Description */}
        <p className="text-lg text-text-secondary max-w-xs leading-relaxed">
          Découvre des milliers de faits passionnants en swipant.
          <br />
          <span className="text-success">→ Droite = Je sais</span>
          <br />
          <span className="text-error">← Gauche = À apprendre</span>
        </p>

        {/* Features */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {['🎯 Gamifié', '🔥 Streaks', '📊 Stats', '🌙 Offline'].map((feature) => (
            <span
              key={feature}
              className="px-3 py-1.5 rounded-full bg-surface-elevated text-sm text-text-secondary"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="w-full max-w-sm">
        <Button
          size="lg"
          className="w-full"
          icon="ArrowRight"
          iconPosition="right"
          onClick={() => navigate('/onboarding/name')}
        >
          Commencer
        </Button>

        <p className="mt-4 text-center text-xs text-text-muted">
          En continuant, tu acceptes nos conditions d'utilisation
        </p>
      </div>
    </div>
  )
}
