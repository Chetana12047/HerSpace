import type { LucideIcon } from "lucide-react"

export function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: LucideIcon
  title: string
  subtitle: string
}) {
  return (
    <div className="mb-6 flex items-start gap-3">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
        <Icon className="size-6" />
      </span>
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-balance md:text-3xl">{title}</h1>
        <p className="mt-1 max-w-xl leading-relaxed text-muted-foreground text-pretty">{subtitle}</p>
      </div>
    </div>
  )
}

export function Disclaimer({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 rounded-2xl border border-accent/40 bg-accent/15 px-4 py-3 text-center text-xs leading-relaxed text-accent-foreground">
      {children}
    </p>
  )
}
