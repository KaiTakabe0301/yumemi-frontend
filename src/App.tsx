import { Suspense } from 'react';

import { Skeleton } from './components/parts/Skeleton';
import { Population } from './features/Population';
import { PrefectureList } from './features/Prefectures/PrefecturesList';

function App() {
  return (
    <>
      <PrefectureList />
      <Suspense fallback={<Skeleton className='w-[90%] h-[420px] bg-slate-200' />}>
        <Population />
      </Suspense>
    </>
  );
}

export default App;
