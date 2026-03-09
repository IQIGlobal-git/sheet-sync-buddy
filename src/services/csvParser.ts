/**
 * CSV parsing service using PapaParse
 */
import Papa from 'papaparse';
import type { SheetRow } from '@/types/sync';

export interface ParsedCSV {
  headers: string[];
  rows: SheetRow[];
  errors: string[];
}

export function parseCSVFile(file: File): Promise<ParsedCSV> {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
      complete: (result) => {
        const headers = result.meta.fields || [];
        const rows = (result.data as SheetRow[]).map((row) => {
          const cleaned: SheetRow = {};
          for (const key of Object.keys(row)) {
            cleaned[key.trim()] = (row[key] || '').toString();
          }
          return cleaned;
        });
        const errors = result.errors.map(
          (e) => `Row ${e.row}: ${e.message}`
        );
        resolve({ headers, rows, errors });
      },
      error: (err) => {
        resolve({ headers: [], rows: [], errors: [err.message] });
      },
    });
  });
}
