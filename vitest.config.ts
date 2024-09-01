import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

const exclude = [...configDefaults.exclude, 'api/*', 'public/*', '.storybook/*'];

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'happy-dom',
    exclude,
    coverage: {
      exclude: [
        ...exclude,
        './src/components/parts/**/*.stories.tsx',
        './src/components/**/index.ts',
      ],
    },
    setupFiles: ['./vitest.setup.ts'],
  },
});
