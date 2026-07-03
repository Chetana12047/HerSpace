import { useEffect, useRef, useState } from "react"
import { generateChatReply, improveSpeechText } from "@/lib/gemini"
import { SectionHeader, Disclaimer } from "@/components/section-header"
import { Button } from "@/components/ui/button"
import {
  MessageCircleHeart,
  Send,
  Flower,
  Mic,
} from "lucide-react"
import { cn } from "@/lib/utils"


interface Message {
  id: number
  role: "user" | "bot"
  text: string
}

const PROMPTS = [
  "I'm feeling a little anxious today",
  "I'm so tired lately",
  "Help me feel calmer",
  "I'm stressed about work",
]

const WELCOME: Message = {
  id: 0,
  role: "bot",
  text: "Hi, I'm luna. This is a calm, judgment-free space. Whatever you'd like to share, I'm listening 🌸",
}

export function ChatCompanion() {
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const [listening, setListening] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [messages, typing])

function toggleSpeechRecognition() {
  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition

  if (!SpeechRecognition) {
    alert("Speech recognition is not supported in this browser")
    return
  }

  // STOP LISTENING
  if (listening && recognitionRef.current) {
    recognitionRef.current.stop()
    setListening(false)
    return
  }

  const recognition = new SpeechRecognition()

  recognition.lang = "en-US"

  // IMPORTANT
  recognition.continuous = true
  recognition.interimResults = true

  let finalTranscript = ""

  recognition.onstart = () => {
    setListening(true)
  }

  recognition.onend = () => {
    setListening(false)
  }

  recognition.onerror = (event: any) => {
    console.error("Speech recognition error:", event)
    setListening(false)
  }

  recognition.onresult = (event: any) => {
    let interimTranscript = ""

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript

      if (event.results[i].isFinal) {
        finalTranscript += transcript + " "
      } else {
        interimTranscript += transcript
      }
    }

    const combined =
  finalTranscript + interimTranscript

setInput(combined)

clearTimeout((window as any).speechTimeout)

;(window as any).speechTimeout = setTimeout(
  async () => {
    const improved =
      await improveSpeechText(combined)

    setInput(improved)
  },
  1200,
)
  }

  recognitionRef.current = recognition
  recognition.start()
}

  async function send(text: string) {
    const trimmed = text.trim()

    if (!trimmed || typing) return

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      text: trimmed,
    }

    setMessages((m) => [...m, userMsg])

    setInput("")
    setTyping(true)

    const reply = await generateChatReply(trimmed)

    setTyping(false)

    setMessages((m) => [
      ...m,
      {
        id: Date.now() + 1,
        role: "bot",
        text: reply,
      },
    ])
  }

  return (
    <div>
      <SectionHeader
        icon={MessageCircleHeart}
        title="Supportive Chat Companion"
        subtitle="A warm, calming space to talk things through. I'm here to listen and gently encourage you."
      />

      <div className="flex h-[60vh] min-h-100 flex-col overflow-hidden rounded-3xl border border-white/60 bg-card/70 shadow-[0_8px_30px_-12px_rgba(120,80,160,0.25)] backdrop-blur-md">
        <div
          ref={scrollRef}
          className="flex-1 space-y-3 overflow-y-auto p-5"
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "flex items-end gap-2",
                m.role === "user"
                  ? "justify-end"
                  : "justify-start",
              )}
            >
              {m.role === "bot" && (
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Flower className="size-4" />
                </span>
              )}

              <div
                className={cn(
                  "max-w-[78%] rounded-3xl px-4 py-2.5 text-sm leading-relaxed",
                  m.role === "user"
                    ? "rounded-br-md bg-primary text-primary-foreground"
                    : "rounded-bl-md bg-background/80 text-foreground",
                )}
              >
                {m.text}
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex items-end gap-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Flower className="size-4" />
              </span>

              <div className="flex gap-1 rounded-3xl rounded-bl-md bg-background/80 px-4 py-3.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="size-2 rounded-full bg-primary/60"
                    style={{
                      animation:
                        "soft-pulse 1s ease-in-out infinite",
                      animationDelay: `${i * 0.18}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 px-5 pb-3">
            {PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => send(p)}
                className="rounded-full bg-secondary/30 px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/50"
              >
                {p}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault()
            send(input)
          }}
          className="flex items-center gap-2 border-t border-border/60 p-3"
        >
          <div className="relative flex-1">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
              listening
                ? "Listening..."
                : "Share what's on your mind…"
            }
              className="h-12 w-full rounded-full border border-border bg-background/60 pl-4 pr-12 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/25"
            />

            <button
              type="button"
              onClick={toggleSpeechRecognition}
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 transition-colors",
                listening
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
              )}
              aria-label="Voice input"
            >
              <Mic
                className={cn(
                  "size-5 transition-all",
                  listening && "animate-pulse scale-110"
                )}
              />
            </button>
          </div>

          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || typing}
            aria-label="Send message"
            className="size-12 rounded-full"
          >
            <Send className="size-4" />
          </Button>
        </form>
      </div>

      <Disclaimer>
        Your companion offers gentle emotional support and is not a therapist
        or medical professional. If you&apos;re in crisis, please reach out
        to a trusted person or local support service.
      </Disclaimer>
    </div>
  )
}