import type { MoodId } from "./data"

/**
 * Local persistence layer.
 *
 * This currently reads/writes from localStorage. The function signatures are
 * intentionally Promise-based so they can be swapped for Firebase (Firestore)
 * later without changing any calling code. See `firebase.ts` for the
 * placeholder client these would delegate to in production.
 */

export interface UserProfile {
  name: string
  age: string
  cycleLength: string
  createdAt: number
}

export interface MoodEntry {
  mood: MoodId
  note: string
  date: string // ISO date
  timestamp: number
}

const USER_KEY = "herspace.user"
const MOOD_KEY = "herspace.moods"

export function getUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? (JSON.parse(raw) as UserProfile) : null
  } catch {
    return null
  }
}

export function saveUser(profile: UserProfile): void {
  localStorage.setItem(USER_KEY, JSON.stringify(profile))
}

export function clearUser(): void {
  localStorage.removeItem(USER_KEY)
  localStorage.removeItem(MOOD_KEY)
}

export function getMoodHistory(): MoodEntry[] {
  try {
    const raw = localStorage.getItem(MOOD_KEY)
    return raw ? (JSON.parse(raw) as MoodEntry[]) : []
  } catch {
    return []
  }
}

export function addMoodEntry(entry: MoodEntry): MoodEntry[] {
  const history = getMoodHistory()
  const next = [entry, ...history].slice(0, 60)
  localStorage.setItem(MOOD_KEY, JSON.stringify(next))
  return next
}
