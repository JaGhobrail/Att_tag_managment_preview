import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import CommonSvgIcon from '@common/core/CommonSvgIcon';
import LinearProgress from '@mui/material/LinearProgress';
import { selectOverview } from '../store/Slice';

function BudgetWidget() {
  const widgets = useSelector(selectOverview);
  const { expenses, expensesLimit, savings, savingsGoal, bills, billsLimit } = widgets?.budget;

  function calcProgressVal(val, limit) {
    const percentage = (val * 100) / limit;

    return percentage > 100 ? 100 : percentage;
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-4 gap-24 w-full'>
      <Paper className="flex items-center space-x-8 p-16 shadow rounded-2xl overflow-hidden">
        <div className="flex items-center justify-center w-48 h-48 rounded bg-blue-100 text-blue-800 dark:bg-blue-600 dark:text-red-50">
          <CommonSvgIcon className="text-current">material-twotone:store</CommonSvgIcon>
        </div>
        <div className="flex-auto leading-none">
          <Typography className="text-12 font-medium" color="text.secondary">
            Current Vendor
          </Typography>
          <Typography className="font-medium text-20">
            123,456
          </Typography>

        </div>


      </Paper>
      <Paper className="flex items-center space-x-8 p-16 shadow rounded-2xl overflow-hidden">
        <div className="flex items-center justify-center w-48 h-48 rounded bg-green-100 text-green-800 dark:bg-green-600 dark:text-red-50">
          <CommonSvgIcon className="text-current">material-outline:apartment</CommonSvgIcon>
        </div>
        <div className="flex-auto leading-none">
          <Typography className="text-12 font-medium" color="text.secondary">
            Total Vendor
          </Typography>
          <Typography className="font-medium text-20">
            123,456
          </Typography>

        </div>


      </Paper>
      <Paper className="flex items-center space-x-8 p-16 shadow rounded-2xl overflow-hidden">
        <div className="flex items-center justify-center w-48 h-48 rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-red-50">
          <CommonSvgIcon className="text-current">feather:file-minus</CommonSvgIcon>
        </div>
        <div className="flex-auto leading-none">
          <Typography className="text-12 font-medium" color="text.secondary">
            Total Open Requests
          </Typography>
          <Typography className="font-medium text-20">
            123,456
          </Typography>

        </div>

      </Paper>
      <Paper className="flex items-center space-x-8 p-16 shadow rounded-2xl overflow-hidden">
        <div className="flex items-center justify-center w-48 h-48 rounded bg-red-100 text-red-800 dark:bg-red-600 dark:text-red-50">
          <CommonSvgIcon className="text-current">feather:trash</CommonSvgIcon>
        </div>
        <div className="flex-auto leading-none">
          <Typography className="text-12 font-medium" color="text.secondary">
            Total Open Removes
          </Typography>
          <Typography className="font-medium text-20">
            123,456
          </Typography>

        </div>


      </Paper>

    </div>

  );
}

export default memo(BudgetWidget);
