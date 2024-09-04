import useSWR from 'swr';

import { fetcher } from '../../utils/fetcher';
import { Prefecture } from './type';

export function useFetchPrefectures() {
  const { data, error } = useSWR<{ message: null; result: Prefecture[] }>(
    '/api/resas/prefectures',
    fetcher,
  );

  return { data: data?.result, error };
}
