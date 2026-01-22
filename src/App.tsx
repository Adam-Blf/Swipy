import { GameProvider } from './contexts/GameContext'
import { FlashcardProvider } from './contexts/FlashcardContext'
import { AppRouter } from './routes'

export default function App() {
  return (
    <GameProvider>
      <FlashcardProvider>
        <AppRouter />
      </FlashcardProvider>
    </GameProvider>
  )
}
