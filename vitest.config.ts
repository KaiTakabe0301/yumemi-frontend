import { configDefaults, defineConfig } from 'vitest/config';

const exclude = [...configDefaults.exclude, 'api/*', 'public/*', '.storybook/*'];

export default defineConfig({
  test: {
    globals: true,
    exclude,
    coverage: {
      exclude,
    },
    setupFiles: ['./vitest.setup.ts'],
  },
});
