import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import format from 'date-fns/format';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import { selectWidgets } from '../store/widgetsSlice';
import ChangeAccount from './ChangeAccount';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';

const columns = [
  '(v.1 - 5/11/23)',
  'START',
  'APPROVED',
  'FUNCTIONAL',
  'MICROSITE',
  'REMOVE',
  'REQUEST',
  'INVERTIGATE'
]
const rows = [
  {

    title: 'Vendor Names',
    start: 'data',
    approved: 'data',
    functional: 'data',
    microsite: 'data',
    remove: 'data',
    request: 'data',
    investigate: 'data',
  },
  {

    title: 'Tracker Names',
    start: 'data',
    approved: 'data',
    functional: 'data',
    microsite: 'data',
    remove: 'data',
    request: 'data',
    investigate: 'data',
  },
  {

    title: 'Page Sections',
    start: 'data',
    approved: 'data',
    functional: 'data',
    microsite: 'data',
    remove: 'data',
    request: 'data',
    investigate: 'data',
  },
  {

    title: 'Pages (Avg)',
    start: 'data',
    approved: 'data',
    functional: 'data',
    microsite: 'data',
    remove: 'data',
    request: 'data',
    investigate: 'data',
  },
  {
    title: 'Cookies (Avg)',
    start: 'data',
    approved: 'data',
    functional: 'data',
    microsite: 'data',
    remove: 'data',
    request: 'data',
    investigate: 'data',
  },
  {
    title: 'Total Pages (Avg)',
    start: 'data',
    approved: 'data',
    functional: 'data',
    microsite: 'data',
    remove: 'data',
    request: 'data',
    investigate: 'data',
  },

]

function RecentTransactionsWidget(props) {
  const widgets = useSelector(selectWidgets);
  const [selectedMonth, setSelectedMonth] = useState()


  return (
    <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
      <div className='flex flex-row flex-auto justify-between mx-16'>
        <div className="">
          <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
            Overview
          </Typography>
          <Typography className="font-medium" color="text.secondary">
            (Active Investigation by bd8645)
          </Typography>
        </div>

        <DateTimePicker
          views={['year', 'month']}
          openTo="month"
          size="small"
          value={selectedMonth}
          onChange={setSelectedMonth}
          slotProps={{
            textField: {
              helperText: 'MM/DD/YYYY',

            },
          }}
          renderInput={(_props) => (
            <TextField label="End" {..._props} />
          )}
        // minDate={start}
        />






      </div>

      <div className="table-responsive mt-24">
        <Table className="simple w-full min-w-full">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index}>
                  <Typography
                    color="text.secondary"
                    className="font-semibold text-12 whitespace-nowrap"
                  >
                    {column}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {Object.entries(row).map(([key, value]) => {
                  switch (key) {
                    case 'title': {
                      return (
                        <TableCell key={key} component="th" scope="row">
                          <Typography className="" >
                            {value}
                          </Typography>
                        </TableCell>
                      );
                    }
                    default: {
                      return (
                        <TableCell key={key} component="th" scope="row">
                          <Typography className="text-sm" color="text.secondary">{value}</Typography>
                        </TableCell>
                      );
                    }
                  }
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <div className="pt-24">
          <Button variant="outlined">See all transactions</Button>
        </div> */}
      </div>
    </Paper>
  );
}

export default memo(RecentTransactionsWidget);
