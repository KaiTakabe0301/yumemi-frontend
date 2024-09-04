import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';

import { Skeleton } from './components/parts/Skeleton';
import { Population } from './features/Population';
import { PrefectureList } from './features/Prefectures/PrefecturesList';
// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PrefectureList />
        <Suspense fallback={<Skeleton className='w-[90%] h-[420px] bg-slate-200' />}>
          <Population />
        </Suspense>
      </QueryClientProvider>
    </>
  );
}

export default App;
