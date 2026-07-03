import { useState } from "react"
import { useApp } from "@/context/app-context"
import { SectionHeader, Disclaimer } from "@/components/section-header"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

import {
  HeartHandshake,
  Droplets,
  Moon,
  Check,
} from "lucide-react"
const SELF_CARE_IDEAS = [
  {
    title: "Warm Shower",
    text: "Warm water can relax muscles and calm the body gently.",
    emoji: "🛁",
  },

  {
    title: "Hydration",
    text: "Sip water slowly through the day to reduce fatigue and headaches.",
    emoji: "💧",
  },

  {
    title: "Soft Stretching",
    text: "Tiny stretches help stiffness, posture strain, and body pain.",
    emoji: "🧘‍♀️",
  },

  {
    title: "Quiet Music",
    text: "Soft calming sounds can help reduce stress and emotional overwhelm.",
    emoji: "🎧",
  },

  {
    title: "Rest Your Eyes",
    text: "Close your eyes for a minute and reduce screen brightness.",
    emoji: "👀",
  },

  {
    title: "Deep Breathing",
    text: "Slow breathing helps calm anxiety and tension naturally.",
    emoji: "🌸",
  },
]

const HYDRATION_GOAL = 8

const CYCLE_PHASES = [
  {
    id: "menstrual",
    name: "Menstrual Phase",
    range: "Days 1–5",
    emoji: "🌙",
    description:
      "A slower, softer phase where your body may need more rest and warmth.",

    support: [
      "Use heating pads for cramps",
      "Drink warm fluids",
      "Gentle stretching instead of intense workouts",
      "Prioritize sleep and rest",
    ],
  },

  {
    id: "follicular",
    name: "Follicular Phase",
    range: "Days 6–13",
    emoji: "🌱",
    description:
      "Energy usually starts rising again. A good phase for movement and fresh starts.",

    support: [
      "Try light workouts",
      "Eat protein-rich meals",
      "Stay hydrated",
      "Use this energy for productive tasks",
    ],
  },

  {
    id: "ovulation",
    name: "Ovulation Phase",
    range: "Days 14–16",
    emoji: "☀️",
    description:
      "You may feel energetic, social, and emotionally brighter during this phase.",

    support: [
      "Use your energy positively",
      "Hydrate more",
      "Enjoy movement and walks",
      "Spend time socially if it feels good",
    ],
  },

  {
    id: "luteal",
    name: "Luteal Phase",
    range: "Days 17–28",
    emoji: "🍂",
    description:
      "Energy may lower gradually and PMS symptoms may appear. Be gentle with yourself.",

    support: [
      "Reduce stress where possible",
      "Magnesium-rich foods may help",
      "Slow routines and calming activities",
      "Extra self-care matters here",
    ],
  },
]

export function Wellness() {
  const { user } = useApp()

  const [phaseIndex, setPhaseIndex] = useState(0)

  const [water, setWater] = useState(0)

  const phase = CYCLE_PHASES[phaseIndex]

  return (
    <div>
      <SectionHeader
        icon={HeartHandshake}
        title="Women's Wellness & Period Support"
        subtitle="Gentle, judgment-free support for wherever you are in your cycle. Tune in and take what feels right."
      />

      {/* Phase Tracker */}

      <Card className="mb-5">
        <div className="mb-4 flex items-center gap-2">
          <Moon className="size-5 text-primary" />

          <h2 className="font-heading text-lg font-semibold">
            Period phase guide
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {CYCLE_PHASES.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setPhaseIndex(i)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",

                i === phaseIndex
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "bg-background/60 text-muted-foreground hover:bg-primary/10",
              )}
            >
              <span className="mr-1">
                {p.emoji}
              </span>

              {p.name.replace(" Phase", "")}
            </button>
          ))}
        </div>

        <div className="mt-5 rounded-3xl bg-background/60 p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg font-semibold">
              {phase.name}
            </h3>

            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {phase.range}
            </span>
          </div>

          <p className="mt-3 leading-relaxed text-foreground/80">
            {phase.description}
          </p>

          <ul className="mt-4 flex flex-col gap-2">
            {phase.support.map((s) => (
              <li
                key={s}
                className="flex items-start gap-2 text-sm"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />

                <span>{s}</span>
              </li>
            ))}
          </ul>

          {user?.cycleLength && (
            <p className="mt-4 text-xs text-muted-foreground">
              Personalized around your ~
              {user.cycleLength}-day cycle.
            </p>
          )}
        </div>
      </Card>

      {/* Hydration */}

      
      {/* Self Care */}

      <h2 className="mb-3 px-1 font-heading text-lg font-semibold">
        Self-care suggestions
      </h2>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SELF_CARE_IDEAS.map((idea: any) => (
          <Card
            key={idea.title}
            className="p-5"
          >
            <span className="text-2xl">
              {idea.emoji}
            </span>

            <h3 className="mt-2 font-heading font-semibold">
              {idea.title}
            </h3>

            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {idea.text}
            </p>
          </Card>
        ))}
      </div>

      <Disclaimer>
        This section provides general wellness support only and is not medical advice.
      </Disclaimer>
    </div>
  )
}