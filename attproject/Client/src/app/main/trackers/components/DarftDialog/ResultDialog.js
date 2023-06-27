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
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import _ from '@lodash';
import WYSIWYGEditor from 'app/shared-components/WYSIWYGEditor';
import clsx from 'clsx';
import CommonSvgIcon from '@common/core/CommonSvgIcon';
import { InputAdornment, Paper, Select } from '@mui/material';
import { ArrowDownward, ArrowDownwardOutlined, ArrowDropDown, CopyAll, Delete, Edit } from '@mui/icons-material';
import UserCard from './UserCard';
import SelectResult from './SelectResult';
import SelectDomain from './SelectDomain';
import { useDispatch } from 'react-redux';
import { insertDraft } from '../../store/Slice';


export default function SelectDialog(props) {
  const { item } = props;
  const dispatch = useDispatch()
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedResult, setSelectedResult] = useState(item.result)

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

  function svDraft() {
    dispatch(insertDraft(
      {
        itemId: item.id,
        data: {
          ...item,
          result: selectedResult
        }
      }))
    setOpenDialog(false);
  }

  function checkChange() {
    if (selectedResult != item.result)
      return true
    return false
  }



  return (
    <>
      <TextField
        onClick={handleOpenDialog}
        value={selectedResult}
        className={item.changeResult ? 'bg-yellow' : ''}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment>
              <ArrowDropDown fontSize='small' />
            </InputAdornment>
          ),
        }}
        size='small'
        variant="outlined" />

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
            <SelectResult selectedResult={selectedResult} setSelectedResult={setSelectedResult} />
          </Paper>

          {item?.draftList?.map(drft => (
            <Paper className='rounded-8 p-8 my-16 space-y-16'>
              <UserCard />
              <TextField
                disabled={true}
                value={drft.result}
                size='small'
                label="Result"
                id="Result"
                variant="outlined"
                fullWidth
              />

              <div className='flex justify-end'>
                <Button size='small' endIcon={<Delete />} color="secondary" variant="text">Delete ‌</Button>
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
              onClick={svDraft}
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
