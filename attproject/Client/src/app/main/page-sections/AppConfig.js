import { lazy } from 'react';

const App = lazy(() => import('./App'));

const AppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/page-sections',
      element: <App />,
    },
  ],
};

export default AppConfig;
