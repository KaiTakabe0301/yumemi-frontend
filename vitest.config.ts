import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

const exclude = [
  ...configDefaults.exclude,
  'api/*',
  'public/*',
  '.storybook/*',
  '**/*.config.{js,ts}',
  '**/*.stories.tsx',
  // Container and Presenterは、play function でテストするため対象から外す
  '**/container.tsx',
  '**/presenter.tsx',
];

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'happy-dom',
    exclude,
    css: true,
    coverage: {
      exclude: [...exclude, './src/components/**/index.ts'],
    },
    setupFiles: ['./vitest.setup.ts'],
  },
});
