import { PopulationPresenter } from './presenter';
import { usePopulation } from './usePopulation';

export function Population() {
  const { data, selectedPrefectures, labels, handleLabelChange } = usePopulation();

  return (
    <PopulationPresenter
      data={data}
      selectedPrefectures={selectedPrefectures}
      labels={labels}
      onChangeLabel={handleLabelChange}
    />
  );
}
