import globals from 'globals';
import eslintPluginSvelte from 'eslint-plugin-svelte';

import pluginJs from '@eslint/js';

export default [
  { languageOptions: { 
      globals: {
        ...globals.browser,
        ...globals.node,
      } ,

    }
  },
  pluginJs.configs.recommended,
  ...eslintPluginSvelte.configs['flat/recommended'],
  {
    rules: {
      quotes: ['error', 'single'],
      'svelte/html-quotes': ['error', 'double'],
    }
  }
];
