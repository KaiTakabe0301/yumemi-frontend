import type { Meta, StoryObj } from '@storybook/react';
import { reactRouterParameters } from 'storybook-addon-remix-react-router';

import { mockPrefectures } from '../../mocks/handlers/api/resas/prefectures';
import { Population } from './container';

// URLに保存したprefCodeを再現
const selectedPrefCode = ['1', '2', '11'];
const urlSearchParams = new URLSearchParams();
selectedPrefCode.forEach((prefCode) => {
  urlSearchParams.append('prefCode', prefCode);
});

const meta = {
  title: 'Population/Container',
  component: Population,
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        searchParams: urlSearchParams,
      },
      routing: {
        path: '/',
      },
    }),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Population>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    prefectures: mockPrefectures,
  },
};
