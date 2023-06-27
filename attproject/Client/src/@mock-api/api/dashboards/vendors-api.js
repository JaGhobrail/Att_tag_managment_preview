import mockApi from '../../att.json';
import mock from '../../mock';

const vendors = mockApi.vendors;

mock.onGet('/api/vendors').reply((config) => {
  return [200, vendors];
});
