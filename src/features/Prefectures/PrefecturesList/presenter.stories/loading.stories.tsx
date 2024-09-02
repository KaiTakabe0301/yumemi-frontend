import type { Meta, StoryObj } from '@storybook/react';

import { PrefectureListPresenter } from '../presenter';

const meta = {
  title: 'PrefectureList/Presenter/Loading',
  component: PrefectureListPresenter,
  parameters: {},
  tags: ['autodocs'],
} satisfies Meta<typeof PrefectureListPresenter>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  args: {
    prefectures: undefined,
  },
};
