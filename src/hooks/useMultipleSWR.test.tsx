import { renderHook, waitFor } from '@testing-library/react';

import { mockPopulationCompositionPerYear } from '../mocks/handlers/api/resas/population/composition/perYear';
import { useMultipleSWR } from './useMultipleSWR';

describe('useMultipleSWRの動作確認', () => {
  const url = [
    '/api/resas/population/composition/perYear?cityCode=-&prefCode=1',
    '/api/resas/population/composition/perYear?cityCode=-&prefCode=2',
    '/api/resas/population/composition/perYear?cityCode=-&prefCode=3',
    '/api/resas/population/composition/perYear?cityCode=-&prefCode=4',
  ];

  test('should return data from the API', async () => {
    const { result } = renderHook(() => useMultipleSWR(url));
    await waitFor(() => {
      expect(result.current.data).toEqual([
        { message: null, result: mockPopulationCompositionPerYear[1] },
        { message: null, result: mockPopulationCompositionPerYear[2] },
        { message: null, result: mockPopulationCompositionPerYear[3] },
        { message: null, result: mockPopulationCompositionPerYear[4] },
      ]);
    });
  });

  test('should handle error', async () => {
    const { result } = renderHook(() =>
      useMultipleSWR(['/api/test?error=1', '/api/test?error=1', ...url]),
    );
    await waitFor(async () => {
      expect(result.current.error).toBeDefined();
      expect(result.current.error.message).toEqual(
        [
          'Error fetching http://localhost:3000/api/test?error=1: { status: 500, message: Internal Server Error}',
          'Error fetching http://localhost:3000/api/test?error=1: { status: 500, message: Internal Server Error}',
        ].join('\n'),
      );
    });
  });
});
