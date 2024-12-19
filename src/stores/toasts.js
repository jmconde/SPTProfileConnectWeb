import { writable } from 'svelte/store';

export const toasts = writable([]);

export function createToast(message, type = 'info', autohide = true) {
  toasts.update((toasts) => {
    return [...toasts, { id: Date.now(), message, type, autohide }];
  });
}