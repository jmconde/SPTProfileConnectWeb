import { writable } from 'svelte/store';

export let theme = writable(localStorage.getItem('theme') || 'dark');

export function toggleTheme() {
  theme.update(theme => (theme === 'light' ? 'dark' : 'light'));
} 