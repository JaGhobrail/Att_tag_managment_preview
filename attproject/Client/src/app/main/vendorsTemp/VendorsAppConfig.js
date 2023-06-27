import { lazy } from 'react';

const VendorsApp = lazy(() => import('./VendorsApp'));

const VendorsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/vendorsTemp',
      element: <VendorsApp />,
    },
  ],
};

export default VendorsAppConfig;
