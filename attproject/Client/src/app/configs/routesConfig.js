import CommonUtils from 'src/@common/utils';
import CommonLoading from '@common/core/CommonLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import Error404Page from '../main/404/Error404Page';
import DashboardAppConfig from '../main/dashboard/DashboardAppConfig';
import VendorsAppConfigTemp from '../main/vendorsTemp/VendorsAppConfig';
import VendorsAppConfig from '../main/vendors/AppConfig';
import TrackersAppConfig from '../main/trackers/AppConfig';
import PageSectionsAppConfig from '../main/page-sections/AppConfig';
import PageUrlsAppConfig from '../main/page-urls/AppConfig';
import DbAdminAppConfig from '../main/db-admin/AppConfig';
import UsersAppConfig from '../main/contacts/ContactsAppConfig';
import BusinessUnitsAppConfig from '../main/businessUnits/ContactsAppConfig';
import { authRoles } from '../auth';

const routeConfigs = [
    SignOutConfig,
    SignInConfig,
    SignUpConfig,
    DashboardAppConfig,
    VendorsAppConfig,
    TrackersAppConfig,
    PageSectionsAppConfig,
    PageUrlsAppConfig,
    UsersAppConfig,
    DbAdminAppConfig,
    VendorsAppConfigTemp,
    BusinessUnitsAppConfig
];

const routes = [
    ...CommonUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
    {
        path: '/',
        element: <Navigate to="/dashboard" />,
        auth: [authRoles.INVESTIGATOR]
        // settingsConfig.defaultAuth,
    },
    {
        path: 'loading',
        element: <CommonLoading />,
    },
    {
        path: '404',
        element: <Error404Page />,
    },
    {
        path: '*',
        element: <Navigate to="404" />,
    },
];

export default routes;
