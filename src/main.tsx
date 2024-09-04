import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import { RootLayout } from './components/layout/RootLayout/RootLayout';
import ErrorPage from './ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RootLayout>
        <App />
      </RootLayout>
    ),
    errorElement: <ErrorPage />,
  },
]);

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
      <RouterProvider router={router} />
    </StrictMode>,
  );
});
