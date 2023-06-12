// import i18next from 'i18next';
// import ar from './navigation-i18n/ar';
// import en from './navigation-i18n/en';
// import tr from './navigation-i18n/tr';

// i18next.addResourceBundle('en', 'navigation', en);
// i18next.addResourceBundle('tr', 'navigation', tr);
// i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    icon: 'material-solid:space_dashboard',
    url: '/dashboard',
  },
  {
    id: 'vendors',
    title: 'Vendors',
    type: 'item',
    icon: 'material-solid:store_mall_directory',
    url: '/dashboard',
    // url: '/vendors',
  },
  {
    id: 'trackers',
    title: 'Trackers',
    type: 'item',
    icon: 'material-solid:my_location',
    url: '/dashboard',
    // url: '/trackers',
  },
  {
    id: 'page-section',
    title: 'Page Sections',
    type: 'item',
    icon: 'material-solid:pie_chart',
    url: '/dashboard',
    // url: '/page-section',
  },
  {
    id: 'db-admin',
    title: 'DB Admin',
    type: 'item',
    icon: 'heroicons-solid:database',
    url: '/dashboard',
    // url: '/db-admin',
  },
  {
    id: 'user-admin',
    title: 'User Admin',
    type: 'item',
    icon: 'material-solid:security',
    url: '/dashboard',
    // url: '/user-admin',
  },

  {
    id: 'example-component',
    title: 'Example',
    translate: 'EXAMPLE',
    type: 'item',
    icon: 'heroicons-outline:star',
    url: 'example',
  },
  // {
  //   id: 'dashboards',
  //   title: 'Dashboards',
  //   subtitle: 'Unique dashboard designs',
  //   type: 'group',
  //   icon: 'heroicons-outline:home',
  //   translate: 'DASHBOARDS',
  //   children: [
  //     {
  //       id: 'dashboards.project',
  //       title: 'Project',
  //       type: 'item',
  //       icon: 'heroicons-outline:clipboard-check',
  //       url: '/dashboards/project',
  //     },
  //     {
  //       id: 'dashboards.analytics',
  //       title: 'Analytics',
  //       type: 'item',
  //       icon: 'heroicons-outline:chart-pie',
  //       url: '/dashboards/analytics',
  //     },
  //     {
  //       id: 'dashboards.crypto',
  //       title: 'Crypto',
  //       type: 'item',
  //       icon: 'heroicons-outline:currency-dollar',
  //       url: '/dashboards/crypto',
  //     },
  //   ],
  // },
];

export default navigationConfig;
