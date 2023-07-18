import { lazy } from 'react';

const App = lazy(() => import('./App'));


const AppConfig = {
    settings: {
        name: 'Page Urls',
        store: 'pageUrlsApp',
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/page-urls',
            element: <App />,
        },
    ],
};

export default AppConfig;
