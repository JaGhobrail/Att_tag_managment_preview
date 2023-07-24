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
import { Button, IconButton, TableContainer } from '@mui/material';
import { Download, Edit, Web, Link, Save, Delete, LocalOfferOutlined, Home } from '@mui/icons-material';
import NoteCompose from './DarftDialog/NoteCompose'
import { selectAllItems } from '../store/Slice';
import { makeStyles } from '@mui/styles';
import ResultDialog from './DarftDialog/ResultDialog'
import NotesDialog from './DarftDialog/NotesDialog';
import PAGEURLDialog from './DarftDialog/UrlDialog';
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
                        {

                            //   Object.keys(items[0]).reduce((acc, key) => {
                            //     if (!Array.isArray(dataObject[key])) {
                            //       acc[key] = dataObject[key];
                            //     }
                            //     return acc;
                            //   }, {})
                            items?.length > 0 ? Object.entries(items[0]).map(([key, value]) => {
                                // You can perform any operation you want on the key and value here

                                return <TableCell
                                    key={key}
                                    size='small'
                                    style={{ minWidth: 120 }}>
                                    {key}
                                </TableCell>
                            }) : <></>
                            // <TableCell
                            //     size='small'
                            //     style={{ minWidth: 120 }}>
                            //     VENDOR NAME
                            // </TableCell>
                        }
                        {/* <TableCell
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
                            style={{ minWidth: 120 }}>
                            PAGE SECTION
                        </TableCell>

                        <TableCell
                            size='small'
                            align='center'
                            style={{ minWidth: 120 }}>
                            PAGE URLS
                        </TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        items.map((item, index) => {
                            return (
                                <TableRow
                                    className='even:bg-grey-100'
                                    tabIndex={-1}
                                    key={item.id} >
                                    {
                                        Object.entries(item).map(([key, value]) =>
                                        (<TableCell
                                            key={key}
                                            size='small'
                                            style={{ minWidth: 120 }}>
                                            {(!Array.isArray(value)) ? <PAGEURLDialog item={value} /> : <></>}
                                        </TableCell>))
                                    }
                                    <></>

                                </TableRow>
                            )
                        })}
                </TableBody>
            </Table>
        </TableContainer>);
}

export default memo(AppList);
