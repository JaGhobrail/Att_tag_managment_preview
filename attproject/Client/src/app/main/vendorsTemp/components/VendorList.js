import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectOverview, getOverview } from '../store/Slice';
import { Button, IconButton, InputAdornment, TableContainer, TablePagination, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import SelectResult from './SelectResult';
import { Download, Edit, Web, Link, Save, Delete, LocalOfferOutlined } from '@mui/icons-material';
import NoteCompose from './NoteCompose'


const columns = [
  { id: 'vendor_parent', label: 'Vendor Parent' },
  { id: 'vendor_name', label: 'Vendor Name' },
  { id: 'result', label: 'Result' },
  { id: 'notes', label: 'Notes' },
  { id: 'action', label: 'Action' },

];

const rows = [
  { id: '1', vendor_parent: 'arkoselabs.com', vendor_name: 'arkoselabs.com', result: 'Investigate', notes: 'last nots', action: '' },
  { id: '2', vendor_parent: 'arkoselabs.com', vendor_name: 'arkoselabs.com', result: 'Investigate', notes: 'last nots', action: '' },
  { id: '3', vendor_parent: 'arkoselabs.com', vendor_name: 'arkoselabs.com', result: 'Investigate', notes: 'last nots', action: '' },
  { id: '4', vendor_parent: 'arkoselabs.com', vendor_name: 'arkoselabs.com', result: 'Investigate', notes: 'last nots', action: '' },
  { id: '5', vendor_parent: 'arkoselabs.com', vendor_name: 'arkoselabs.com', result: 'Investigate', notes: 'last nots', action: '' },
  { id: '6', vendor_parent: 'arkoselabs.com', vendor_name: 'arkoselabs.com', result: 'Investigate', notes: 'last nots', action: '' },
  { id: '7', vendor_parent: 'arkoselabs.com', vendor_name: 'arkoselabs.com', result: 'Investigate', notes: 'last nots', action: '' },
  { id: '8', vendor_parent: 'arkoselabs.com', vendor_name: 'arkoselabs.com', result: 'Investigate', notes: 'last nots', action: '' },
  { id: '9', vendor_parent: 'arkoselabs.com', vendor_name: 'arkoselabs.com', result: 'Investigate', notes: 'last nots', action: '' },
  { id: '10', vendor_parent: 'arkoselabs.com', vendor_name: 'arkoselabs.com', result: 'Investigate', notes: 'last nots', action: '' },
  { id: '11', vendor_parent: 'arkoselabs.com', vendor_name: 'arkoselabs.com', result: 'Investigate', notes: 'last nots', action: '' },
];


function OverViewInvestigateWidget(props) {
  const widgets = useSelector(selectOverview);
  const [selectedMonth, setSelectedMonth] = useState()

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };




  return (
    <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
      <div className='flex flex-col md:flex-row flex-auto justify-between mx-16'>
        <div className="">
          <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
            Vendor Investigation:List For selectedDate
          </Typography>
          <Typography className="font-medium" color="text.secondary">
            Consumer on att.com
          </Typography>
        </div>
        <div className='flex justify-center items-center space-x-8 '>
          <Button size='small' endIcon={<Download />} color="secondary" variant="contained">Export</Button>
          <Button size='small' endIcon={<Save />} color="secondary" variant="contained">Save</Button>
          <Button size='small' endIcon={<Delete />} color="secondary" variant="contained">Clear All</Button>

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
      </div>
      <TableContainer className=' w-full h-full my-16'
        sx={{ maxHeight: 400 }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  size='small'
                  key={column.id}
                  // align={column.align}
                  // style={{ minWidth: column.minWidth }}
                  style={{ minWidth: 150 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                    <TableCell size='small' style={{ minWidth: 150 }}>{row.vendor_parent}</TableCell>
                    <TableCell size='small' style={{ minWidth: 150 }}>{row.vendor_name}</TableCell>
                    <TableCell size='small' style={{ minWidth: 150 }} >
                      <SelectResult />
                    </TableCell>
                    <TableCell size='small' style={{ minWidth: 150 }}>
                      <NoteCompose />
                    </TableCell>
                    <TableCell size='small' style={{ minWidth: 150 }}>
                      <IconButton>
                        <LocalOfferOutlined fontSize='small' />
                      </IconButton>
                      <IconButton>
                        <Web fontSize='small' />
                      </IconButton>
                      <IconButton>
                        <Link fontSize='small' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination

        size='small'
        rowsPerPageOptions={[10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      // onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper >
  );
}

export default memo(OverViewInvestigateWidget);
