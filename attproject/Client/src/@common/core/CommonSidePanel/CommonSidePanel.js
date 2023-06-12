import CommonScrollbars from 'src/@common/core/CommonScrollbars';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Tooltip from '@mui/material/Tooltip';
import clsx from 'clsx';
import { memo, useState } from 'react';
import CommonSvgIcon from '../CommonSvgIcon';

const Root = styled('div')(({ theme }) => ({
  '& .CommonSidePanel-paper': {
    display: 'flex',
    width: 56,
    transition: theme.transitions.create(['transform', 'width', 'min-width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter,
    }),
    paddingBottom: 64,
    height: '100%',
    maxHeight: '100vh',
    position: 'sticky',
    top: 0,
    zIndex: 999,
    '&.left': {
      '& .CommonSidePanel-buttonWrapper': {
        left: 0,
        right: 'auto',
      },
      '& .CommonSidePanel-buttonIcon': {
        transform: 'rotate(0deg)',
      },
    },
    '&.right': {
      '& .CommonSidePanel-buttonWrapper': {
        right: 0,
        left: 'auto',
      },
      '& .CommonSidePanel-buttonIcon': {
        transform: 'rotate(-180deg)',
      },
    },
    '&.closed': {
      [theme.breakpoints.up('lg')]: {
        width: 0,
      },
      '&.left': {
        '& .CommonSidePanel-buttonWrapper': {
          justifyContent: 'start',
        },
        '& .CommonSidePanel-button': {
          borderBottomLeftRadius: 0,
          borderTopLeftRadius: 0,
          paddingLeft: 4,
        },
        '& .CommonSidePanel-buttonIcon': {
          transform: 'rotate(-180deg)',
        },
      },
      '&.right': {
        '& .CommonSidePanel-buttonWrapper': {
          justifyContent: 'flex-end',
        },
        '& .CommonSidePanel-button': {
          borderBottomRightRadius: 0,
          borderTopRightRadius: 0,
          paddingRight: 4,
        },
        '& .CommonSidePanel-buttonIcon': {
          transform: 'rotate(0deg)',
        },
      },
      '& .CommonSidePanel-buttonWrapper': {
        width: 'auto',
      },
      '& .CommonSidePanel-button': {
        backgroundColor: theme.palette.background.paper,
        borderRadius: 38,
        transition: theme.transitions.create(
          ['background-color', 'border-radius', 'width', 'min-width', 'padding'],
          {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }
        ),
        width: 24,
        '&:hover': {
          width: 52,
          paddingLeft: 8,
          paddingRight: 8,
        },
      },
      '& .CommonSidePanel-content': {
        opacity: 0,
      },
    },
  },

  '& .CommonSidePanel-content': {
    overflow: 'hidden',
    opacity: 1,
    transition: theme.transitions.create(['opacity'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.short,
    }),
  },

  '& .CommonSidePanel-buttonWrapper': {
    position: 'absolute',
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 0',
    width: '100%',
    minWidth: 56,
  },

  '& .CommonSidePanel-button': {
    padding: 8,
    width: 40,
    height: 40,
  },

  '& .CommonSidePanel-buttonIcon': {
    transition: theme.transitions.create(['transform'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.short,
    }),
  },

  '& .CommonSidePanel-mobileButton': {
    height: 40,
    position: 'absolute',
    zIndex: 99,
    bottom: 12,
    width: 24,
    borderRadius: 38,
    padding: 8,
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create(
      ['background-color', 'border-radius', 'width', 'min-width', 'padding'],
      {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
      }
    ),
    '&:hover': {
      width: 52,
      paddingLeft: 8,
      paddingRight: 8,
    },
    '&.left': {
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0,
      paddingLeft: 4,
      left: 0,
    },

    '&.right': {
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
      paddingRight: 4,
      right: 0,
      '& .CommonSidePanel-buttonIcon': {
        transform: 'rotate(-180deg)',
      },
    },
  },
}));

function CommonSidePanel(props) {
  const [opened, setOpened] = useState(props.opened);
  const [mobileOpen, setMobileOpen] = useState(false);

  function toggleOpened() {
    setOpened(!opened);
  }

  function toggleMobileDrawer() {
    setMobileOpen(!mobileOpen);
  }

  return (
    <Root>
      <Hidden lgDown>
        <Paper
          className={clsx(
            'CommonSidePanel-paper',
            props.className,
            opened ? 'opened' : 'closed',
            props.position,
            'shadow-lg'
          )}
          square
        >
          <CommonScrollbars className={clsx('content', 'CommonSidePanel-content')}>
            {props.children}
          </CommonScrollbars>

          <div className="CommonSidePanel-buttonWrapper">
            <Tooltip
              title="Toggle side panel"
              placement={props.position === 'left' ? 'right' : 'right'}
            >
              <IconButton
                className="CommonSidePanel-button"
                onClick={toggleOpened}
                disableRipple
                size="large"
              >
                <CommonSvgIcon className="CommonSidePanel-buttonIcon">
                  heroicons-outline:chevron-left
                </CommonSvgIcon>
              </IconButton>
            </Tooltip>
          </div>
        </Paper>
      </Hidden>
      <Hidden lgUp>
        <SwipeableDrawer
          classes={{
            paper: clsx('CommonSidePanel-paper', props.className),
          }}
          anchor={props.position}
          open={mobileOpen}
          onOpen={(ev) => { }}
          onClose={toggleMobileDrawer}
          disableSwipeToOpen
        >
          <CommonScrollbars className={clsx('content', 'CommonSidePanel-content')}>
            {props.children}
          </CommonScrollbars>
        </SwipeableDrawer>

        <Tooltip title="Hide side panel" placement={props.position === 'left' ? 'right' : 'right'}>
          <Fab
            className={clsx('CommonSidePanel-mobileButton', props.position)}
            onClick={toggleMobileDrawer}
            disableRipple
          >
            <CommonSvgIcon className="CommonSidePanel-buttonIcon">
              heroicons-outline:chevron-right
            </CommonSvgIcon>
          </Fab>
        </Tooltip>
      </Hidden>
    </Root>
  );
}

CommonSidePanel.propTypes = {};
CommonSidePanel.defaultProps = {
  position: 'left',
  opened: true,
};

export default memo(CommonSidePanel);
