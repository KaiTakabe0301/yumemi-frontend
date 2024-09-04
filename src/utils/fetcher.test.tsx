import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import { fetcher } from './fetcher';

describe('SWRで利用されるfetcherの挙動確認', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // 再試行を無効化
      },
    },
  });

  test('should return data from the API', async () => {
    const { result } = renderHook(
      () => useQuery({ queryKey: ['/api/test'], queryFn: () => fetcher('/api/test') }),
      {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        ),
      },
    );
    await waitFor(() => {
      expect(result.current.data).toEqual({ message: 'Hello, world!' });
    });
  });

  test('should handle error', async () => {
    const { result } = renderHook(
      () =>
        useQuery({
          queryKey: ['/api/test?error1'],
          queryFn: () => fetcher('/api/test?error=1'),
        }),
      {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        ),
      },
    );

    await waitFor(async () => {
      expect(result.current.error).toBeDefined();
      expect(result.current.error?.message).toEqual('Internal Server Error');
    });
  });
});
