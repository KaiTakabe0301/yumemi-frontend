export async function initMocks() {
  const { worker } = await import('./browser');
  return worker.start();
}

export {};
