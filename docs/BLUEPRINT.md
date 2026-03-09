# SheetSync — Blueprint

## Purpose
Internal tool to compare source datasets against a primary Google Sheet and sync missing leads / blank fields.

## Architecture
- SPA frontend (React/Vite) communicates with Supabase Edge Functions
- Edge Functions handle Google Sheets/Drive API calls securely
- Postgres stores user connections, sync jobs, run logs
- Google OAuth for authentication and API access

## User Flow
1. Sign in with Google
2. Select primary Google Sheet → Select tab
3. Choose source: CSV upload or another Google Sheet
4. Map source columns to target schema
5. Run comparison → Preview changes
6. Select destination tab
7. Confirm and execute sync
8. View summary and run log

## Database Tables
- `google_connections` — OAuth tokens per user
- `sync_jobs` — saved sync configurations
- `sync_runs` — execution logs with counts
- `column_mappings` — per-job column mappings

## Edge Functions
- `google-sheets` — all Google Sheets/Drive API interactions
- `parse-csv` — parse uploaded CSV files
- `run-comparison` — server-side comparison engine
- `execute-sync` — write changes to Google Sheets

## Key Business Rules
- Email is primary match key, Phoneno is fallback
- Never overwrite non-empty values
- Skip rows with no usable Email or Phoneno
- User must preview before write-back
