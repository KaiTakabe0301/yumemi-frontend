import type { Meta, StoryObj } from '@storybook/react';

import { RootLayout } from './RootLayout';

const meta = {
  title: 'Layout/RootLayout',
  component: RootLayout,
  tags: ['autodocs'],
  parameters: {},
  args: {
    children: <div>children</div>,
  },
} satisfies Meta<typeof RootLayout>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
