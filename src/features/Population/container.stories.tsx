import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';
import { reactRouterParameters } from 'storybook-addon-remix-react-router';

import { mockPrefectures } from '../../mocks/handlers/api/resas/prefectures';
import { Population } from './container';

// URLに保存したprefCodeを再現
const selectedPrefCode = ['1', '2', '11'];
const urlSearchParams = new URLSearchParams();
selectedPrefCode.forEach((prefCode) => {
  urlSearchParams.append('prefCode', prefCode);
});

const meta = {
  title: 'Population/Container',
  component: Population,
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        searchParams: urlSearchParams,
      },
      routing: {
        path: '/',
      },
    }),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Population>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    prefectures: mockPrefectures,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  tags: ['testable'],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    // svgの描画が完了するまで待つ
    await waitFor(
      () => {
        expect(
          canvasElement.querySelector('svg')?.querySelector('path[name=北海道]'),
        ).toBeVisible();
      },
      { timeout: 5000 },
    );

    // 総人口のsvg pathを取得
    const svgElement = await canvasElement.querySelector('svg');
    let prevSvgPath = svgElement?.querySelector('path[name=北海道]');

    // Comboboxを取得
    const comboboxInput = canvas.getByRole('combobox');

    await step('Select option from Combobox', async () => {
      await userEvent.selectOptions(comboboxInput, '年少人口');
    });

    await step(
      'labelを年少人口に切り替えても、選択済みの都道府県が描画されていることを確認',
      async () => {
        await waitFor(
          async () => {
            await expect(
              canvasElement.querySelector('svg')?.querySelector('path[name=北海道]'),
            ).toBeVisible();
            await expect(
              canvasElement.querySelector('svg')?.querySelector('path[name=青森県]'),
            ).toBeVisible();
            await expect(
              canvasElement.querySelector('svg')?.querySelector('path[name=埼玉県]'),
            ).toBeVisible();
          },
          { timeout: 5000 },
        );
      },
    );

    // SVGが変更されるのを待ってから確認
    await step('Check if SVG is updated for 年少人口', async () => {
      const svgElement = await canvasElement.querySelector('svg');
      const svgPath = svgElement?.querySelector('path[name=北海道]');
      await waitFor(
        async () => {
          await expect(svgPath).not.toHaveAttribute('d', prevSvgPath?.getAttribute('d'));
        },
        { timeout: 5000 },
      );

      prevSvgPath = svgPath;
    });

    // オプションを選択
    await step('Select option from Combobox', async () => {
      await userEvent.selectOptions(comboboxInput, '生産年齢人口');
    });

    await step(
      'labelを生産年齢人口に切り替えても、選択済みの都道府県が描画されていることを確認',
      async () => {
        await waitFor(
          async () => {
            await expect(
              canvasElement.querySelector('svg')?.querySelector('path[name=北海道]'),
            ).toBeVisible();
            await expect(
              canvasElement.querySelector('svg')?.querySelector('path[name=青森県]'),
            ).toBeVisible();
            await expect(
              canvasElement.querySelector('svg')?.querySelector('path[name=埼玉県]'),
            ).toBeVisible();
          },
          { timeout: 5000 },
        );
      },
    );

    // SVGが変更されるのを待ってから確認
    await step('Check if SVG is updated for 生産年齢人口', async () => {
      const svgElement = await canvasElement.querySelector('svg');
      const svgPath = svgElement?.querySelector('path[name=北海道]');
      await waitFor(
        async () => {
          await expect(svgPath).not.toHaveAttribute('d', prevSvgPath?.getAttribute('d'));
        },
        { timeout: 5000 },
      );

      prevSvgPath = svgPath;
    });

    await step('Select option from Combobox', async () => {
      await userEvent.selectOptions(comboboxInput, '老年人口');
    });

    await step(
      'labelを老年人口に切り替えても、選択済みの都道府県が描画されていることを確認',
      async () => {
        await waitFor(
          async () => {
            await expect(
              canvasElement.querySelector('svg')?.querySelector('path[name=北海道]'),
            ).toBeVisible();
            await expect(
              canvasElement.querySelector('svg')?.querySelector('path[name=青森県]'),
            ).toBeVisible();
            await expect(
              canvasElement.querySelector('svg')?.querySelector('path[name=埼玉県]'),
            ).toBeVisible();
          },
          { timeout: 5000 },
        );
      },
    );

    // // SVGが変更されるのを待ってから確認
    await step('Check if SVG is updated for 老年人口', async () => {
      const svgElement = await canvasElement.querySelector('svg');
      const svgPath = svgElement?.querySelector('path[name=北海道]');
      await waitFor(
        async () => {
          await expect(svgPath).not.toHaveAttribute('d', prevSvgPath?.getAttribute('d'));
        },
        { timeout: 5000 },
      );
    });
  },
};
