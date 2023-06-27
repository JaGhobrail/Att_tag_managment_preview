import NavLinkAdapter from 'src/@common/core/NavLinkAdapter';
import { alpha, styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import CommonNavBadge from '../../CommonNavBadge';
import CommonSvgIcon from '../../../CommonSvgIcon';
import { ArrowRight } from '@mui/icons-material';

const Root = styled(ListItem)(({ theme, ...props }) => ({
  minHeight: 44,
  width: '100%',
  borderRadius: '6px',
  margin: '0 0 4px 0',
  paddingRight: 16,
  paddingLeft: props.itempadding > 80 ? 80 : props.itempadding,
  paddingTop: 10,
  paddingBottom: 10,
  color: alpha(theme.palette.text.primary, 0.7),
  cursor: 'pointer',
  textDecoration: 'none!important',
  '&:hover': {
    color: theme.palette.text.primary,
  },
  '&.active': {
    color: '#fff',
    backgroundColor:
      theme.palette.mode === 'light'
        ? 'rgb(0, 87, 184)!important'
        : 'rgba(255, 255, 255, .1)!important',
    pointerEvents: 'none',
    transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
    '& > .common-list-item-text-primary': {
      color: 'inherit',
    },
    '& > .common-list-item-icon': {
      color: 'inherit',
    },
  },
  '& >.common-list-item-icon': {
    marginRight: 16,
    color: 'inherit',
  },
  '& > .common-list-item-text': {},
}));

function CommonNavVerticalItem(props) {
  const { item, nestedLevel, onItemClick } = props;

  const itempadding = nestedLevel > 0 ? 38 + nestedLevel * 16 : 16;

  return useMemo(
    () => (
      <Root
        button
        component={NavLinkAdapter}
        to={item.url || ''}
        activeClassName={item.url ? 'active' : ''}
        className={clsx('common-list-item', item.active && 'active')}
        onClick={() => onItemClick && onItemClick(item)}
        end={item.end}
        itempadding={itempadding}
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
          secondary={item.subtitle}
          classes={{
            primary: 'text-13 font-medium common-list-item-text-primary truncate',
            secondary: 'text-11 font-medium common-list-item-text-secondary leading-normal truncate',
          }}
        />
        <ArrowRight />
        {item.badge && <CommonNavBadge badge={item.badge} />}
      </Root>
    ),
    [item, itempadding, onItemClick]
  );
}

CommonNavVerticalItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    icon: PropTypes.string,
    url: PropTypes.string,
  }),
};

CommonNavVerticalItem.defaultProps = {};

const NavVerticalItem = CommonNavVerticalItem;

export default NavVerticalItem;
