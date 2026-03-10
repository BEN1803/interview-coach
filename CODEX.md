# CODEX

Project: Interview Coach

## Overview
This is a Next.js (App Router) project bootstrapped with shadcn/ui and Tailwind CSS.
The default UI lives in `app/page.tsx` and imports shadcn components from
`components/ui`.

## Requirements
- Node.js 20+ recommended
- npm (uses `package-lock.json`)

## Setup
```bash
npm install
```

## Common Commands
```bash
npm run dev        # start dev server (Turbopack)
npm run build      # production build
npm run start      # start production server
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run format     # prettier (ts/tsx)
```

## Project Structure (High Level)
- `app/` Next.js App Router pages and layouts
- `components/` shared UI components (shadcn/ui)
- `hooks/` reusable React hooks
- `lib/` utilities and shared helpers
- `public/` static assets

## UI Components (shadcn/ui)
Add a component:
```bash
npx shadcn@latest add button
```
Import example:
```tsx
import { Button } from "@/components/ui/button"
```

## Notes
- Styling is Tailwind CSS (v4) with `tailwind-merge` and `clsx`.
- Theme toggling uses `next-themes` when wired up in the UI.
- No tests are configured yet.
