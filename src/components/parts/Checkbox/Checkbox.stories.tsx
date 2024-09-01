import type { Meta, StoryObj } from '@storybook/react';
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
    onCheckedChange: {
      action: 'onCheckedChange',
    },
    label: {
      control: {
        type: 'text',
      },
    },
  },
  args: {
    label: 'label',
    checked: false,
    onCheckedChange: () => undefined,
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
        onCheckedChange={() => setChecked((prev) => !prev)}
      />
    </>
  );
};
