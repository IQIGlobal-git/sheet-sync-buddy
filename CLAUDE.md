# CLAUDE.md — SheetSync

## Project Overview
SheetSync is an internal tool for comparing a source dataset against a primary Google Sheet, then adding missing leads or filling blank fields in a selected destination tab.

## Stack
- Frontend: React + Vite + TypeScript + Tailwind CSS + shadcn/ui
- Backend: Lovable Cloud (Supabase Edge Functions, Postgres, Auth)
- APIs: Google Sheets API, Google Drive API (server-side only)
- Deploy: Frontend → Vercel (via GitHub), Backend → Lovable Cloud

## Critical Rules
1. **Never overwrite non-empty target sheet values** — only fill blank fields
2. **Preserve exact target schema column order** — see `src/types/sync.ts` TARGET_SCHEMA
3. **All Google API calls happen in Edge Functions only** — never expose tokens client-side
4. **Exact matching only** — no fuzzy matching, no duplicate resolution
5. **Match priority**: Email first, then Phoneno fallback

## File Boundaries
- `src/components/ui/` — shadcn managed, do not edit
- `src/features/` — business logic hooks and engines
- `src/types/` — shared type definitions
- `src/lib/` — schema, constants, utilities
- `src/pages/` — page components
- `supabase/functions/` — Edge Functions (server-side)
- `supabase/migrations/` — DB schema changes

## Safe Edit Zones
- `src/components/` (except `ui/`)
- `src/features/`
- `src/pages/`
- `src/types/`
- `src/lib/`
- `supabase/functions/`

## Commands
- `npm run dev` — start dev server
- `npm test` — run vitest tests
- `npm run build` — production build

## Target Schema (exact order)
Date, FullName, Race, Phoneno, Email, Nationality, Location, Age, Platform Content Type, Code, CampaignName, AdSetName, AdName, FormName

## Normalization Rules
- Email: trim + lowercase
- Phoneno: trim + remove spaces, dashes, parentheses
