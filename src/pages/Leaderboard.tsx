import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Users, Crown, Medal, Award, TrendingUp, Clock, Flame, Zap, Star, ChevronUp, ChevronDown } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { TopBar } from '../components/layout/TopBar'
import { BottomNav } from '../components/layout/BottomNav'
import { FadeIn, SlideUp, StaggerContainer, StaggerItem, ScaleIn, Pop } from '../components/transitions/PageTransition'
import { cn } from '../lib/utils'

interface LeaderboardUser {
  id: string
  rank: number
  name: string
  avatar: string
  xp: number
  streak?: number
  change?: 'up' | 'down' | 'same'
  isCurrentUser?: boolean
}

const mockLeagueData: LeaderboardUser[] = [
  { id: '1', rank: 1, name: 'Marie_Quiz', avatar: '👩', xp: 2450, streak: 45, change: 'same' },
  { id: '2', rank: 2, name: 'QuizMaster42', avatar: '🧔', xp: 2320, streak: 32, change: 'up' },
  { id: '3', rank: 3, name: 'BrainGenius', avatar: '🧠', xp: 2180, streak: 28, change: 'down' },
  { id: '4', rank: 4, name: 'Toi', avatar: '🦸', xp: 1850, streak: 7, change: 'up', isCurrentUser: true },
  { id: '5', rank: 5, name: 'CulturePro', avatar: '📚', xp: 1720, streak: 15, change: 'down' },
  { id: '6', rank: 6, name: 'SmartCookie', avatar: '🍪', xp: 1650, streak: 12, change: 'same' },
  { id: '7', rank: 7, name: 'HistoryBuff', avatar: '🏛️', xp: 1580, streak: 8, change: 'up' },
  { id: '8', rank: 8, name: 'ScienceNerd', avatar: '🔬', xp: 1450, streak: 5, change: 'down' },
  { id: '9', rank: 9, name: 'GeoExpert', avatar: '🌍', xp: 1320, streak: 3, change: 'same' },
  { id: '10', rank: 10, name: 'ArtLover', avatar: '🎨', xp: 1200, streak: 1, change: 'up' }
]

const mockFriendsData: LeaderboardUser[] = [
  { id: '1', rank: 1, name: 'Alex', avatar: '😎', xp: 3200, streak: 60, change: 'same' },
  { id: '2', rank: 2, name: 'Toi', avatar: '🦸', xp: 1850, streak: 7, change: 'up', isCurrentUser: true },
  { id: '3', rank: 3, name: 'Sophie', avatar: '👩‍🎓', xp: 1500, streak: 14, change: 'down' },
  { id: '4', rank: 4, name: 'Lucas', avatar: '🧑‍💻', xp: 980, streak: 2, change: 'same' }
]

const leagues = [
  { name: 'Bronze', icon: '🥉', color: 'from-amber-700 to-amber-900', minXp: 0 },
  { name: 'Argent', icon: '🥈', color: 'from-gray-400 to-gray-600', minXp: 500 },
  { name: 'Or', icon: '🥇', color: 'from-yellow-400 to-amber-500', minXp: 1500 },
  { name: 'Diamant', icon: '💎', color: 'from-cyan-400 to-blue-500', minXp: 3000 },
  { name: 'Master', icon: '👑', color: 'from-purple-400 to-pink-500', minXp: 5000 }
]

