import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS, ViewportStyles } from '@storybook/addon-viewport';
import { getStoryContext, type TestRunnerConfig } from '@storybook/test-runner';

const DEFAULT_VIEWPORT_SIZE = { width: 1280, height: 720 };

const config: TestRunnerConfig = {
  tags: {
    include: ['testable'],
    exclude: ['no-tests', 'parts'],
    skip: ['skip-test'],
  },
  // test-runnerを実行する前に実行される関数
  // ここでは、ストーリーのコンテキストを取得して、@storybook/addon-viewportで設定したViewportを適用しています
  async preVisit(page, story) {
    const context = await getStoryContext(page, story);
    const viewportName = context.parameters?.viewport?.defaultViewport;
    const viewportParameter = MINIMAL_VIEWPORTS[viewportName] || INITIAL_VIEWPORTS[viewportName];

    if (viewportParameter) {
      const viewportSize = Object.entries(viewportParameter.styles as ViewportStyles).reduce(
        (acc, [screen, size]) => ({
          ...acc,
          // make sure your viewport config in Storybook only uses numbers, not percentages
          [screen]: parseInt(size),
        }),
        {} as { width: number; height: number },
      );

      page.setViewportSize(viewportSize);
    } else {
      page.setViewportSize(DEFAULT_VIEWPORT_SIZE);
    }
  },
};

export default config;
