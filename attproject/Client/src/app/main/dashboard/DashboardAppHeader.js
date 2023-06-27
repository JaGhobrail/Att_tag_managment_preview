import Typography from '@mui/material/Typography';
import ChangeAccount from 'app/theme-layouts/shared-components/ChangeAccount';
function DashboardAppHeader(props) {
  return (

    <div className="flex w-auto container bg-hbg py-16">
      <div className="flex flex-col sm:flex-row  flex-auto sm:items-center justify-between min-w-0 p-24 md:p-32 pb-0 md:pb-0">
        <div className="flex flex-col">
          <Typography className="text-3xl font-semibold tracking-tight leading-8 text-white">
            AdTech Dashboard for
          </Typography>
          <Typography className="text-xl font-medium tracking-tight text-grey-400">
            Consumer on  att.com
          </Typography>
        </div>
        <div className='absolute top-8 right-8'>
          <ChangeAccount />
        </div>

      </div>
    </div>
  );
}

export default DashboardAppHeader;
