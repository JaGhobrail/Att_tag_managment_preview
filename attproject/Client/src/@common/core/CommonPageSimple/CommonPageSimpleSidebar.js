import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import clsx from 'clsx';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import CommonPageSimpleSidebarContent from './CommonPageSimpleSidebarContent';

const CommonPageSimpleSidebar = forwardRef((props, ref) => {
  const { open, position, variant, rootRef, sidebarWidth } = props;

  const [isOpen, setIsOpen] = useState(open);

  useImperativeHandle(ref, () => ({
    toggleSidebar: handleToggleDrawer,
  }));

  const handleToggleDrawer = useCallback((val) => {
    setIsOpen(val);
  }, []);

  useEffect(() => {
    handleToggleDrawer(open);
  }, [handleToggleDrawer, open]);

  return (
    <>
      <Hidden lgUp={variant === 'permanent'}>
        <SwipeableDrawer
          variant="temporary"
          anchor={position}
          open={isOpen}
          onOpen={(ev) => { }}
          onClose={() => props?.onClose()}
          disableSwipeToOpen
          classes={{
            root: clsx('CommonPageSimple-sidebarWrapper', variant),
            paper: clsx(
              'CommonPageSimple-sidebar',
              variant,
              position === 'left' ? 'CommonPageSimple-leftSidebar' : 'CommonPageSimple-rightSidebar'
            ),
          }}
          sx={{
            '& .MuiPaper-root': {
              width: sidebarWidth,
              maxWidth: '100%',
            },
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          // container={rootRef.current}
          BackdropProps={{
            classes: {
              root: 'CommonPageSimple-backdrop',
            },
          }}
          style={{ position: 'absolute' }}
        >
          <CommonPageSimpleSidebarContent {...props} />
        </SwipeableDrawer>
      </Hidden>

      {variant === 'permanent' && (
        <Hidden lgDown>
          <Drawer
            variant="permanent"
            anchor={position}
            className={clsx(
              'CommonPageSimple-sidebarWrapper',
              variant,
              isOpen ? 'opened' : 'closed',
              position === 'left' ? 'CommonPageSimple-leftSidebar' : 'CommonPageSimple-rightSidebar'
            )}
            open={isOpen}
            onClose={props?.onClose}
            classes={{
              paper: clsx('CommonPageSimple-sidebar border-0', variant),
            }}
          >
            <CommonPageSimpleSidebarContent {...props} />
          </Drawer>
        </Hidden>
      )}
    </>
  );
});

CommonPageSimpleSidebar.defaultProps = {
  open: true,
};

export default CommonPageSimpleSidebar;
