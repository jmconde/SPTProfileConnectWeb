import { writable } from 'svelte/store';

// Create a writable store for the API key
export const jwtStore = writable('');

// Function to update the API key
export function updateApiKey(newApiKey) {
  jwtStore.set(newApiKey);
}