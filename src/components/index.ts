// Components - Genius Blue Edition
// Central export file for all reusable components

// Achievements
export * from './achievements';

// Cards
export { CardStack, DefaultSwipeOverlay, useCardStackRef } from './CardStack';
export { CategoryCard, CategoryList, CategoryChips } from './CategoryCard';
export { FlipCard3D } from './FlipCard3D';
export { GeniusCard, type GeniusCardRef } from './GeniusCard';
export { PhysicsSwipeCard } from './PhysicsSwipeCard';
export { SwipeCard } from './SwipeCard';
export { FABControls, FABControlsCompact, FABControlsFloating } from './FABControls';
export { LeaderboardCard, MiniLeaderboard } from './LeaderboardCard';

// Layout
export { BottomNav } from './layout/BottomNav';
export { TopBar } from './layout/TopBar';

// Lesson
export { AnswerButton } from './lesson/AnswerButton';
export { ExplanationModal } from './lesson/ExplanationModal';
export { LessonComplete } from './lesson/LessonComplete';
export { LessonProgress } from './lesson/LessonProgress';
export { LivesDisplay } from './lesson/LivesDisplay';
export { QuestionCard } from './lesson/QuestionCard';
export { XPGain } from './lesson/XPGain';

// Mobile
export * from './mobile';

// Profile
export { CustomDataSection } from './profile/CustomDataSection';
export { GoalsSection } from './profile/GoalsSection';
export { MemosSection } from './profile/MemosSection';
export { NotesSection } from './profile/NotesSection';

// PWA
export * from './pwa';

// Quiz
export * from './quiz';

// Ralph Mascot
export { RalphMascot } from './ralph/RalphMascot';

// Transitions
export * from './transitions';

// UI Components
export * from './ui';

// Widgets
export * from './widgets';

// Other
export { ErrorBoundary } from './ErrorBoundary';
export { OnboardingGuard } from './OnboardingGuard';
