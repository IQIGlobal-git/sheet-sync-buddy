/**
 * SheetSync — App Constants
 */

export const APP_NAME = 'SheetSync';
export const APP_DESCRIPTION = 'Compare and sync leads from any source into your primary Google Sheet.';

/** Default match field priority */
export const DEFAULT_MATCH_FIELDS = ['email', 'phoneno'] as const;

/** Max CSV file size in bytes (10MB) */
export const MAX_CSV_SIZE = 10 * 1024 * 1024;

/** Supported CSV MIME types */
export const CSV_MIME_TYPES = [
  'text/csv',
  'application/vnd.ms-excel',
  'text/plain',
];

/** Wizard step labels */
export const WIZARD_STEPS = [
  'Primary Sheet',
  'Primary Tab',
  'Source',
  'Source Data',
  'Column Mapping',
  'Preview',
  'Destination',
  'Confirm',
] as const;
