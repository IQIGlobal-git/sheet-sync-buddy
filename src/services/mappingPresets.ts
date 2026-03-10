/**
 * Mapping presets — persisted in localStorage
 */
import type { ColumnMapping, MappingPreset } from '@/types/sync';

const STORAGE_KEY = 'sheetsync_mapping_presets';

export function getMappingPresets(): MappingPreset[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveMappingPreset(name: string, mappings: ColumnMapping[]): MappingPreset {
  const preset: MappingPreset = {
    id: crypto.randomUUID(),
    name,
    mappings,
    createdAt: new Date().toISOString(),
  };
  const presets = getMappingPresets();
  presets.unshift(preset);
  if (presets.length > 20) presets.length = 20;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
  return preset;
}

export function deleteMappingPreset(id: string): void {
  const presets = getMappingPresets().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
}
