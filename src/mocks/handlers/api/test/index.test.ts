describe('/api/test', () => {
  test('should work', async () => {
    const response = await fetch('http://localhost/api/test');
    const data = await response.json();
    expect(data).toEqual({
      message: 'Hello, world!',
    });
  });

  test('should handle error', async () => {
    const response = await fetch('http://localhost/api/test?error=1');
    expect(response.ok).toBe(false);
    expect(response.status).toBe(500);
  });
});
