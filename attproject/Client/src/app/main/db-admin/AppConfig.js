import { lazy } from 'react';

const App = lazy(() => import('./App'));


const AppConfig = {
    settings: {
        name: 'Database Admin',
        store: 'dbAdmin',
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/db-admin',
            element: <App />,
        },
    ],
};

export default AppConfig;
