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
      path: '/vendors',
      element: <App />,
    },
  ],
};

export default AppConfig;
