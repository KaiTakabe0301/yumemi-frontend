import '../src/index.css';

import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { withRouter } from 'storybook-addon-remix-react-router';

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
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
        ...MINIMAL_VIEWPORTS,
      },
      defaultViewport: 'responsive',
    },
  },
  loaders: [mswLoader],
  decorators: [withRouter],
};

export default preview;
