import { mockPopulationCompositionPerYear } from '.';

describe('src/mocks/handlers/api/resas/population/composition/perYear/index.test.ts', () => {
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
      result: mockPopulationCompositionPerYear,
    });
  });
});
