import { renderHook, waitFor } from '@testing-library/react';
import useSWR from 'swr';

import { fetcher } from './fetcher';

describe('SWRで利用されるfetcherの挙動確認', () => {
  const url = '/api/test';
  test('should return data from the API', async () => {
    const { result } = renderHook(() => useSWR(url, fetcher));
    await waitFor(() => {
      expect(result.current.data).toEqual({ message: 'Hello, world!' });
    });
  });

  test('should handle error', async () => {
    const { result } = renderHook(() => useSWR('/api/test?error=1', fetcher));
    await waitFor(async () => {
      expect(result.current.error).toBeDefined();
      expect(result.current.error.message).toEqual('Internal Server Error');
    });
  });
});
