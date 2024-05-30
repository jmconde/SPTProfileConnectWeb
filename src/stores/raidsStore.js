import { writable } from 'svelte/store';

// Create a writable store for the API key
export const raidsStore = writable('');
export const openRaidsStore = writable([]);

// Function to update the API key
export function updateRaidsStore(newApiKey) {
  raidsStore.set(newApiKey);
}

export function updateOpenRaidsStore(newOpenRaidsStore) {
  openRaidsStore.set(newOpenRaidsStore);
}