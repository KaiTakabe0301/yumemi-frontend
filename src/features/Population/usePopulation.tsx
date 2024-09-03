import { useSearchParams } from 'react-router-dom';

import { useMultipleSWR } from '../../hooks/useMultipleSWR';
import { isPrefCode } from '../Prefectures';
import { useFetchPrefectures } from '../Prefectures/useFetchPrefectures';
import { PopulationPresenterProps } from './presenter';
import { PopulationCompositionPerYear } from './type';

export function usePopulation() {
  const [searchParams, _setSearchParams] = useSearchParams();

  // URLパラメータから都道府県コードを取得(都道府県コード以外のパラメータは無視)
  const selectedPrefCode = searchParams.getAll('prefCode').filter(isPrefCode);

  // 選択された都道府県のデータを取得
  const { data: prefectures } = useFetchPrefectures();
  const selectedPrefectures = prefectures?.filter((prefecture) =>
    selectedPrefCode.includes(prefecture.prefCode.toString()),
  );

  // これは後でtabから取得するように変更する
  const selectedLabel = '総人口';

  // 選択された都道府県の人口データを取得
  const { data } = useMultipleSWR(
    selectedPrefCode.map(
      (prefCode) => `/api/resas/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
    ),
    {
      suspense: true,
    },
  );

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
    if (!data) return [];

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

  return { data: transformedDataForGraph(data), selectedPrefectures };
}
