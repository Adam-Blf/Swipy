import { z } from 'zod'

// Category Schema
export const categorySchema = z.enum([
  'science',
  'art',
  'history',
  'geography',
  'sport',
  'music',
  'cinema',
  'literature',
])

// Difficulty Schema
export const difficultySchema = z.enum(['easy', 'medium', 'hard'])

// Question Schema
export const questionSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(5),
  answer: z.string().min(1),
  explanation: z.string().optional(),
  funFact: z.string().optional(),
  category: categorySchema,
  difficulty: difficultySchema,
  source: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
})

// Question with Meta Schema
export const questionWithMetaSchema = questionSchema.extend({
  timesShown: z.number().int().min(0).default(0),
  timesCorrect: z.number().int().min(0).default(0),
  lastShown: z.date().optional(),
  nextReview: z.date().optional(),
  easeFactor: z.number().min(1.3).max(2.5).default(2.5),
})

// User Preferences Schema
export const userPreferencesSchema = z.object({
  name: z.string().min(0).max(50),
  selectedCategories: z.array(categorySchema).min(0),
  soundEnabled: z.boolean().default(true),
  hapticEnabled: z.boolean().default(true),
  onboardingCompleted: z.boolean().default(false),
  tutorialShown: z.boolean().default(false),
  dailyGoal: z.number().int().min(5).max(100).default(20),
})

// Category Progress Schema
export const categoryProgressSchema = z.object({
  category: categorySchema,
  level: z.number().int().min(1).default(1),
  xp: z.number().int().min(0).default(0),
  cardsLearned: z.number().int().min(0).default(0),
  cardsKnown: z.number().int().min(0).default(0),
  accuracy: z.number().min(0).max(100).default(0),
})

// User Stats Schema
export const userStatsSchema = z.object({
  totalXp: z.number().int().min(0).default(0),
  globalLevel: z.number().int().min(1).default(1),
  currentStreak: z.number().int().min(0).default(0),
  longestStreak: z.number().int().min(0).default(0),
  lastActivityDate: z.string().nullable().default(null),
  totalCardsSwipedRight: z.number().int().min(0).default(0),
  totalCardsSwipedLeft: z.number().int().min(0).default(0),
  totalCardsReviewed: z.number().int().min(0).default(0),
  categoryProgress: z.record(categorySchema, categoryProgressSchema),
})

// Badge Schema
export const badgeSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
  unlockedAt: z.date().optional(),
  requirement: z.object({
    type: z.enum(['xp', 'streak', 'category_level', 'total_cards']),
    value: z.number().int().min(0),
    category: categorySchema.optional(),
  }),
})

// Type inference helpers
export type QuestionInput = z.infer<typeof questionSchema>
export type QuestionWithMetaInput = z.infer<typeof questionWithMetaSchema>
export type UserPreferencesInput = z.infer<typeof userPreferencesSchema>
export type CategoryProgressInput = z.infer<typeof categoryProgressSchema>
export type UserStatsInput = z.infer<typeof userStatsSchema>
export type BadgeInput = z.infer<typeof badgeSchema>
