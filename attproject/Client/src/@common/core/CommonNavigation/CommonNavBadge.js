import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { memo } from 'react';

const Root = styled('div')(({ theme }) => ({
  padding: '0 7px',
  fontSize: 11,
  fontWeight: 600,
  height: 20,
  minWidth: 20,
  borderRadius: 20,
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
}));

function CommonNavBadge(props) {
  const { className, badge } = props;

  return (
    <Root
      className={clsx('item-badge', className, badge?.classes)}
      style={{
        backgroundColor: badge.bg,
        color: badge.fg,
      }}
    >
      {badge.title}
    </Root>
  );
}

CommonNavBadge.propTypes = {
  badge: PropTypes.shape({
    title: PropTypes.node,
    bg: PropTypes.string,
    fg: PropTypes.string,
  }),
};
CommonNavBadge.defaultProps = {};

export default memo(CommonNavBadge);
