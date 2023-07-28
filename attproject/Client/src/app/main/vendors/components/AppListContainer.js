import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TableContainer, TablePagination, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Download, Edit, Web, Link, Save, Delete, LocalOfferOutlined } from '@mui/icons-material';
import { clearAllDrafts, getItems, saveAllDrafts, selectAllItems, selectCurrentPage, selectHasDraftItem, selectPerPage, selectTotalPage } from '../store/Slice';
import AppList from './AppList';
import { object } from 'prop-types';


function AppListContainer(props) {
    const items = useSelector(selectAllItems);
    const dispatch = useDispatch()


    const perPage = useSelector(selectPerPage)
    const totalPage = useSelector(selectTotalPage)
    const currentPage = useSelector(selectCurrentPage)
    const hasDraftItem = useSelector(selectHasDraftItem)

    const [selectedMonth, setSelectedMonth] = useState()
    const [showClearDialog, setShowClearDialog] = useState(false)

    const _clearAllDrafts = async () => {
        try {
            await dispatch(clearAllDrafts())
            setShowClearDialog(false)
            dispatch(getItems())
        } catch (error) {

        }

    }

    const _saveAllDrafts = async () => {
        try {
            await dispatch(saveAllDrafts())
            dispatch(getItems())
        } catch (error) {

        }

    }

    useEffect(() => {
        if (selectedMonth) {
            const mDate = new Date(selectedMonth)
            dispatch(getItems({ scan_year: mDate.getFullYear(), scan_month: mDate.getMonth() }));
        } else
            dispatch(getItems());

    }, [selectedMonth]);

    return (
        <>
            <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
                <div className='flex flex-col md:flex-row flex-auto justify-between mx-16'>
                    <div className="">
                        <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
                            Vendor Investigation:List For
                        </Typography>
                        <Typography className="font-medium" color="text.secondary">
                            Consumer on att.com
                        </Typography>
                    </div>
                    <div className='flex justify-center items-center space-x-8 '>
                        <Button disabled={!hasDraftItem} size='small' endIcon={<Download />} color="secondary" variant="contained">Export</Button>
                        <Button onClick={_saveAllDrafts} size='small' endIcon={<Save />} color="secondary" variant="contained">Save</Button>
                        <Button onClick={() => setShowClearDialog(true)} size='small' endIcon={<Delete />} color="secondary" variant="contained">Clear All</Button>

                        <DateTimePicker
                            className='w-full md:w-auto'
                            views={['year', 'month']}
                            openTo="month"
                            size="small"
                            // format="MM/yyyy"
                            inputFormat="MM/yyyy"
                            value={selectedMonth}
                            onChange={setSelectedMonth}
                            // slotProps={{
                            //     textField:
                            //     {
                            //         helperText: 'MM/DD/YYYY',
                            //         format: "MM/yyyy"
                            //     },
                            // }}
                            renderInput={(_props) =>
                                (<TextField size="small" label="End" {..._props} />)
                            }
                        />
                    </div>
                </div>
                <AppList />
                {/* <TablePagination
        size='small'
        rowsPerPageOptions={[10]}
        component="div"
        count={items.length}
        rowsPerPage={perPage}
        page={currentPage}
        onPageChange={handleChangePage}
      /> */}

            </Paper >
            <Dialog
                open={showClearDialog}
                onClose={() => setShowClearDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Warning
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are You Sure you want to clear ALL Draft Changes?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setShowClearDialog(false)
                    }} autoFocus>No</Button>
                    <Button onClick={_clearAllDrafts} >Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default memo(AppListContainer);
