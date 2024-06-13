import { writable } from 'svelte/store';

export const websocketState = writable({
  connected: false,
  messages: [],
  error: null,
});