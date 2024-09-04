import { mockPopulationCompositionPerYear } from './handlers';

describe('mock api ... /api/resas/population/composition/perYear の挙動確認', () => {
  test('should work', async () => {
    const endPoint = 'http://localhost/api/resas/population/composition/perYear';
    const params = new URLSearchParams({
      prefCode: '1',
      cityCode: '1101',
    });

    const url = `${endPoint}?${params.toString()}`;

    const response = await fetch(url);
    const data = await response.json();
    expect(data).toEqual({
      message: null,
      result: mockPopulationCompositionPerYear[1],
    });
  });
});
