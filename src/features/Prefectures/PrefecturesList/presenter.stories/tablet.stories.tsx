import type { Meta, StoryObj } from '@storybook/react';
import { expect, waitFor, within } from '@storybook/test';

import { mockPrefectures } from '../../../../mocks/handlers/api/resas/prefectures';
import { PrefectureListPresenter } from '../presenter';

const meta = {
  title: 'PrefectureList/Presenter/Tablet',
  component: PrefectureListPresenter,
  parameters: {},
  tags: ['autodocs', 'testable'],
} satisfies Meta<typeof PrefectureListPresenter>;
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Check grid layout on Tablet', async () => {
      const listItems = await canvas.findAllByRole('checkbox');
      const firstRowY = listItems[0].getBoundingClientRect().top;

      const columnsInFirstRow = listItems.filter(
        (item) => item.getBoundingClientRect().top === firstRowY,
      ).length;

      // 異なるviewportから遷移してくると、画面の描画が完了していない場合があるため、waitForを使用して待つ
      await waitFor(
        () => {
          expect(columnsInFirstRow).toBe(4);
        },
        { timeout: 5000 },
      );
    });
  },
};
