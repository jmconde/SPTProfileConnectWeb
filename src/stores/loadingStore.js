import { writable } from 'svelte/store';

export const loadingStore = writable({});
export const unauthorizedStore = writable({});

export function setLoading(key, value) {
  loadingStore.update((loading) => {
    loading[key] = value;
    return loading;
  });
}

export function setUnauthorized(key, value) {
  unauthorizedStore.update((unauthorized) => {
    unauthorized[key] = value;
    return unauthorized;
  });
}