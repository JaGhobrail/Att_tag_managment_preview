import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentSettings, setDefaultSettings } from 'app/store/common/settingsSlice';
import _ from '@lodash';
import useThemeMediaQuery from 'src/@common/hooks/useThemeMediaQuery';
import { navbarToggle, navbarToggleMobile } from 'app/store/common/navbarSlice';
import CommonSvgIcon from '@common/core/CommonSvgIcon';

function NavbarToggleButton(props) {
  const dispatch = useDispatch();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const settings = useSelector(selectCurrentSettings);
  const { config } = settings.layout;

  return (
    <IconButton
      className={props.className}
      color="inherit"
      size="small"
      onClick={(ev) => {
        if (isMobile) {
          dispatch(navbarToggleMobile());
        } else if (config.navbar.style === 'style-2') {
          dispatch(
            setDefaultSettings(
              _.set({}, 'layout.config.navbar.folded', !settings.layout.config.navbar.folded)
            )
          );
        } else {
          dispatch(navbarToggle());
        }
      }}
    >
      {props.children}
    </IconButton>
  );
}

NavbarToggleButton.defaultProps = {
  children: (
    <CommonSvgIcon size={20} color="action">
      heroicons-outline:view-list
    </CommonSvgIcon>
  ),
};

export default NavbarToggleButton;
