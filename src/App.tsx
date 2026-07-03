import { useState } from "react"
import { AppProvider, useApp } from "@/context/app-context"
import { Onboarding } from "@/components/onboarding"
import { Navbar, type ViewId } from "@/components/navbar"
import { Dashboard } from "@/components/dashboard"
import { Wellness } from "@/components/wellness"
import { RecipeGenerator } from "@/components/recipe-generator"
import { WellnessZone } from "@/components/wellness-zone"
import { ChatCompanion } from "@/components/chat-companion"
import { FoodScanner } from "@/components/food-scanner"
import { Games } from "@/components/games"
import { Motivation } from "@/components/motivation"
import { Loader2 } from "lucide-react"

function Shell() {
  const { user, loading } = useApp()
  const [view, setView] = useState<ViewId>("home")

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Loader2 className="size-7 animate-spin" />
        </div>
        <p className="font-heading text-lg text-muted-foreground">Preparing your space…</p>
      </div>
    )
  }

  if (!user) {
    return <Onboarding />
  }

  return (
    <div className="min-h-screen pb-28 md:pb-12">
      <Navbar view={view} onChange={setView} />
      <main className="mx-auto w-full max-w-5xl px-4 pt-6 md:px-6 md:pt-10">
        <div key={view} className="animate-float-up">
          {view === "home" && <Dashboard onNavigate={setView} />}
          {view === "wellness" && <Wellness />}
          {view === "recipes" && <RecipeGenerator />}
          {view === "zone" && <WellnessZone />}
          {view === "chat" && <ChatCompanion />}
          {view === "scanner" && <FoodScanner />}
          {view === "games" && <Games />}
          {view === "motivation" && <Motivation />}
        </div>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  )
}
