import mockApi from '../../att.json';
import mock from '../../mock';

const trackers = mockApi.trackers;

mock.onGet('/api/trackers').reply((config) => {
  return [200, trackers];
});
