import { useEffect, useRef, useState } from "react"
import { SectionHeader } from "@/components/section-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import {
  Gamepad2,
  Wind,
  Sparkles,
  Hand,
} from "lucide-react"

type GameId = "breathe" | "tap" | "zen"

const GAMES: {
  id: GameId
  label: string
  desc: string
  icon: typeof Wind
}[] = [
  {
    id: "breathe",
    label: "Breathing Bubble",
    desc: "Follow the bubble to slow down",
    icon: Wind,
  },
  {
    id: "tap",
    label: "Calming Pops",
    desc: "Gently pop floating bubbles",
    icon: Hand,
  },
  {
    id: "zen",
    label: "Zen Sand Garden",
    desc: "Create calming flowing trails",
    icon: Sparkles,
  },
]

export function Games() {
  const [game, setGame] =
    useState<GameId>("breathe")

  return (
    <div>
      <SectionHeader
        icon={Gamepad2}
        title="Mini Mood Games"
        subtitle="Tiny, soothing moments to reset your mind. No scores, no pressure — just gentle little joys."
      />

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {GAMES.map((g) => {
          const Icon = g.icon
          const active = game === g.id

          return (
            <button
              key={g.id}
              onClick={() => setGame(g.id)}
              className={cn(
                "flex items-center gap-3 rounded-3xl border p-4 text-left transition-all hover:-translate-y-0.5",
                active
                  ? "border-primary/40 bg-primary/10 shadow-md shadow-primary/15"
                  : "border-white/60 bg-card/70 backdrop-blur-md",
              )}
            >
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-2xl transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/12 text-primary",
                )}
              >
                <Icon className="size-5" />
              </span>

              <div>
                <p className="font-heading text-sm font-semibold">
                  {g.label}
                </p>

                <p className="text-xs text-muted-foreground">
                  {g.desc}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {game === "breathe" && (
        <BreathingBubble />
      )}

      {game === "tap" && <CalmingPops />}

      {game === "zen" && <ZenGarden />}
    </div>
  )
}

/* ================= BREATHING ================= */

const BREATHE_STEPS = [
  {
    label: "Breathe in",
    ms: 4000,
    scale: 1.15,
  },
  {
    label: "Hold",
    ms: 2000,
    scale: 1.15,
  },
  {
    label: "Breathe out",
    ms: 4000,
    scale: 0.75,
  },
  {
    label: "Hold",
    ms: 2000,
    scale: 0.75,
  },
]

function BreathingBubble() {
  const [running, setRunning] =
    useState(false)

  const [stepIndex, setStepIndex] =
    useState(0)

  const timer = useRef<number>(0)

  useEffect(() => {
    if (!running) return

    const step = BREATHE_STEPS[stepIndex]

    timer.current = window.setTimeout(() => {
      setStepIndex(
        (i) => (i + 1) % BREATHE_STEPS.length,
      )
    }, step.ms)

    return () =>
      window.clearTimeout(timer.current)
  }, [running, stepIndex])

  const step = BREATHE_STEPS[stepIndex]

  return (
    <Card className="flex flex-col items-center gap-6 py-12">
      <div className="relative flex h-64 w-64 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-primary/10" />

        <div
          className="flex size-40 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 text-center transition-transform ease-in-out"
          style={{
            transform: `scale(${
              running ? step.scale : 0.85
            })`,
            transitionDuration: running
              ? `${step.ms}ms`
              : "600ms",
          }}
        >
          <span className="font-heading text-lg font-semibold text-foreground">
            {running ? step.label : "Ready?"}
          </span>
        </div>
      </div>

      <Button
        onClick={() => {
          setRunning((r) => !r)
          setStepIndex(0)
        }}
        variant={running ? "outline" : "default"}
      >
        {running
          ? "Pause"
          : "Start breathing"}
      </Button>

      <p className="max-w-xs text-center text-sm text-muted-foreground">
        Let your breath follow the bubble
        as it grows and softens. Even a
        minute helps.
      </p>
    </Card>
  )
}

/* ================= POPS ================= */

interface Bubble {
  id: number
  x: number
  size: number
  hue: string
}

const BUBBLE_HUES = [
  "bg-primary/30",
  "bg-secondary/40",
  "bg-accent/40",
  "bg-sky-200/60",
]

function CalmingPops() {
  const [bubbles, setBubbles] =
    useState<Bubble[]>([])

  const [popped, setPopped] =
    useState(0)

  const nextId = useRef(1)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setBubbles((prev) => {
        if (prev.length > 7)
          return prev

        return [
          ...prev,
          {
            id: nextId.current++,
            x: 8 + Math.random() * 84,
            size:
              44 + Math.random() * 40,
            hue: BUBBLE_HUES[
              Math.floor(
                Math.random() *
                  BUBBLE_HUES.length,
              )
            ],
          },
        ]
      })
    }, 850)

    return () =>
      window.clearInterval(interval)
  }, [])

  function pop(id: number) {
    setBubbles((prev) =>
      prev.filter((b) => b.id !== id),
    )

    setPopped((p) => p + 1)
  }

  return (
    <Card className="overflow-hidden p-0">
      <div className="flex items-center justify-between px-5 py-3">
        <p className="text-sm text-muted-foreground">
          Tap the bubbles as they drift
          up
        </p>

        <span className="rounded-full bg-secondary/30 px-3 py-1 text-xs font-medium text-secondary-foreground">
          {popped} popped
        </span>
      </div>

      <div className="relative h-96 overflow-hidden bg-gradient-to-b from-background/40 to-primary/5">
        {bubbles.map((b) => (
          <button
            key={b.id}
            onClick={() => pop(b.id)}
            aria-label="Pop bubble"
            className={cn(
              "absolute bottom-0 rounded-full border border-white/50 backdrop-blur-sm",
              b.hue,
            )}
            style={{
              left: `${b.x}%`,
              width: b.size,
              height: b.size,
              animation:
                "rise 6s linear forwards",
            }}
          />
        ))}

        <style>{`
          @keyframes rise {
            0% {
              transform: translateY(0);
              opacity: 0;
            }

            12% {
              opacity: 1;
            }

            100% {
              transform: translateY(-26rem);
              opacity: 0.9;
            }
          }
        `}</style>
      </div>
    </Card>
  )
}

