import { useState } from "react"
import { useApp } from "@/context/app-context"
import { MOODS, type MoodId } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

export function MoodCheckIn() {
  const { logMood, currentMood } = useApp()
  const [selected, setSelected] = useState<MoodId | null>(currentMood)
  const [note, setNote] = useState("")
  const [saved, setSaved] = useState(false)

  function handleSave() {
    if (!selected) return
    logMood(selected, note.trim())
    setSaved(true)
    setTimeout(() => setSaved(false), 2400)
  }

  return (
    <div className="rounded-3xl border border-white/60 bg-card/70 p-6 shadow-[0_8px_30px_-12px_rgba(120,80,160,0.25)] backdrop-blur-md md:p-7">
      <h2 className="font-heading text-xl font-semibold">How are you feeling today?</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Choose what feels truest right now. There are no wrong answers.
      </p>

      <div className="mt-5 grid grid-cols-3 gap-2.5 sm:grid-cols-5">
        {MOODS.map((mood) => {
          const active = selected === mood.id
          return (
            <button
              key={mood.id}
              onClick={() => setSelected(mood.id)}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-2xl border border-transparent bg-background/60 px-2 py-3 transition-all hover:-translate-y-0.5 hover:bg-background",
                active && "border-primary/40 bg-primary/10 ring-2 ring-primary/30",
              )}
              aria-pressed={active}
            >
              <span className="text-2xl" aria-hidden>
                {mood.emoji}
              </span>
              <span className="text-xs font-medium text-foreground">{mood.label}</span>
            </button>
          )
        })}
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={2}
        placeholder="Want to add a few words about your day? (optional)"
        className="mt-4 w-full resize-none rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/25"
      />

      <Button onClick={handleSave} disabled={!selected} className="mt-4 w-full sm:w-auto">
        {saved ? (
          <>
            <Check className="size-4" /> Saved with care
          </>
        ) : (
          "Save my check-in"
        )}
      </Button>
    </div>
  )
}
