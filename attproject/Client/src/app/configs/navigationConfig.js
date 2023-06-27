import { authRoles } from "../auth";

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
    url: '/vendors',
    auth: authRoles.staff
  },

  {
    id: 'trackers',
    title: 'Trackers',
    type: 'item',
    icon: 'material-solid:my_location',
    url: '/trackers',
  },
  {
    id: 'page-sections',
    title: 'Page Sections',
    type: 'item',
    icon: 'material-solid:pie_chart',
    url: '/page-sections',
  },
  {
    id: 'page-urls',
    title: 'Page URLs',
    type: 'item',
    icon: 'heroicons-solid:external-link',
    url: '/page-urls',
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
    id: 'vendorsTemp',
    title: 'VendorsTemp',
    type: 'item',
    icon: 'material-solid:store_mall_directory',
    url: '/vendorsTemp',
    auth: authRoles.staff
  },
];

export default navigationConfig;
