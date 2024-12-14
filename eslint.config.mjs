import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // General settings that apply to all files
  { files: ['**/*.{js,mjs,cjs,ts}'] },

  // Server-side (Node.js) configuration
  {
    languageOptions: { globals: globals.node },
    plugins: [pluginJs],
    rules: {
      // Node.js specific rules
    },
  },

  // Configuration for TypeScript files
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  // Client-side (Browser) specific settings
  {
    files: ['**/*.{js,mjs,cjs,ts}'], // Ensure this applies to your front-end code
    languageOptions: { globals: { ...globals.node, ...globals.browser } }, // Add both Node and Browser globals
    rules: {
      // Add any custom client-side rules if needed
    },
  },
];
