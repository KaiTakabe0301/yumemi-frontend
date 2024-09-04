import { Decorator } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const queryClient = new QueryClient();

export const withStateProvider: Decorator = (story) => {
  return <QueryClientProvider client={queryClient}>{story()}</QueryClientProvider>;
};
