import { useSelector } from 'react-redux';
import CommonScrollbars from 'src/@common/core/CommonScrollbars';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { selectContrastMainTheme } from 'app/store/common/settingsSlice';
import clsx from 'clsx';

function CommonPageSimpleSidebarContent(props) {
  const theme = useTheme();
  const contrastTheme = useSelector(selectContrastMainTheme(theme.palette.primary.main));

  return (
    <CommonScrollbars enable={props.innerScroll}>
      {props.header && (
        <ThemeProvider theme={contrastTheme}>
          <div className={clsx('CommonPageSimple-sidebarHeader', props.variant)}>{props.header}</div>
        </ThemeProvider>
      )}

      {props.content && <div className="CommonPageSimple-sidebarContent">{props.content}</div>}
    </CommonScrollbars>
  );
}

export default CommonPageSimpleSidebarContent;
