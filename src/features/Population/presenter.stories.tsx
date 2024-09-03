import type { Meta, StoryObj } from '@storybook/react';

import { mockPrefectures } from '../../mocks/handlers/api/resas/prefectures';
import { PopulationPresenter } from './presenter';

const meta = {
  title: 'Population/Presenter',
  component: PopulationPresenter,
  parameters: {},
  tags: ['autodocs'],
} satisfies Meta<typeof PopulationPresenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [],
    selectedPrefectures: mockPrefectures,
  },
};
