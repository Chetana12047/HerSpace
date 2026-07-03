import { useState } from "react"
import {
  generateRecipes,
  type GeneratedRecipe,
} from "@/lib/gemini"

import {
  SectionHeader,
  Disclaimer,
} from "@/components/section-header"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import {
  ChefHat,
  Loader2,
  Clock,
  Sparkles,
  Soup,
} from "lucide-react"

const EXAMPLES = [
  "carrots, bread, eggs, cheese",
  "rice, onion, egg",
  "potatoes, carrots, onion",
]

export function RecipeGenerator() {

  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const [recipes, setRecipes] =
    useState<GeneratedRecipe[] | null>(null)

  async function handleGenerate(value?: string) {

    const text = value ?? input

    if (value) setInput(value)

    setLoading(true)
    setRecipes(null)

    const result = await generateRecipes(text)

    setRecipes(result)
    setLoading(false)
  }

  return (
    <div>

      <SectionHeader
        icon={ChefHat}
        title="Recipe Generator"
        subtitle="Tell me what's in your kitchen and I'll suggest simple, beginner-friendly recipes you can actually make."
      />

      <Card className="mb-5">

        <label className="font-heading font-semibold">
          What ingredients do you have?
        </label>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          placeholder="e.g. I have carrots, bread, eggs, cheese"
          className="mt-3 w-full resize-none rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/25"
        />

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">
            Try:
          </span>

          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => handleGenerate(ex)}
              className="rounded-full bg-secondary/30 px-3 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/50"
            >
              {ex}
            </button>
          ))}
        </div>

        <Button
          onClick={() => handleGenerate()}
          disabled={loading}
          className="mt-4"
        >
          {loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Sparkles className="size-4" />
          )}

          {loading
            ? "Cooking up ideas…"
            : "Generate recipes"}
        </Button>

      </Card>

      {loading && (
        <div className="grid gap-3 md:grid-cols-2">

          {[0, 1].map((i) => (
            <Card
              key={i}
              className="animate-pulse"
            >
              <div className="h-5 w-2/3 rounded-full bg-muted" />
              <div className="mt-4 h-3 w-full rounded-full bg-muted" />
              <div className="mt-2 h-3 w-5/6 rounded-full bg-muted" />
              <div className="mt-2 h-3 w-4/6 rounded-full bg-muted" />
            </Card>
          ))}

        </div>
      )}

      {!loading && !recipes && (
        <Card className="flex flex-col items-center gap-2 py-12 text-center">

          <span className="flex size-14 items-center justify-center rounded-3xl bg-primary/10 text-primary">
            <Soup className="size-7" />
          </span>

          <h3 className="font-heading text-lg font-semibold">
            Your recipes will appear here
          </h3>

          <p className="max-w-xs text-sm text-muted-foreground">
            List a few ingredients above and I&apos;ll keep things simple and realistic.
          </p>

        </Card>
      )}

      {recipes && recipes.length > 0 && (
        <div className="grid gap-3 md:grid-cols-2">

          {recipes.map((r) => (
            <Card
              key={r.title}
              className="animate-float-up"
            >

              <div className="flex items-start justify-between gap-2">

                <h3 className="font-heading text-lg font-semibold text-balance">
                  {r.title}
                </h3>

              </div>

              <div className="mt-2 flex flex-wrap gap-2 text-xs">

                <span className="inline-flex items-center gap-1 rounded-full bg-primary/12 px-2.5 py-1 font-medium text-primary">
                  <Clock className="size-3" />
                  {r.time}
                </span>

                <span className="rounded-full bg-secondary/30 px-2.5 py-1 font-medium text-secondary-foreground">
                  {r.difficulty}
                </span>

              </div>

              <p className="mt-4 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Ingredients
              </p>

              <ul className="mt-1.5 flex flex-col gap-1 text-sm">

                {r.ingredients.map((ing, i) => (
                  <li
                    key={i}
                    className="text-foreground/85"
                  >
                    • {ing}
                  </li>
                ))}

              </ul>

              {r.optionalIngredients?.length > 0 && (
                <>

                  <p className="mt-4 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Optional
                  </p>

                  <ul className="mt-1.5 flex flex-col gap-1 text-sm">

                    {r.optionalIngredients.map((ing, i) => (
                      <li
                        key={i}
                        className="text-foreground/70"
                      >
                        • {ing}
                      </li>
                    ))}

                  </ul>

                </>
              )}

              <p className="mt-4 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Steps
              </p>

              <ol className="mt-1.5 flex flex-col gap-2 text-sm">

                {r.steps.map((step, i) => (
                  <li
                    key={i}
                    className="flex gap-2"
                  >

                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/40 text-xs font-semibold text-accent-foreground">
                      {i + 1}
                    </span>

                    <span className="text-foreground/85">
                      {step}
                    </span>

                  </li>
                ))}

              </ol>

              <div className="mt-5 grid grid-cols-2 gap-2 text-sm">

                <div className="rounded-xl bg-background/60 p-2">
                  Calories: {r.calories} kcal
                </div>

                <div className="rounded-xl bg-background/60 p-2">
                  Protein: {r.protein}g
                </div>

                <div className="rounded-xl bg-background/60 p-2">
                  Carbs: {r.carbs}g
                </div>

                <div className="rounded-xl bg-background/60 p-2">
                  Fats: {r.fats}g
                </div>

                <div className="rounded-xl bg-background/60 p-2 col-span-2">
                  Fiber: {r.fiber}g
                </div>

              </div>

              <Card className="mt-4 p-4">

                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Wellness Insight
                </p>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {r.wellness}
                </p>

              </Card>

            </Card>
          ))}

        </div>
      )}

      {recipes && recipes.length === 0 && (
        <Card className="py-10 text-center">
          <h3 className="font-heading text-lg font-semibold">
            Couldn't create a realistic recipe
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Try adding a few more ingredients or simplifying the request.
          </p>
        </Card>
      )}

      <Disclaimer>
        Recipes are simple suggestions generated for inspiration.
        Always use your judgment for freshness,
        allergies, and dietary needs.
      </Disclaimer>

    </div>
  )
}