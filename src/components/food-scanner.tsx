import { useRef, useState } from "react"
import { analyzeFoodImage, type NutritionEstimate } from "@/lib/gemini"
import { SectionHeader, Disclaimer } from "@/components/section-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScanLine, Upload, Loader2, RotateCcw, Flame, Beef, Wheat, Leaf,  Camera, X, } from "lucide-react"

export function FoodScanner() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<NutritionEstimate | null>(null)
  const [cameraOpen, setCameraOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  async function handleFile(file: File) {
    setResult(null)
    const url = URL.createObjectURL(file)
    setPreview(url)
    setLoading(true)
    const estimate = await analyzeFoodImage(file)
    setResult(estimate)
    setLoading(false)
  }
  async function openCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "environment",
      },
    })

    streamRef.current = stream

    setCameraOpen(true)

    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    }, 100)

  } catch (error) {
    alert("Camera access denied or unavailable")
  }
}
async function capturePhoto() {
  if (!videoRef.current || !canvasRef.current) return

  const video = videoRef.current
  const canvas = canvasRef.current

  canvas.width = video.videoWidth
  canvas.height = video.videoHeight

  const ctx = canvas.getContext("2d")

  if (!ctx) return

  ctx.drawImage(video, 0, 0)

  canvas.toBlob(async (blob) => {
    if (!blob) return

    const file = new File(
      [blob],
      "camera-food.jpg",
      {
        type: "image/jpeg",
      },
    )

    closeCamera()

    await handleFile(file)

  }, "image/jpeg")
}function closeCamera() {
  streamRef.current?.getTracks().forEach((track) => {
    track.stop()
  })

  setCameraOpen(false)
}

  function reset() {
    setPreview(null)
    setResult(null)
    setLoading(false)
    if (inputRef.current) inputRef.current.value = ""
  }

  const stats = result
    ? [
        { label: "Calories", value: `${result.calories}`, unit: "kcal", icon: Flame, color: "text-accent-foreground bg-accent/30" },
        { label: "Protein", value: `${result.protein}`, unit: "g", icon: Beef, color: "text-rose-700 bg-rose-100" },
        { label: "Carbs", value: `${result.carbs}`, unit: "g", icon: Wheat, color: "text-amber-700 bg-amber-100" },
        { label: "Fiber", value: `${result.fiber}`, unit: "g", icon: Leaf, color: "text-emerald-700 bg-emerald-100" },
        { label: "Fats", value: `${result.fats}`, unit: "g", icon: Flame, color: "text-pink-700 bg-pink-100" },
      ]
    : []
    

  return (
    <div>
      <SectionHeader
        icon={ScanLine}
        title="Food Scanner"
        subtitle="Upload a photo of your meal for an approximate nutrition snapshot. A gentle guide, never a strict rulebook."
      />

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
        }}
      />

      {!preview && (
        <div className="grid gap-4 sm:grid-cols-2">

  <button
    onClick={() => inputRef.current?.click()}
    className="flex flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-primary/30 bg-card/50 px-6 py-12 text-center transition-all hover:border-primary/60 hover:bg-card/70"
  >
    <span className="flex size-16 items-center justify-center rounded-3xl bg-primary/12 text-primary">
      <Upload className="size-7" />
    </span>

    <span className="font-heading text-lg font-semibold">
      Upload Photo
    </span>

    <span className="max-w-xs text-sm text-muted-foreground">
      Choose a meal image from your gallery
    </span>
  </button>

  <button
    onClick={openCamera}
    className="flex flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-primary/30 bg-card/50 px-6 py-12 text-center transition-all hover:border-primary/60 hover:bg-card/70"
  >
    <span className="flex size-16 items-center justify-center rounded-3xl bg-primary/12 text-primary">
      <ScanLine className="size-7" />
    </span>

    <span className="font-heading text-lg font-semibold">
      Use Camera
    </span>

    <span className="max-w-xs text-sm text-muted-foreground">
      Capture your food instantly
    </span>
  </button>

</div>
      )}
      {cameraOpen && (
  <Card className="mb-4 overflow-hidden p-4">
    <div className="relative">

      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="aspect-video w-full rounded-2xl object-cover"
      />

      <canvas
        ref={canvasRef}
        className="hidden"
      />

      <button
        onClick={closeCamera}
        className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-white"
      >
        <X className="size-4" />
      </button>
    </div>

    <Button
      onClick={capturePhoto}
      className="mt-4 w-full"
    >
      <Camera className="size-4" />
      Capture Food
    </Button>
  </Card>
)}

      {preview && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-0 overflow-hidden">
            <img src={preview} alt="Your uploaded meal" className="aspect-square w-full object-cover" />
          </Card>

          <div className="flex flex-col gap-4">
            {loading && (
              <Card className="flex flex-1 flex-col items-center justify-center gap-3 py-10 text-center">
                <Loader2 className="size-8 animate-spin text-primary" />
                <p className="font-heading font-medium">Analyzing your meal…</p>
                <p className="text-sm text-muted-foreground">Estimating an approximate breakdown.</p>
              </Card>
            )}

            {result && (
              <>
                <Card className="animate-float-up">
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Detected
                  </p>
                  <h3 className="font-heading text-lg font-semibold">{result.label}</h3>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {stats.map((s) => {
                      const Icon = s.icon
                      return (
                        <div key={s.label} className="rounded-2xl bg-background/60 p-3">
                          <span className={`flex size-8 items-center justify-center rounded-xl ${s.color}`}>
                            <Icon className="size-4" />
                          </span>
                          <p className="mt-2 font-heading text-xl font-semibold">
                            {s.value}
                            <span className="ml-0.5 text-sm font-normal text-muted-foreground">{s.unit}</span>
                          </p>
                          <p className="text-xs text-muted-foreground">{s.label}</p>
                        </div>
                      )
                    })}
                    
                  </div>
                  <Card className="mt-4 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Wellness Insight
                    </p>
                  
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {result.wellness}
                    </p>
                  
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(result.vitamins || []).map((v: string) => (
                        <span
                          key={v}
                          className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </Card>
                </Card>
                <Button variant="outline" onClick={reset}>
                  <RotateCcw className="size-4" /> Scan another
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      <Disclaimer>
        Approximate nutritional analysis only. These estimates are not exact and should not be used
        for medical or clinical purposes.
      </Disclaimer>
    </div>
  )
}
