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
import { selectOverview, getOverview } from '../store/Slice';
import { TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Summary, Summaryheader } from './sampleData'

const columns = [
  'Found to Review',
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
    start: '129',
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

function OverViewInvestigateWidget(props) {
  const widgets = useSelector(selectOverview);
  const [selectedMonth, setSelectedMonth] = useState()


  return (
    <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
      <div className='flex flex-col md:flex-row flex-auto justify-between mx-16'>
        <div className="">
          <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
            Overview
          </Typography>
          <Typography className="font-medium" color="text.secondary">
            (Active Investigation by bd8645)
          </Typography>
        </div>

        <DateTimePicker
          className='w-full md:w-auto'
          views={['year', 'month']}
          openTo="month"
          size="small"
          format="MM/yyyy"
          inputFormat="yyyy-MMMM"
          value={selectedMonth}
          onChange={setSelectedMonth}
          slotProps={{
            textField: {
              helperText: 'MM/DD/YYYY',
              format: "MM/yyyy"
            },
          }}
          renderInput={(_props) =>
            (<TextField size="small" label="End" {..._props} />)
          }
        />

      </div>

      <div className="table-responsive mt-24">
        <Table className="simple w-full min-w-full">
          <TableHead>
            <TableRow>
              {
                Summaryheader.map(
                  (column, index) => (
                    <TableCell key={index}>
                      <Typography
                        color="text.secondary"
                        className="font-semibold text-12 whitespace-nowrap"
                      >
                        {column}
                      </Typography>
                    </TableCell>
                  )
                )
              }
              {/* {columns.map((column, index) => (
                <TableCell key={index}>
                  <Typography
                    color="text.secondary"
                    className="font-semibold text-12 whitespace-nowrap"
                  >
                    {column}
                  </Typography>
                </TableCell>
              ))} */}
            </TableRow>
          </TableHead>

          <TableBody>
            {Summary.map((row, index) => (
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
      </div>
    </Paper>
  );
}

export default memo(OverViewInvestigateWidget);
