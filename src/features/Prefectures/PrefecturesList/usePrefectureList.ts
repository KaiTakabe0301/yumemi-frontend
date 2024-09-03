import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export function usePrefectureList() {
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
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.delete('prefCode');
      updatedPrefCodes.forEach((code) => newSearchParams.append('prefCode', code));
      setSearchParams(newSearchParams);
    },
    [searchParams, setSearchParams],
  );

  const isChecked = useCallback(
    (prefCode: number) => searchParams.getAll('prefCode').map(Number).includes(prefCode),
    [searchParams],
  );

  return { handlePrefectureClick, isChecked };
}
