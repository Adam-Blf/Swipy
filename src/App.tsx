import { AuthProvider } from './contexts/AuthContext'
import { GameProvider } from './contexts/GameContext'
import { AppRouter } from './routes'

export default function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <div className="min-h-screen bg-genius-bg dark">
          <AppRouter />
        </div>
      </GameProvider>
    </AuthProvider>
  )
}
