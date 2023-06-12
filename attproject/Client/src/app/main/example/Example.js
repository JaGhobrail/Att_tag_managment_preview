import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import CommonPageSimple from 'src/@common/core/CommonPageSimple';
import DemoContent from 'src/@common/core/DemoContent';

const Root = styled(CommonPageSimple)(({ theme }) => ({
  '& .CommonPageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
  },
  '& .CommonPageSimple-toolbar': {},
  '& .CommonPageSimple-content': {},
  '& .CommonPageSimple-sidebarHeader': {},
  '& .CommonPageSimple-sidebarContent': {},
}));

function ExamplePage(props) {
  const { t } = useTranslation('examplePage');

  return (
    <Root
      header={
        <div className="p-24">
          <h4>{t('TITLE')}</h4>
        </div>
      }
      content={
        <div className="p-24">
          <h4>Content</h4>
          <br />
          <DemoContent />
        </div>
      }
      scroll="content"
    />
  );
}

export default ExamplePage;
