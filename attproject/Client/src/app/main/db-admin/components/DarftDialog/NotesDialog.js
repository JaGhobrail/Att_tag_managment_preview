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
import { InputAdornment, Paper, Select, Tooltip } from '@mui/material';
import { CopyAll, Delete, Edit } from '@mui/icons-material';
import UserCard from './UserCard';
import SelectDomain from './SelectDomain';
import { useDispatch } from 'react-redux';
import { deleteNote, insertDraft, insertNote } from '../../store/Slice';


export default function NotesDialog(props) {
    const { item } = props;
    const dispatch = useDispatch()
    const [openDialog, setOpenDialog] = useState(false)

    const getNote = () => item.note_list[0]?.body ?? item.notes
    const getColor = () => item.note_list[0]?.body ? item.note_list[0]?.user?.color : ''
    const [notes, setNotes] = useState(getNote())

    const [selectedDomin, setSelectedDomin] = useState(item.scan_domain)

    function handleOpenDialog() {
        setOpenDialog(true);
    }

    function handleCloseDialog() {
        setOpenDialog(false);
    }

    function handleDiscard() {
        setOpenDialog(false);
    }

    function onSubmit(data) {
        console.info(data);
        setOpenDialog(false);
    }

    function _insertNote() {
        dispatch(insertNote(
            {
                itemId: item.id,
                data: {
                    domain: selectedDomin,
                    body: notes
                }
            }))
        setOpenDialog(false);
    }

    function checkChange() {
        if (notes != getNote() || selectedDomin != item.scan_domain)
            return true
        return false
    }

    return (
        <>
            <Tooltip className='text-grey-700' title={getNote()}>
                <TextField
                    style={{
                        backgroundClip: getColor()
                    }}
                    // /className={getColor() ? 'bg-yellow' : ''}
                    value={getNote()}
                    onClick={handleOpenDialog}
                    InputProps={{
                        readOnly: true,
                        endAdornment: (
                            <InputAdornment>
                                <Edit fontSize='small' />
                            </InputAdornment>
                        ),
                    }}
                    size='small'
                    id="outlined-basic"
                    variant="outlined" />
            </Tooltip>
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
                                {item.vendor_name}
                            </Typography>
                            <Typography variant="caption" color="inherit">
                                Related To Related to 04/2023
                            </Typography>
                        </div>
                    </Toolbar>
                </AppBar>

                <DialogContent classes={{ root: 'p-16 pb-0 sm:p-32 sm:pb-0' }}>
                    <Paper className='rounded-8 p-8 my-16 space-y-16 shadow-0'>
                        <SelectDomain
                            items={[item.scan_domain]}
                            selectedDomin={selectedDomin}
                            setSelectedDomin={setSelectedDomin} />
                        <TextField
                            className='leading-loose'
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            size='small'
                            label="Note"
                            id="note"
                            variant="outlined"
                            fullWidth
                            multiline
                            minRows={4}
                        />
                        <div className='flex justify-end'>
                        </div>
                    </Paper>

                    {item?.note_list?.map(note => (
                        <Paper key={note.id} className='rounded-8 p-8 my-16 space-y-16'>
                            <UserCard user={note?.user} updated_at={note?.updated_at} />
                            <TextField
                                disabled={true}
                                value={note.body}
                                size='small'
                                label="Note"
                                id="note"
                                variant="outlined"
                                fullWidth
                                multiline
                            />
                            <TextField
                                disabled={true}
                                value={note.domain}
                                size='small'
                                label="Domain"
                                variant="outlined"
                                fullWidth
                            />

                            <div className='flex justify-end'>
                                <Button size='small' onClick={() => navigator.clipboard.writeText(note.body)} endIcon={<CopyAll />} color="secondary" variant="text">Copy as Current</Button>
                                <Button size='small' onClick={() => dispatch(deleteNote({ id: note.id, itemId: item.id }))} endIcon={<Delete />} color="secondary" variant="text">Delete ‌</Button>
                            </div>
                        </Paper>
                    ))}


                </DialogContent>

                <DialogActions className="flex flex-col sm:flex-row sm:items-center justify-between py-16 sm:py-24 px-24">
                    <div className="flex items-center space-x-8 mt-16 sm:mt-0 w-full justify-end">

                        <Button className="" variant="outlined" color="secondary" onClick={handleCloseDialog}>
                            Exit & No Save
                        </Button>

                        <Button
                            className=""
                            variant="contained"
                            color="secondary"
                            disabled={!checkChange()}
                            // type="submit"
                            onClick={_insertNote}
                        // disabled={_.isEmpty(dirtyFields) || !isValid}
                        >
                            Save & Exite
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </>
    );
}

