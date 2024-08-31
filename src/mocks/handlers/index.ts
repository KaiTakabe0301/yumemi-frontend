import { HttpHandler } from 'msw';

import populationCompositionPerYearHandler from './api/resas/population/composition/perYear';
import prefecturesHandler from './api/resas/prefectures';
import testHandler from './api/test';

// 有効化するハンドラを、keyで指定できるように、オブジェクトで管理
export const handlerObjects = {
  '/api/resas/population/composition/perYear': populationCompositionPerYearHandler,
  '/api/resas/prefectures': prefecturesHandler,
  'api/test': testHandler,
};

// storybook/vitestで、全てのhandlerを有効化したいので、配列に変換してexport
export const handlers = Object.values(handlerObjects).reduce((acc, cur) => {
  return [...acc, ...cur];
});

// 環境変数VITE_ENABLE_MSW_ENDPOINTに指定されたエンドポイントのみ、ローカル環境で開発時に有効化する
const enabledEndpoints = import.meta.env.VITE_ENABLE_MSW_ENDPOINT?.split(' ') || [];

export const enabledHandlers = Object.entries(handlerObjects).reduce((acc, [key, value]) => {
  if (enabledEndpoints.includes(key)) {
    return [...acc, ...value];
  }
  return acc;
}, [] as HttpHandler[]);
