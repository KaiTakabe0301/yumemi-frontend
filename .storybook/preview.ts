import 'destyle.css';

import type { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';

import { handlers } from '../src/mocks/handlers';

initialize({}, handlers);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
};

export default preview;
