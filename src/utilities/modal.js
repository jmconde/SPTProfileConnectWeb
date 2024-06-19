import { writable } from 'svelte/store';

export const modalState = writable({ show: false });
export const modalData = writable({ message: '' });

export function confirmModal(options) {
  return new Promise((resolve) => {
    modalState.set({
      show: true,
      ...options,
      onConfirm: () => {
        resolve(true);
        modalState.set({ show: false });
      },
      onCancel: () => {
        resolve(false);
        modalState.set({ show: false });
      }
    });
  });
}

export function alertModal(options) {
  return new Promise((resolve) => {
    modalState.set({
      show: true,
      hideCancel: true,
      ...options,
      onConfirm: () => {
        resolve(true);
        modalState.set({ show: false });
      }
    });
  });
}
