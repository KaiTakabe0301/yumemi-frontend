import { Suspense } from 'react';

import { Skeleton } from './components/parts/Skeleton';
import { Population } from './features/Population';
import { PrefectureList } from './features/Prefectures/PrefecturesList';

function App() {
  return (
    <div className='flex gap-8 flex-col justify-center items-center min-h-screen min-w-[375px]'>
      <PrefectureList />
      <Suspense fallback={<Skeleton className='w-[90%] h-[420px] bg-slate-200' />}>
        <Population />
      </Suspense>
    </div>
  );
}

export default App;
