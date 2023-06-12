import NavLinkAdapter from 'src/@common/core/NavLinkAdapter';
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

function CommonNavHorizontalItem(props) {
  const { item } = props;

  return useMemo(
    () => (
      <StyledListItem
        button
        component={NavLinkAdapter}
        to={item.url || ''}
        activeClassName={item.url ? 'active' : ''}
        className={clsx('common-list-item', item.active && 'active')}
        end={item.end}
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
    [item.badge, item.exact, item.icon, item.iconClass, item.title, item.url]
  );
}

CommonNavHorizontalItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    icon: PropTypes.string,
    url: PropTypes.string,
  }),
};

CommonNavHorizontalItem.defaultProps = {};

const NavHorizontalItem = withRouter(memo(CommonNavHorizontalItem));

export default NavHorizontalItem;
