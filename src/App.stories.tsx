import type { Meta, StoryObj } from '@storybook/react';
import { expect, waitFor, within } from '@storybook/test';

import App from './App';
import { RootLayout } from './components/layout/RootLayout/RootLayout';

const meta = {
  title: 'App',
  component: App,
  decorators: [(story) => <RootLayout>{story()}</RootLayout>],
  parameters: {},
  tags: ['autodocs'],
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  tags: ['testable'],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    // 都道府県の選択肢が表示されていることを確認
    await waitFor(
      () => {
        expect(canvas.getByLabelText('北海道')).toBeVisible();
      },
      {
        timeout: 5000,
      },
    );

    await step('北海道を選択', async () => {
      await canvas.getByLabelText('北海道').click();
    });

    await step('グラフ上に、北海道の総人口が描画されていることを確認', async () => {
      await waitFor(
        async () => {
          expect(
            canvasElement.querySelector('svg.recharts-surface')?.querySelector('path[name=北海道]'),
          ).toBeVisible();
        },
        { timeout: 5000 },
      );
    });

    await step('追加で東京都を選択', async () => {
      await canvas.getByLabelText('東京都').click();
    });

    await step('グラフ上に、北海道と東京都のグラフが描画されていることを確認', async () => {
      await waitFor(
        async () => {
          expect(
            canvasElement.querySelector('svg.recharts-surface')?.querySelector('path[name=北海道]'),
          ).toBeVisible();
          expect(
            canvasElement.querySelector('svg.recharts-surface')?.querySelector('path[name=東京都]'),
          ).toBeVisible();
        },
        { timeout: 5000 },
      );
    });

    await step('北海道の選択を解除', async () => {
      await canvas.getByLabelText('北海道').click();
    });

    await step('グラフ上に東京都のみが描画されていることを確認', async () => {
      await waitFor(
        async () => {
          expect(
            canvasElement.querySelector('svg.recharts-surface')?.querySelector('path[name=北海道]'),
          ).toBeNull();
          expect(
            canvasElement.querySelector('svg.recharts-surface')?.querySelector('path[name=東京都]'),
          ).toBeVisible();
        },
        { timeout: 5000 },
      );
    });
  },
};
