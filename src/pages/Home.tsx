import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Play, TrendingUp, Users, Crown } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { RalphMascot } from '../components/ralph/RalphMascot'
import { TopBar } from '../components/layout/TopBar'
import { BottomNav } from '../components/layout/BottomNav'
import { useAuth } from '../contexts/AuthContext'

export function HomePage() {
  const navigate = useNavigate()
  const { profile } = useAuth()

  const dailyGoal = {
    current: profile?.xp_total ? Math.min(profile.xp_total % 50, 50) : 0,
    target: 50
  }

  return (
    <div className="min-h-screen bg-genius-bg pb-20 pt-16">
      <TopBar />

      <div className="p-4 max-w-lg mx-auto">
        {/* Welcome section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-4 mb-6"
        >
          <RalphMascot mood="happy" size="sm" />
          <div>
            <h1 className="text-xl font-bold text-white">
              Salut {profile?.display_name || 'Génie'} !
            </h1>
            <p className="text-gray-400 text-sm">
              Prêt à apprendre aujourd'hui ?
            </p>
          </div>
        </motion.div>

        {/* Daily goal card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card variant="glass" padding="lg" className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-400">Objectif du jour</span>
              <Badge variant="xp" size="sm">
                {dailyGoal.current}/{dailyGoal.target} XP
              </Badge>
            </div>

            <div className="w-full bg-gray-800 rounded-full h-3 mb-3">
              <motion.div
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(dailyGoal.current / dailyGoal.target) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>

            <Button
              onClick={() => navigate('/learn')}
              variant="primary"
              size="lg"
              className="w-full"
              leftIcon={<Play className="w-5 h-5 fill-white" />}
            >
              Commencer une leçon
            </Button>
          </Card>
        </motion.div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card
              variant="default"
              padding="md"
              interactive
              onClick={() => navigate('/leaderboard')}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/20 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {profile?.current_streak || 0}
                  </p>
                  <p className="text-xs text-gray-500">Jours de série</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card
              variant="default"
              padding="md"
              interactive
              onClick={() => navigate('/leaderboard')}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-500/20 rounded-xl">
                  <Crown className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">Bronze</p>
                  <p className="text-xs text-gray-500">Ligue actuelle</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Categories preview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-white">Catégories</h2>
            <button
              onClick={() => navigate('/learn')}
              className="text-sm text-primary-400 hover:text-primary-300"
            >
              Voir tout
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { name: 'Histoire', emoji: '📜', color: 'from-amber-500 to-orange-600' },
              { name: 'Sciences', emoji: '🔬', color: 'from-green-500 to-emerald-600' },
              { name: 'Géo', emoji: '🌍', color: 'from-blue-500 to-cyan-600' },
              { name: 'Arts', emoji: '🎨', color: 'from-purple-500 to-pink-600' },
              { name: 'Sports', emoji: '⚽', color: 'from-red-500 to-rose-600' },
              { name: 'Divers', emoji: '🎬', color: 'from-indigo-500 to-violet-600' }
            ].map((cat, i) => (
              <motion.button
                key={cat.name}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                onClick={() => navigate('/learn')}
                className={`p-4 rounded-2xl bg-gradient-to-br ${cat.color} text-white text-center`}
              >
                <span className="text-2xl block mb-1">{cat.emoji}</span>
                <span className="text-xs font-medium">{cat.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Friends activity (placeholder) */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <Card variant="default" padding="md" interactive>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary-500/20 rounded-xl">
                <Users className="w-6 h-6 text-secondary-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-white">Invite tes amis</p>
                <p className="text-xs text-gray-500">Gagne 100 XP par ami invité</p>
              </div>
              <span className="text-2xl">→</span>
            </div>
          </Card>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  )
}
