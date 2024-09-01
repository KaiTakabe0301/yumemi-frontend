import type { Meta } from '@storybook/react';
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

export const Default = () => {
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
