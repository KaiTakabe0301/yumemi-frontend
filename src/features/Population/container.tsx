import { PopulationPresenter } from './presenter';
import { usePopulation } from './usePopulation';

export function Population() {
  const { data, selectedPrefectures } = usePopulation();

  return <PopulationPresenter data={data} selectedPrefectures={selectedPrefectures} />;
}
