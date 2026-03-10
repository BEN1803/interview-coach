import Link from "next/link"

import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function InterviewCompletePage() {
  return (
    <div className="min-h-svh bg-gradient-animated overflow-hidden">
      <header className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <Badge variant="secondary">Session complete</Badge>
        </div>
        <ThemeToggle />
      </header>

      <main className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-6 pb-16 pt-8 text-center motion-safe:animate__animated motion-safe:animate__fadeInUp">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
            Interview wrapped
          </p>
          <h1 className="text-3xl font-semibold">Nice work.</h1>
          <p className="text-base text-muted-foreground">
            Take a breath, then decide your next move.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg" asChild>
            <Link href="/interview">Start another interview</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/">Back to landing</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
