import type { UserPreferences, UserStats } from '@/types'
import { createDefaultUserStats, DEFAULT_USER_PREFERENCES } from '@/types'

// Current store version - increment when making breaking changes
export const STORE_VERSION = 1

interface PersistedState {
  preferences: UserPreferences
  stats: UserStats
  learnedCards: string[]
  knownCards: string[]
  reviewQueue: string[]
  version?: number
}

type Migration = (state: PersistedState) => PersistedState

// Migration functions for each version
const migrations: Record<number, Migration> = {
  // Migration from version 0 (no version) to version 1
  1: (state: PersistedState): PersistedState => {
    return {
      ...state,
      preferences: {
        ...DEFAULT_USER_PREFERENCES,
        ...state.preferences,
      },
      stats: {
        ...createDefaultUserStats(),
        ...state.stats,
      },
      version: 1,
    }
  },
  // Add future migrations here:
  // 2: (state) => { ... },
}

export function migrateState(
  persistedState: unknown,
  currentVersion: number = STORE_VERSION
): PersistedState {
  if (!persistedState || typeof persistedState !== 'object') {
    return getDefaultState()
  }

  const state = persistedState as PersistedState
  let version = state.version ?? 0

  // Apply migrations sequentially
  while (version < currentVersion) {
    version++
    const migration = migrations[version]
    if (migration) {
      Object.assign(state, migration(state))
    }
  }

  return {
    ...state,
    version: currentVersion,
  }
}

export function getDefaultState(): PersistedState {
  return {
    preferences: DEFAULT_USER_PREFERENCES,
    stats: createDefaultUserStats(),
    learnedCards: [],
    knownCards: [],
    reviewQueue: [],
    version: STORE_VERSION,
  }
}

// Storage key for the Zustand persist middleware
export const STORAGE_KEY = 'swipy-storage'

// Utility to clear corrupted data and reset
export function clearStorageAndReset(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY)
    window.location.reload()
  }
}

// Utility to export user data
export function exportUserData(): string {
  if (typeof window === 'undefined') return '{}'
  const data = localStorage.getItem(STORAGE_KEY)
  return data ?? '{}'
}

// Utility to import user data
export function importUserData(jsonData: string): boolean {
  try {
    const data = JSON.parse(jsonData)
    const migrated = migrateState(data.state)
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ state: migrated }))
    return true
  } catch {
    return false
  }
}
