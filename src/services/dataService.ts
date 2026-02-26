/**
 * Data Service Layer
 *
 * Loads daily data from static JSON files in /public/data/.
 * To switch to a live API, replace the fetch calls below with your own endpoints:
 *
 *   export async function fetchDailyData(date: string): Promise<DailyData | null> {
 *     const res = await fetch(`https://your-api.com/daily/${date}`);
 *     if (!res.ok) return null;
 *     return res.json();
 *   }
 */

import { DailyData } from '../data/mockData';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Fetch the list of all available dates (newest first) from /public/data/index.json */
export async function fetchAvailableDates(): Promise<string[]> {
  try {
    const res = await fetch(`${BASE}/data/index.json`);
    if (!res.ok) throw new Error('index.json not found');
    return res.json();
  } catch {
    console.warn('[dataService] Could not load index.json');
    return [];
  }
}

/** Fetch daily data for a given date (YYYY-MM-DD) from /public/data/YYYY-MM-DD.json */
export async function fetchDailyData(date: string): Promise<DailyData | null> {
  try {
    const res = await fetch(`${BASE}/data/${date}.json`);
    if (!res.ok) throw new Error(`${date}.json not found`);
    return res.json();
  } catch {
    console.warn(`[dataService] Could not load data for ${date}`);
    return null;
  }
}
