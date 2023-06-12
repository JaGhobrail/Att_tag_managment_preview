import CommonSvgIcon from '@common/core/CommonSvgIcon';

const NotificationIcon = ({ value }) => {
  switch (value) {
    case 'error': {
      return (
        <CommonSvgIcon className="mr-8 opacity-75" color="inherit">
          heroicons-outline:minus-circle
        </CommonSvgIcon>
      );
    }
    case 'success': {
      return (
        <CommonSvgIcon className="mr-8 opacity-75" color="inherit">
          heroicons-outline:check-circle
        </CommonSvgIcon>
      );
    }
    case 'warning': {
      return (
        <CommonSvgIcon className="mr-8 opacity-75" color="inherit">
          heroicons-outline:exclamation-circle
        </CommonSvgIcon>
      );
    }
    case 'info': {
      return (
        <CommonSvgIcon className="mr-8 opacity-75" color="inherit">
          heroicons-outline:information-circle
        </CommonSvgIcon>
      );
    }
    default: {
      return null;
    }
  }
};

export default NotificationIcon;
