/**
 * Sync history — persisted in localStorage
 */
import type { SyncRunStatus } from '@/types/sync';

export interface SyncHistoryEntry {
  id: string;
  primarySheetName: string;
  primaryTabName: string;
  sourceType: string;
  sourceLabel: string;
  destinationTabName: string;
  newLeadsAdded: number;
  rowsUpdated: number;
  rowsSkipped: number;
  status: SyncRunStatus;
  completedAt: string;
}

const STORAGE_KEY = 'sheetsync_history';

export function getSyncHistory(): SyncHistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addSyncHistoryEntry(entry: SyncHistoryEntry) {
  const history = getSyncHistory();
  history.unshift(entry);
  // Keep last 50
  if (history.length > 50) history.length = 50;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function getSyncHistoryEntry(id: string): SyncHistoryEntry | null {
  return getSyncHistory().find((e) => e.id === id) || null;
}
