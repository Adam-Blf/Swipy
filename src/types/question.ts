export type Category =
  | 'science'
  | 'art'
  | 'history'
  | 'geography'
  | 'sport'
  | 'music'
  | 'cinema'
  | 'literature'

export type Difficulty = 'easy' | 'medium' | 'hard'

export interface Question {
  id: string
  text: string
  answer: string
  explanation?: string
  funFact?: string
  category: Category
  difficulty: Difficulty
  source?: string
  imageUrl?: string
}

export interface QuestionWithMeta extends Question {
  timesShown: number
  timesCorrect: number
  lastShown?: Date
  nextReview?: Date
  easeFactor: number // SM-2 algorithm factor
}

export const CATEGORY_CONFIG: Record<
  Category,
  { label: string; color: string; icon: string }
> = {
  science: { label: 'Science', color: 'science', icon: 'flask' },
  art: { label: 'Art', color: 'art', icon: 'palette' },
  history: { label: 'Histoire', color: 'history', icon: 'landmark' },
  geography: { label: 'Géographie', color: 'geography', icon: 'globe' },
  sport: { label: 'Sport', color: 'sport', icon: 'trophy' },
  music: { label: 'Musique', color: 'music', icon: 'music' },
  cinema: { label: 'Cinéma', color: 'cinema', icon: 'clapperboard' },
  literature: { label: 'Littérature', color: 'literature', icon: 'book-open' },
}

export const ALL_CATEGORIES: Category[] = [
  'science',
  'art',
  'history',
  'geography',
  'sport',
  'music',
  'cinema',
  'literature',
]