/* ================= ZEN GARDEN ================= */

function ZenGarden() {
  const [points, setPoints] = useState<
    { x: number; y: number; id: number }[]
  >([])

  function createTrail(
    e: React.MouseEvent<HTMLDivElement>,
  ) {
    const rect =
      e.currentTarget.getBoundingClientRect()

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const point = {
      x,
      y,
      id: Date.now() + Math.random(),
    }

    setPoints((prev) => [
      ...prev.slice(-80),
      point,
    ])
  }

  return (
    <Card className="overflow-hidden p-0">
      <div className="flex items-center justify-between border-b border-border/40 px-5 py-3">
        <p className="text-sm text-muted-foreground">
          Move your cursor slowly 🌸
        </p>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setPoints([])}
        >
          Clear
        </Button>
      </div>

      <div
        onMouseMove={createTrail}
        className="relative h-[500px] cursor-none overflow-hidden bg-gradient-to-br from-pink-50 via-violet-50 to-sky-50"
      >
        {points.map((p, index) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-gradient-to-br from-pink-300 to-violet-300 blur-sm"
            style={{
              left: p.x,
              top: p.y,
              width: 12,
              height: 12,
              opacity:
                index / points.length,
              transform:
                "translate(-50%, -50%)",
            }}
          />
        ))}

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Sparkles className="mx-auto size-10 text-primary/50" />

            <p className="mt-4 font-heading text-2xl font-semibold text-foreground/70">
              Softly move your cursor
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Create peaceful flowing
              trails ✨
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}