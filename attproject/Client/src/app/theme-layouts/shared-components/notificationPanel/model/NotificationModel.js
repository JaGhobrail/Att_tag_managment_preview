import _ from '@lodash';
import CommonUtils from 'src/@common/utils';

function NotificationModel(data) {
  data = data || {};

  return _.defaults(data, {
    id: CommonUtils.generateGUID(),
    icon: 'heroicons-solid:star',
    title: '',
    description: '',
    time: new Date().toISOString(),
    read: false,
    variant: 'default',
  });
}

export default NotificationModel;
