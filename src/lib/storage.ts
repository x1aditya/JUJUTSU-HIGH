'use client';

const SAVED_LOCATIONS_KEY = 'cu_survival_saved_locations';

export function getSavedLocations(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SAVED_LOCATIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error reading saved locations', err);
    return [];
  }
}

export function isLocationSaved(id: string): boolean {
  const saved = getSavedLocations();
  return saved.includes(id);
}

export function toggleSavedLocation(id: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const saved = getSavedLocations();
    let updated: string[];
    let isNowSaved = false;

    if (saved.includes(id)) {
      updated = saved.filter((item) => item !== id);
      isNowSaved = false;
    } else {
      updated = [...saved, id];
      isNowSaved = true;
    }

    localStorage.setItem(SAVED_LOCATIONS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('cu_saved_locations_changed'));
    return isNowSaved;
  } catch (err) {
    console.error('Error toggling saved location', err);
    return false;
  }
}
