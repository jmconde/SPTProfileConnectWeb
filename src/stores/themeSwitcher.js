import { writable } from 'svelte/store';

export let theme = writable(localStorage.getItem('theme') || 'light');

export function toggleTheme() {
  theme.update(theme => (theme === 'light' ? 'dark' : 'light'));
} 