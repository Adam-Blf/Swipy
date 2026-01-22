import { AuthProvider } from './contexts/AuthContext'
import { GameProvider } from './contexts/GameContext'
import { AppRouter } from './routes'

export default function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <AppRouter />
      </GameProvider>
    </AuthProvider>
  )
}
