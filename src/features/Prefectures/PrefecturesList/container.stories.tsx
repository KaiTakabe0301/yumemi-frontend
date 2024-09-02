import type { Meta, StoryObj } from '@storybook/react';
import { expect, waitFor, within } from '@storybook/test';

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
  tags: ['test-only'],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Check Initial Visibility of CheckBoxes', async () => {
      await waitFor(
        () => {
          expect(canvas.getByLabelText('北海道')).toBeVisible();
          expect(canvas.getByLabelText('青森県')).toBeVisible();
        },
        {
          timeout: 5000,
        },
      );
    });

    await step('Select CheckBox', async () => {
      await canvas.getByLabelText('北海道').click();
      await canvas.getByLabelText('青森県').click();
    });

    await step('Verify CheckBoxes Are Selected', async () => {
      await expect(canvas.getByLabelText('北海道')).toBeChecked();
      await expect(canvas.getByLabelText('青森県')).toBeChecked();
    });

    await step('Deselect CheckBoxes', async () => {
      await canvas.getByLabelText('北海道').click();
      await canvas.getByLabelText('青森県').click();
    });

    await step('Verify CheckBoxes Are Deselected', async () => {
      await expect(canvas.getByLabelText('北海道')).not.toBeChecked();
      await expect(canvas.getByLabelText('青森県')).not.toBeChecked();
    });
  },
};
