import { useEffect, useState } from "react"
import { useApp } from "@/context/app-context"
import { SectionHeader } from "@/components/section-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Sparkles,
  RefreshCw,
  Quote,
  Heart,
  Sun,
  Loader2,
} from "lucide-react"

const REMINDERS = [
  { text: "Drink a glass of water", emoji: "💧" },
  { text: "Unclench your jaw and drop your shoulders", emoji: "🌸" },
  { text: "Step outside for one minute of fresh air", emoji: "🍃" },
  { text: "Take three slow, full breaths", emoji: "🌬️" },
]

export function Motivation() {
  const { user } = useApp()

  const [affirmation, setAffirmation] = useState("")
  const [quote, setQuote] = useState("")
  const [author, setAuthor] = useState("")
  const [loading, setLoading] = useState(false)

  async function generateMotivation() {
    try {
      setLoading(true)

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              import.meta.env.VITE_GROQ_API_KEY
            }`,
          },

          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",

            messages: [
              {
                role: "system",
                content:
                  "You generate deeply comforting, emotional, beautiful affirmations and motivational quotes for women wellness apps. Keep them short, aesthetic, calming, emotionally supportive and unique every time.",
              },

              {
                role: "user",
                content: `
Generate:
1. One unique affirmation
2. One motivational quote
3. Quote author ONLY if quote belongs to a famous person

Respond ONLY in JSON format:

{
  "affirmation": "",
  "quote": "",
  "author": ""
}
                `,
              },
            ],

            temperature: 1.2,
          }),
        },
      )

      const data = await response.json()

      const content =
        data.choices?.[0]?.message?.content || "{}"

      const parsed = JSON.parse(content)

      setAffirmation(parsed.affirmation || "")
      setQuote(parsed.quote || "")
      setAuthor(parsed.author || "")
    } catch (error) {
      console.error(error)

      setAffirmation(
        "You are allowed to rest and still be worthy.",
      )

      setQuote(
        "Small gentle steps still move your life forward.",
      )

      setAuthor("")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    generateMotivation()
  }, [])

  return (
    <div>
      <SectionHeader
        icon={Sparkles}
        title="Daily Motivation"
        subtitle="A little pocket of encouragement, here whenever you need softness, reassurance, and emotional warmth."
      />

      {/* AFFIRMATION */}
      <Card className="mb-4 flex flex-col items-center bg-gradient-to-br from-primary/12 via-accent/12 to-secondary/12 py-10 text-center">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
          <Heart className="size-6" />
        </span>

        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-primary">
          {user
            ? `For you, ${user.name}`
            : "A gentle affirmation"}
        </p>

        <p className="mt-3 max-w-2xl px-4 font-heading text-2xl font-semibold leading-relaxed text-balance">
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="size-5 animate-spin" />
              Generating something beautiful...
            </span>
          ) : (
            <>“{affirmation}”</>
          )}
        </p>

        <Button
          variant="soft"
          className="mt-6"
          onClick={generateMotivation}
          disabled={loading}
        >
          <RefreshCw
            className={`size-4 ${
              loading ? "animate-spin" : ""
            }`}
          />

          {loading
            ? "Generating..."
            : "Another affirmation"}
        </Button>
      </Card>

      {/* QUOTE + REMINDERS */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* QUOTE */}
        <Card>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Quote className="size-5 text-secondary-foreground" />

            <span className="text-xs font-semibold uppercase tracking-wide">
              Quote of the day
            </span>
          </div>

          <p className="mt-3 font-heading text-lg font-medium leading-relaxed text-pretty">
            {loading
              ? "Generating quote..."
              : quote}
          </p>

          {author && (
            <p className="mt-3 text-sm text-muted-foreground">
              — {author}
            </p>
          )}
        </Card>

        {/* REMINDERS */}
        <Card>
          <div className="mb-3 flex items-center gap-2 text-muted-foreground">
            <Sun className="size-5 text-accent-foreground" />

            <span className="text-xs font-semibold uppercase tracking-wide">
              Wellness reminders
            </span>
          </div>

          <ul className="flex flex-col gap-2.5">
            {REMINDERS.map((r) => (
              <li
                key={r.text}
                className="flex items-center gap-3 rounded-2xl bg-background/60 px-4 py-2.5 text-sm"
              >
                <span
                  className="text-lg"
                  aria-hidden
                >
                  {r.emoji}
                </span>

                <span className="text-foreground/85">
                  {r.text}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}