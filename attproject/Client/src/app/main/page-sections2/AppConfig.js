import { lazy } from 'react';

const App = lazy(() => import('./App'));


const AppConfig = {
    settings: {
        name: 'Page Sections',
        store: 'pageSectionsApp',
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
