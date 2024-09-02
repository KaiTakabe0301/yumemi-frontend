import { Checkbox } from '../../../components/parts/Checkbox';
import { Skeleton } from '../../../components/parts/Skeleton/Skeleton';
import { Typography } from '../../../components/parts/Typography';
import { Prefecture } from '../type';

type PrefectureListProps = {
  prefectures?: Prefecture[];
  isChecked?: (prefCode: number) => boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>, prefCode: number) => void;
};
export function PrefectureListPresenter({
  prefectures,
  isChecked = () => false,
  onClick = () => undefined,
}: PrefectureListProps) {
  return (
    <div className='flex flex-col justify-center items-center w-full gap-4'>
      <Typography variant='h2'>都道府県</Typography>
      <ul className='grid gap-4 grid-cols-auto-fill w-full'>
        {prefectures
          ? prefectures.map((prefecture) => (
              <ol
                className='flex justify-center cursor-pointer select-none hover:opacity-80 active:opacity-60'
                key={prefecture.prefCode}
              >
                <Checkbox
                  checked={isChecked(prefecture.prefCode)}
                  label={prefecture.prefName}
                  id={String(prefecture.prefCode)}
                  onClick={(e) => onClick(e, prefecture.prefCode)}
                />
              </ol>
            ))
          : [...Array(47)].map((_, index) => (
              <ol key={index}>
                <Skeleton className='w-full h-6 bg-slate-200' />
              </ol>
            ))}
      </ul>
    </div>
  );
}
