import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Settings,
  Crown,
  Trophy,
  Target,
  Calendar,
  LogOut,
  ChevronRight,
  Zap,
  Flame,
  Heart
} from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { TopBar } from '../components/layout/TopBar'
import { BottomNav } from '../components/layout/BottomNav'
import { useAuth } from '../contexts/AuthContext'
import { formatNumber } from '../lib/utils'

export function ProfilePage() {
  const navigate = useNavigate()
  const { profile, signOut } = useAuth()

  const stats = [
    {
      icon: <Zap className="w-5 h-5" />,
      label: 'XP Total',
      value: formatNumber(profile?.xp_total || 0),
      color: 'text-accent-400 bg-accent-500/20'
    },
    {
      icon: <Flame className="w-5 h-5" />,
      label: 'Meilleure série',
      value: `${profile?.longest_streak || 0}j`,
      color: 'text-orange-400 bg-orange-500/20'
    },
    {
      icon: <Target className="w-5 h-5" />,
      label: 'Leçons',
      value: '12',
      color: 'text-green-400 bg-green-500/20'
    },
    {
      icon: <Trophy className="w-5 h-5" />,
      label: 'Ligue',
      value: 'Bronze',
      color: 'text-amber-400 bg-amber-500/20'
    }
  ]

  const menuItems = [
    {
      icon: <Crown className="w-5 h-5 text-amber-400" />,
      label: 'Genius Plus',
      description: 'Vies illimitées, sans pub',
      onClick: () => navigate('/premium'),
      badge: 'PRO'
    },
    {
      icon: <Heart className="w-5 h-5 text-red-400" />,
      label: 'Recharger les vies',
      description: `${profile?.hearts || 5}/5 vies`,
      onClick: () => {}
    },
    {
      icon: <Calendar className="w-5 h-5 text-blue-400" />,
      label: 'Historique',
      description: 'Voir tes performances',
      onClick: () => {}
    },
    {
      icon: <Settings className="w-5 h-5 text-gray-400" />,
      label: 'Paramètres',
      description: 'Notifications, langue, etc.',
      onClick: () => {}
    }
  ]

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-genius-bg pb-20 pt-16">
      <TopBar />

      <div className="p-4 max-w-lg mx-auto">
        {/* Profile header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-6"
        >
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-4xl">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                '🦸'
              )}
            </div>
            {profile?.is_premium && (
              <div className="absolute -top-1 -right-1 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
            )}
          </div>

          <h1 className="text-2xl font-bold text-white mt-4">
            {profile?.display_name || 'Génie'}
          </h1>
          <p className="text-gray-400">@{profile?.username || 'genius_user'}</p>

          {/* Current streak badge */}
          <div className="flex justify-center mt-3">
            <Badge variant="streak" size="md" icon={<Flame className="w-4 h-4" />}>
              {profile?.current_streak || 0} jours de série
            </Badge>
          </div>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3 mb-6"
        >
          {stats.map((stat, index) => (
            <Card key={stat.label} variant="default" padding="md">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-2`}>
                {stat.icon}
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </Card>
          ))}
        </motion.div>

        {/* Menu items */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-2 mb-6"
        >
          {menuItems.map((item, index) => (
            <Card
              key={item.label}
              variant="default"
              padding="none"
              interactive
              onClick={item.onClick}
            >
              <div className="flex items-center gap-3 p-4">
                <div className="w-10 h-10 rounded-xl bg-genius-card flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-white">{item.label}</p>
                    {item.badge && (
                      <span className="px-2 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </div>
            </Card>
          ))}
        </motion.div>

        {/* Sign out button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={handleSignOut}
            variant="ghost"
            size="lg"
            className="w-full text-red-400 border-red-500/30 hover:bg-red-500/10"
            leftIcon={<LogOut className="w-5 h-5" />}
          >
            Déconnexion
          </Button>
        </motion.div>

        {/* App version */}
        <p className="text-center text-xs text-gray-600 mt-6">
          Genius v1.0.0 • Made with 💙 by Ralph
        </p>
      </div>

      <BottomNav />
    </div>
  )
}
