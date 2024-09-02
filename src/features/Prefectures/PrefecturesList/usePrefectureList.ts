import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSWR from 'swr';

import { fetcher } from '../../../utils/fetcher';

export function usePrefectureList() {
  const { data, error, isLoading } = useSWR('/api/resas/prefectures?timeout=1000', fetcher);

  const [searchParams, setSearchParams] = useSearchParams();

  const handlePrefectureClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, prefCode: number) => {
      event.preventDefault();

      const currentPrefCodes = searchParams.getAll('prefCode');
      const prefCodeString = prefCode.toString();

      let updatedPrefCodes;
      if (currentPrefCodes.includes(prefCodeString)) {
        updatedPrefCodes = currentPrefCodes.filter((code) => code !== prefCodeString);
      } else {
        updatedPrefCodes = [...currentPrefCodes, prefCodeString];
      }

      setSearchParams({ prefCode: updatedPrefCodes });
    },
    [searchParams, setSearchParams],
  );

  const isChecked = useCallback(
    (prefCode: number) => searchParams.getAll('prefCode').map(Number).includes(prefCode),
    [searchParams],
  );

  return { handlePrefectureClick, isChecked, data, error, isLoading };
}
