import { ReactNode } from 'react';

import { cn } from '../../../utils/cn';
import { Header } from '../Header';

export type RootLayoutProps = {
  className?: string;
  children?: ReactNode;
};

export function RootLayout({ className, children }: RootLayoutProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      <Header />
      <main className={'flex gap-8 flex-col items-center min-h-screen min-w-[375px]'}>
        {children}
      </main>
    </div>
  );
}
