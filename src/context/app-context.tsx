import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import type { MoodId } from "@/lib/data"
import {
  addMoodEntry,
  clearUser,
  getMoodHistory,
  getUser,
  saveUser,
  type MoodEntry,
  type UserProfile,
} from "@/lib/storage"

interface AppContextValue {
  user: UserProfile | null
  moodHistory: MoodEntry[]
  currentMood: MoodId | null
  loading: boolean
  registerUser: (profile: Omit<UserProfile, "createdAt">) => void
  logMood: (mood: MoodId, note: string) => void
  resetAll: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate an async hydration (e.g. Firebase) for a smooth loading state.
    const timer = setTimeout(() => {
      setUser(getUser())
      setMoodHistory(getMoodHistory())
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const currentMood = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10)
    return moodHistory.find((m) => m.date === today)?.mood ?? moodHistory[0]?.mood ?? null
  }, [moodHistory])

  function registerUser(profile: Omit<UserProfile, "createdAt">) {
    const full: UserProfile = { ...profile, createdAt: Date.now() }
    saveUser(full)
    setUser(full)
  }

  function logMood(mood: MoodId, note: string) {
    const entry: MoodEntry = {
      mood,
      note,
      date: new Date().toISOString().slice(0, 10),
      timestamp: Date.now(),
    }
    setMoodHistory(addMoodEntry(entry))
  }

  function resetAll() {
    clearUser()
    setUser(null)
    setMoodHistory([])
  }

  const value: AppContextValue = {
    user,
    moodHistory,
    currentMood,
    loading,
    registerUser,
    logMood,
    resetAll,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used within AppProvider")
  return ctx
}
