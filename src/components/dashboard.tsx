import { useApp } from "@/context/app-context"
import { MoodCheckIn } from "@/components/mood-check-in"
import { AFFIRMATIONS, getMood, MOOD_GUIDANCE } from "@/lib/data"
import type { ViewId } from "@/components/navbar"
import {
  Apple,
  ChefHat,
  Flower2,
  MessageCircleHeart,
  ScanLine,
  Gamepad2,
  HeartHandshake,
  ArrowUpRight,
} from "lucide-react"

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return "Good morning"
  if (h < 18) return "Good afternoon"
  return "Good evening"
}

const QUICK_LINKS: { id: ViewId; label: string; desc: string; icon: typeof Apple }[] = [
  { id: "wellness", label: "Wellness", desc: "Period & self-care support", icon: HeartHandshake },
  { id: "food", label: "Food ideas", desc: "Gentle, mood-based bites", icon: Apple },
  { id: "recipes", label: "Recipes", desc: "Cook with what you have", icon: ChefHat },
  { id: "zone", label: "Wellness Zone", desc: "Breathe, stretch, soften", icon: Flower2 },
  { id: "chat", label: "Companion", desc: "A calm, kind chat", icon: MessageCircleHeart },
  { id: "scanner", label: "Food Scanner", desc: "Approximate nutrition", icon: ScanLine },
  { id: "games", label: "Mood Games", desc: "Tiny calming moments", icon: Gamepad2 },
]

export function Dashboard({ onNavigate }: { onNavigate: (v: ViewId) => void }) {
  const { user, currentMood } = useApp()
  const mood = getMood(currentMood)
  const affirmation = AFFIRMATIONS[new Date().getDate() % AFFIRMATIONS.length]

  return (
    <div className="flex flex-col gap-6">
      <section className="overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-primary/15 via-accent/15 to-secondary/15 p-7 backdrop-blur-md md:p-9">
        <p className="font-heading text-sm font-medium text-primary">{greeting()}</p>
        <h1 className="mt-1 font-heading text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          Hello, {user?.name} <span aria-hidden>🌸</span>
        </h1>
        <p className="mt-3 max-w-lg leading-relaxed text-foreground/80 text-pretty">
          {mood
            ? MOOD_GUIDANCE[mood.id].message
            : "This is your calm, safe space. Take a slow breath — you've already done something kind by being here."}
        </p>
        {mood && (
          <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-card/70 px-4 py-1.5 text-sm font-medium shadow-sm">
            <span aria-hidden>{mood.emoji}</span> Feeling {mood.label.toLowerCase()} today
          </span>
        )}
      </section>

      <MoodCheckIn />

    </div>
  )
}
