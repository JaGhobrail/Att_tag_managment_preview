import CommonScrollbars from 'src/@common/core/CommonScrollbars';
import { styled, useTheme } from '@mui/material/styles';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import clsx from 'clsx';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonNavigation from 'src/@common/core/CommonNavigation';
import { navbarCloseMobile } from 'app/store/common/navbarSlice';
import { selectContrastMainTheme } from 'app/store/common/settingsSlice';
import { useLocation } from 'react-router-dom';
import useThemeMediaQuery from 'src/@common/hooks/useThemeMediaQuery';
import { selectNavigation } from 'app/store/common/navigationSlice';

const Root = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

const StyledPanel = styled(CommonScrollbars)(({ theme, opened }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  transition: theme.transitions.create(['opacity'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shortest,
  }),
  opacity: 0,
  pointerEvents: 'none',
  ...(opened && {
    opacity: 1,
    pointerEvents: 'initial',
  }),
}));

function needsToBeOpened(location, item) {
  return location && isUrlInChildren(item, location.pathname);
}

function isUrlInChildren(parent, url) {
  if (!parent.children) {
    return false;
  }

  for (let i = 0; i < parent.children.length; i += 1) {
    if (parent.children[i].children) {
      if (isUrlInChildren(parent.children[i], url)) {
        return true;
      }
    }
    if (parent.children[i].url === url || url.includes(parent.children[i].url)) {
      return true;
    }
  }

  return false;
}

function NavbarStyle3Content(props) {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const navigation = useSelector(selectNavigation);
  const [selectedNavigation, setSelectedNavigation] = useState([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const contrastTheme = useSelector(selectContrastMainTheme(theme.palette.primary.main));
  const location = useLocation();

  useEffect(() => {
    navigation?.forEach((item) => {
      if (needsToBeOpened(location, item)) {
        setSelectedNavigation([item]);
      }
    });
  }, [navigation, location]);

  function handleParentItemClick(selected) {
    /** if there is no child item do not set/open panel
     */
    if (!selected.children) {
      setSelectedNavigation([]);
      setPanelOpen(false);
      return;
    }

    /**
     * If navigation already selected toggle panel visibility
     */
    if (selectedNavigation[0]?.id === selected.id) {
      setPanelOpen(!panelOpen);
    } else {
      /**
       * Set navigation and open panel
       */
      setSelectedNavigation([selected]);
      setPanelOpen(true);
    }
  }

  function handleChildItemClick(selected) {
    setPanelOpen(false);
    if (isMobile) {
      dispatch(navbarCloseMobile());
    }
  }

  return (
    <ClickAwayListener onClickAway={() => setPanelOpen(false)}>
      <Root className={clsx('flex flex-auto flex h-full', props.className)}>
        <div id="common-navbar-side-panel" className="flex shrink-0 flex-col items-center">
          <img className="w-44 my-32" src="assets/images/logo/logo.svg" alt="logo" />

          <CommonScrollbars
            className="flex flex-1 min-h-0 justify-center w-full overflow-y-auto overflow-x-hidden"
            option={{ suppressScrollX: true, wheelPropagation: false }}
          >
            <CommonNavigation
              className={clsx('navigation')}
              navigation={navigation}
              layout="vertical-2"
              onItemClick={handleParentItemClick}
              firstLevel
              selectedId={selectedNavigation[0]?.id}
              dense={props.dense}
            />
          </CommonScrollbars>
        </div>

        {selectedNavigation.length > 0 && (
          <StyledPanel
            id="common-navbar-panel"
            opened={panelOpen}
            className={clsx('shadow-5 overflow-y-auto overflow-x-hidden')}
            option={{ suppressScrollX: true, wheelPropagation: false }}
          >
            <CommonNavigation
              className={clsx('navigation')}
              navigation={selectedNavigation}
              layout="vertical"
              onItemClick={handleChildItemClick}
            />
          </StyledPanel>
        )}
      </Root>
    </ClickAwayListener>
  );
}

export default memo(NavbarStyle3Content);
