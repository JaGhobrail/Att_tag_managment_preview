import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Download, Edit, Web, Link, Save, Delete, LocalOfferOutlined } from '@mui/icons-material';
import { getItems, selectAllItems, selectCurrentPage, selectHasDraftItem, selectPerPage, selectTotalPage } from '../store/Slice';
import AppList from './AppList';
import CommonSelect from '@common/core/CommonSelect';
import { selectVendorsName } from 'app/store/common/sharedSlice';
import { useSearchParams } from 'react-router-dom';



function AppListContainer(props) {

    const dispatch = useDispatch()
    const vendorsName = useSelector(selectVendorsName)
    const perPage = useSelector(selectPerPage)
    const totalPage = useSelector(selectTotalPage)
    const currentPage = useSelector(selectCurrentPage)
    const hasDraftItem = useSelector(selectHasDraftItem)
    const [showClearDialog, setShowClearDialog] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams();

    const handleChangePage = (event, newPage) => {
        dispatch(getItems())
    };

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
                    <div className="">
                        <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
                            Page Sections Investigation:List For slectedVendor
                        </Typography>
                        <Typography className="font-medium" color="text.secondary">
                            Consumer on att.com
                        </Typography>
                    </div>
                    <div className='flex justify-center items-center space-x-8 '>
                        <Button disabled={!hasDraftItem} size='small' endIcon={<Download />} color="secondary" variant="contained">Export</Button>
                        <Button disabled={!hasDraftItem} onClick={() => dispatch(getItems())} size='small' endIcon={<Save />} color="secondary" variant="contained">Save</Button>
                        <Button disabled={!hasDraftItem} onClick={() => setShowClearDialog(true)} size='small' endIcon={<Delete />} color="secondary" variant="contained">Clear All</Button>
                        <CommonSelect
                            items={vendorsName ?? []}
                            selectedItem={searchParams.get('vendor') ?? ''}
                            setSelectedItme={(value) => {
                                searchParams.set('vendor', value);
                                setSearchParams(searchParams);
                            }}
                            title="Vendor Name" />

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
                    <Button onClick={() => {
                        setShowClearDialog(false)
                        // dispatch(clearAll())
                    }} >Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default memo(AppListContainer);
