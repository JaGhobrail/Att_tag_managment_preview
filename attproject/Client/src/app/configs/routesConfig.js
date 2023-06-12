import CommonUtils from 'src/@common/utils';
import CommonLoading from '@common/core/CommonLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import Error404Page from '../main/404/Error404Page';
import DashboardAppConfig from '../main/dashboard/DashboardAppConfig';

import ExampleConfig from '../main/example/ExampleConfig';
import CryptoDashboardAppConfig from '../main/dashboards/crypto/CryptoDashboardAppConfig';
import FinanceDashboardAppConfig from '../main/dashboards/finance/FinanceDashboardAppConfig';


const routeConfigs = [
  SignOutConfig,
  SignInConfig,
  SignUpConfig,
  DashboardAppConfig,

  ExampleConfig,
  CryptoDashboardAppConfig,
  FinanceDashboardAppConfig,

];

const routes = [
  ...CommonUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
  {
    path: '/',
    element: <Navigate to="/dashboard" />,
    auth: settingsConfig.defaultAuth,
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
