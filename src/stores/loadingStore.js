import { writable } from 'svelte/store';

export const loadingStore = writable(false);
export const unauthorizedStore = writable(false);