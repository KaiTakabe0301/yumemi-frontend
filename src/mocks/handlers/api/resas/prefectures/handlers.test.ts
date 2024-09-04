import { mockPrefectures } from './handlers';

describe('mock api ... /api/resas/prefectures', () => {
  test('should work', async () => {
    const response = await fetch('http://localhost/api/resas/prefectures');
    const data = await response.json();
    expect(data).toEqual({
      message: null,
      result: mockPrefectures,
    });
  });
});
