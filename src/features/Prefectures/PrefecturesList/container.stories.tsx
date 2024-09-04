import type { Meta, StoryObj } from '@storybook/react';
import { expect, waitFor, within } from '@storybook/test';

import { PrefectureList } from './container';

const meta = {
  title: 'PrefectureList/Container',
  component: PrefectureList,
  parameters: {},
  tags: ['autodocs'],
} satisfies Meta<typeof PrefectureList>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ['testable'],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('チェックボックスが描画されることを確認', async () => {
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

    await step('北海道と青森県のチェックボックスを選択', async () => {
      await canvas.getByLabelText('北海道').click();
      await canvas.getByLabelText('青森県').click();
    });

    await step('選択したチェックボックスが選択されていることを確認', async () => {
      await expect(canvas.getByLabelText('北海道')).toBeChecked();
      await expect(canvas.getByLabelText('青森県')).toBeChecked();
    });

    await step('北海道と青森県のチェックボックスから選択を外す', async () => {
      await canvas.getByLabelText('北海道').click();
      await canvas.getByLabelText('青森県').click();
    });

    await step('チェックボックスが選択されていないことを確認', async () => {
      await expect(canvas.getByLabelText('北海道')).not.toBeChecked();
      await expect(canvas.getByLabelText('青森県')).not.toBeChecked();
    });
  },
};
