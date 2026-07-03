import { useApp } from "@/context/app-context"
import { cn } from "@/lib/utils"
import {
  Home,
  HeartHandshake,
  Apple,
  ChefHat,
  Flower2,
  MessageCircleHeart,
  ScanLine,
  Gamepad2,
  Sparkles,
  Flower,
} from "lucide-react"

export type ViewId =
  | "home"
  | "wellness"
  | "food"
  | "recipes"
  | "zone"
  | "chat"
  | "scanner"
  | "games"
  | "motivation"

const NAV: { id: ViewId; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "wellness", label: "Wellness", icon: HeartHandshake },
  { id: "recipes", label: "Recipes", icon: ChefHat },
  { id: "zone", label: "Zone", icon: Flower2 },
  { id: "chat", label: "Companion", icon: MessageCircleHeart },
  { id: "scanner", label: "Scanner", icon: ScanLine },
  { id: "games", label: "Games", icon: Gamepad2 },
  { id: "motivation", label: "Motivation", icon: Sparkles },
]

export function Navbar({ view, onChange }: { view: ViewId; onChange: (v: ViewId) => void }) {
  const { user } = useApp()

  return (
    <>
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-white/40 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <button
            onClick={() => onChange("home")}
            className="flex items-center gap-2"
            aria-label="HerSpace home"
          >
            <span className="flex size-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md shadow-primary/30">
              <Flower className="size-5" />
            </span>
            <span className="font-heading text-xl font-semibold tracking-tight">HerSpace</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => {
              const Icon = item.icon
              const active = view === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => onChange(item.id)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-all",
                    active
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                      : "text-muted-foreground hover:bg-primary/10 hover:text-foreground",
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </button>
              )
            })}
          </nav>

          {user && (
            <span className="hidden size-9 shrink-0 items-center justify-center rounded-full bg-accent/40 font-heading text-sm font-semibold text-accent-foreground md:flex">
              {user.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/40 bg-background/85 backdrop-blur-xl md:hidden">
        <div className="flex items-center gap-1 overflow-x-auto px-2 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {NAV.map((item) => {
            const Icon = item.icon
            const active = view === item.id
            return (
              <button
                key={item.id}
                onClick={() => onChange(item.id)}
                className={cn(
                  "flex min-w-16 shrink-0 flex-col items-center gap-1 rounded-2xl px-2 py-1.5 text-[0.65rem] font-medium transition-all",
                  active ? "bg-primary/15 text-primary" : "text-muted-foreground",
                )}
              >
                <Icon className={cn("size-5 transition-transform", active && "scale-110")} />
                {item.label}
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}
