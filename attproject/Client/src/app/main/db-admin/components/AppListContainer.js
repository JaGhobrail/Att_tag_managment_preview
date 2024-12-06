import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TableContainer, TablePagination, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Download, Edit, Web, Link, Save, Delete, LocalOfferOutlined, TableChart } from '@mui/icons-material';
import { clearAllDrafts, getItems, saveAllDrafts, selectAllItems, selectCurrentPage, selectHasDraftItem, selectPerPage, selectTotalPage } from '../store/Slice';
import AppList from './AppList';
import { object } from 'prop-types';
import AppConfig from '../AppConfig';
import CommonSelect from '@common/core/CommonSelect';
import { useSearchParams } from 'react-router-dom';
import { selectVendorsName } from 'app/store/common/sharedSlice';

const tables = ["users", "vendors", "trackers", "pageSections"]

function AppListContainer(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const vendorsName = useSelector(selectVendorsName)

    const items = useSelector(selectAllItems);
    const dispatch = useDispatch()


    const perPage = useSelector(selectPerPage)
    const totalPage = useSelector(selectTotalPage)
    const currentPage = useSelector(selectCurrentPage)
    const hasDraftItem = useSelector(selectHasDraftItem)

    const [selectedMonth, setSelectedMonth] = useState()
    const [selectedTable, setSelectedTable] = useState(tables[0])
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
        const vName = searchParams.get('vendor')
        if (vName)
            dispatch(getItems({ vendor_name: vName }));
        else
            dispatch(getItems());
    }, [searchParams])

    return (
        <>
            <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
                <div className='flex flex-col md:flex-row flex-auto justify-between mx-16'>
                    <div className="space-x-4">
                        {tables.map(item => {
                            return <Button onClick={() => setSelectedTable(item)} size='small' endIcon={<TableChart />} color="secondary" variant={selectedTable == item ? "contained" : "outlined"}>{item}</Button>
                        })}


                        {/* <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
                            {AppConfig.settings.name}
                        </Typography>
                        <Typography className="font-medium" color="text.secondary">
                            Consumer on att.com
                        </Typography> */}
                    </div>
                    {/* <div className='flex justify-center items-center space-x-8 '>
                        <Button disabled={!hasDraftItem} size='small' endIcon={<Download />} color="secondary" variant="contained">Export</Button>
                        <Button onClick={_saveAllDrafts} size='small' endIcon={<Save />} color="secondary" variant="contained">Save</Button>
                        <Button onClick={() => setShowClearDialog(true)} size='small' endIcon={<Delete />} color="secondary" variant="contained">Clear All</Button>

                        <CommonSelect
                            items={vendorsName ?? []}
                            selectedItem={searchParams.get('vendor') ?? ''}
                            setSelectedItme={(value) => {
                                searchParams.set('vendor', value);
                                setSearchParams(searchParams);
                            }}
                            title="Vendor Name" />
                    </div> */}
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
            {/* <Dialog
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
            </Dialog> */}
        </>
    );
}

export default memo(AppListContainer);
