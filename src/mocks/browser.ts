import { setupWorker } from 'msw/browser';

import { enabledHandlers } from './handlers';

const worker = setupWorker(...enabledHandlers);

export { worker };
