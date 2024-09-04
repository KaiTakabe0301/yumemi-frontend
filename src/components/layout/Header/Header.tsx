import { cn } from '../../../utils/cn';
import { Typography } from '../../parts/Typography';

export type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        'flex justify-center items-center w-full mb-10 border-b border-b-slate-500',
        className,
      )}
    >
      <Typography variant='h1' className='m-2'>
        ゆめみ フロントエンド コーディング試験
      </Typography>
    </header>
  );
}
