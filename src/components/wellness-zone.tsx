import { useEffect, useMemo, useRef, useState } from "react"
import { WELLNESS_ACTIVITIES } from "@/lib/data"
import {
  SectionHeader,
  Disclaimer,
} from "@/components/section-header"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

import lottie from "lottie-web"

import yogaAnimation from "@/assets/lottie/yoga-black.json"

import {
  Flower2,
  Clock3,
  Play,
  Pause,
  Sparkles,
  Heart,
} from "lucide-react"

const PROBLEMS = [
  "Headache",
  "Eye Strain",
  "Neck Pain",
  "Shoulder Pain",
  "Back Pain",
  "Waist Pain",
  "Body Pain",
  "Leg Pain",
  "Hand Pain",
  "Wrist Pain",
  "Stomach Pain",
  "Period Pain",
  "Stress",
  "Anxiety",
  "Overthinking",
  "Not Feeling Calm",
  "Tiredness",
  "Posture Issues",
]

export function WellnessZone() {
  const animationRefs = useRef<
    (HTMLDivElement | null)[]
  >([])

  const audioRef =
    useRef<HTMLAudioElement | null>(null)

  const [selectedProblems, setSelectedProblems] =
    useState<string[]>([])

  const [activeTimer, setActiveTimer] =
    useState<string | null>(null)

  const [secondsLeft, setSecondsLeft] =
    useState<number>(0)

  useEffect(() => {
    if (!activeTimer || secondsLeft <= 0)
      return

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [activeTimer, secondsLeft])

  useEffect(() => {
    if (secondsLeft === 0 && activeTimer) {
      audioRef.current?.play()
      setActiveTimer(null)
    }
  }, [secondsLeft, activeTimer])

  useEffect(() => {
    animationRefs.current.forEach((container) => {
      if (!container) return

      lottie.loadAnimation({
        container,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: yogaAnimation,
      })
    })
  }, [])

  const filteredActivities = useMemo(() => {
    if (selectedProblems.length === 0) {
      return WELLNESS_ACTIVITIES
    }

    return WELLNESS_ACTIVITIES.filter(
      (activity) =>
        activity.problems.some((p) =>
          selectedProblems.includes(p),
        ),
    )
  }, [selectedProblems])

  function toggleProblem(problem: string) {
    setSelectedProblems((prev) =>
      prev.includes(problem)
        ? prev.filter((p) => p !== problem)
        : [...prev, problem],
    )
  }

  function startTimer(
    name: string,
    duration: number,
  ) {
    setActiveTimer(name)
    setSecondsLeft(duration)
  }

  function stopTimer() {
    setActiveTimer(null)
    setSecondsLeft(0)

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  function formatTime(sec: number) {
    const minutes = Math.floor(sec / 60)
    const seconds = sec % 60

    return `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`
  }

  return (
    <div>
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/active_storage/sfx/2218/2218-preview.mp3"
      />

      <SectionHeader
        icon={Flower2}
        title="Wellness Zone"
        subtitle="Gentle temporary relief for stress, posture, headaches, body pain, period discomfort, tiredness, and emotional overwhelm."
      />

      <Card className="mb-6 border-primary/10 bg-gradient-to-br from-pink-50/70 via-background to-violet-50/70">
        <div className="flex items-start gap-3">
          <span className="mt-1 rounded-2xl bg-primary/10 p-2 text-primary">
            <Heart className="size-5" />
          </span>

          <div>
            <h3 className="font-heading text-lg font-semibold">
              What are you feeling right now?
            </h3>

            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Choose one or more discomforts
              you're currently experiencing.
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {PROBLEMS.map((problem) => {
            const active =
              selectedProblems.includes(problem)

            return (
              <button
                key={problem}
                onClick={() =>
                  toggleProblem(problem)
                }
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",

                  active
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-background/70 text-muted-foreground hover:bg-primary/10",
                )}
              >
                {problem}
              </button>
            )
          })}
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredActivities.map(
          (activity, index) => {
            const isRunning =
              activeTimer === activity.name

            return (
              <Card
                key={activity.name}
                className="overflow-hidden border-primary/10 p-0"
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-pink-100/40 via-violet-100/20 to-purple-100/40">
                  <div
                    ref={(el) => {
                      animationRefs.current[
                        index
                      ] = el
                    }}
                    className="h-72 w-full"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                        {activity.type}
                      </span>

                      {activity.duration && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                          <Clock3 className="size-3" />
                          {Math.floor(
                            activity.duration / 60,
                          )}{" "}
                          min
                        </span>
                      )}

                      {activity.sets && (
                        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                          {activity.sets}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-3 font-heading text-2xl font-semibold text-white">
                      {activity.emoji}{" "}
                      {activity.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Helps with
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {activity.problems.map(
                        (problem) => (
                          <span
                            key={problem}
                            className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
                          >
                            {problem}
                          </span>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Benefits
                    </p>

                    <ul className="mt-2 flex flex-col gap-2 text-sm">
                      {activity.benefits.map(
                        (benefit, i) => (
                          <li
                            key={i}
                            className="flex gap-2"
                          >
                            <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />

                            <span className="text-foreground/85">
                              {benefit}
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>

                  <div className="mt-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Steps
                    </p>

                    <ol className="mt-2 flex flex-col gap-3">
                      {activity.steps.map(
                        (step, i) => (
                          <li
                            key={i}
                            className="flex gap-3 text-sm"
                          >
                            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/12 text-xs font-semibold text-primary">
                              {i + 1}
                            </span>

                            <span className="pt-0.5 text-foreground/85">
                              {step}
                            </span>
                          </li>
                        ),
                      )}
                    </ol>
                  </div>

                  {activity.duration && (
                    <div className="mt-6 rounded-3xl bg-primary/5 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium">
                            Hold Timer
                          </p>

                          <p className="mt-1 text-2xl font-bold text-primary">
                            {isRunning
                              ? formatTime(
                                  secondsLeft,
                                )
                              : formatTime(
                                  activity.duration,
                                )}
                          </p>
                        </div>

                        {!isRunning ? (
                          <button
                            onClick={() =>
                              startTimer(
                                activity.name,
                                activity.duration!,
                              )
                            }
                            className="flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
                          >
                            <Play className="size-4" />
                            Start
                          </button>
                        ) : (
                          <button
                            onClick={stopTimer}
                            className="flex items-center gap-2 rounded-2xl bg-rose-500 px-5 py-3 text-sm font-medium text-white"
                          >
                            <Pause className="size-4" />
                            Stop
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )
          },
        )}
      </div>

      <Disclaimer>
        These suggestions are for temporary
        comfort and relaxation only.
      </Disclaimer>
    </div>
  )
}