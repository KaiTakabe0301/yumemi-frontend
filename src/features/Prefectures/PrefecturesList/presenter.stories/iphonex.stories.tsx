import type { Meta, StoryObj } from '@storybook/react';
import { expect, waitFor, within } from '@storybook/test';

import { mockPrefectures } from '../../../../mocks/handlers/api/resas/prefectures';
import { PrefectureListPresenter } from '../presenter';

const meta = {
  title: 'PrefectureList/Presenter/IphoneX',
  component: PrefectureListPresenter,
  parameters: {},
  tags: ['autodocs', 'testable'],
} satisfies Meta<typeof PrefectureListPresenter>;
export default meta;
type Story = StoryObj<typeof meta>;

export const IphoneX: Story = {
  args: {
    prefectures: mockPrefectures,
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('iphoneXで表示した場合、選択肢が2カラムで表示されていることを確認', async () => {
      const listItems = await canvas.findAllByRole('checkbox');
      const firstRowY = listItems[0].getBoundingClientRect().top;

      const columnsInFirstRow = listItems.filter(
        (item) => item.getBoundingClientRect().top === firstRowY,
      ).length;

      // 異なるviewportから遷移してくると、画面の描画が完了していない場合があるため、waitForを使用して待つ
      await waitFor(
        () => {
          expect(columnsInFirstRow).toBe(2);
        },
        { timeout: 5000 },
      );
    });
  },
};
