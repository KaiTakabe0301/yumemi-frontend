import { useQuery } from '@tanstack/react-query';

import { fetcher } from '../../utils/fetcher';
import { Prefecture } from './type';

export function useFetchPrefectures() {
  const { data, error } = useQuery<{ message: null; result: Prefecture[] }>({
    queryKey: ['/api/resas/prefectures'],
    queryFn: () => fetcher('/api/resas/prefectures'),
  });

  return { data: data?.result, error };
}
