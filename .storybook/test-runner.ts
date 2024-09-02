import type { TestRunnerConfig } from '@storybook/test-runner';

const config: TestRunnerConfig = {
  tags: {
    include: ['test-only'],
    exclude: ['no-tests', 'parts'],
    skip: ['skip-test'],
  },
};

export default config;
