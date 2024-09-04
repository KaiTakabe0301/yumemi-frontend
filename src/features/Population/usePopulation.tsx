import { useSuspenseQueries, UseSuspenseQueryResult } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
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
  const selectedPrefectures = useMemo(
    () =>
      prefectures?.filter((prefecture) =>
        selectedPrefCode.includes(prefecture.prefCode.toString()),
      ),
    [prefectures, selectedPrefCode],
  );

  const labels = useMemo(() => ['総人口', '年少人口', '生産年齢人口', '老年人口'], []);

  // クエリパラメータの 'label' が有効な値でなければデフォルト値として '総人口' を選択
  const selectedLabel = useMemo(
    () => (labels.includes(searchParams.get('label') ?? '') ? searchParams.get('label') : '総人口'),
    [labels, searchParams],
  );

  const handleLabelChange = useCallback(
    (label: string) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('label', label);
      setSearchParams(newSearchParams);
    },
    [searchParams, setSearchParams],
  );

  const results: UseSuspenseQueryResult<{
    populationCompositionPerYear: PopulationCompositionPerYear['data'];
    prefCode: number;
  }>[] = useSuspenseQueries({
    queries: selectedPrefCode.map((prefCode) => ({
      queryKey: [`/api/resas/population/composition/perYear?prefCode=${prefCode}&cityCode=-`],
      queryFn: () =>
        fetcher(`/api/resas/population/composition/perYear?prefCode=${prefCode}&cityCode=-`).then(
          ({ result }) => ({
            prefCode,
            populationCompositionPerYear: result.data,
          }),
        ),
    })),
  });

  /**
   * {
   *   year: number;
   *   populationPerPrefecture: Record<string, number>;
   * }[]
   * の形式に変換する
   */
  const transformedDataForGraph = useCallback(
    (
      data: {
        prefCode: number;
        populationCompositionPerYear: PopulationCompositionPerYear['data'];
      }[],
    ): PopulationPresenterProps['data'] => {
      const populationPerYear: PopulationPresenterProps['data'] = [];

      data.forEach(({ prefCode, populationCompositionPerYear }) => {
        populationCompositionPerYear.forEach(({ data, label }) => {
          if (label !== selectedLabel) return;

          data.forEach(({ year, value }) => {
            const target = populationPerYear.find((item) => item.year === year);
            if (target) {
              target.populationPerPrefecture[prefCode] = value;
            } else {
              populationPerYear.push({
                year,
                populationPerPrefecture: {
                  [prefCode]: value,
                },
              });
            }
          });
        });
      });

      return populationPerYear;
    },
    [selectedLabel],
  );

  return {
    data: transformedDataForGraph(results.map(({ data }) => data)),
    selectedPrefectures,
    labels,
    handleLabelChange,
  };
}
