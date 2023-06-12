import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CommonSvgIcon from '@common/core/CommonSvgIcon';

function DashboardAppHeader(props) {
  return (
    <div className="flex w-full container">
      <div className="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 p-24 md:p-32 pb-0 md:pb-0">
        <div className="flex flex-col flex-auto">
          <Typography className="text-3xl font-semibold tracking-tight leading-8">
            Dashboard
          </Typography>
          <Typography className="font-medium tracking-tight" color="text.secondary">
            Keep track of your financial status
          </Typography>
        </div>
        <div className="flex items-center mt-24 sm:mt-0 sm:mx-8 space-x-12">
          <Button
            className="whitespace-nowrap"
            startIcon={<CommonSvgIcon size={20}>heroicons-solid:document-report</CommonSvgIcon>}
          >
            Reports
          </Button>
          <Button
            className="whitespace-nowrap"
            startIcon={<CommonSvgIcon size={20}>heroicons-solid:cog</CommonSvgIcon>}
          >
            Settings
          </Button>
          <Button
            className="whitespace-nowrap"
            variant="contained"
            color="secondary"
            startIcon={<CommonSvgIcon size={20}>heroicons-solid:save</CommonSvgIcon>}
          >
            Export
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DashboardAppHeader;
