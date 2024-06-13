
import { addMessages, init, getLocaleFromNavigator, locale, t, _ } from 'svelte-i18n';
import en from '../locales/en';

function setupI18n( { withLocale: _locale } = { withLocale: 'en' }) {
  addMessages('en', en);

  init({
    fallbackLocale: 'en',
    initialLocale: getLocaleFromNavigator(),
  });

  locale.set(_locale);
}

export { setupI18n, t, _};