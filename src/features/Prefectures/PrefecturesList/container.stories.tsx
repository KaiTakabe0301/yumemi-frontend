import type { Meta, StoryObj } from '@storybook/react';

import { PrefectureList } from './container';

const meta = {
  title: 'PrefectureList',
  component: PrefectureList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PrefectureList>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
