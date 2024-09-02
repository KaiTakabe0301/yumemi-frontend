import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

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
  // previewだと、異なるviewportから遷移してくると、テストが失敗する。その場合は再度実行して下さい。
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Check grid layout on Tablet', async () => {
      const listItems = await canvas.findAllByRole('checkbox');
      const firstRowY = listItems[0].getBoundingClientRect().top;

      const columnsInFirstRow = listItems.filter(
        (item) => item.getBoundingClientRect().top === firstRowY,
      ).length;

      expect(columnsInFirstRow).toBe(4);
    });
  },
};
