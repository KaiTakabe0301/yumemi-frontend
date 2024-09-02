import type { Meta, StoryObj } from '@storybook/react';

import { mockPrefectures } from '../../../mocks/handlers/api/resas/prefectures';
import { PrefectureListPresenter } from './presenter';

const meta = {
  title: 'PrefectureListPresenter',
  component: PrefectureListPresenter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PrefectureListPresenter>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    prefectures: mockPrefectures,
  },
};

export const Loading: Story = {
  args: {
    prefectures: undefined,
  },
};
