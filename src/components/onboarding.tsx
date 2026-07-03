import { useState } from "react"
import { useApp } from "@/context/app-context"
import { Button } from "@/components/ui/button"
import { Flower, ArrowRight, Heart } from "lucide-react"

export function Onboarding() {
  const { registerUser } = useApp()
  const [step, setStep] = useState(0)
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [cycleLength, setCycleLength] = useState("")

  const canContinue = step === 0 ? name.trim().length > 0 : true

  function next() {
    if (step < 2) {
      setStep((s) => s + 1)
    } else {
      registerUser({ name: name.trim(), age: age.trim(), cycleLength: cycleLength.trim() })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="mb-4 flex size-16 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-xl shadow-primary/30">
            <Flower className="size-8" />
          </span>
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance">
            Welcome to HerSpace
          </h1>
          <p className="mt-2 max-w-sm leading-relaxed text-muted-foreground text-pretty">
            A soft, calming corner of the internet made just for you. Let&apos;s set up your space.
          </p>
        </div>

        <div className="rounded-3xl border border-white/60 bg-card/70 p-7 shadow-[0_20px_60px_-20px_rgba(120,80,160,0.35)] backdrop-blur-xl">
          {step === 0 && (
            <div className="animate-float-up flex flex-col gap-4">
              <label className="font-heading text-lg font-medium">What should we call you?</label>
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && canContinue && next()}
                placeholder="Your name"
                className="h-12 rounded-2xl border border-border bg-background/60 px-4 text-base outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/25"
              />
            </div>
          )}

          {step === 1 && (
            <div className="animate-float-up flex flex-col gap-4">
              <label className="font-heading text-lg font-medium">How old are you?</label>
              <p className="-mt-2 text-sm text-muted-foreground">This helps us keep suggestions gentle and relevant.</p>
              <input
                autoFocus
                type="number"
                min={1}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && next()}
                placeholder="Age"
                className="h-12 rounded-2xl border border-border bg-background/60 px-4 text-base outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/25"
              />
            </div>
          )}

          {step === 2 && (
            <div className="animate-float-up flex flex-col gap-4">
              <label className="font-heading text-lg font-medium">
                Your typical cycle length?{" "}
                <span className="text-sm font-normal text-muted-foreground">(optional)</span>
              </label>
              <p className="-mt-2 text-sm text-muted-foreground">
                Used only to gently personalize wellness tips. You can skip this.
              </p>
              <div className="flex items-center gap-3">
                <input
                  autoFocus
                  type="number"
                  min={20}
                  max={40}
                  value={cycleLength}
                  onChange={(e) => setCycleLength(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && next()}
                  placeholder="28"
                  className="h-12 w-28 rounded-2xl border border-border bg-background/60 px-4 text-base outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/25"
                />
                <span className="text-muted-foreground">days</span>
              </div>
            </div>
          )}

          <Button onClick={next} disabled={!canContinue} size="lg" className="mt-6 w-full">
            {step < 2 ? "Continue" : "Enter my space"}
            <ArrowRight className="size-4" />
          </Button>

          <div className="mt-5 flex items-center justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === step ? "w-6 bg-primary" : "w-1.5 bg-primary/25"
                }`}
              />
            ))}
          </div>
        </div>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
          <Heart className="size-3.5 text-accent-foreground" />
          Your information stays private on your device.
        </p>
      </div>
    </div>
  )
}
