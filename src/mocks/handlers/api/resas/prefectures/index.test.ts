import { mockPrefectures } from '.';

describe('src/mocks/handlers/api/resas/prefectures/index.test.ts', () => {
  test('should work', async () => {
    const response = await fetch('http://localhost/api/resas/prefectures');
    const data = await response.json();
    expect(data).toEqual({
      message: null,
      result: mockPrefectures,
    });
  });
});
