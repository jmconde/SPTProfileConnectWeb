import { writable } from 'svelte/store';

const configStore = writable({
  locale: 'en-US'
});

export function updateConfig(newConfig) {
  configStore.set(newConfig);
}

export function updateIntlLocale(newLocale) {
  configStore.update((config) => {
    return {
      ...config,
      locale: newLocale
    };
  });
}

export { configStore  };