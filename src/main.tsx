import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

// MSWの読み込みが完了する前に、アプリケーションがレンダリングされるのを防ぐ
const prepareRendering = async () => {
  if (process.env.NODE_ENV === 'development') {
    const { initMocks } = await import('./mocks');
    return await initMocks();
  }
};

prepareRendering().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
