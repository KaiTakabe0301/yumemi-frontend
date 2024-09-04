import { useSuspenseQueries } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { fetcher } from '../../utils/fetcher';
import { isPrefCode } from '../Prefectures';
import { useFetchPrefectures } from '../Prefectures/useFetchPrefectures';
import { PopulationPresenterProps } from './presenter';
import { PopulationCompositionPerYear } from './type';

export function usePopulation() {
  const [searchParams, setSearchParams] = useSearchParams();

  // URLパラメータから都道府県コードを取得(都道府県コード以外のパラメータは無視)
  const selectedPrefCode = searchParams.getAll('prefCode').filter(isPrefCode);

  // 選択された都道府県のデータを取得
  const { data: prefectures } = useFetchPrefectures();
  const selectedPrefectures = prefectures?.filter((prefecture) =>
    selectedPrefCode.includes(prefecture.prefCode.toString()),
  );

  const labels = useMemo(() => ['総人口', '年少人口', '生産年齢人口', '老年人口'], []);
  // クエリパラメータの 'label' が有効な値でなければデフォルト値として '総人口' を選択
  const selectedLabel = labels.includes(searchParams.get('label') ?? '')
    ? searchParams.get('label')
    : '総人口';
  const handleLabelChange = (label: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('label', label);
    setSearchParams(newSearchParams);
  };

  const results = useSuspenseQueries({
    queries: selectedPrefCode.map((prefCode) => ({
      queryKey: [`/api/resas/population/composition/perYear?prefCode=${prefCode}&cityCode=-`],
      queryFn: () =>
        fetcher(`/api/resas/population/composition/perYear?prefCode=${prefCode}&cityCode=-`),
    })),
  });

  /**
   * TODO: refactor 都道府県によって、保持しているyearに差異があるとエラーになる
   * {
   *   year: number;
   *   populationPerPrefecture: Record<string, number>;
   * }[]
   * の形式に変換する
   */
  const transformedDataForGraph = (
    data: { message: null; result: PopulationCompositionPerYear }[] | undefined,
  ): PopulationPresenterProps['data'] => {
    if (!data || data.length === 0) return [];

    const transformedData: PopulationPresenterProps['data'] = [];

    // 横軸を年度とするので、年度のリストを取得
    const years = data[0].result.data[0].data.map((d) => d.year);

    years.forEach((year) => {
      const populationPerYear: { year: number; populationPerPrefecture: Record<string, number> } = {
        year,
        populationPerPrefecture: {},
      };

      selectedPrefCode.forEach((prefCode, i) => {
        const populationPerLabel = data[i].result.data.filter((d) => d.label === selectedLabel)[0];

        populationPerYear.populationPerPrefecture[prefCode] = populationPerLabel.data.filter(
          (d) => d.year === year,
        )[0].value;
      });

      transformedData.push(populationPerYear);
    });

    return transformedData;
  };

  return {
    data: transformedDataForGraph(results.map((r) => r.data)),
    selectedPrefectures,
    labels,
    handleLabelChange,
  };
}
