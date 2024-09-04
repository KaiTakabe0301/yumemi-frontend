export type PopulationDataPerYear = {
  year: number;
  value: number;
  rate: number;
};

export type PopulationCompositionPerYear = {
  boundaryYear: number;
  data: [
    { data: Omit<PopulationDataPerYear, 'rate'>[]; label: '総人口' },
    { data: PopulationDataPerYear[]; label: '年少人口' },
    { data: PopulationDataPerYear[]; label: '生産年齢人口' },
    { data: PopulationDataPerYear[]; label: '老年人口' },
  ];
};
