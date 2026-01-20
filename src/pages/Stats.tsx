import { useNavigate } from 'react-router-dom'
import { Button, Avatar, ProgressBar, StreakProgress } from '@/components/atoms'
import { Card, CardHeader, CardContent } from '@/components/molecules'
import { useUserName, useTotalXp, useCurrentStreak, useLongestStreak, useTotalStats } from '@/store'
import { getLevel } from '@/types'

export function Stats() {
  const navigate = useNavigate()
  const userName = useUserName()
  const totalXp = useTotalXp()
  const currentStreak = useCurrentStreak()
  const longestStreak = useLongestStreak()
  const totalStats = useTotalStats()
  const level = getLevel(totalXp)

  return (
    <div className="min-h-screen bg-background p-6 pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Avatar name={userName || 'User'} size="lg" />
        <div>
          <h1 className="text-xl font-bold text-text-primary">{userName || 'Swiper'}</h1>
          <p className="text-text-secondary">Niveau {level}</p>
        </div>
      </div>

      {/* XP Progress */}
      <Card className="mb-4">
        <CardHeader title="Progression" subtitle={`${totalXp} XP total`} />
        <CardContent>
          <ProgressBar value={totalXp % 100} variant="gradient" showLabel />
        </CardContent>
      </Card>

      {/* Streak */}
      <Card className="mb-4">
        <CardHeader title="Série" />
        <CardContent>
          <StreakProgress current={currentStreak} longest={longestStreak} />
        </CardContent>
      </Card>

      {/* Stats */}
      <Card className="mb-4">
        <CardHeader title="Statistiques" />
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 rounded-xl bg-surface-elevated">
              <p className="text-2xl font-bold text-success">{totalStats.known}</p>
              <p className="text-xs text-text-muted">Connues</p>
            </div>
            <div className="p-3 rounded-xl bg-surface-elevated">
              <p className="text-2xl font-bold text-error">{totalStats.learned}</p>
              <p className="text-xs text-text-muted">À réviser</p>
            </div>
            <div className="p-3 rounded-xl bg-surface-elevated">
              <p className="text-2xl font-bold text-primary">{totalStats.totalCards}</p>
              <p className="text-xs text-text-muted">Total vues</p>
            </div>
            <div className="p-3 rounded-xl bg-surface-elevated">
              <p className="text-2xl font-bold text-warning">{totalStats.toReview}</p>
              <p className="text-xs text-text-muted">En révision</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Back Button */}
      <Button variant="ghost" className="w-full" onClick={() => navigate('/swipe')}>
        Retour au jeu
      </Button>
    </div>
  )
}
