import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll } from 'vitest';

import { handlers } from './src/mocks/handlers';

const server = setupServer(...handlers);

// MSWを有効化
beforeAll(() => {
  return server.listen({ onUnhandledRequest: 'warn' });
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
