import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HomePage } from '../pages/Home'
import { LearnPage } from '../pages/Learn'
import { LessonPage } from '../pages/Lesson'
import { LeaderboardPage } from '../pages/Leaderboard'
import { ProfilePage } from '../pages/Profile'
import { PremiumPage } from '../pages/Premium'
import { OnboardingPage } from '../pages/Onboarding'
import { FunFactsPage } from '../pages/FunFacts'
import { NotesInputPage } from '../pages/NotesInput'
import { FlashcardsPlayerPage } from '../pages/FlashcardsPlayer'
import { TriviaQuizPage } from '../pages/TriviaQuiz'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* All routes are now directly accessible */}
        <Route path="/" element={<HomePage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/lesson/:categoryId/:lessonId" element={<LessonPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/premium" element={<PremiumPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* Learning Routes */}
        <Route path="/funfacts" element={<FunFactsPage />} />
        <Route path="/notes" element={<NotesInputPage />} />
        <Route path="/flashcards" element={<FlashcardsPlayerPage />} />
        <Route path="/trivia" element={<TriviaQuizPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
