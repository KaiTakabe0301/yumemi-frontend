import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';

import { Checkbox } from './Checkbox';

const meta = {
  title: 'CheckBox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    checked: {
      control: {
        type: 'boolean',
      },
    },
    onClick: {
      action: 'onClick',
    },
    label: {
      control: {
        type: 'text',
      },
    },
  },
  args: {
    label: 'label',
    id: 'id',
    checked: false,
    onClick: fn(),
  },
};

export const Controlled = () => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <>
      <Checkbox
        id={'sample'}
        label={'label'}
        checked={checked}
        onClick={() => setChecked((prev) => !prev)}
      />
    </>
  );
};
