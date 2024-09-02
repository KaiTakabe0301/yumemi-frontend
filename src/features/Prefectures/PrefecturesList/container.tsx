import { PrefectureListPresenter } from './presenter';
import { usePrefectureList } from './usePrefectureList';

export function PrefectureList() {
  const { isChecked, data, handlePrefectureClick } = usePrefectureList();
  return (
    <PrefectureListPresenter
      isChecked={isChecked}
      prefectures={data?.result}
      onClick={handlePrefectureClick}
    />
  );
}
