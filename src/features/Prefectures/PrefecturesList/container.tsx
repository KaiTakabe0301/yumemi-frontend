import { useFetchPrefectures } from '../useFetchPrefectures';
import { PrefectureListPresenter } from './presenter';
import { usePrefectureList } from './usePrefectureList';

export function PrefectureList() {
  const { data: prefectures } = useFetchPrefectures();
  const { isChecked, handlePrefectureClick } = usePrefectureList();
  return (
    <PrefectureListPresenter
      isChecked={isChecked}
      prefectures={prefectures}
      onClick={handlePrefectureClick}
    />
  );
}
