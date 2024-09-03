import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Prefecture } from '../Prefectures';

export type PopulationPresenterProps = {
  data: {
    year: number;
    populationPerPrefecture: Record<Prefecture['prefCode'], number>;
  }[];
  selectedPrefectures?: Prefecture[];
};

export function PopulationPresenter({ data, selectedPrefectures }: PopulationPresenterProps) {
  return (
    <ResponsiveContainer height={450} width='100%' minWidth={375}>
      <LineChart data={data} margin={{ top: 50, right: 40, left: 50, bottom: 30 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='year'>
          <Label value='年度' position='bottom' />
        </XAxis>
        <YAxis tickFormatter={(value) => new Intl.NumberFormat().format(Number(value))}>
          <Label value='人口数' position='left' angle={0} dx={20} dy={-190} />
        </YAxis>
        <Tooltip />

        <Legend layout='vertical' align='right' verticalAlign='middle' />

        {selectedPrefectures?.map(({ prefCode }, i) => (
          <Line
            key={prefCode}
            dataKey={`populationPerPrefecture.${prefCode}`}
            name={
              selectedPrefectures.find((prefecture) => prefecture.prefCode === prefCode)?.prefName
            }
            unit='人'
            stroke={`hsl(${(i * 360) / selectedPrefectures.length}, 70%, 50%)`}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