export function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<'league' | 'friends'>('league')
  const currentLeague = leagues[0] // Bronze for demo
  const userRank = 4
  const xpToNext = 330 // XP needed to reach next rank

  const data = activeTab === 'league' ? mockLeagueData : mockFriendsData

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return (
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Crown className="w-6 h-6 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
        </motion.div>
      )
      case 2: return <Medal className="w-6 h-6 text-gray-300" />
      case 3: return <Award className="w-6 h-6 text-amber-500" />
      default: return <span className="text-gray-400 font-bold text-lg">{rank}</span>
    }
  }

  const getChangeIcon = (change?: 'up' | 'down' | 'same') => {
    switch (change) {
      case 'up': return <ChevronUp className="w-4 h-4 text-green-400" />
      case 'down': return <ChevronDown className="w-4 h-4 text-genius-coral" />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-genius-bg pb-20 pt-16">
      <TopBar />

      <div className="p-4 max-w-lg mx-auto">
        {/* League header - Enhanced */}
        <FadeIn>
          <div className="text-center mb-6 relative">
            {/* Background glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${currentLeague.color} opacity-10 blur-3xl rounded-full`} />

            <motion.div
              className={`relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br ${currentLeague.color} mb-4 shadow-xl`}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(180, 83, 9, 0.3)',
                  '0 0 40px rgba(180, 83, 9, 0.5)',
                  '0 0 20px rgba(180, 83, 9, 0.3)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Inner ring */}
              <div className="absolute inset-1 rounded-full border-2 border-white/20" />
              <motion.span
                className="text-5xl relative z-10"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {currentLeague.icon}
              </motion.span>
            </motion.div>

            <h1 className="text-2xl font-bold text-white mb-1">Ligue {currentLeague.name}</h1>
            <p className="text-gray-400 text-sm">
              Top 10 monte en <span className="text-gray-300 font-medium">Ligue Argent</span>
            </p>

            {/* User rank highlight */}
            <motion.div
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/20 border border-primary-500/30"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <Star className="w-4 h-4 text-primary-400" />
              <span className="text-primary-400 font-semibold">Tu es #{userRank}</span>
              <span className="text-gray-400 text-sm">- {xpToNext} XP pour monter</span>
            </motion.div>
          </div>
        </FadeIn>

        {/* Tabs - Enhanced */}
        <SlideUp delay={0.1}>
          <div className="flex gap-2 mb-6 p-1 bg-genius-card rounded-2xl">
            <motion.button
              onClick={() => setActiveTab('league')}
              className={cn(
                'relative flex-1 py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 z-10',
                activeTab === 'league' ? 'text-white' : 'text-gray-400 hover:text-white'
              )}
              whileTap={{ scale: 0.98 }}
            >
              {activeTab === 'league' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Trophy className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Ligue</span>
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('friends')}
              className={cn(
                'relative flex-1 py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 z-10',
                activeTab === 'friends' ? 'text-white' : 'text-gray-400 hover:text-white'
              )}
              whileTap={{ scale: 0.98 }}
            >
              {activeTab === 'friends' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Users className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Amis</span>
            </motion.button>
          </div>
        </SlideUp>

        {/* Podium for top 3 */}
        <SlideUp delay={0.2}>
          <div className="flex justify-center items-end gap-2 mb-6 h-40">
            {/* 2nd place */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="relative mb-2">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-2xl border-2 border-gray-400 shadow-lg">
                  {data[1]?.avatar}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs font-bold">
                  2
                </div>
              </div>
              <p className="text-white text-sm font-medium truncate w-16 text-center">{data[1]?.name}</p>
              <p className="text-gray-400 text-xs">{data[1]?.xp.toLocaleString()}</p>
              <div className="w-16 h-16 bg-gradient-to-t from-gray-600 to-gray-500 rounded-t-lg mt-2" />
            </motion.div>

            {/* 1st place */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="relative mb-2"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Crown className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="w-18 h-18 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-3xl border-2 border-yellow-300 shadow-xl shadow-yellow-500/30">
                  {data[0]?.avatar}
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-yellow-500 flex items-center justify-center text-white text-sm font-bold">
                  1
                </div>
              </motion.div>
              <p className="text-white text-sm font-bold truncate w-20 text-center">{data[0]?.name}</p>
              <p className="text-yellow-400 text-xs font-medium">{data[0]?.xp.toLocaleString()}</p>
              <div className="w-20 h-24 bg-gradient-to-t from-yellow-600 to-yellow-500 rounded-t-lg mt-2" />
            </motion.div>

            {/* 3rd place */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="relative mb-2">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-2xl border-2 border-amber-500 shadow-lg">
                  {data[2]?.avatar}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-600 flex items-center justify-center text-white text-xs font-bold">
                  3
                </div>
              </div>
              <p className="text-white text-sm font-medium truncate w-16 text-center">{data[2]?.name}</p>
              <p className="text-gray-400 text-xs">{data[2]?.xp.toLocaleString()}</p>
              <div className="w-16 h-12 bg-gradient-to-t from-amber-700 to-amber-600 rounded-t-lg mt-2" />
            </motion.div>
          </div>
        </SlideUp>

        {/* Leaderboard list - Enhanced */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Card variant="default" padding="none" className="overflow-hidden">
              {data.slice(3).map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    'flex items-center gap-3 p-4 border-b border-genius-border last:border-b-0 group relative overflow-hidden',
                    user.isCurrentUser && 'bg-gradient-to-r from-primary-500/10 to-genius-cyan/10'
                  )}
                >
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />

                  {/* Rank */}
                  <div className="w-10 h-10 flex items-center justify-center relative z-10">
                    {getRankIcon(user.rank)}
                  </div>

                  {/* Avatar */}
                  <motion.div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center text-xl relative z-10",
                      user.isCurrentUser
                        ? "bg-gradient-to-br from-primary-500/30 to-genius-cyan/30 border-2 border-primary-500/50"
                        : "bg-genius-card border border-genius-border"
                    )}
                    whileHover={{ scale: 1.1 }}
                  >
                    {user.avatar}
                    {user.streak && user.streak >= 7 && (
                      <motion.div
                        className="absolute -top-1 -right-1"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <Flame className="w-4 h-4 text-orange-400" />
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Name & streak */}
                  <div className="flex-1 min-w-0 relative z-10">
                    <div className="flex items-center gap-2">
                      <p className={cn(
                        'font-semibold truncate',
                        user.isCurrentUser ? 'text-primary-400' : 'text-white'
                      )}>
                        {user.name}
                        {user.isCurrentUser && ' (toi)'}
                      </p>
                      {getChangeIcon(user.change)}
                    </div>
                    {user.streak && (
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Flame className="w-3 h-3 text-orange-400" />
                        {user.streak} jours
                      </p>
                    )}
                  </div>

                  {/* XP */}
                  <motion.div whileHover={{ scale: 1.05 }} className="relative z-10">
                    <Badge variant="xp" size="sm" className={cn(
                      user.isCurrentUser && "bg-primary-500/30 border-primary-500/50"
                    )}>
                      <Zap className="w-3 h-3 mr-1" />
                      {user.xp.toLocaleString()}
                    </Badge>
                  </motion.div>
                </motion.div>
              ))}
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Time remaining - Enhanced */}
        <ScaleIn delay={0.5}>
          <Card variant="glass" padding="md" className="mt-6 text-center bg-gradient-to-r from-primary-500/10 to-genius-cyan/10 border border-primary-500/20">
            <div className="flex items-center justify-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Clock className="w-5 h-5 text-primary-400" />
              </motion.div>
              <p className="text-gray-400 text-sm">
                La ligue se termine dans{' '}
                <span className="text-white font-bold">3j 14h 22m</span>
              </p>
            </div>
            <div className="mt-3 flex justify-center gap-2">
              {leagues.slice(0, 4).map((league, i) => (
                <motion.div
                  key={league.name}
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm",
                    i === 0 ? "ring-2 ring-white/50" : "opacity-50"
                  )}
                  style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
                  whileHover={{ scale: 1.2 }}
                >
                  {league.icon}
                </motion.div>
              ))}
            </div>
          </Card>
        </ScaleIn>
      </div>

      <BottomNav />
    </div>
  )
}
