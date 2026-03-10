"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useConversation } from "@elevenlabs/react"

import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Orb, type AgentState } from "@/components/ui/orb"
import { cn } from "@/lib/utils"

const statusLabels: Record<string, string> = {
  disconnected: "Ready",
  connecting: "Connecting",
  connected: "Live",
}

export default function InterviewPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [hasStarted, setHasStarted] = useState(false)
  const [agentState, setAgentState] = useState<AgentState>(null)

  const conversation = useConversation({
    onModeChange: ({ mode }) => {
      setAgentState(mode === "speaking" ? "talking" : "listening")
    },
    onDisconnect: () => {
      if (hasStarted) {
        router.push("/interview/complete")
      }
    },
    onError: (err) => {
      if (err && typeof err === "object" && "message" in err) {
        setError(String((err as { message?: unknown }).message))
      } else {
        setError("Something went wrong with the connection.")
      }
    },
  })

  const statusLabel = statusLabels[conversation.status] ?? "Ready"
  const canStart = conversation.status === "disconnected"
  const canEnd = conversation.status !== "disconnected"

  const orbState = useMemo<AgentState>(() => {
    if (conversation.status !== "connected") {
      return null
    }
    return conversation.isSpeaking ? "talking" : agentState ?? "listening"
  }, [conversation.status, conversation.isSpeaking, agentState])

  const startInterview = async () => {
    setError(null)
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch {
      setError("Microphone access is required to start the interview.")
      return
    }

    try {
      const response = await fetch("/api/elevenlabs/signed-url")
      if (!response.ok) {
        throw new Error("Failed to fetch a signed URL.")
      }
      const data = (await response.json()) as { signedUrl?: string }
      if (!data.signedUrl) {
        throw new Error("Signed URL missing from server response.")
      }

      await conversation.startSession({
        signedUrl: data.signedUrl,
        connectionType: "websocket",
      })
      setHasStarted(true)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Unable to start the interview.")
      }
    }
  }

  const endInterview = async () => {
    await conversation.endSession()
  }

  return (
    <div className="min-h-svh bg-gradient-animated overflow-hidden">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild className="hover-scale">
            <Link href="/">Back to landing</Link>
          </Button>
          <Badge variant={conversation.status === "connected" ? "default" : "secondary"}>
            {statusLabel}
          </Badge>
        </div>
        <ThemeToggle />
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6 pb-20 pt-8 text-center">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
            Live interview session
          </p>
          <h1 className="text-2xl font-semibold sm:text-3xl">
            Speak naturally. The agent will ask questions and listen for your
            answers.
          </h1>
        </div>

        <div
          className={cn(
            "flex h-80 w-80 items-center justify-center rounded-full border border-border/60 bg-background/70 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.55)]",
            conversation.status === "connected" ? "opacity-100" : "opacity-80"
          )}
        >
          <Orb
            className="h-72 w-72"
            agentState={orbState}
            volumeMode="manual"
            getInputVolume={conversation.getInputVolume}
            getOutputVolume={conversation.getOutputVolume}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg" onClick={startInterview} disabled={!canStart}>
            Start interview
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={endInterview}
            disabled={!canEnd}
          >
            End interview
          </Button>
        </div>

        {error ? (
          <div className="rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        ) : null}
      </main>
    </div>
  )
}
