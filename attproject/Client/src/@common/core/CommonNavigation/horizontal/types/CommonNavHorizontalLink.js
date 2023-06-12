import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { memo, useMemo } from 'react';
import withRouter from 'src/@common/core/withRouter';
import CommonNavBadge from '../../CommonNavBadge';
import CommonSvgIcon from '../../../CommonSvgIcon';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none!important',
  minHeight: 48,
  '&.active': {
    backgroundColor: `${theme.palette.secondary.main}!important`,
    color: `${theme.palette.secondary.contrastText}!important`,
    pointerEvents: 'none',
    '& .common-list-item-text-primary': {
      color: 'inherit',
    },
    '& .common-list-item-icon': {
      color: 'inherit',
    },
  },
  '& .common-list-item-icon': {},
  '& .common-list-item-text': {
    padding: '0 0 0 16px',
  },
}));

function CommonNavHorizontalLink(props) {
  const { item } = props;

  return useMemo(
    () => (
      <StyledListItem
        button
        component="a"
        href={item.url}
        target={item.target ? item.target : '_blank'}
        className={clsx('common-list-item')}
        role="button"
        sx={item.sx}
        disabled={item.disabled}
      >
        {item.icon && (
          <CommonSvgIcon
            className={clsx('common-list-item-icon shrink-0', item.iconClass)}
            color="action"
          >
            {item.icon}
          </CommonSvgIcon>
        )}

        <ListItemText
          className="common-list-item-text"
          primary={item.title}
          classes={{ primary: 'text-13 common-list-item-text-primary truncate' }}
        />

        {item.badge && <CommonNavBadge className="ltr:ml-8 rtl:mr-8" badge={item.badge} />}
      </StyledListItem>
    ),
    [item.badge, item.icon, item.iconClass, item.target, item.title, item.url]
  );
}

CommonNavHorizontalLink.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    icon: PropTypes.string,
    url: PropTypes.string,
    target: PropTypes.string,
  }),
};

CommonNavHorizontalLink.defaultProps = {};

const NavHorizontalLink = withRouter(memo(CommonNavHorizontalLink));

export default NavHorizontalLink;
