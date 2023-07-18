import { lazy } from 'react';

const App = lazy(() => import('./App'));


const AppConfig = {
  settings: {
    name: 'Tracker',
    store: 'trackersApp',
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/trackers',
      element: <App />,
    },
  ],
};

export default AppConfig;