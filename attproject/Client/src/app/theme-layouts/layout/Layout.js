import CommonDialog from '@common/core/CommonDialog';
import { styled } from '@mui/material/styles';
import Message from '@common/core/Message';
import CommonSuspense from '@common/core/CommonSuspense';
import AppContext from 'app/AppContext';
import { memo, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { selectCommonCurrentLayoutConfig } from 'app/store/common/settingsSlice';
// import FooterLayout from './components/FooterLayout';
import LeftSideLayout from './components/LeftSideLayout';
import NavbarWrapperLayout from './components/NavbarWrapperLayout';
import RightSideLayout from './components/RightSideLayout';
import ToolbarLayout from './components/ToolbarLayout';
import SettingsPanel from '../shared-components/SettingsPanel';

const Root = styled('div')(({ theme, config }) => ({
  ...(config.mode === 'boxed' && {
    clipPath: 'inset(0)',
    maxWidth: `${config.containerWidth}px`,
    margin: '0 auto',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  }),
  ...(config.mode === 'container' && {
    '& .container': {
      maxWidth: `${config.containerWidth}px`,
      width: '100%',
      margin: '0 auto',
    },
  }),
}));

function Layout(props) {
  const config = useSelector(selectCommonCurrentLayoutConfig);
  const appContext = useContext(AppContext);
  const { routes } = appContext;

  return (
    <Root id="common-layout" config={config} className="w-full flex">
      {config.leftSidePanel.display && <LeftSideLayout />}

      <div className="flex flex-auto min-w-0">
        {config.navbar.display && config.navbar.position === 'left' && <NavbarWrapperLayout />}

        <main id="common-main" className="flex flex-col flex-auto min-h-full min-w-0 relative z-10">
          {config.toolbar.display && (
            <ToolbarLayout className={config.toolbar.style === 'fixed' && 'sticky top-0'} />
          )}

          {/* <div className="sticky top-0 z-99">
            <SettingsPanel />
          </div> */}

          <div className="flex flex-col flex-auto min-h-0 relative z-10">
            <CommonDialog />

            <CommonSuspense>{useRoutes(routes)}</CommonSuspense>

            {props.children}
          </div>

          {/* {config.footer.display && (
            <FooterLayout className={config.footer.style === 'fixed' && 'sticky bottom-0'} />
          )} */}
        </main>

        {config.navbar.display && config.navbar.position === 'right' && <NavbarWrapperLayout />}
      </div>

      {config.rightSidePanel.display && <RightSideLayout />}
      <Message />
    </Root>
  );
}

export default memo(Layout);
