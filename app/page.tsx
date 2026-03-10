import Link from "next/link"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Orb } from "@/components/ui/orb"

export default function Page() {
  return (
    <div className="min-h-svh bg-gradient-animated overflow-hidden">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6">
        <div className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
          Interview Coach
        </div>
        <ThemeToggle />
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6 pb-20 pt-12 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            AI interview coach, powered by live voice.
          </h1>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
            Practice realistic interviews with an ElevenLabs agent that listens,
            responds, and helps you sharpen your answers.
          </p>
        </div>

        <div className="mx-auto flex h-64 w-64 items-center justify-center rounded-full border border-border/60 bg-background/70 shadow-[0_25px_70px_-45px_rgba(15,23,42,0.5)]">
          <Orb className="h-52 w-52" agentState="thinking" />
        </div>

        <Button asChild size="lg" className="px-8 hover-scale">
          <Link href="/interview">Start interview</Link>
        </Button>
      </main>
    </div>
  )
}
