import type { Meta, StoryObj } from '@storybook/react';

import { Typography } from './Typography';

const meta = {
  title: 'Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'large', 'normal', 'small'],
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = {
  args: {
    variant: 'h1',
    children: 'Heading 1',
  },
};

export const H2: Story = {
  args: {
    variant: 'h2',
    children: 'Heading 1',
  },
};

export const H3: Story = {
  args: {
    variant: 'h3',
    children: 'Heading 1',
  },
};

export const H4: Story = {
  args: {
    variant: 'h4',
    children: 'Heading 1',
  },
};

export const H5: Story = {
  args: {
    variant: 'h5',
    children: 'Heading 1',
  },
};

export const H6: Story = {
  args: {
    variant: 'h6',
    children: 'Heading 1',
  },
};

export const Large: Story = {
  args: {
    variant: 'large',
    children: 'Heading 1',
  },
};

export const Normal: Story = {
  args: {
    variant: 'normal',
    children: 'Heading 1',
  },
};

export const Small: Story = {
  args: {
    variant: 'small',
    children: 'Heading 1',
  },
};
