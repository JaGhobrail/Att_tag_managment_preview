import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import _ from '@lodash';
import { Paper } from '@mui/material';
import { useDispatch } from 'react-redux';


export default function UrlDialog(props) {
    const { item } = props;
    const dispatch = useDispatch()
    const [openDialog, setOpenDialog] = useState(false)

    const [notes, setNotes] = useState(item)

    function handleOpenDialog() {
        setOpenDialog(true);
    }

    function handleCloseDialog() {
        setOpenDialog(false);
    }

    function onSubmit(data) {
        setOpenDialog(false);
    }


    return (
        <>
            <Button onClick={handleOpenDialog} variant='text' size='small' color='primary'>{item}</Button>

            <Dialog
                fullWidth={true}
                maxWidth={'sm'}
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="form-dialog-title"
                scroll="paper">

                <AppBar className='w-auto' position="static" color="secondary" elevation={0}>
                    <Toolbar className="flex w-full">
                        <div className='flex flex-col'>
                            <Typography variant="subtitle1" color="inherit">
                                Update Table
                            </Typography>
                        </div>
                    </Toolbar>
                </AppBar>

                <DialogContent classes={{ root: 'p-16 pb-0 sm:p-32 sm:pb-0' }}>
                    <Paper className='rounded-8 p-8 my-16 space-y-16 shadow-0'>
                        <TextField
                            className='leading-loose'
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            size='small'
                            label="Page URL"
                            id="note"
                            variant="outlined"
                            fullWidth
                            multiline
                            minRows={4}
                        />
                        <div className='flex justify-end'>
                        </div>
                    </Paper>


                </DialogContent>

                <DialogActions className="flex flex-col sm:flex-row sm:items-center justify-between py-16 sm:py-24 px-24">
                    <div className="flex items-center space-x-8 mt-16 sm:mt-0 w-full justify-end">

                        <Button className="" variant="outlined" color="secondary" onClick={handleCloseDialog}>
                            Close
                        </Button>

                        <Button
                            className=""
                            variant="contained"
                            color="secondary"
                            // type="submit"
                            onClick={handleCloseDialog}
                        // disabled={_.isEmpty(dirtyFields) || !isValid}
                        >
                            Update
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </>
    );
}

