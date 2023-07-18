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
import { Button, IconButton, TableContainer, TablePagination, TextField, Tooltip } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Web, Link, Home } from '@mui/icons-material';
import { selectAllItems } from '../store/Slice';
import { makeStyles } from '@mui/styles';
import ResultDialog from './DarftDialog/ResultDialog'
import NotesDialog from './DarftDialog/NotesDialog';
import { useNavigate } from 'react-router-dom';


function AppList(props) {
    const items = useSelector(selectAllItems);
    const [opendialog, setOpendialog] = useState(false)
    const navigate = useNavigate()
    const useStyles = makeStyles({
        tableCell: {
            maxHeight: '6em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: 1.2,
            minWidth: 150
        },
    });

    return (
        <TableContainer className=' w-full h-full my-16' sx={{ maxHeight: 400 }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell
                            size='small'
                            style={{ minWidth: 120 }}>
                            VENDOR NAME
                        </TableCell>
                        <TableCell
                            size='small'
                            style={{ minWidth: 120 }}>
                            TRACKER NAME
                        </TableCell>
                        <TableCell
                            size='small'
                            style={{ minWidth: 120 }}>
                            TRACKER DOMAIN
                        </TableCell>
                        <TableCell
                            size='small'
                            style={{ minWidth: 120 }}>
                            RESULT
                        </TableCell>
                        <TableCell
                            size='small'
                            style={{ minWidth: 150 }}>
                            NOTES
                        </TableCell>
                        <TableCell
                            size='small'
                            align='center'
                            style={{ minWidth: 200 }}>
                            ACTION
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        items.map((item, index) => {
                            return (
                                <TableRow
                                    onClick={() => { setOpendialog(true) }}
                                    className='even:bg-grey-100'
                                    tabIndex={-1}
                                    key={item.id} >
                                    <TableCell size='small' style={{ minWidth: 100 }} key={'vendor_name'}>{item.vendor_name}</TableCell>
                                    <TableCell size='small' style={{ minWidth: 100 }} key={'tracker_name'}>{item.tracker_name}</TableCell>
                                    <TableCell size='small' style={{ minWidth: 100 }} key={'tracker_domain'}>{item.tracker_domain}</TableCell>

                                    <TableCell size='small' style={{ maxWidth: 150 }} key={'result'}>
                                        <ResultDialog item={item} />
                                    </TableCell>
                                    <TableCell size='small' style={{ minWidth: 150 }} key={'notes'}>
                                        <NotesDialog item={item} />
                                    </TableCell>
                                    <TableCell size='small' style={{ minWidth: 150 }} align='center' key={'action'} >
                                        <IconButton key={'vendors'} onClick={() => navigate(`/vendors?trakcer=${item.vendor_name}`)}>
                                            <Home fontSize='small' />
                                        </IconButton>
                                        <IconButton key={'page'} onClick={() => navigate(`/page-sections?vendor=${item.vendor_name}`)}>
                                            <Web fontSize='small' />
                                        </IconButton>
                                        <IconButton key={'link'} onClick={() => navigate(`/page-urls?vendor=${item.vendor_name}`)}>
                                            <Link fontSize='small' />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </TableContainer>);
}

export default memo(AppList);
