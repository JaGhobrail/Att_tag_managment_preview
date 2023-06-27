import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import _ from '@lodash';
import WYSIWYGEditor from 'app/shared-components/WYSIWYGEditor';
import clsx from 'clsx';
import CommonSvgIcon from '@common/core/CommonSvgIcon';
// import MailAttachment from './MailAttachment';
import { InputAdornment, Paper, Select } from '@mui/material';
import { CopyAll, Delete, Edit } from '@mui/icons-material';
import UserCard from './UserCard';
import SelectResult from './SelectResult';
import SelectDomain from './SelectDomain';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  to: yup.string().required('You must enter an e-mail').email('You must enter a valid e-mail.'),
});

function MailCompose(props) {
  const { className } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const { handleSubmit, formState, control } = useForm({
    mode: 'onChange',
    defaultValues: {
      from: 'johndoe@creapond.com',
      to: '',
      cc: '',
      bcc: '',
      subject: '',
      message: '',
    },
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const { t } = useTranslation('mailboxApp');

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

  return (
    <div className={clsx('', className)}>
      <TextField
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
        id="outlined-basic" variant="outlined" />

      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
        scroll="paper"
      >
        <AppBar className='w-auto' position="static" color="secondary" elevation={0}>
          <Toolbar className="flex w-full">
            <div className='flex flex-col'>
              <Typography variant="subtitle1" color="inherit">
                Vendor Name
              </Typography>
              <Typography variant="caption" color="inherit">
                Related To Related to 04/2023
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
        <DialogContent classes={{ root: 'p-16 pb-0 sm:p-32 sm:pb-0' }}>
          <Paper className='rounded-8 p-8 my-16 space-y-16'>
            <UserCard />
            <SelectResult />
            <SelectDomain />
            <Controller
              name="note"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  size='small'
                  label="Note"
                  id="note"
                  variant="outlined"
                  fullWidth
                  multiline
                  minRows={4}

                />
              )}
            />
            <div className='flex justify-end'>

              <Button size='small' endIcon={<CopyAll />} color="secondary" variant="text">Copy as Current</Button>
              <Button size='small' endIcon={<Delete />} color="secondary" variant="text">Delete ‌</Button>


            </div>
          </Paper>

          <Paper className='rounded-8 p-8 my-16 space-y-16'>
            <UserCard />
            <SelectResult />
            <SelectDomain />
            <Controller
              name="note"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  size='small'
                  label="Note"
                  id="note"
                  variant="outlined"
                  fullWidth
                  multiline
                  minRows={4}

                />
              )}
            />
            <div className='flex justify-end'>

              <Button size='small' endIcon={<CopyAll />} color="secondary" variant="text">Copy as Current</Button>
              <Button size='small' endIcon={<Delete />} color="secondary" variant="text">Delete ‌</Button>


            </div>
          </Paper>
          <Paper className='rounded-8 p-8 my-16 space-y-16'>
            <UserCard />
            <SelectResult />
            <SelectDomain />
            <Controller
              name="note"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  size='small'
                  label="Note"
                  id="note"
                  variant="outlined"
                  fullWidth
                  multiline
                  minRows={4}

                />
              )}
            />
            <div className='flex justify-end'>

              <Button size='small' endIcon={<CopyAll />} color="secondary" variant="text">Copy as Current</Button>
              <Button size='small' endIcon={<Delete />} color="secondary" variant="text">Delete ‌</Button>


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
              type="submit"
              disabled={_.isEmpty(dirtyFields) || !isValid}
            >
              Save
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MailCompose;
